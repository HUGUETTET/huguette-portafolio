"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScalingEffect() {
  const containerRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
    // Animación de escalado (escala hacia abajo)
    gsap.to(childRef.current, {
      scale: 0.7, // Reduce el tamaño al 50%
      scrollTrigger: {
        trigger: containerRef.current,  // Elemento que activa el ScrollTrigger
        start: "top top",                // Inicia cuando el contenedor llega a la parte superior de la ventana
        end: "bottom top",               // Termina cuando la parte inferior del contenedor llega al top de la ventana
        scrub: true,                     // Sincroniza el efecto con el scroll
        // pin: true,                       // Fija la sección durante el scroll
        // markers: true,                   // Muestra los marcadores de inicio y fin (útil para debug)
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="gallery" ref={containerRef} id={'sec-3'}>
      <div className="scaling-child bg-neutral-900" ref={childRef}>
        <p>Contact me!</p>
            <a href="mailto:huguette-torres@outlook.com" className="underline" style={{fontSize: '7vw'}}>
            huguette-torres@outlook.com
            </a>
      </div>
    </div>
  );
}
