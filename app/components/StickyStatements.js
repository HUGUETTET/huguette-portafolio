"use client";
import React, { useEffect, useRef } from 'react';
import styles from '../components/styles/StickyStatements.module.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyStatements({ statements = [], sectionIds = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stickyEls = containerRef.current.querySelectorAll(`.${styles['sticky-statement']}`);

      stickyEls.forEach((el, i) => {
        const heading = el.querySelector('h1');
        gsap.fromTo(
          heading,
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
              // markers: true,
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill && t.kill());
    };
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      {statements.map((text, i) => (
        <div
          className={styles['sticky-statement']}
          key={i}
          id={sectionIds[i] || `section-${i}`}
        >
          <h1 className={styles.heading}>{text}</h1>
        </div>
      ))}
    </section>
  );
}
