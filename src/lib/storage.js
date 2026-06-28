import { DEFAULT_GAME } from '../data/defaultGame.js'

const KEY = 'vasoactive-gauntlet:game'

// Load the saved game from localStorage, falling back to the built-in default.
export function loadGame() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(DEFAULT_GAME)
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.levels)) return structuredClone(DEFAULT_GAME)
    return parsed
  } catch {
    return structuredClone(DEFAULT_GAME)
  }
}

export function saveGame(game) {
  try {
    localStorage.setItem(KEY, JSON.stringify(game))
  } catch {
    // storage full / unavailable — non-fatal for a single session
  }
}

export function resetGame() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  return structuredClone(DEFAULT_GAME)
}

// Flatten levels -> ordered list of locks with their level index, for play.
export function flattenLocks(game) {
  const out = []
  game.levels.forEach((level, li) => {
    ;(level.locks || []).forEach((lock, ki) => {
      out.push({ level, levelIndex: li, lockIndex: ki, lock })
    })
  })
  return out
}
