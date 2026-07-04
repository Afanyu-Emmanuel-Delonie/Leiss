import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const highlights = [
  'Another Beautiful Year',
  'Endless Happiness',
  'Dreams Come True',
  'Celebrate Today',
]

const badges = [
  { icon: '🎂', label: 'Birthday Queen' },
  { icon: '🌸', label: 'Beautiful Soul' },
  { icon: '💖', label: 'Loved Always' },
  { icon: '✨', label: 'Shine Bright' },
  { icon: '🎉', label: 'Make Memories' },
  { icon: '👑', label: 'Pure Royalty' },
  { icon: '🌙', label: 'Moonlit Grace' },
  { icon: '🦋', label: 'Free Spirit' },
  { icon: '🍾', label: 'Cheers To You' },
  { icon: '🌹', label: 'Timeless Beauty' },
  { icon: '💫', label: 'Star Of The Day' },
  { icon: '🎵', label: 'Joy & Laughter' },
]

const sparkles = [
  { top: '18%', left: '38%', delay: '0s' },
  { top: '12%', left: '55%', delay: '0.8s' },
  { top: '30%', left: '62%', delay: '1.6s' },
  { top: '55%', left: '60%', delay: '0.4s' },
  { top: '65%', left: '36%', delay: '1.2s' },
  { top: '22%', left: '42%', delay: '2s' },
]

export default function Hero() {
  const ghostRef = useRef(null)
  const portraitRef = useRef(null)
  const navRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(navRef.current, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(ghostRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 }, '-=0.4')
      .fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8')
      .fromTo(portraitRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.8')
      .fromTo(leftRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')
      .fromTo(rightRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')

    // Parallax on ghost text
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      gsap.to(ghostRef.current, { x, duration: 1.5, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', overflow: 'hidden' }}>

      {/* NAV */}
      <nav ref={navRef} className="nav-glass gsap-hidden fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between">
        <span style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.2em', color: 'var(--color-text)' }}>
          LEISS
        </span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Home', 'Gallery', 'Memories', 'Wishes'].map(link => (
            <a key={link} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--color-text-soft)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-soft)'}
            >
              {link}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="status-dot" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.06em', color: 'var(--color-text-soft)' }}>
            Celebrating Today ✨
          </span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px' }}>

        {/* Ghost background text */}
        <div ref={ghostRef} className="gsap-hidden" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, whiteSpace: 'nowrap' }}>
          <div className="ghost-text">LEISS UWASE</div>
        </div>

        {/* Dot pattern radial */}
        <div className="dot-pattern" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', zIndex: 0, maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }} />

        {/* Radial glow behind portrait */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,27,27,0.08) 0%, transparent 70%)', zIndex: 0 }} />

        {/* Big heading */}
        <div ref={headingRef} className="gsap-hidden" style={{ position: 'absolute', top: '8%', left: 0, right: 0, textAlign: 'center', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-title)', fontecase:  fontWeight: 700, fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '0.1em', color: '#ffffff', lineHeight: 1.35, textTransform: 'none' }}>
            Happy Birthday
          </h1>
        </div>

        {/* Three-column layout */}
        <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '2rem', padding: '0 5vw', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

          {/* LEFT */}
          <div ref={leftRef} className="gsap-hidden" style={{ paddingTop: '12rem', paddingBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              — Birthday Edition
            </p>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700, letterSpacing: '0.08em', color: '#ffffff', marginBottom: '1.2rem', lineHeight: 1.3 }}>
              Hello Beautiful 👋
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: '280px', marginBottom: '2rem' }}>
              Today the world celebrates you — your light, your grace, and everything that makes you extraordinary.
            </p>
            <button className="cta-btn">
              Celebrate With Me →
            </button>
          </div>

          {/* CENTER — Portrait */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {sparkles.map((s, i) => (
              <span key={i} className="sparkle" style={{ top: s.top, left: s.left, animationDelay: s.delay }}>✦</span>
            ))}
            <div ref={portraitRef} className="gsap-hidden portrait-float portrait-glow" style={{ position: 'relative', zIndex: 3 }}>
              <img
                src="/assets/leiss-1.png"
                alt="Leiss Uwase"
                style={{ height: 'clamp(520px, 72vh, 800px)', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} className="gsap-hidden" style={{ paddingTop: '12rem', paddingBottom: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem' }}>
              Today's Highlights
            </p>
            <div>
              {highlights.map((item, i) => (
                <div key={item} className={`highlight-item${i === 3 ? ' active' : ''}`}>
                  <span style={{ marginRight: '10px', color: 'var(--color-accent)', opacity: i === 3 ? 1 : 0.3 }}>0{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BADGES — scrolling ticker */}
        <div style={{ position: 'relative', zIndex: 2, overflow: 'hidden', padding: '2rem 0 4rem' }}>
          {/* Left fade shade */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, var(--color-bg), transparent)', zIndex: 3, pointerEvents: 'none' }} />
          {/* Right fade shade */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, var(--color-bg), transparent)', zIndex: 3, pointerEvents: 'none' }} />
          <div className="badges-track">
            {[...badges, ...badges].map((b, i) => (
              <div key={i} className="badge">
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}
