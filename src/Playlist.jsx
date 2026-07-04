import { useState, useEffect } from 'react'

const songs = [
  { n: '01', title: 'The First Secret',     artist: '— — —', id: '5odlY52u43F5BjByhxg7wg' },
  { n: '02', title: 'Unnamed Feeling',       artist: '— — —', id: '2LBqCSwhJGcFQeTHMVGwy3' },
  { n: '03', title: 'What She Knows',        artist: '— — —', id: '6nzxy2wXs6tLgzEtqOkEi2' },
  { n: '04', title: 'Quiet Hours',           artist: '— — —', id: '2dHHgzDwk4BJdRwy9uXhTO' },
  { n: '05', title: 'Before You Wake',       artist: '— — —', id: '4Dvkj6JhhA12EX05fT7y2e' },
  { n: '06', title: 'The Soft Confession',   artist: '— — —', id: '0WtM2NBus2YxNiXK0X4bHW' },
  { n: '07', title: 'Letters Never Sent',    artist: '— — —', id: '4LRPiXqCikLlN15c3yImP7' },
  { n: '08', title: 'Something Like This',   artist: '— — —', id: '4iJyoBOLtHqaWYs3vyWFQE' },
  { n: '09', title: 'Only You Would Know',   artist: '— — —', id: '6PCUP3dWmTjcTtXY02oFdT' },
  { n: '10', title: 'The Last One Playing',  artist: '— — —', id: '2plbrEY59IikOBgBGLjaoe' },
]

const PER_PAGE = 5

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function SongItem({ s, open, onToggle }) {
  const [hovered, setHovered]        = useState(false)
  const [playHovered, setPlayHovered] = useState(false)
  const [spHovered, setSpHovered]    = useState(false)

  return (
    <li style={{ listStyle: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-4)',
          padding: 'var(--sp-4) var(--sp-3)',
          borderRadius: '12px',
          borderBottom: hovered ? '1px solid transparent' : '1px solid rgba(255,255,255,0.05)',
          background: hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
          transition: 'background 0.2s',
          cursor: 'default',
        }}
      >
        {/* Number */}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          color: '#b52a2a',
          minWidth: '26px',
          fontWeight: 500,
        }}>{s.n}</span>

        {/* Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            fontWeight: 500,
            color: 'var(--color-text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{s.title}</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: 'var(--color-text-soft)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{s.artist}</span>
        </div>

        {/* Play preview button */}
        <button
          onClick={onToggle}
          onMouseEnter={() => setPlayHovered(true)}
          onMouseLeave={() => setPlayHovered(false)}
          aria-label="Preview"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: `1px solid ${open ? 'var(--color-accent)' : playHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
            background: open ? 'var(--color-accent)' : playHovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
            color: 'var(--color-text)',
            cursor: 'pointer',
            transition: 'background 0.2s, border-color 0.2s',
            flexShrink: 0,
          }}
        >
          {open
            ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="4" height="16"/><rect x="15" y="4" width="4" height="16"/></svg>
            : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>

        {/* Spotify link */}
        <a
          href={`https://open.spotify.com/track/${s.id}`}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setSpHovered(true)}
          onMouseLeave={() => setSpHovered(false)}
          aria-label="Open in Spotify"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: `1px solid ${spHovered ? 'rgba(30,215,96,0.5)' : 'rgba(30,215,96,0.2)'}`,
            background: spHovered ? 'rgba(30,215,96,0.18)' : 'rgba(30,215,96,0.08)',
            color: '#1ed760',
            textDecoration: 'none',
            transition: 'background 0.2s, border-color 0.2s',
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
      </div>

      {/* Embed */}
      {open && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3) var(--sp-3)' }}>
          <iframe
            src={`https://open.spotify.com/embed/track/${s.id}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '10px', display: 'block' }}
          />
        </div>
      )}
    </li>
  )
}

export default function Playlist() {
  const [page, setPage]     = useState(0)
  const [openId, setOpenId] = useState(null)
  const isMobile            = useIsMobile()
  const totalPages          = Math.ceil(songs.length / PER_PAGE)
  const paginated           = songs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const toggle              = (id) => setOpenId(prev => prev === id ? null : id)

  return (
    <section id="playlist" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: isMobile ? 'flex-end' : 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundImage: "url('/assets/leiss-4.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: isMobile ? 'top center' : 'center 20%',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: isMobile ? 'scroll' : 'fixed',
    }}>

      {/* Overlay — heavier on mobile for readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isMobile
          ? 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.65) 30%, rgba(10,10,10,0.7) 70%, #0a0a0a 100%)'
          : 'linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0.45) 20%, rgba(10,10,10,0.45) 80%, #0a0a0a 100%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: isMobile ? 'var(--sp-16) var(--sp-6) var(--sp-10)' : 'calc(var(--sp-24) * 2) var(--sp-10) var(--sp-24)',
      }}>

        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-12)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 'var(--sp-3)' }}>— For You</p>
          <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.06em', color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: 'var(--sp-3)' }}>A Mystery Playlist</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>10 songs. You won't know until you press play.</p>
        </div>

        {/* Desktop: 2-col grid */}
        {!isMobile && (
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(5, auto)', gridAutoFlow: 'column', gap: '0 var(--sp-16)' }}>
            {songs.map(s => <SongItem key={s.n} s={s} open={openId === s.n} onToggle={() => toggle(s.n)} />)}
          </ul>
        )}

        {/* Mobile: paginated */}
        {isMobile && (
          <div>
            <ul style={{ listStyle: 'none' }}>
              {paginated.map(s => <SongItem key={s.n} s={s} open={openId === s.n} onToggle={() => toggle(s.n)} />)}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-6)', marginTop: 'var(--sp-8)' }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{ width: '40px', height: '40px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--color-text)', fontSize: '1rem', cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? 0.25 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >←</button>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-text-soft)' }}>{page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                style={{ width: '40px', height: '40px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'var(--color-text)', fontSize: '1rem', cursor: page === totalPages - 1 ? 'default' : 'pointer', opacity: page === totalPages - 1 ? 0.25 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >→</button>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
