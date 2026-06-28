export default function Hearts({ lives, max }) {
  const items = Array.from({ length: max }, (_, i) => i < lives)
  return (
    <div className="hearts" title={`${lives} of ${max} team lives remaining`}>
      {items.map((alive, i) => (
        <span key={i} className={alive ? 'heart' : 'heart lost'} aria-hidden>
          {alive ? '❤️' : '🤍'}
        </span>
      ))}
      <span className="hearts-label">{lives}/{max} lives</span>
    </div>
  )
}
