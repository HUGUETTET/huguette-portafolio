import Head from 'next/head';
import StickyStatements from '../app/components/StickyStatements';

export default function Home() {
  const statements = [
    'Esto es mi primer título pegajoso — presenta una idea clara.',
    'Aquí otro título que se queda fijo mientras lees.',
    'Un tercer statement para el demo — pequeño, conciso y visual.',
    'Último título: call-to-action o resumen.'
  ];

  return (
    <>
      <Head>
        <title>Sticky Titles - Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        {/* Puedes añadir encabezado, nav, etc. arriba */}
        <StickyStatements statements={statements} />
        {/* Resto del contenido de la página */}
      </main>
    </>
  );
}
