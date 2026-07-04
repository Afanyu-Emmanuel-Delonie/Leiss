import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Hero from './Hero'
import Playlist from './Playlist'
import Timeline from './Timeline'
import Games from './Games'
import Mystery from './Mystery'
import Letter from './Letter'
import Memories from './Memories'
import Closing from './Closing'
import Loader from './Loader'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const progressRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    if (!loaded) return

    // Scroll progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }

    // Cursor glow follower
    const cursor = cursorRef.current
    if (!cursor) return
    const move = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [loaded])

  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    if (!loaded) return
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loaded])

  function backToTop() {
    gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' })
  }

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      {loaded && (
        <>
          {/* Cursor glow */}
          <div ref={cursorRef} id="cursor-glow" />

          {/* Scroll progress bar */}
          <div ref={progressRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #8E1B1B, #b52a2a)',
            transformOrigin: 'left',
            scaleX: 0,
            zIndex: 9998,
            pointerEvents: 'none',
          }} />

          <Hero />
          <Playlist />
          <Timeline />
          <Games />
          <Mystery />
          <Letter />
          <Memories />
          <Closing />

          {/* Back to top */}
          <button
            onClick={backToTop}
            aria-label="Back to top"
            style={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              zIndex: 9997,
              width: 44,
              height: 44,
              borderRadius: '100px',
              background: '#8E1B1B',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: showTop ? 1 : 0,
              transform: showTop ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease, background 0.2s ease',
              pointerEvents: showTop ? 'auto' : 'none',
              boxShadow: '0 4px 24px rgba(142,27,27,0.4)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b52a2a'}
            onMouseLeave={e => e.currentTarget.style.background = '#8E1B1B'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </>
      )}
    </>
  )
}
