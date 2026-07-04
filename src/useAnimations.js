import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animate all .fade-up, .fade-left, .fade-right elements inside a container
 * with stagger on scroll.
 */
export function useScrollAnimations(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return
    const ctx = gsap.context(() => {

      // Fade up — staggered
      gsap.utils.toArray('.fade-up', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Fade left
      gsap.utils.toArray('.fade-left', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Fade right
      gsap.utils.toArray('.fade-right', containerRef.current).forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Staggered children inside [data-stagger]
      gsap.utils.toArray('[data-stagger]', containerRef.current).forEach((parent) => {
        const children = parent.children
        gsap.fromTo(children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [containerRef])
}

/**
 * Parallax — moves element at a fraction of scroll speed
 */
export function useParallax(ref, speed = 0.15) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [ref, speed])
}

/**
 * Horizontal scroll progress line
 */
export function useScrollProgress(ref) {
  useEffect(() => {
    if (!ref?.current) return
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [ref])
}
