import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    year: '2023',
    tag: 'Where It All Started',
    title: 'October — We Met',
    body: 'I was broken, couldn\'t feel the world around me. You listened. You never judged. That was enough — and somehow, it was everything.',
  },
  {
    year: '2024',
    tag: 'Growing Together',
    title: 'Memories, Pain & MIS',
    body: 'We grew fond of each other. Shared memories, shared pain, shared fights. Then Munzero said "why don\'t you learn from your friend, she gets more marks than you" — and honestly? It was hilarious. It was fun.',
  },
  {
    year: '2025',
    tag: 'Closer Than Ever',
    title: 'Big Data, Networks & Real Life',
    body: 'Big Data. Computer Networks. Watching people perform and laughing together. You held space when my girl left and came back. When the whole world felt like it was on your shoulders — you never left. We always found a way to laugh at our pain.',
  },
  {
    year: '2025',
    tag: 'Sister Era',
    title: 'You Became My Person',
    body: 'You became someone I could call a friend, a sister, a bestie. Remember when I said you\'d find it hard to get a husband because you were too strict? You got angry, left — but still came around. I\'d be like "girl, be a baddie" and you\'d just stay stiff. Unforgettable. Hilarious.',
  },
  {
    year: '2026',
    tag: 'Today',
    title: 'Happy Birthday, Chibondo 🎉',
    body: 'The first sister Rwanda gave me. The one girl who never judged me but always told me the truth in AUCA. Strange as it sounds — I love you so much. You will forever remain my best sister. No one will ever change that. Happy turn up, Chibondo. Hahaha.',
    highlight: true,
  },
]

function TimelineItem({ e, index, isMobile }) {
  const ref = useRef(null)
  const isLeft = !isMobile && index % 2 === 0

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        {
          opacity: 0,
          x: isMobile ? 0 : (isLeft ? -50 : 50),
          y: isMobile ? 40 : 0,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [isMobile, isLeft, index])

  return (
    <div ref={ref} style={{
      display: 'flex',
      justifyContent: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
      paddingLeft: isMobile ? '32px' : (isLeft ? '0' : '50%'),
      paddingRight: isMobile ? '0' : (isLeft ? '50%' : '0'),
      position: 'relative',
      marginBottom: 'var(--sp-12)',
    }}>
      <div style={{
        width: '100%',
        paddingLeft: isMobile ? 'var(--sp-6)' : (isLeft ? '0' : 'var(--sp-10)'),
        paddingRight: isMobile ? '0' : (isLeft ? 'var(--sp-10)' : '0'),
      }}>
        <div style={{
          background: e.highlight ? 'rgba(142,27,27,0.08)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${e.highlight ? 'rgba(142,27,27,0.3)' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '16px',
          padding: 'var(--sp-6) var(--sp-8)',
          backdropFilter: 'blur(12px)',
          boxShadow: e.highlight ? '0 0 40px rgba(142,27,27,0.12)' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
            <span style={{
              fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: '2.5rem',
              color: e.highlight ? 'var(--color-accent-light)' : 'rgba(255,255,255,0.06)',
              lineHeight: 1, letterSpacing: '0.04em',
            }}>{e.year}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.68rem', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: e.highlight ? 'var(--color-accent-light)' : 'var(--color-muted)',
              paddingTop: '4px',
            }}>{e.tag}</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-title)', fontWeight: 700,
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', color: '#fff',
            marginBottom: 'var(--sp-3)', letterSpacing: '0.04em',
          }}>{e.title}</h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.88rem',
            lineHeight: 1.8, color: 'rgba(255,255,255,0.5)',
          }}>{e.body}</p>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        left: isMobile ? '0' : '50%',
        top: 'var(--sp-6)',
        transform: 'translateX(-50%)',
        width: '12px', height: '12px', borderRadius: '50%',
        background: e.highlight ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
        border: `2px solid ${e.highlight ? 'var(--color-accent-light)' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: e.highlight ? '0 0 16px rgba(142,27,27,0.6)' : 'none',
        zIndex: 2,
      }} />
    </div>
  )
}

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const headerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade up
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
      )
      // Vertical line draw
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 2, ease: 'power2.inOut',
          scrollTrigger: { trigger: lineRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 1 } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" style={{
      background: 'var(--color-bg)',
      padding: 'calc(var(--sp-24) * 2) var(--sp-6)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-title)', fontWeight: 800,
        fontSize: 'clamp(4rem, 15vw, 14rem)', color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.03)',
        whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none', letterSpacing: '0.05em',
      }}>FRIENDS</div>

      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 'calc(var(--sp-24) + var(--sp-8))', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 'var(--sp-3)' }}>— 3+ Years</p>
        <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.06em', color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: 'var(--sp-4)' }}>Our Story</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', maxWidth: '420px', margin: '0 auto', lineHeight: 1.8 }}>From a broken October to the best sister Rwanda ever gave me.</p>
      </div>

      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', zIndex: 1 }}>
        <div ref={lineRef} style={{
          position: 'absolute',
          left: isMobile ? '0' : '50%',
          top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)',
          transform: 'translateX(-50%)',
        }} />
        {events.map((e, i) => <TimelineItem key={i} e={e} index={i} isMobile={isMobile} />)}
      </div>
    </section>
  )
}
