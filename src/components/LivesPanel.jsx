// Large Lives display shown beside the progress map during play.
export default function LivesPanel({ lives, max }) {
  const items = Array.from({ length: max }, (_, i) => i < lives)
  const hint =
    lives <= 0 ? 'No lives left' : lives === 1 ? 'Final life — careful!' : `${lives} lives remaining`
  return (
    <div className={`lives-panel ${lives === 1 ? 'low' : ''}`}>
      <span className="lives-panel-title">Team Lives</span>
      <div className="lives-hearts-big" aria-label={`${lives} of ${max} lives remaining`}>
        {items.map((alive, i) => (
          <span key={i} className={alive ? 'heart' : 'heart lost'} aria-hidden>
            {alive ? '❤️' : '🤍'}
          </span>
        ))}
      </div>
      <div className="lives-big-count">{lives} / {max}</div>
      <span className="lives-panel-hint">{hint}</span>
    </div>
  )
}
