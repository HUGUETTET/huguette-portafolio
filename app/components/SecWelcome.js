"use client";
import { useEffect, useState } from "react";


export default function SecWelcome() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("es-MX", {
        timeZone: "America/Mexico_City", // zona horaria de CDMX
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
      });
      setTime(formatter.format(new Date()));
    };

    updateTime(); // actualizar de inicio
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

    return (
      <>
      <div style={{display: 'flex', width: '100%', flexDirection: 'column', lineHeight: '1.1', alignItems: 'center'}} id="MainContainer">
        {/* ROSA: FF69B4, AMARILLO: #FFDE22 */}
          <p style={{fontSize: '2vw', opacity: 0.5}}> Software developer | Mechatronics engineer </p>
          <p style={{fontSize: '12vw'}}>Huguette Torres</p>
        </div>

        <p style={{position: 'absolute', top: '-43vh', right: 0}}>
          {time} in Mexico
        </p>
    </>
    );
  }
  