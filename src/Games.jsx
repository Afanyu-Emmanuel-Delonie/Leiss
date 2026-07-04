import { useState, useEffect, useRef } from 'react'

const questions = [
  {
    q: "What's Leiss's go-to comfort food when she's having a rough day?",
    options: ["Sushi", "Pasta", "Fries & a burger", "Anything sweet"],
    answer: 2,
    fact: "Nothing hits like fries when the day is rough.",
  },
  {
    q: "If Leiss could live anywhere in the world, she'd pick…",
    options: ["Tokyo", "Paris", "New York", "Dubai"],
    answer: 1,
    fact: "Paris energy — fashion, art, and that effortless cool.",
  },
  {
    q: "What's her love language?",
    options: ["Words of affirmation", "Quality time", "Acts of service", "Gift giving"],
    answer: 1,
    fact: "She values presence over presents.",
  },
  {
    q: "Pick the vibe that matches Leiss on a Saturday night:",
    options: ["Club with the girls", "Cozy movie night in", "Dinner at a nice restaurant", "Spontaneous road trip"],
    answer: 2,
    fact: "Elevated, intentional — she picks the table, not the crowd.",
  },
  {
    q: "What would Leiss most likely be doing at 2am?",
    options: ["Sleeping like a normal person", "Scrolling TikTok", "Overthinking everything", "Watching a series"],
    answer: 2,
    fact: "The brain doesn't clock out at midnight.",
  },
  {
    q: "Her fashion aesthetic in one word?",
    options: ["Streetwear", "Minimalist chic", "Maximalist glam", "Cottagecore"],
    answer: 1,
    fact: "Clean lines, quiet luxury — she doesn't need to be loud.",
  },
  {
    q: "What's Leiss's biggest flex?",
    options: ["Her taste in music", "Her loyalty", "Her sense of humor", "Her ambition"],
    answer: 3,
    fact: "She moves with purpose. The vision is always bigger than the room.",
  },
  {
    q: "If she were a season, she'd be…",
    options: ["Spring — fresh starts", "Summer — full energy", "Autumn — depth & warmth", "Winter — quiet intensity"],
    answer: 2,
    fact: "Warm, layered, beautiful — autumn fits perfectly.",
  },
]

const endMessage = "Now you know her a little better. ✨"


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function Games() {
  const isMobile = useIsMobile()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const q = questions[current]

  function pick(i) {
    if (selected !== null) return
    setSelected(i)
  }

  function next() {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setDone(false)
  }

  const optionColor = (i) => selected === i ? 'rgba(142,27,27,0.15)' : 'rgba(255,255,255,0.04)'
  const optionBorder = (i) => selected === i ? '1px solid rgba(142,27,27,0.5)' : '1px solid rgba(255,255,255,0.08)'

  return (
    <section ref={ref} style={{
      background: '#0a0a0a',
      padding: isMobile ? '80px 24px 80px' : '100px 40px 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost bg text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: isMobile ? 'clamp(4rem, 22vw, 8rem)' : 'clamp(6rem, 14vw, 12rem)',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        color: 'rgba(255,255,255,0.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.05em',
      }}>KNOW ME</div>

      <div style={{
        maxWidth: 720,
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 48 : 64 }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            color: '#8E1B1B',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}>Interactive</div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: '#e8e0d5',
            margin: 0,
            lineHeight: 1.1,
          }}>How Well Do You<br />Know Leiss?</h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
            color: '#7a6e64',
            marginTop: 16,
            marginBottom: 0,
          }}>8 questions. No cheating.</p>
        </div>

        {!done ? (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            padding: isMobile ? '32px 24px' : '48px 48px',
          }}>
            {/* Progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{
                flex: 1,
                height: 2,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${((current + 1) / questions.length) * 100}%`,
                  background: '#8E1B1B',
                  borderRadius: 2,
                  transition: 'width 0.4s ease',
                }} />
              </div>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                color: '#555',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
              }}>{current + 1} / {questions.length}</span>
            </div>

            {/* Question */}
            <p style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: '#e8e0d5',
              marginBottom: 28,
              lineHeight: 1.4,
            }}>{q.q}</p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => pick(i)} style={{
                  background: optionColor(i),
                  border: optionBorder(i),
                  borderRadius: 12,
                  padding: '14px 20px',
                  textAlign: 'left',
                  cursor: selected !== null ? 'default' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  color: selected === i ? '#e8e0d5' : '#e8e0d5',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    color: '#555',
                    flexShrink: 0,
                    fontFamily: 'Inter, sans-serif',
                  }}>{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              ))}
            </div>

            {/* Fact + Next */}
            {selected !== null && (
              <div style={{
                marginTop: 24,
                padding: '16px 20px',
                background: 'rgba(142,27,27,0.08)',
                border: '1px solid rgba(142,27,27,0.2)',
                borderRadius: 12,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.88rem',
                  color: '#b52a2a',
                  margin: 0,
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                }}>"{q.fact}"</p>
                <button onClick={next} style={{
                  background: '#8E1B1B',
                  border: 'none',
                  borderRadius: 100,
                  padding: '10px 24px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}>
                  {current + 1 >= questions.length ? 'See Results' : 'Next →'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results */
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 24,
            padding: isMobile ? '40px 24px' : '64px 48px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: '#e8e0d5',
              lineHeight: 1,
              marginBottom: 24,
            }}>✨</div>
            <p style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: '#e8e0d5',
              marginBottom: 12,
              lineHeight: 1.3,
            }}>{endMessage}</p>
            <div style={{
              width: 48,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #8E1B1B, transparent)',
              margin: '24px auto',
            }} />
            <button onClick={restart} style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100,
              padding: '12px 32px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#7a6e64',
              cursor: 'pointer',
            }}>Try Again</button>
          </div>
        )}
      </div>
    </section>
  )
}
