"use client";
// components/StickyStatements.jsx
import React, { useEffect, useRef } from 'react';
import styles from '../components/styles/StickyStatements.module.css'

export default function StickyStatements({ statements = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx;
    let ScrollTrigger;
    let gsap;
    let mounted = true;

    const init = async () => {
      // solo en cliente
      if (typeof window === 'undefined') return;

      // Carga dinámica para evitar SSR issues
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/dist/ScrollTrigger');

      // obtener exports de forma segura
      gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      ScrollTrigger = stModule.ScrollTrigger || stModule.default || stModule;

      gsap.registerPlugin(ScrollTrigger);

      // gsap.context ayuda a limpiar
      ctx = gsap.context(() => {
        const stickyEls = containerRef.current.querySelectorAll(`.${styles['sticky-statement']}`);

        stickyEls.forEach((el) => {
          const heading = el.querySelector('h1');

          // animamos el h1 dentro de cada sección
          gsap.fromTo(heading,
            { autoAlpha: 1, yPercent: 0 },
            {
              autoAlpha: 0,
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
                // markers: true, // descomenta para debug
              }
            }
          );
        });
      }, containerRef);
    };

    init();

    return () => {
      mounted = false;
      // revertir contexto (quita animaciones y estilos inyectados por context)
      if (ctx) ctx.revert();
      // asegurar destruir triggers
      if (ScrollTrigger && ScrollTrigger.getAll) {
        ScrollTrigger.getAll().forEach(t => t.kill && t.kill());
      }
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      {statements.map((text, i) => (
        <div className={styles['sticky-statement']} key={i}>
          <h1 className={styles.heading}>{text}</h1>
        </div>
      ))}
    </section>
  );
}
