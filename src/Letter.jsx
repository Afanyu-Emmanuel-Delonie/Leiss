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
            Leiss — I don't know where to start, so I'll start with the truth: I didn't expect you. I didn't expect to find someone like you in a place like AUCA, in a season of my life that felt like it was falling apart. But there you were. Steady. Unbothered by the noise. And somehow, exactly what I needed.
          </p>
          <p style={{ margin: 0 }}>
            You never tried to fix me. You just stayed. And sometimes staying is the most powerful thing a person can do. You sat with me in the hard moments without making them about you. You told me the truth when I needed it — not the version I wanted to hear, but the version that actually helped. That's rare. That's you.
          </p>
          <p style={{ margin: 0 }}>
            I remember the day Munzero said it — "why don't you learn from your friend, she gets more marks than you." And honestly? I wasn't even mad. I was proud of you. You worked for that. You always work for everything quietly, without needing anyone to notice. But I noticed.
          </p>
          <p style={{ margin: 0 }}>
            And then there was Tona. I watched that chapter close on you and I saw what it did — how something that quiet can break a person in ways that don't show on the outside. You didn't fall apart in front of people. You just got a little more still. A little more guarded. I saw it. I didn't always know what to say, but I saw it. And I'm sorry that hurt you the way it did. You deserved better from that story.
          </p>
          <p style={{ margin: 0 }}>
            I know about the fear too. The way certain rooms full of certain girls made you shrink a little — like you were waiting for something to go wrong, waiting to be left out or talked about or misread. You carried that quietly. But Leiss, you are not someone who should ever shrink. Not for a room. Not for anyone.
          </p>
          <p style={{ margin: 0 }}>
            And yes — I'm going to say it — the controlling spirit. The way you hold things so tight because letting go feels like losing. The anger that comes out when things don't go the way you planned them in your head. I'm not saying it to call you out. I'm saying it because I know where it comes from. It comes from someone who cares deeply, who loves hard, who has been let down enough times that control started to feel like safety. I understand it. I just want you to know — you don't have to hold everything together all the time. You're allowed to let some things be loose.
          </p>
          <p style={{ margin: 0 }}>
            I remember calling you strict. I said you'd never find a husband because you didn't know how to loosen up — and you got so mad at me. You left. But you came back. You always came back. That's the thing about you. You're stubborn in the best way. You don't abandon people. Even when you probably should have.
          </p>
          <p style={{ margin: 0 }}>
            We've laughed at things we probably shouldn't have. We've cried over things we didn't know how to say out loud. Big Data. Computer Networks. The performances. The late nights where the world felt too heavy and we just made each other laugh instead — because what else do you do?
          </p>
          <p style={{ margin: 0, color: '#e8e0d5' }}>
            Today is yours. Not just the birthday — the whole year. Carry less of what was never yours to carry. Let the fear have less room. Let the anger pass through instead of staying. And know that you are loved — not despite all of it, but through all of it, including the parts you haven't shown everyone yet.
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
