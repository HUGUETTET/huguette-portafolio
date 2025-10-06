"use client";

import { useEffect, useState } from "react";

//No funciona!!!!
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const metadata = {
  metadataBase: FRONTEND_URL+'/inspiration',
  title: {
    default: "Inspiration",
  },
};

// Componente para cada tarjeta con metadata
function LinkCard({ url, notes}) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    async function fetchMeta() {
      try {
        const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        setMeta(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMeta();
  }, [url]);

  if (!meta) {
    return (
      <div className="p-6 border rounded-xl bg-gray-50 animate-pulse">
        Loading preview...
      </div>
    );
  }

  return (
    <a
      href={meta.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition bg-white"
    >
      {meta.image && (
        <img
          src={meta.image}
          alt={meta.title || "Preview"}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="font-semibold text-lg truncate">{meta.title || url}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {meta.description || "No description available"}
        </p>
        <p className="text-green-600 text-sm mt-1 line-clamp-2">{notes}</p>
        <p className="text-blue-600 text-sm mt-1 line-clamp-2">{meta.url}</p>
      </div>
    </a>
  );
}

// Página principal con secciones
export default function InspirationPage() {
    // const [notes, setnotes] = useState(null);
    var notes= '';
  const sections = {
    MyProjects: [
        'https://travel-guides-frontend.vercel.app/'
    ],
    PortfoliosInspo: [
        'https://brittanychiang.com/',
        'https://www.daofor.design/', 
        'https://www.abhijitrout.in/',
        'https://minimal.gallery/',
        'https://federicorosa.design/',
        'https://www.nivedhanirmal.com/',
        'https://www.elizadoltuofficial.net/',
        'https://www.mingg.space/'
    ],
    TravelBlogsInspo: [
        'https://www.tourdumondiste.com/',
        'https://www.nomadicmatt.com/travel-blogs/my-current-list-of-favorite-blogs/',
        'https://alanxelmundo.com/',
    ],
    Documentation: [
        'https://tailwindcss.com/docs/padding'
    ],
    MaterialUI: [
        'https://mui.com/material-ui/all-components/', 
        'https://reactbits.dev/get-started/introduction',
        // 'https://gsap.com/ui/',,
        'https://uiverse.io/elements',
        'https://motion.dev/examples',
        'https://www.svgrepo.com/',
        'https://cssgradient.io/'
    ],
    CodeOpen: [
        {url:'https://codepen.io/GreenSock/pen/xxjErmp', notes:'Scroll dinamico con GSAP, te enseña de alturas e integración de animaciones'},
        {url:'https://codepen.io/jamiem89/pen/gOevYyP', notes:'Scroll cambio de colores (fading) por secciones GSAP'},
        {url:'https://codepen.io/GreenSock/pen/mdgmawg', notes:'Animacion de la abeja'},
        {url:'https://codepen.io/GreenSock/pen/wvQYoMy', notes:'Scroll dinamico GSAP de imagines horizontal automatico'},
        {url:'https://codepen.io/GreenSock/pen/gOeMJOV', notes:'Scroll dinamico GSAP con cambio de imagen en la derecha'}

    ],
    Typography: [
        'https://rsms.me/inter/',
        'https://uncut.wtf/',
        'https://www.fontshare.com/',
        "https://fonts.google.com",
        'https://typescale.com/'
    ],
    GraphicDesign: [
        'https://visualjournal.it/', 
        'https://bookcoverarchive.com/',
        'https://www.archivepdf.net/',
        'https://flyer-jp.com/'
    ]
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">💡 Inspiration Board</h1>

      {Object.entries(sections).map(([section, links]) => (
        <div key={section}>
          <h2 className="text-xl font-semibold mb-4">{section}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {links.map((linkObj, idx) => {
                // Si es string, lo convertimos a objeto { url }
                const link = typeof linkObj === 'string' ? { url: linkObj } : linkObj;
                return (
                <LinkCard key={link.url + idx} url={link.url} notes={link.notes} />
                );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

