import Timer from './Timer.jsx'

// "Clinical Consultation Delay" — all lives lost. Facilitator runs a study
// break, then resets lives and the team resumes the SAME lock.
export default function GameOver({ timeoutSeconds, onReset, onRestart }) {
  return (
    <div className="card endscreen gameover">
      <div className="big-emoji" aria-hidden>🩺</div>
      <h1>Clinical Consultation Delay</h1>
      <p className="subtitle">
        All 3 team lives are gone. Take a mandatory peer-review study break and
        review the cheat sheet before the facilitator resets your lives.
      </p>
      <Timer seconds={timeoutSeconds} label="Mandatory study break" resetKey="timeout" />
      <div className="briefing-actions">
        <button className="btn primary big" onClick={onReset}>
          ↻ Reset Lives &amp; Resume Lock
        </button>
        <button className="btn ghost" onClick={onRestart}>
          ⤺ Restart from the Briefing
        </button>
      </div>
    </div>
  )
}
