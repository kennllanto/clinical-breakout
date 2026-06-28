import { useMemo, useState } from 'react'
import './index.css'
import { loadGame, saveGame, resetGame, flattenLocks } from './lib/storage.js'
import { isCorrect } from './lib/match.js'
import { isAuthed, setAuthed } from './lib/auth.js'
import Login from './components/Login.jsx'
import Hearts from './components/Hearts.jsx'
import Briefing from './components/Briefing.jsx'
import LevelIntro from './components/LevelIntro.jsx'
import LockScreen from './components/LockScreen.jsx'
import Victory from './components/Victory.jsx'
import GameOver from './components/GameOver.jsx'
import Editor from './components/Editor.jsx'

// Top-level screens
const SCREEN = {
  BRIEFING: 'briefing',
  PLAY: 'play',
  VICTORY: 'victory',
  GAMEOVER: 'gameover',
  EDITOR: 'editor',
}

export default function App() {
  const [authed, setAuthedState] = useState(isAuthed)
  const [game, setGame] = useState(loadGame)
  const [screen, setScreen] = useState(SCREEN.BRIEFING)

  // Play state
  const [lives, setLives] = useState(game.lives)
  const [pos, setPos] = useState(0) // index into flattened locks
  const [sub, setSub] = useState('intro') // 'intro' | 'crack' | 'sbar'
  const [attemptKey, setAttemptKey] = useState(0) // bumps on tag-out / fresh cohort

  const locks = useMemo(() => flattenLocks(game), [game])
  const timers = game.timers || { crack: 120, sbar: 180, timeout: 180 }
  const current = locks[pos]

  function signOut() {
    setAuthed(false)
    setAuthedState(false)
  }

  function startGame() {
    setLives(game.lives)
    setPos(0)
    setSub(locks.length && locks[0].lockIndex === 0 ? 'intro' : 'crack')
    setAttemptKey((k) => k + 1)
    setScreen(SCREEN.PLAY)
  }

  function loseLife(returnToCrack) {
    setLives((prev) => {
      const next = prev - 1
      if (next <= 0) {
        setScreen(SCREEN.GAMEOVER)
        return 0
      }
      // Tag-out: fresh sub-cohort retakes the SAME lock with fresh timers.
      if (returnToCrack) setSub('crack')
      setAttemptKey((k) => k + 1)
      return next
    })
  }

  function advance() {
    const nextPos = pos + 1
    if (nextPos >= locks.length) {
      setScreen(SCREEN.VICTORY)
      return
    }
    setPos(nextPos)
    setAttemptKey((k) => k + 1)
    setSub(locks[nextPos].lockIndex === 0 ? 'intro' : 'crack')
  }

  function saveEditor(next) {
    saveGame(next)
    setGame(next)
    setScreen(SCREEN.BRIEFING)
  }

  // ---- render ----
  if (!authed) {
    return (
      <Login
        title={game.title}
        onSuccess={() => setAuthedState(true)}
      />
    )
  }

  if (screen === SCREEN.EDITOR) {
    return (
      <Shell game={game} lives={lives} showHud={false} onSignOut={signOut}>
        <Editor
          game={game}
          onSave={saveEditor}
          onClose={() => setScreen(SCREEN.BRIEFING)}
          onResetDefault={() => resetGame()}
        />
      </Shell>
    )
  }

  if (screen === SCREEN.BRIEFING) {
    return (
      <Shell game={game} lives={lives} showHud={false} onSignOut={signOut}>
        <Briefing game={game} onStart={startGame} onEdit={() => setScreen(SCREEN.EDITOR)} />
      </Shell>
    )
  }

  if (screen === SCREEN.VICTORY) {
    return (
      <Shell game={game} lives={lives} showHud onSignOut={signOut}>
        <Victory
          game={game}
          lives={lives}
          onRestart={() => setScreen(SCREEN.BRIEFING)}
          onEdit={() => setScreen(SCREEN.EDITOR)}
        />
      </Shell>
    )
  }

  if (screen === SCREEN.GAMEOVER) {
    return (
      <Shell game={game} lives={0} showHud onSignOut={signOut}>
        <GameOver
          timeoutSeconds={timers.timeout}
          onReset={() => {
            setLives(game.lives)
            setSub('crack')
            setAttemptKey((k) => k + 1)
            setScreen(SCREEN.PLAY)
          }}
          onRestart={() => setScreen(SCREEN.BRIEFING)}
        />
      </Shell>
    )
  }

  // PLAY
  if (!current) {
    return (
      <Shell game={game} lives={lives} showHud={false} onSignOut={signOut}>
        <div className="card">No locks in this game. Add some in the editor.</div>
      </Shell>
    )
  }

  const levelNumber = current.levelIndex + 1

  return (
    <Shell game={game} lives={lives} showHud onExit={() => setScreen(SCREEN.BRIEFING)} onSignOut={signOut}>
      {sub === 'intro' ? (
        <LevelIntro
          level={current.level}
          levelNumber={levelNumber}
          totalLevels={game.levels.length}
          onContinue={() => {
            setSub('crack')
            setAttemptKey((k) => k + 1)
          }}
        />
      ) : (
        <LockScreen
          lock={current.lock}
          level={current.level}
          phase={sub}
          timers={timers}
          attemptKey={attemptKey}
          lockNumber={pos + 1}
          totalLocks={locks.length}
          checkCode={(g) => isCorrect(g, current.lock.codes)}
          onCorrect={() => setSub('sbar')}
          onWrongCode={() => loseLife(true)}
          onSbarPass={advance}
          onSbarFail={() => loseLife(true)}
        />
      )}
    </Shell>
  )
}

function Shell({ game, lives, showHud, onExit, onSignOut, children }) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="pulse" aria-hidden>＋</span>
          <div>
            <div className="brand-title">{game.title}</div>
            <div className="brand-sub">{game.subtitle}</div>
          </div>
        </div>
        <div className="hud">
          {showHud && <Hearts lives={lives} max={game.lives} />}
          {showHud && onExit && (
            <button className="btn ghost sm" onClick={onExit} title="Back to briefing">
              ⤺ Exit
            </button>
          )}
          {onSignOut && (
            <button className="btn ghost sm" onClick={onSignOut} title="Sign out">
              ⏻ Sign out
            </button>
          )}
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <span>{game.title} · facilitator board</span>
      </footer>
    </div>
  )
}
