import { useState, useEffect, useRef } from 'react'

// Notifications from different people — no names, just avatars + tasks/questions
const PersonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(232,224,213,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const GroupIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(232,224,213,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 1 0-7.75"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const notifications = [
  { id: 1, type: 'group', chat: 'Group · The Girls', preview: 'Can you send me the notes from yesterday??', delay: 1000 },
  { id: 2, type: 'personal', chat: 'Personal', preview: 'hey are you coming tonight or not', delay: 3200 },
  { id: 3, type: 'personal', chat: 'Personal', preview: 'bro I need you to review my CV asap', delay: 5000 },
  { id: 4, type: 'group', chat: 'Group · The Girls', preview: 'someone remind her about the plan 😭', delay: 6800 },
  { id: 5, type: 'personal', chat: 'Personal', preview: 'did you submit the assignment already?', delay: 8400 },
  { id: 6, type: 'personal', chat: 'Personal', preview: 'call me when you\'re free I need advice', delay: 10200 },
  { id: 7, type: 'group', chat: 'Group · The Girls', preview: 'LEISS WHERE ARE YOU 😭😭', delay: 12000 },
  { id: 8, type: 'personal', chat: 'Personal', preview: 'can you help me with something real quick', delay: 13600 },
  { id: 9, type: 'personal', chat: 'Personal', preview: 'you never replied me from yesterday 🙄', delay: 15200 },
  { id: 10, type: 'group', chat: 'Group · The Girls', preview: 'ok but who\'s bringing food tonight', delay: 16800 },
  { id: 11, type: 'personal', chat: 'Personal', preview: 'I need a favour. it\'s urgent.', delay: 18200 },
  { id: 12, type: 'personal', chat: 'Personal', preview: 'are you okay? you seem off lately', delay: 19800 },
]

const NOTIF_VISIBLE_MS = 3800

const reveal = 22500
const autoEnter = 29000

export default function Loader({ onDone }) {
  const [active, setActive] = useState([]) // [{...notif, key}]
  const [showReveal, setShowReveal] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [revealStep, setRevealStep] = useState(0)
  const keyRef = useRef(0)

  useEffect(() => {
    const timers = []

    notifications.forEach(n => {
      timers.push(setTimeout(() => {
        const key = keyRef.current++
        setActive(prev => [...prev, { ...n, key }])
        timers.push(setTimeout(() => {
          setActive(prev => prev.filter(p => p.key !== key))
        }, NOTIF_VISIBLE_MS))
      }, n.delay))
    })

    timers.push(setTimeout(() => setShowReveal(true), reveal))

    // reveal steps
    timers.push(setTimeout(() => setRevealStep(1), reveal + 600))
    timers.push(setTimeout(() => setRevealStep(2), reveal + 1400))
    timers.push(setTimeout(() => setRevealStep(3), reveal + 2200))
    timers.push(setTimeout(() => setRevealStep(4), reveal + 3200))

    // auto open after 29s
    timers.push(setTimeout(() => {
      setExiting(true)
      setTimeout(onDone, 700)
    }, autoEnter))

    return () => timers.forEach(clearTimeout)
  }, [])

  function handleEnter() {
    setExiting(true)
    setTimeout(onDone, 700)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#0a0a0a',
      opacity: exiting ? 0 : 1,
      transition: 'opacity 0.7s ease',
      overflow: 'hidden',
    }}>

      {/* Simulated phone screen — centered, mobile-sized */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(360px, 92vw)',
        height: 'min(680px, 88vh)',
        background: '#0e0e0e',
        borderRadius: 40,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Status bar */}
        <div style={{
          padding: '14px 20px 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#e8e0d5', fontWeight: 600 }}>9:41</span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {/* signal bars */}
            {[3,5,7,9].map((h,i) => (
              <div key={i} style={{ width: 3, height: h, background: i < 3 ? '#e8e0d5' : 'rgba(255,255,255,0.2)', borderRadius: 1 }} />
            ))}
            <div style={{ width: 22, height: 11, border: '1px solid rgba(255,255,255,0.4)', borderRadius: 3, marginLeft: 4, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 2, top: 2, bottom: 2, width: '65%', background: '#e8e0d5', borderRadius: 1 }} />
              <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 3, height: 6, background: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Lock screen wallpaper area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 0 0',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Clock */}
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '4rem',
            color: '#e8e0d5',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: 4,
          }}>9:41</div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(232,224,213,0.5)',
            letterSpacing: '0.06em',
            marginBottom: 24,
          }}>Thursday, July 10</div>

          {/* Notifications stack */}
          <div style={{
            width: '100%',
            padding: '0 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            position: 'relative',
          }}>
            {active.map((n, idx) => (
              <div key={n.key} style={{
                background: 'rgba(30,30,30,0.92)',
                backdropFilter: 'blur(20px)',
                borderRadius: 16,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                border: '1px solid rgba(255,255,255,0.07)',
                animation: 'notifIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}>
                {/* App icon — WhatsApp green */}
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>💬</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      color: '#e8e0d5',
                    }}>WhatsApp</span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.65rem',
                      color: '#555',
                    }}>now</span>
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.72rem',
                    color: 'rgba(232,224,213,0.6)',
                    marginBottom: 2,
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', marginRight: 4 }}>
                      {n.type === 'group' ? <GroupIcon /> : <PersonIcon />}
                    </span>
                    {n.chat}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    color: 'rgba(232,224,213,0.85)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>{n.preview}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div style={{
          padding: '12px 0 16px',
          display: 'flex',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
        </div>
      </div>

      {/* Reveal overlay */}
      {showReveal && (
        <div
          onClick={handleEnter}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            animation: 'fadeIn 0.5s ease',
            padding: '40px 24px',
            textAlign: 'center',
            cursor: 'pointer',
          }}>
          {revealStep >= 1 && (
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              color: '#444',
              letterSpacing: '0.1em',
              animation: 'fadeInUp 0.5s ease both',
            }}>ok but—</div>
          )}
          {revealStep >= 2 && (
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#555',
              letterSpacing: '0.06em',
              animation: 'fadeInUp 0.5s ease both',
            }}>shut up. all of you.</div>
          )}
          {revealStep >= 3 && (
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 11vw, 7.5rem)',
              color: '#e8e0d5',
              lineHeight: 0.95,
              letterSpacing: '0.01em',
              animation: 'fadeInUp 0.6s ease both',
            }}>It's Your<br /><span style={{ color: '#b52a2a' }}>Birthday.</span></div>
          )}
          {revealStep >= 4 && (
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
              color: '#7a6e64',
              letterSpacing: '0.12em',
              marginTop: 8,
              animation: 'fadeInUp 0.5s ease both',
            }}>Leiss Uwase · July 10th · tap anywhere</div>
          )}
        </div>
      )}

      <style>{`
        @keyframes notifIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
