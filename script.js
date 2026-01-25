import React from 'react';
import { Helmet } from 'react-helmet-async';
import './App.css';

const NuclearSite = () => {
  return (
    <div className="container">
      <Helmet>
        <title>Atom dla Klimatu | Wiedza i Technologia</title>
      </Helmet>

      <header className="hero">
        <nav>
          <ul>
            <li><a href="#about">O technologii</a></li>
            <li><a href="#safety">Bezpieczeństwo</a></li>
            <li><a href="#sources">Źródła</a></li>
          </ul>
        </nav>
        <h1>Energia Jądrowa: Fundament Stabilnej Sieci</h1>
        <p>Poznaj fakty oparte na danych naukowych.</p>
      </header>

      <main>
        <section id="about" className="content-section">
          <h2>Dlaczego Atom?</h2>
          <p>Według danych IAEA, energetyka jądrowa zapobiegła emisji ponad 60 gigaton gazów cieplarnianych w ciągu ostatnich 50 lat.</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Projekt Edukacyjny - Energetyka Jądrowa. Dane na podstawie raportów IPCC i IAEA.</p>
      </footer>
    </div>
  );
};

export default NuclearSite;
