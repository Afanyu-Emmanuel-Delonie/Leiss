import { useEffect, useRef, useState } from 'react'

const images = Array.from({ length: 19 }, (_, i) => `/assets/leiss-${i + 2}.jpeg`)
  .map(v => ({ v, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ v }) => v)

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function Memories() {
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.05 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const imgH = isMobile ? 260 : 420
  const imgW = isMobile ? 200 : 320

  return (
    <section ref={sectionRef} id="memories" style={{
      background: '#0a0a0a',
      paddingTop: isMobile ? 80 : 100,
      paddingBottom: isMobile ? 80 : 100,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? 48 : 64,
        padding: '0 24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.25em',
          color: '#8E1B1B',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>The Archive</div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
          color: '#e8e0d5',
          margin: '0 0 16px',
          lineHeight: 1.1,
        }}>Every Moment,<br />Kept Forever</h2>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
          color: '#7a6e64',
          margin: 0,
        }}>The ones that made us. The ones we'll never forget.</p>
      </div>

      {/* Scrolling row */}
      <div style={{
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease 0.3s',
      }}>
        <div style={{
          display: 'flex',
          gap: 16,
          width: 'max-content',
          animation: 'scrollLeft 50s linear infinite',
        }}>
          {[...images, ...images].map((src, i) => (
            <div key={i} style={{
              width: imgW,
              height: imgH,
              borderRadius: 18,
              overflow: 'hidden',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <img src={src} alt="" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
