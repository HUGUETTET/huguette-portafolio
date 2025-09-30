import Head from 'next/head';
import StickyStatements from '../app/components/StickyStatements';
import NavBar from '../app/components/NavBar';

export default function Home() {
  const statements = [
    'Título uno — introducción.',
    'Título dos — tema intermedio.',
    'Título tres — detalle importante.',
    'Título cuatro — cierre o llamado.',
    <div style={{background: 'blue', padding: '30px'}}><div style={{background: 'red', padding: '30px'}}>hola</div></div>
  ];
  // const statements = [
  //   'Esto es mi primer título pegajoso — presenta una idea clara.',
  //   'Aquí otro título que se queda fijo mientras lees.',
  //   'Un tercer statement para el demo — pequeño, conciso y visual.',
  //   'Último título: call-to-action o resumen.', 
  //   <div style={{background: 'blue', padding: '30px'}}><div style={{background: 'red', padding: '30px'}}>hola</div></div>
  // ];
  const sectionIds = ['sec-1', 'sec-2', 'sec-3', 'sec-4'];
  const labels = ['Intro', 'Tema 1', 'Tema 2', 'Cierre'];

  return (
    <>
      <Head>
        <title>Portafolio con Nav + Sticky</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar sectionIds={sectionIds} labels={labels} />
      <main>
        <StickyStatements statements={statements} sectionIds={sectionIds} />
      </main>
    </>
  );
}
