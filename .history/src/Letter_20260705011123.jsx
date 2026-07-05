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
    <section id="letter" style={{
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
<div
  style={{
    fontFamily: 'Inter, sans-serif',
    fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
    lineHeight: 2,
    color: 'rgba(232,224,213,0.82)',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  }}
>
  <p style={{ margin: 0 }}>
    Leiss — I don't know where to start, so I'll start with the truth: I didn't expect you. I didn't expect to find someone like you in a place like AUCA, in a season of my life that felt like it was falling apart. But there you were. Steady. Unbothered by the noise. And somehow, exactly what I needed.
  </p>

  <p style={{ margin: 0 }}>
    You never tried to fix me in a harsh way, but in your own way you still did. You never judged me. You always found a way to correct me when I was wrong — but in a good way, a way that didn’t make me feel small. And somehow that made it easier to listen. That’s rare. That’s you.
  </p>

  <p style={{ margin: 0 }}>
    Now I still remember how, in those early days when I joined AUCA in 2023, it was a tough transition. But somehow you stood your ground between me and your friends and still let me in. And I still think about that. I saw the effort. I saw the risk. And I’m grateful. And honestly, you’ve got amazing friends — especially Ruth, haha.
  </p>

  <p style={{ margin: 0 }}>
    I remember the night we finished Computer Networks. It felt like that might be the last night I’d ever walk next to you through the streets of Kigali. The city was quiet, Christmas lights everywhere, the air just different… and I didn’t even know it then, but that moment stuck deep.
  </p>

  <p style={{ margin: 0 }}>
    And yeah… you might never know, but you had to see my face the first time I had to meet your mom. I was so scared, I swear. But at the same time it was funny, interesting… one of those moments you don’t forget.
  </p>

  <p style={{ margin: 0 }}>
    I still remember how you used to advise me on how to deal with Rwandans, especially the ladies. The way you’d break things down like you were some expert consultant, haha. And the stories — like when you’d go “who is that b**** looking at you” when I said I had a crush… or when you wanted to approve everything like it was your official job. It made everything feel lighter. It gave me that sisterly feeling I never really had before. It felt good. Real good.
  </p>

  <p style={{ margin: 0 }}>
    And I can’t forget the day we almost fought at Simba — not forgetting how you reacted when I was shocked you wanted a dress for 78k… poor me hahaha. Honestly, I’ve never really seen you angry like that before. That day made me sit back like… “oh so she really means it,” haha.
  </p>

  <p style={{ margin: 0 }}>
    If I keep going I’ll end up writing a whole book. But maybe that’s the point — just three years and you’ve already written something deep into my life that I’ll never erase. A whole dictionary in my DNA.
  </p>

  <p style={{ margin: 0 }}>
    I’m forever grateful for knowing you. And I pray God grants your heart’s desires in this new age — more happiness, more peace, and yes… more money. Very important.
  </p>

  <p style={{ margin: 0, color: '#e8e0d5' }}>
    Today is yours. Not just the birthday — the whole year. And I hope when you read this, you laugh a little… maybe tear up a little too… and just know you’re deeply appreciated.
  </p>

  <p style={{ margin: 0, color: '#e8e0d5' }}>
    Happy Birthday, Chibondo. The first sister Rwanda gave me. The one I’d choose again in every version of this story.
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
          }}>Afanyu De-Lonie</div>
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
