// // components/ProfileSections.js
// "use client";
// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function ProfileSections() {
//   const sectionsRef = useRef([]);
//   const aboutRef = useRef(null);
//   const photoRef = useRef(null);

//   useEffect(() => {
//     // Animación para el About Me
//     if (aboutRef.current) {
//       gsap.fromTo(
//         aboutRef.current,
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: aboutRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }

//     // Animación para la foto
//     if (photoRef.current) {
//       gsap.fromTo(
//         photoRef.current,
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: photoRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     }

//     // Animaciones para secciones
//     sectionsRef.current.forEach((section, index) => {
//       if (!section) return;

//       gsap.fromTo(
//         section,
//         { y: 100, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: section,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           },
//         }
//       );
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <section style={{margin: '1rem', display: 'flex', justifyContent: 'space-between'}}>
//       {/* About Me  className="gallery" */}
//       <div ref={aboutRef} style={{width: '50%'}}>
//         <h1>About Me</h1>
//         <p style={{fontSize: '3vh'}}>
//           I’m a Mechatronics Engineer turned Software Developer with a strong foundation in automation,
//           process improvement, and full-stack development. With hands-on experience supporting enterprise
//           systems across the U.S. and Mexico, I’ve contributed to low-code applications, front-end
//           development, and workflow optimization using tools like Power Apps, Excel VBA, and React.js.
//           My engineering background allows me to approach software problems with a systems-thinking mindset,
//           while my software journey is driven by adaptability, continuous learning, and delivering real-world impact.
//         </p>
//       </div>

//       {/* Photo */}
//       {/* <div className="photo-wrapper" ref={photoRef}>
//         <Image
//           src="/FONDOLISO_ORIGINAL.jpg"
//           alt="Profile photo"
//           width={300}
//           height={300}
//           className="profile-photo"
//         />
//       </div> */}

//       {/* Sections */}
//       <div style={{width: '30%'}}>
//       <div className="info-section" ref={el => (sectionsRef.current[0] = el)}>
//         <h2>Work Experience</h2>
//         <ul>
//           <li>Developed internal tools (Power Apps, React) for engineering teams in U.S. and Mexico.</li>
//           <li>Automated processes using Excel VBA, reducing manual errors.</li>
//           <li>Built a React-based scheduling tool transitioning workflows from Excel to web.</li>
//           <li>Collaborated with cross-functional teams and participated in Scrum ceremonies using Azure DevOps.</li>
//           <li>Completed 20+ technical trainings in C#, SQL, React, APIs, and secure coding.</li>
//         </ul>
//       </div>

//       <div className="info-section" ref={el => (sectionsRef.current[1] = el)}>
//         <h2>Education</h2>
//         <ul>
//           <li>
//             <strong>B.E. Mechatronics Engineering</strong><br />
//             Tecnológico de Monterrey, Campus San Luis (2018–2022) — GPA: 96/100
//           </li>
//           <li>
//             <strong>Exchange Program:</strong> Industrial Electronics and Automation Engineering<br />
//             Universidad Politécnica de Valencia (Sep 2021 – Jan 2022)
//           </li>
//         </ul>
//       </div>

//       <div className="info-section" ref={el => (sectionsRef.current[2] = el)}>
//         <h2>Skills</h2>
//         <ul>
//           <li><strong>Languages & Frameworks:</strong> React.js, JavaScript, C#, VBA, Python, C++, HTML/CSS</li>
//           <li><strong>Databases:</strong> SQL Server</li>
//           <li><strong>Low-Code:</strong> Power Apps, Excel Macros</li>
//           <li><strong>Tools:</strong> Azure DevOps, Visual Studio, Git</li>
//           <li><strong>Agile:</strong> Scrum, SAFe</li>
//           <li><strong>Mechatronics:</strong> MATLAB, Simulink, PLCs (Ladder), SOLIDWORKS, LabView</li>
//         </ul>
//       </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMeSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll("[data-animate]");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
    //   className="m-container pt-24 pb-21 md:pt-60 md:pb-64"
    //   style={{margin: '3rem'}}
    >
      <div className="grid grid-cols-12 gap-y-18 gap-x-10">
        {/* Main About Text */}
        <div 
        className="col-span-full md:col-span-6"
        >
          <div 
        //   className="copy text-lg leading-relaxed space-y-6" 
          style={{fontSize: '4vh', marginLeft: '2rem'}} data-animate>
            <p>
              I’m a Mechatronics Engineer turned Software Developer passionate about building meaningful digital tools. My journey began in engineering, but I quickly found joy in automation, software, and process improvement. I enjoy creating solutions that drive real-world impact—whether that’s streamlining workflows or developing user-centered web apps.
            </p>
            <div style={{height: '2rem'}} ></div>
            <p>
              Having worked in cross-functional teams across the U.S. and Mexico, I thrive in collaborative environments and love bridging technical and human perspectives. I'm a fast learner, curious by nature, and driven by continuous improvement. Let’s build something that matters.
            </p>
          </div>
        </div>

        {/* Sidebar: Image */}
        <div className="col-span-full md:col-start-9 md:col-span-3 space-y-10">
          {/* <div className="w-full overflow-hidden rounded-xl shadow-lg" data-animate>
            <Image
              src="/FONDOLISO_ORIGINAL.jpg"
              alt="Profile"
              width={600}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div> */}

          {/* Experience */}
          <div className="experience sidebar-block" data-animate>
            <h2 className="uppercase font-bold mb-4">Experience</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="uppercase block">
                  Daikin Applied Americas <br />
                  2023 to 2024 – 2 years
                </span>
                <p>Software Developer</p>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div className="education sidebar-block" data-animate>
            <h2 className="uppercase font-bold mb-4">Formal Education</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="uppercase block">
                  B.E. Mechatronics Engineering <br />
                  2018 to 2022 – 4.5 years
                </span>
                <p>Tecnológico de Monterrey, SLP</p>
                <p className="ml-4"> Awarded Best Cumulative Average of the Engineering School, 96/100</p>
              </li>
              <li>
                <span className="uppercase block">
                  Exchange: Industrial Electronics & Automation <br />
                  2021 to 2022 – 6 months
                </span>
                <p>Universidad Politécnica de Valencia</p>
              </li>
            </ul>
          </div>
            <div className="info-section" data-animate>
                <h2 className="uppercase font-bold mb-4">Technical Skills</h2>
                <ul className="space-y-3 text-sm">
                    <li><strong>Languages & Frameworks:</strong> React.js, JavaScript, C#, VBA, Python, C++, HTML/CSS, SQL</li>
                    <li><strong>Low-Code:</strong> Power Apps, Excel Macros</li>
                    <li><strong>Tools:</strong> Azure DevOps, Visual Studio, Git</li>
                    <li><strong>Agile:</strong> Scrum, SAFe</li>
                    <li><strong>Mechatronics:</strong> MATLAB, Simulink, PLCs (Ladder), SOLIDWORKS, LabView</li>
                </ul>
            </div>
            <div>
              <a 
                href="/CV_Huguette.pdf" 
                download 
                className="text-sm uppercase block underline"
                >
                Download full resume
              </a>
            </div>
        </div>
      </div>
    </div>
  );
}
