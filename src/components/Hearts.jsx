export default function Hearts({ lives, max }) {
  const items = Array.from({ length: max }, (_, i) => i < lives)
  return (
    <div className="lives" title={`${lives} of ${max} team lives remaining`}>
      <span className="lives-caption">Lives</span>
      <div className="hearts" aria-label={`${lives} of ${max} lives remaining`}>
        {items.map((alive, i) => (
          <span key={i} className={alive ? 'heart' : 'heart lost'} aria-hidden>
            {alive ? '❤️' : '🤍'}
          </span>
        ))}
        <span className="hearts-count">{lives}/{max}</span>
      </div>
    </div>
  )
}
