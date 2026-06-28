// Linear progress map: one row per level, locks shown as padlock icons in a
// straight line, connected left-to-right. Solved locks show an open lock + tick,
// the current lock pulses, upcoming locks are dimmed and closed.

function MapLock({ state, id }) {
  return (
    <div className={`pm-lock ${state}`}>
      <svg viewBox="0 0 32 38" className="pm-lock-ico" aria-hidden>
        <path className="pm-shackle" d="M9 18 v-5 a7 7 0 0 1 14 0 v5"
              fill="none" strokeWidth="3" strokeLinecap="round" />
        <rect className="pm-body" x="6" y="17" width="20" height="17" rx="4" strokeWidth="2" />
        {state === 'done' ? (
          <path className="pm-lk-check" d="M11 25.5 l3 3 l6.5 -7"
                fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <circle className="pm-lk-hole" cx="16" cy="25" r="2.4" />
        )}
      </svg>
      <span className="pm-lock-id">{id}</span>
    </div>
  )
}

export default function ProgressMap({ game, pos, finished = false }) {
  let gi = 0
  const total = game.levels.reduce((a, l) => a + l.locks.length, 0)
  const solved = finished ? total : pos

  const rows = game.levels.map((level, li) => {
    const items = []
    level.locks.forEach((lock, j) => {
      let state = 'todo'
      if (finished || gi < pos) state = 'done'
      else if (gi === pos) state = 'current'
      const leftSolved = finished || gi < pos
      gi += 1
      if (j > 0) {
        items.push(<div key={`c${lock.id}`} className={`pm-conn ${leftSolved ? 'done' : ''}`} />)
      }
      items.push(<MapLock key={lock.id} state={state} id={lock.id} />)
    })
    return (
      <div className="pm-row" key={level.id}>
        <span className="pm-row-label">Level {li + 1}</span>
        <div className="pm-locks">{items}</div>
      </div>
    )
  })

  return (
    <div className="progress-map">
      <div className="pm-head">
        <span className="pm-title">Mission Progress</span>
        <span className="pm-count">{solved}/{total} locks</span>
      </div>
      <div className="pm-rows">{rows}</div>
    </div>
  )
}
