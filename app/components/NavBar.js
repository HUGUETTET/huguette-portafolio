"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from '../components/styles/NavBar.module.css';

export default function NavBar({ sectionIds = [], labels = [] }) {
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calcula qué sección está más cerca del top
      const offsets = sectionIds.map((id) => {
        const el = document.getElementById(id);
        if (!el) return Infinity;
        // diferencia entre top del elemento y scroll actual
        return Math.abs(el.getBoundingClientRect().top);
      });
      const min = Math.min(...offsets);
      const idx = offsets.indexOf(min);
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // inicial
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return (
    <nav className={styles.nav} ref={navRef}>
      {sectionIds.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.link} ${i === activeIndex ? styles.active : ''}`}
        >
          {labels[i] || `Section ${i + 1}`}
        </a>
      ))}
    </nav>
  );
}
