import React from 'react';
import { Helmet } from 'react-helmet-async';
import './App.css';

const NuclearEnergySPA = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Energetyka Jądrowa | Nowoczesna Nauka i Klimat</title>
        <meta name="description" content="Naukowe podejście do energii atomowej. Analiza technologii PWR, SMR oraz wpływ na dekarbonizację." />
        <meta property="og:title" content="Atom: Energia Przyszłości" />
        <meta property="og:type" content="article" />
      </Helmet>

      <header>
        <h1>Jądro Czystej Energii</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>
          Nauka. Bezpieczeństwo. Przyszłość.
        </p>
      </header>

      <main>
        <section className="grid-section">
          <article className="card">
            <h3>Technologia SMR</h3>
            <p>Małe reaktory modułowe (SMR) oferują pasywne systemy bezpieczeństwa i elastyczność w budowie.</p>
            <small>Źródło: World Nuclear Association (2024)</small>
          </article>

          <article className="card">
            <h3>Gęstość Energii</h3>
            <p>1 kg Uranu-235 może wytworzyć tyle energii, co spalenie 2 500 000 kg węgla kamiennego.</p>
            <small>Źródło: US Department of Energy</small>
          </article>

          <article className="card">
            <h3>Cykl Paliwowy</h3>
            <p>Nowoczesne technologie pozwalają na recykling wypalonego paliwa w reaktorach typu Fast Breeder.</p>
            <small>Źródło: IAEA Nuclear Energy Series</small>
          </article>
        </section>

        <section id="safety" style={{ padding: '40px 0' }}>
          <h2>Bezpieczeństwo III+ Generacji</h2>
          <p>Współczesne elektrownie projektowane są tak, aby wytrzymać uderzenie dużego samolotu pasażerskiego oraz ekstremalne zjawiska sejsmiczne.</p>
        </section>
      </main>

      <footer>
        <p>Projekt oparty na danych naukowych IAEA i IPCC. Stworzono w technologii React.</p>
      </footer>
    </div>
  );
};

export default NuclearEnergySPA;
