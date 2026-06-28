// Pyramid progress map of all locks, e.g.
//                4.1
//           3.1     3.2
//        2.1   2.2    2.3
//      1.1  1.2  1.3   1.4
// Level 1 forms the wide base; the final level is the apex. Solved locks are
// filled, the current lock pulses, upcoming locks are dimmed.

const W = 320

export default function ProgressMap({ game, pos, finished = false }) {
  const levels = game.levels
  const L = levels.length
  const topY = 26
  const rowGap = 46
  const r = 15

  // Build node positions, level by level, tracking a global index.
  let gi = 0
  const rows = levels.map((level, li) => {
    const n = level.locks.length
    const y = topY + (L - 1 - li) * rowGap
    const nodes = level.locks.map((lock, j) => {
      const x = (W * (j + 1)) / (n + 1)
      let state = 'todo'
      if (finished || gi < pos) state = 'done'
      else if (gi === pos) state = 'current'
      gi += 1
      return { x, y, id: lock.id, state }
    })
    return { y, nodes }
  })

  const height = topY + (L - 1) * rowGap + r + 14
  const total = rows.reduce((a, row) => a + row.nodes.length, 0)
  const solved = finished ? total : pos

  // Connectors: link every node to every node in the row above (full lattice).
  const links = []
  for (let li = 0; li < rows.length - 1; li++) {
    const upper = rows[li + 1].nodes
    rows[li].nodes.forEach((node) => {
      upper.forEach((u) => {
        links.push({ x1: node.x, y1: node.y, x2: u.x, y2: u.y })
      })
    })
  }

  return (
    <div className="progress-map">
      <div className="pm-head">
        <span className="pm-title">Mission Progress</span>
        <span className="pm-count">{solved}/{total} locks</span>
      </div>
      <svg viewBox={`0 0 ${W} ${height}`} className="pm-svg" role="img"
           aria-label={`Progress: ${solved} of ${total} locks solved`}>
        {links.map((l, i) => (
          <line key={i} className="pm-link" x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
        {rows.flatMap((row) =>
          row.nodes.map((node) => (
            <g key={node.id} className={`pm-node ${node.state}`}>
              {node.state === 'current' && (
                <circle className="pm-ring" cx={node.x} cy={node.y} r={r + 4} />
              )}
              <circle className="pm-disc" cx={node.x} cy={node.y} r={r} />
              {node.state === 'done' ? (
                <path
                  className="pm-check"
                  d={`M${node.x - 6} ${node.y} l4 4 l7 -8`}
                  fill="none"
                />
              ) : (
                <text className="pm-label" x={node.x} y={node.y + 3.5} textAnchor="middle">
                  {node.id}
                </text>
              )}
            </g>
          )),
        )}
      </svg>
    </div>
  )
}
