// CSV import/export for game content.
// One row per lock. Columns:
//   level_id, level_title, level_narrative, lock_id, lock_label,
//   vignette, codes (pipe-separated), rationale, bonus
//
// Codes use "|" as the separator so commas inside answers are safe.

const HEADERS = [
  'level_id',
  'level_title',
  'level_narrative',
  'lock_id',
  'lock_label',
  'vignette',
  'codes',
  'rationale',
  'bonus',
]

function escapeCell(v) {
  const s = String(v ?? '')
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"'
  return s
}

export function gameToCsv(game) {
  const rows = [HEADERS.join(',')]
  for (const level of game.levels) {
    for (const lock of level.locks || []) {
      rows.push(
        [
          level.id,
          level.title,
          level.narrative,
          lock.id,
          lock.label,
          lock.vignette,
          (lock.codes || []).join('|'),
          lock.rationale,
          lock.bonus || '',
        ]
          .map(escapeCell)
          .join(','),
      )
    }
  }
  return rows.join('\r\n')
}

// Minimal RFC-4180-ish parser supporting quoted fields and embedded commas/newlines.
function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false
  const s = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (inQuotes) {
      if (ch === '"') {
        if (s[i + 1] === '"') {
          cell += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cell += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      row.push(cell)
      cell = ''
    } else if (ch === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += ch
    }
  }
  // trailing cell/row
  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }
  return rows.filter((r) => r.length && r.some((c) => c.trim() !== ''))
}

export function csvToGame(text, base) {
  const rows = parseCsv(text)
  if (rows.length < 2) throw new Error('CSV has no data rows.')
  const header = rows[0].map((h) => h.trim().toLowerCase())
  const idx = (name) => header.indexOf(name)
  const need = ['lock_id', 'codes', 'vignette']
  for (const n of need) {
    if (idx(n) === -1) throw new Error(`CSV missing required column: ${n}`)
  }

  const levelsMap = new Map()
  const order = []
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r]
    const get = (name) => {
      const i = idx(name)
      return i === -1 ? '' : (cells[i] ?? '').trim()
    }
    const levelId = get('level_id') || 'L1'
    if (!levelsMap.has(levelId)) {
      levelsMap.set(levelId, {
        id: levelId,
        title: get('level_title') || levelId,
        narrative: get('level_narrative'),
        locks: [],
      })
      order.push(levelId)
    }
    const level = levelsMap.get(levelId)
    // keep latest non-empty level meta
    if (get('level_title')) level.title = get('level_title')
    if (get('level_narrative')) level.narrative = get('level_narrative')

    const codes = (get('codes') || '')
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean)
    level.locks.push({
      id: get('lock_id'),
      label: get('lock_label') || `Lock ${get('lock_id')}`,
      vignette: get('vignette'),
      codes,
      rationale: get('rationale'),
      bonus: get('bonus') || undefined,
    })
  }

  return {
    title: base?.title || 'Imported Game',
    subtitle: base?.subtitle || '',
    briefing: base?.briefing || '',
    objectives: base?.objectives || [],
    lives: base?.lives || 3,
    timers: base?.timers || { crack: 120, sbar: 180, timeout: 180 },
    levels: order.map((id) => levelsMap.get(id)),
  }
}

export function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
