import { useRef, useState } from 'react'
import { gameToCsv, csvToGame, downloadCsv } from '../lib/csv.js'

let uid = 0
const newId = (p) => `${p}${Date.now().toString(36)}${uid++}`

export default function Editor({ game, onSave, onClose, onResetDefault }) {
  const [draft, setDraft] = useState(() => structuredClone(game))
  const [msg, setMsg] = useState('')
  const fileRef = useRef(null)

  const update = (fn) => setDraft((d) => {
    const next = structuredClone(d)
    fn(next)
    return next
  })

  const flash = (m) => {
    setMsg(m)
    setTimeout(() => setMsg(''), 3500)
  }

  function addLevel() {
    update((d) => d.levels.push({
      id: newId('L'),
      title: `New Level ${d.levels.length + 1}`,
      narrative: '',
      locks: [],
    }))
  }
  function addLock(li) {
    update((d) => d.levels[li].locks.push({
      id: newId('lock-'),
      label: 'New Lock',
      vignette: '',
      codes: [],
      rationale: '',
    }))
  }

  function exportCsv() {
    downloadCsv(
      `${(draft.title || 'game').toLowerCase().replace(/\s+/g, '-')}.csv`,
      gameToCsv(draft),
    )
    flash('CSV exported.')
  }

  function importCsv(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const imported = csvToGame(String(reader.result), draft)
        setDraft(imported)
        flash(`Imported ${imported.levels.reduce((n, l) => n + l.locks.length, 0)} locks from CSV.`)
      } catch (err) {
        flash(`Import failed: ${err.message}`)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const totalLocks = draft.levels.reduce((n, l) => n + l.locks.length, 0)

  return (
    <div className="editor">
      <div className="editor-bar">
        <h2>✎ Edit Game</h2>
        <div className="editor-bar-actions">
          <button className="btn ghost" onClick={exportCsv}>⭳ Export CSV</button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>⭱ Import CSV</button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={importCsv} />
          <button
            className="btn ghost"
            onClick={() => {
              if (confirm('Reset to the built-in Vasoactive Gauntlet? This discards your edits.')) {
                setDraft(structuredClone(onResetDefault()))
                flash('Reset to default game.')
              }
            }}
          >
            ↺ Reset to default
          </button>
          <button className="btn primary" onClick={() => onSave(draft)}>✓ Save &amp; Close</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>

      {msg && <div className="editor-msg">{msg}</div>}

      <div className="editor-body">
        <section className="editor-meta">
          <label>
            <span>Game title</span>
            <input value={draft.title} onChange={(e) => update((d) => (d.title = e.target.value))} />
          </label>
          <label>
            <span>Subtitle</span>
            <input value={draft.subtitle || ''} onChange={(e) => update((d) => (d.subtitle = e.target.value))} />
          </label>
          <label className="narrow">
            <span>Team lives</span>
            <input
              type="number" min="1" max="9"
              value={draft.lives}
              onChange={(e) => update((d) => (d.lives = Math.max(1, Number(e.target.value) || 1)))}
            />
          </label>
          <label className="full">
            <span>Briefing (blank line separates paragraphs)</span>
            <textarea rows={4} value={draft.briefing || ''} onChange={(e) => update((d) => (d.briefing = e.target.value))} />
          </label>
          <p className="muted">{draft.levels.length} levels · {totalLocks} locks</p>
        </section>

        {draft.levels.map((level, li) => (
          <section className="editor-level" key={level.id}>
            <div className="editor-level-head">
              <input
                className="level-title-input"
                value={level.title}
                onChange={(e) => update((d) => (d.levels[li].title = e.target.value))}
              />
              <button className="btn danger sm" onClick={() => update((d) => d.levels.splice(li, 1))}>Delete level</button>
            </div>
            <label className="full">
              <span>Patient narrative</span>
              <textarea rows={2} value={level.narrative || ''} onChange={(e) => update((d) => (d.levels[li].narrative = e.target.value))} />
            </label>

            {level.locks.map((lock, ki) => (
              <div className="editor-lock" key={lock.id}>
                <div className="editor-lock-head">
                  <input
                    className="lock-label-input"
                    value={lock.label}
                    onChange={(e) => update((d) => (d.levels[li].locks[ki].label = e.target.value))}
                  />
                  <button className="btn danger sm" onClick={() => update((d) => d.levels[li].locks.splice(ki, 1))}>✕</button>
                </div>
                <label className="full">
                  <span>Vignette</span>
                  <textarea rows={2} value={lock.vignette} onChange={(e) => update((d) => (d.levels[li].locks[ki].vignette = e.target.value))} />
                </label>
                <label className="full">
                  <span>Accepted codes (one per line, or separated by |)</span>
                  <textarea
                    rows={2}
                    value={lock.codes.join('\n')}
                    onChange={(e) => update((d) => {
                      d.levels[li].locks[ki].codes = e.target.value
                        .split(/[\n|]/).map((c) => c.trim()).filter(Boolean)
                    })}
                  />
                </label>
                <label className="full">
                  <span>SBAR rationale</span>
                  <textarea rows={3} value={lock.rationale} onChange={(e) => update((d) => (d.levels[li].locks[ki].rationale = e.target.value))} />
                </label>
                <label className="full">
                  <span>Bonus note (optional)</span>
                  <input value={lock.bonus || ''} onChange={(e) => update((d) => (d.levels[li].locks[ki].bonus = e.target.value || undefined))} />
                </label>
              </div>
            ))}
            <button className="btn ghost sm" onClick={() => addLock(li)}>+ Add lock</button>
          </section>
        ))}

        <button className="btn ghost" onClick={addLevel}>+ Add level</button>
      </div>
    </div>
  )
}
