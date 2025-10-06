// "use client";
// import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
// Inspo de deslizar en horizontal https://codepen.io/GreenSock/pen/YzygYvM

// const skills = [
//   {
//     category: "Languages and Frameworks",
//     items: [
//       "React.js",
//       "JavaScript",
//       "Python",
//       "C++",
//       "C#",
//       "VBA for Excel",
//       "HTML",
//       "R",
//     ],
//     bg: "bg-gray-200",
//   },
//   {
//     category: "Tools",
//     items: ["Azure DevOps", "Visual Studio", "Git"],
//     bg: "bg-purple-200",
//   },
//   {
//     category: "Agile Methodologies",
//     items: ["Scrum", "Scaled Agile (SAFe)"],
//     bg: "bg-cyan-200",
//   },
//   {
//     category: "Low-Code",
//     items: ["Microsoft Power Apps", "Excel Macros"],
//     bg: "bg-yellow-200",
//   },
// ];

// export default function HorizontalSkills() {
//   useEffect(() => {
//     let sections = gsap.utils.toArray(".panel");

//     gsap.to(sections, {
//       xPercent: -100 * (sections.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".container",
//         pin: true,
//         scrub: 1,
//         snap: 1 / (sections.length - 1),
//         end: "+=3500", // longitud del scroll
//       },
//     });
//   }, []);

//   return (
//     <div className="container w-[600%] h-screen flex flex-nowrap">
//       {skills.map((skill, i) => (
//         <section
//           key={i}
//           className={`panel ${skill.bg} flex items-center justify-center w-screen h-screen`}
//         >
//           <div className="text-center max-w-md">
//             <h2 className="text-4xl font-bold mb-4">{skill.category}</h2>
//             <ul className="space-y-2 text-lg">
//               {skill.items.map((item, j) => (
//                 <li key={j}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Inspo de las cards https://codepen.io/GreenSock/pen/LYRwgPo

export default function SeamlessGallery() {
  const galleryRef = useRef(null);
  const cardsRef = useRef(null);
  const prevRef = useRef(0);
  const nextRef = useRef(0);
  // const [beeProgress, setBeeProgress] = useState(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const cards = gsap.utils.toArray(cardsRef.current.querySelectorAll("li"));

    let iteration = 0;  // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.
    const spacing = 0.1;  // spacing of the cards (stagger)
    const snap = gsap.utils.snap(spacing);  // we'll use this to snap the playhead on the seamlessLoop
    const seamlessLoop = buildSeamlessLoop(cards, spacing);

    let allowWrap = true; // ✅ Nueva bandera de control
  
    const scrub = gsap.to(seamlessLoop, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: gallery,
      start: "top top",
      end: "+=" + window.innerHeight * 3,
      pin: true,
      onUpdate(self) { //elf.progress lo dividi /3 porque se repetían 3 veces antes de salir de la sección, los botones no funcionan así
        if (self.progress/3 === 1 && self.direction > 0 && !self.wrapping) {
          wrapForward(self);
        } else if (self.progress/3 < (1e-5) && self.direction < 0 && !self.wrapping) {
          wrapBackward(self);
        } else {
          scrub.vars.totalTime = snap((iteration + self.progress/3) * seamlessLoop.duration());
          scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
          self.wrapping = false;
          allowWrap = false; //✅ Limita el scroll looping a un número de iteraciones
        }
        // setBeeProgress(self.progress);
      },
      // end: "+=3000",
      // pin: ".gallery"
    });


    function wrapForward(trigger) { // when the ScrollTrigger reaches the end, loop back to the beginning seamlessly
      if (!allowWrap) return; // ✅ Detenemos el loop si no está permitido
      iteration++;
      trigger.wrapping = true;
      trigger.scroll(trigger.start + 1);
    }
    

    function wrapBackward(trigger) { // when the ScrollTrigger reaches the start again (in reverse), loop back to the end seamlessly
      if (!allowWrap) return; // ✅ Detenemos el loop si no está permitido
      iteration--;
      if (iteration < 0) { // to keep the playhead from stopping at the beginning, we jump ahead 10 iterations
        iteration = 9;
        seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
        scrub.pause(); // otherwise it may update the totalTime right before the trigger updates, making the starting value different than what we just set above. 
      }
      trigger.wrapping = true;
      trigger.scroll(trigger.end + 1);
    }


    function scrubTo(totalTime) { // moves the scroll position to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
      let progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
      if (progress > 1) {
        wrapForward(trigger);
      } else if (progress < 0) {
        wrapBackward(trigger);
      } else {
        trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
      }
    }

    // solo listeners con refs
    // nextRef.current.addEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));
    // prevRef.current.addEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));
    const handleNext = () => scrubTo(scrub.vars.totalTime + spacing);
    const handlePrev = () => scrubTo(scrub.vars.totalTime - spacing);

    if (nextRef.current && prevRef.current) {
      nextRef.current.addEventListener("click", handleNext);
      prevRef.current.addEventListener("click", handlePrev);
    }

    return () => {
      trigger.kill();
      scrub.kill();
      seamlessLoop.kill();

      // ✅ limpieza de los listeners
      if (nextRef.current) nextRef.current.removeEventListener("click", handleNext);
      if (prevRef.current) prevRef.current.removeEventListener("click", handlePrev);
    };


    // --- loop constructor
    function buildSeamlessLoop(items, spacing) {
      let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
        startTime = items.length * spacing + 0.5, // the time on the rawSequence at which we'll start the seamless loop
        loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime 
        rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live
        seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
          paused: true,
          repeat: -1, // to accommodate infinite scrolling/looping
          onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1
            this._time === this._dur && (this._tTime += this._dur - 0.01);
          }
        }),
        l = items.length + overlap * 2,
        time = 0;

      // set initial state of items
      gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });
	    
      // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
      for (let i = 0; i < l; i++) {
        let index = i % items.length;
        let item = items[index];
        time = i * spacing;
        rawSequence
          .fromTo(item, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false }, time)
          .fromTo(item, { xPercent: 400 }, { xPercent: -400, duration: 1, ease: "none", immediateRender: false }, time);
        i <= items.length && seamlessLoop.add("label" + i, time);
      }

      // here's where we set up the scrubbing of the playhead to make it appear seamless. 
      rawSequence.time(startTime);
      seamlessLoop.to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none"
      }).fromTo(rawSequence, {time: overlap * spacing + 1}, {
        time: startTime,
        duration: startTime - (overlap * spacing + 1),
        immediateRender: false,
        ease: "none"
      });
      return seamlessLoop;
    }
  }, []);

  // console.log(beeProgress)


  return (
    <div className="gallery" ref={galleryRef}>
      <ul className="cards" ref={cardsRef}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      {/* <div className="actions">
        <button className="prev" ref={prevRef}>Prev</button>
        <button className="next" ref={nextRef}>Next</button>
      </div> */}
    </div>
  );
}
