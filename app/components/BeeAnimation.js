"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import styles from "../components/styles/SecAboutMe.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function BeeAnimation() {
  const containerRef = useRef(null);
  const [beeProgress, setBeeProgress] = useState(null);
  const [popupText, setPopupText] = useState("Hola mundo");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const motionSVG = containerRef.current.querySelector("#motionSVG");
      const motionPath = containerRef.current.querySelector("#motionPath");
      const bee = containerRef.current.querySelector("#bee");

      gsap.set(motionSVG, { scale: 0.85, autoAlpha: 1 });
      gsap.set(bee, { transformOrigin: "50% 50%", scaleX: -1 });

      const getProp = gsap.getProperty(motionSVG);
      let flippedX = false;
      let flippedY = false;

      const label = containerRef.current.querySelector("#label foreignObject div");

      const labelTexts = [
        { progress: 0.1, text: "Hola mundo" },
        { progress: 0.3, text: "Diseño intuitivo" },
        { progress: 0.5, text: "Proceso creativo" },
        { progress: 0.7, text: "Iteraciones" },
        { progress: 0.9, text: "Final feliz" },
      ];

      gsap.to(motionSVG, {
        scrollTrigger: {
          trigger: motionPath,
          start: "top center",
          end: "bottom center",
          scrub: 0.7,
          onUpdate: (self) => {
            let rotation = getProp("rotation");
            let flipY = Math.abs(rotation) > 90;
            let flipX = self.direction === 1;
          
            // Voltea la abeja
            if (flipY !== flippedY || flipX !== flippedX) {
              gsap.to(bee, {
                scaleY: flipY ? -1 : 1,
                scaleX: flipX ? -1 : 1,
                duration: 0.25,
              });
          
              // Mueve la etiqueta al otro lado
              const labelOffsetX = flipX ? 40 : -240;
              gsap.to("#label foreignObject", {
                x: labelOffsetX,
                duration: 0.25,
              });
          
              flippedY = flipY;
              flippedX = flipX;
            }
          
            // Cambia el texto según el progreso
            const current = labelTexts.findLast(t => self.progress >= t.progress);
            setBeeProgress(self.progress);
            if (current && label.innerHTML !== current.text) {
              label.innerHTML = current.text;
            }

            // Cambia el texto según el progreso POPUP
            if (current && current.text !== popupText) {
              setPopupText(current.text);
            }
          },          
        },
        duration: 10,
        ease: "power1.inOut", // "none" o "power1.inOut", según quieras
        immediateRender: true,
        motionPath: {
          path: motionPath,
          align: motionPath,
          alignOrigin: [0.5, 0.5],
          autoRotate: 0,
        },
      });
    }, containerRef, beeProgress);

    const scrollTexts = containerRef.current.querySelectorAll(".scrollText");

    scrollTexts.forEach((el) => {
      const progressPoint = parseFloat(el.dataset.pos) / 100;

      gsap.to(el, {
        scrollTrigger: {
          trigger: motionPath,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const range = 0.05; // cuán cerca tiene que estar
            const isVisible = Math.abs(progress - progressPoint) < range;

            gsap.to(el, {
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 30,
              duration: 0.3,
              overwrite: "auto",
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // console.log('progress', beeProgress)

  return (
    <>
    <section ref={containerRef} className={styles.section}>
      <svg
        id="bee-scroll"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1588.4 2762.3"
        className={styles.motionSvg}
      >
        {/* Camino/trayectoria que sigue */}
        <path
          id="motionPath"
          d="M37.5,31C32.5,41.2,52.3,122.6,358,237.2c222.1,69.8,610.9-11.5,861.3,82.5
          c236.4,88.8,340.3,257.8,323.7,416.2c-19.9,209.7-162.4,595.6-340.4,613.1c-106.6-36.6-174.3,34.9-127.1,196.4
          c-24.6,284.5-286.8,140-346.4,140c-182.9-15.9-269.3,213.5-155.7,344.2c118,135.7,31.2,223.3,392,144.9
          c158.4-34.4,182.2,81,177.4,136.5c-26.9,51.3-27.4,334.3-150.7,382.5c-112.9,44.1-263.8-30.3-397.7-64.7
          c-141.7-36.4-257.9,86.3-257.9,86.3"
          stroke="#d1d1d1"
          strokeWidth="5"
          strokeDasharray="5"
          fill="none"
        />
        {/* Icono que sigue el caminito */}
        <g id="motionSVG"> 
          <g id="bee">
            <circle cx="0" cy="0" r="30" fill="#f4bb01" />
            <circle cx="0" cy="0" r="20" fill="#000" />
            {/* <image
              href="/FONDOLISO_ORIGINAL.jpg" 
              x="-100" 
              y="-100"
              width="200" 
              height="200"
              preserveAspectRatio="xMidYMid slice"
            /> */}
          </g>
          {/* <g id="label">
            <foreignObject x="40" y="-20" width="200" height="100" color='blue' opacity= '100%'>
              <div xmlns="http://www.w3.org/1999/xhtml" className="beeLabel">
                Hola mundo
              </div>
            </foreignObject>
            <foreignObject x="40" y="-20" width="200" height="100">
              <div>{beeProgress}</div>
            </foreignObject>
          </g> */}
        </g>
      </svg>
    </section>
    </>
  );
}
