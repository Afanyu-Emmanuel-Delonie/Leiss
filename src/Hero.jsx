import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

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
  { top: '10%', left:  '5%', delay: '0s'   },
  { top: '20%', right: '5%', delay: '0.8s' },
  { top: '50%', left:  '2%', delay: '1.6s' },
  { top: '60%', right: '3%', delay: '0.4s' },
]

const sp = {
  1:  'var(--sp-1)',
  2:  'var(--sp-2)',
  3:  'var(--sp-3)',
  4:  'var(--sp-4)',
  5:  'var(--sp-5)',
  6:  'var(--sp-6)',
  8:  'var(--sp-8)',
  10: 'var(--sp-10)',
  12: 'var(--sp-12)',
  16: 'var(--sp-16)',
  20: 'var(--sp-20)',
  24: 'var(--sp-24)',
}

function scrollTo(id) {
  const el = id === '#top' ? document.body : document.querySelector(id)
  if (!el) return
  gsap.to(window, { scrollTo: { y: el, offsetY: 0 }, duration: 1.2, ease: 'power3.inOut' })
}

export default function Hero() {
  const portraitRef = useRef(null)
  const navRef      = useRef(null)
  const leftRef     = useRef(null)
  const rightRef    = useRef(null)
  const headingRef  = useRef(null)
  const [verseOpen, setVerseOpen] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(navRef.current,      { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(headingRef.current,  { y: 40,  opacity: 0 }, { y: 0, opacity: 1, duration: 1   }, '-=0.4')
      .fromTo(portraitRef.current, { y: 60,  opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=0.8')
      .fromTo(leftRef.current,     { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')
      .fromTo(rightRef.current,    { x: 30,  opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.9')

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      gsap.to(headingRef.current, { x, duration: 1.5, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div id="top" style={{ background: 'var(--color-bg)', minHeight: '100vh', overflow: 'hidden' }}>

      {/* NAV */}
      <nav ref={navRef} className="nav-glass gsap-hidden" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `${sp[4]} ${sp[10]}`,
      }}>
        {/* Logo */}
        <span style={{
          fontFamily: 'var(--font-title)',
          fontWeight: 800,
          fontSize: '0.9rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-text)',
        }}>Lui Uwase</span>

        {/* Links — desktop */}
        <div className="hidden md:flex" style={{ gap: sp[10], alignItems: 'center' }}>
          {[['Home','#top'],['Playlist','#playlist'],['Memories','#memories'],['Letter','#letter'],['Timeline','#timeline']].map(([link,href]) => (
            <a key={link} href={href} onClick={e => { e.preventDefault(); scrollTo(href) }} style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-soft)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-text-soft)'}
            >{link}</a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: sp[3] }}>
          <div className="status-dot" />
          <button
            onClick={() => setVerseOpen(true)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#ffffff',
              background: '#8E1B1B',
              border: 'none',
              borderRadius: '100px',
              padding: `${sp[2]} ${sp[5]}`,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b52a2a'}
            onMouseLeave={e => e.currentTarget.style.background = '#8E1B1B'}
          >Jer 29:11</button>
        </div>
      </nav>

      {/* VERSE POPUP */}
      {verseOpen && (
        <div
          onClick={() => setVerseOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 24,
              padding: 'clamp(32px,5vw,56px) clamp(28px,5vw,52px)',
              maxWidth: 520,
              width: '100%',
              textAlign: 'center',
              position: 'relative',
              animation: 'popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <button
              onClick={() => setVerseOpen(false)}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#888', fontSize: '1.1rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>

            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-light)',
              marginBottom: 20,
            }}>Jeremiah 29 : 11</div>

            <p style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 700,
              fontSize: 'clamp(1.05rem,2.5vw,1.4rem)',
              color: 'var(--color-text)',
              lineHeight: 1.8,
              marginBottom: 28,
            }}>
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>

            <div style={{
              width: 40, height: 1,
              background: 'linear-gradient(90deg,transparent,#8E1B1B,transparent)',
              margin: '0 auto 24px',
            }} />

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.85rem,1.5vw,0.95rem)',
              color: 'var(--color-text-soft)',
              lineHeight: 1.85,
            }}>
              Happy Birthday, girl. His plans for you are bigger than anything you can imagine. This year — walk into every single one of them. ✨
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="hero-section" style={{ paddingTop: sp[20], minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* HEADING */}
        <div ref={headingRef} className="gsap-hidden hero-heading text-center w-full"
          style={{ padding: `${sp[12]} ${sp[6]} 0`, position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(2.2rem, 6.5vw, 6.5rem)', color: 'rgba(255,255,255,0.06)', letterSpacing: '0.05em', userSelect: 'none', zIndex: 0 }}>UWASE LEISS</div>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 8vw, 8rem)',
            letterSpacing: '0.08em',
            lineHeight: 1.15,
            color: '#ffffff',
            textTransform: 'uppercase',
          }}>
            Happy Birthday
          </h1>
        </div>

        {/* BODY GRID */}
        <div className="hero-body" style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'end',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          padding: `0 ${sp[10]}`,
          gap: sp[8],
          marginTop: '-100px',
          position: 'relative',
          zIndex: 2,
        }}>

          {/* LEFT */}
          <div ref={leftRef} className="gsap-hidden hero-left" style={{ paddingBottom: sp[16], paddingRight: sp[8] }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              marginBottom: sp[3],
            }}>— To Leiss Uwase</p>
            <h2 style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
              letterSpacing: '0.06em',
              lineHeight: 1.3,
              color: '#ffffff',
              marginBottom: sp[4],
            }}>Hello Beautiful 👋</h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: '260px',
              marginBottom: sp[8],
            }}>
              Today the world celebrates you — your light, your grace, and everything that makes you extraordinary.
            </p>
            <a href="#playlist" onClick={e => { e.preventDefault(); scrollTo('#playlist') }} className="cta-btn" style={{ textDecoration: 'none', cursor: 'pointer' }}>Birthday Playlist →</a>
          </div>

          {/* CENTER — Portrait */}
          <div className="hero-portrait-col" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            {sparkles.map((s, i) => (
              <span key={i} className="sparkle" style={{ top: s.top, left: s.left, right: s.right, animationDelay: s.delay }}>✦</span>
            ))}
            <div ref={portraitRef} className="gsap-hidden portrait-float portrait-glow" style={{ position: 'relative' }}>
              <img src="/assets/hero-1.png" alt="Leiss Uwase" className="portrait-img" />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '35%',
                background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* RIGHT */}
          <div ref={rightRef} className="gsap-hidden hero-right" style={{ paddingBottom: sp[16], paddingLeft: sp[8] }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: sp[6],
            }}>Today's Menu</p>
            {highlights.map((item, i) => (
              <div key={item} className={`highlight-item${i === 3 ? ' active' : ''}`}>
                <span style={{ marginRight: sp[3], color: 'var(--color-accent)', opacity: i === 3 ? 1 : 0.3 }}>0{i + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* BADGES TICKER */}
        <div className="relative overflow-hidden" style={{ padding: `${sp[8]} 0`, zIndex: 10 }}>
          <div className="absolute left-0 top-0 bottom-0 pointer-events-none" style={{ width: sp[20], background: 'linear-gradient(to right, var(--color-bg), transparent)', zIndex: 3 }} />
          <div className="absolute right-0 top-0 bottom-0 pointer-events-none" style={{ width: sp[20], background: 'linear-gradient(to left, var(--color-bg), transparent)', zIndex: 3 }} />
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
