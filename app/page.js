import Head from 'next/head';
import StickyStatements from '../app/components/StickyStatements';
import NavBar from '../app/components/NavBar';
import AboutSections from '../app/components/SecAbout';
import SecWelcome from '../app/components/SecWelcome';
import SecContact from '../app/components/SecContact';
import Footer from '../app/components/Footer';

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const metadata = {
  metadataBase: FRONTEND_URL,
  title: {
    default: "Huguette Torres - Software Developer",
    template: '%s | Huguette Torres - Software Developer'
  },
  description: "Huguette Torres portafolio!",
  openGraph: {
    title: "Huguette Torres - Software Developer",
    description: "Huguette Torres portafolio!",
    type: "website",
    // locale: "en_US",
    url: FRONTEND_URL,
    siteName: "HuguetteTorres"
  },
};

export default function Home() {
  const statements = [
    <SecWelcome></SecWelcome>,
    <AboutSections></AboutSections>,
  ];
  const sectionIds = ['sec-1', 'sec-2', 'sec-3', ];
  const labels = ['Welcome', 'About me', 'Contact me!',];

  return (
    <>
      <Head>
        <title>Portafolio con Nav + Sticky</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar sectionIds={sectionIds} labels={labels} />
      <main>
        <StickyStatements statements={statements} sectionIds={sectionIds} />
        <SecContact></SecContact>
      </main>
      <Footer></Footer>
    </>
  );
}
