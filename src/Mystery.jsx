import { useState, useEffect, useRef } from 'react'

const activities = [
  {
    icon: '👑',
    title: 'A Full Day With Mom & Princess',
    body: 'Block the whole day. No phone, no plans, no excuses. Cook something together, sit at the table too long, let the conversation go wherever it wants. The women who shaped you deserve your full presence — not a visit, a day.',
  },
  {
    icon: '📞',
    title: 'Two Hours With De-Lonie',
    body: 'Call him. Not a voice note, not a text — a real call. Two hours minimum. Talk about where you\'re both headed, what scares you, what excites you or even start a fight haha. The friendships that survive distance are the ones worth protecting.',
  },
  {
    icon: '🍦',
    title: 'Ice Cream Date With Westly',
    body: 'Find somewhere new in the city neither of you has tried. Order something you wouldn\'t normally pick. Walk after. Talk about the future — yours, his, the one you\'re both building. Simple evenings become the ones you remember most.',
  },
  {
    icon: '🎬',
    title: 'Movie Night With the Girls',
    body: 'Pick a night, send the address, make it happen. Snacks, blankets, a film nobody\'s seen. The movie is just the excuse — what matters is being in the same room, laughing at the same things, feeling like yourselves again.',
  },
  {
    icon: '🥂',
    title: 'A Night Out for Shots',
    body: 'Get dressed like you mean it. Go somewhere with good music and better energy. Toast to the year ahead — the goals, the growth, the version of yourself you\'re still becoming. You\'ve earned a night that feels like a celebration.',
  },
  {
    icon: '✍️',
    title: 'Write Yourself a Letter',
    body: 'Sit somewhere quiet. Open a notebook, a notes app, anything. Write to the Leiss who\'ll read this in a year — what you\'re proud of right now, what you\'re still figuring out, what you\'re finally letting go of. Be honest. Be kind. Seal it. She\'ll need it.',
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function Card({ item, index }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onClick={() => setFlipped(f => !f)}
      style={{
        height: 220,
        cursor: 'pointer',
        perspective: '1000px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* Front — mystery */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 24,
        }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            filter: 'blur(6px)',
            userSelect: 'none',
          }}>{item.icon}</div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#555',
          }}>Mystery Activity</div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.12)',
            letterSpacing: '0.3em',
          }}>? ? ?</div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: '#8E1B1B',
            letterSpacing: '0.12em',
            marginTop: 4,
          }}>Tap to reveal</div>
        </div>

        {/* Back — revealed */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'rgba(142,27,27,0.07)',
          border: '1px solid rgba(142,27,27,0.25)',
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 24px',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
              color: '#e8e0d5',
              lineHeight: 1.2,
            }}>{item.title}</span>
          </div>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.82rem',
            lineHeight: 1.75,
            color: 'rgba(232,224,213,0.65)',
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
          }}>{item.body}</p>
        </div>
      </div>
    </div>
  )
}

export default function Mystery() {
  const isMobile = useIsMobile()
  const headerRef = useRef(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderVisible(true) }, { threshold: 0.2 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{
      background: '#0a0a0a',
      padding: isMobile ? '80px 24px 80px' : '100px 60px 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: isMobile ? 'clamp(3.5rem, 20vw, 7rem)' : 'clamp(5rem, 13vw, 11rem)',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.05em',
      }}>UNLOCKED</div>

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: 'center',
          marginBottom: isMobile ? 48 : 64,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            color: '#8E1B1B',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>Your Birthday Missions</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: '#e8e0d5',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}>Mystery Activities</h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
            color: '#7a6e64',
            margin: 0,
            lineHeight: 1.7,
          }}>Six things waiting for you this year.<br />Flip each card to unlock your mission.</p>
        </div>

        {/* 3x2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {activities.map((item, i) => <Card key={i} item={item} index={i} />)}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: 48,
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.78rem',
          color: '#555',
          letterSpacing: '0.08em',
          fontStyle: 'italic',
        }}>These aren't suggestions. They're assignments. ✨</div>
      </div>
    </section>
  )
}
