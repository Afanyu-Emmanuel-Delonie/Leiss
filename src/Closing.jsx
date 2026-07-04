import { useEffect, useRef, useState } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function Closing() {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '80px 24px' : '100px 40px',
    }}>

      {/* Ghost bg name */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        fontSize: isMobile ? 'clamp(4rem, 24vw, 9rem)' : 'clamp(6rem, 16vw, 14rem)',
        color: 'rgba(255,255,255,0.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.04em',
      }}>LEISS</div>

      {/* Top accent line */}
      <div style={{
        width: 1,
        height: isMobile ? 60 : 80,
        background: 'linear-gradient(to bottom, transparent, #8E1B1B)',
        marginBottom: 40,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }} />

      <div
        ref={ref}
        style={{
          textAlign: 'center',
          maxWidth: 640,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#8E1B1B',
          marginBottom: 24,
        }}>July 10th, 2026</div>

        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(2.4rem, 6vw, 5rem)',
          color: '#e8e0d5',
          lineHeight: 1.05,
          margin: '0 0 32px',
          letterSpacing: '0.02em',
        }}>
          Happy Birthday,<br />
          <span style={{ color: '#b52a2a' }}>Leiss Uwase.</span>
        </h2>

        <div style={{
          width: 48,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          margin: '0 auto 32px',
        }} />

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
          lineHeight: 1.9,
          color: 'rgba(232,224,213,0.6)',
          margin: '0 0 48px',
        }}>
          You made it to another year — not just survived it, but grew through it.<br />
          May this one be lighter, louder, and more yours than any before it.
        </p>

        {/* Signatures */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: '#e8e0d5',
            letterSpacing: '0.06em',
            marginBottom: 4,
          }}>Afanyu De-Lonie</div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            color: '#555',
            textTransform: 'uppercase',
          }}>With love</div>
        </div>

        {/* Bottom line */}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: '#333',
          textTransform: 'uppercase',
        }}>Made with love · {new Date().getFullYear()}</div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        width: 1,
        height: isMobile ? 60 : 80,
        background: 'linear-gradient(to top, transparent, #8E1B1B)',
        marginTop: 40,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease 0.4s',
      }} />

    </section>
  )
}
