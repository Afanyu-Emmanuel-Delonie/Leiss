import { useState, useEffect, useRef } from 'react'

export default function Letter() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/assets/leiss-11.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        filter: 'grayscale(1)',
        zIndex: 0,
      }} />

      {/* Dark overlay — heavy so text is readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.92) 100%)',
        zIndex: 1,
      }} />

      {/* Letter card */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 680,
          width: '100%',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 40px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Label */}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.68rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#8E1B1B',
          marginBottom: 32,
          textAlign: 'center',
        }}>A Letter For You</div>

        {/* Greeting */}
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#e8e0d5',
          lineHeight: 1.15,
          marginBottom: 40,
          textAlign: 'center',
        }}>To My Sister.<br />To My Bestie.</h2>

        {/* Divider */}
        <div style={{
          width: 48,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #8E1B1B, transparent)',
          margin: '0 auto 40px',
        }} />

        {/* Body */}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
          lineHeight: 2,
          color: 'rgba(232,224,213,0.82)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>
          <p style={{ margin: 0 }}>
            Leiss — I don't know where to start, so I'll start with the truth: I didn't expect you. I didn't expect to find someone like you in a place like AUCA, in a season of my life that felt like it was falling apart at the seams. But there you were. Steady. Real. Unbothered by the noise.
          </p>
          <p style={{ margin: 0 }}>
            You never tried to fix me. You just stayed. And sometimes, staying is the most powerful thing a person can do. You sat with me in the hard moments without making them about you. You told me the truth when I needed it — not the version I wanted to hear, but the version that actually helped. That's rare. That's you.
          </p>
          <p style={{ margin: 0 }}>
            I remember calling you strict. I remember saying you'd never find a husband because you didn't know how to loosen up — and you got so mad at me. You left. But you came back. You always came back. That's the thing about you, Leiss. You're stubborn in the best way. You don't abandon people. You don't abandon love.
          </p>
          <p style={{ margin: 0 }}>
            We've laughed at things we probably shouldn't have. We've cried over things we didn't know how to say out loud. We've sat in silence and somehow that felt like enough too. Big Data. Computer Networks. Munzero's comments. The performances. The late nights. The moments where the world felt too heavy and we just made each other laugh instead — because what else do you do?
          </p>
          <p style={{ margin: 0 }}>
            You are one of the most quietly powerful people I know. You carry so much and you make it look effortless. But I see it. I see how hard you work, how deeply you feel, how much you give to the people you love. I hope this year, some of that comes back to you. I hope the world gives you back what you've been pouring out.
          </p>
          <p style={{ margin: 0 }}>
            Today is yours. Not just the birthday — the whole year. The version of Leiss that's coming is going to be something. I already know it. And I'll be here, watching, cheering, probably annoying you with voice notes at 2am.
          </p>
          <p style={{ margin: 0, color: '#e8e0d5' }}>
            Happy Birthday, Chibondo. The first sister Rwanda gave me. The one I'd choose again in every version of this story.
          </p>
        </div>

        {/* Signature */}
        <div style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: '#e8e0d5',
            letterSpacing: '0.04em',
          }}>With love,</div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            color: '#e8e0d5',
            letterSpacing: '0.06em',
          }}>Afanyu & De-Lonie</div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            color: '#555',
            textTransform: 'uppercase',
            marginTop: 4,
          }}>Your people. Always.</div>
        </div>
      </div>
    </section>
  )
}
