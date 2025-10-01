// components/BeeAnimation.jsx
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import styles from "../components/styles/SecAboutMe.module.css";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function BeeAnimation() {
  const containerRef = useRef(null);

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
            if (flipY !== flippedY || flipX !== flippedX) {
              gsap.to(bee, {
                scaleY: flipY ? -1 : 1,
                scaleX: flipX ? -1 : 1,
                duration: 0.25,
              });
              flippedY = flipY;
              flippedX = flipX;
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
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
          </g>
        </g>
      </svg>
    </section>
  );
}
