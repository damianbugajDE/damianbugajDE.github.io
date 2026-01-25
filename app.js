import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <div className="container">
        <Helmet>
          <title>Energetyka Jądrowa | Nowoczesna Nauka i Klimat</title>
          <meta name="description" content="Naukowe podejście do energii atomowej. Analiza technologii PWR, SMR oraz wpływ na dekarbonizację." />
          {/* Tag Open Graph dla Social Media */}
          <meta property="og:title" content="Atom: Energia Przyszłości" />
          <meta property="og:description" content="Poznaj fakty oparte na danych naukowych IAEA i IPCC." />
          <meta property="og:type" content="website" />
        </Helmet>

        <header>
          <div className="hero-content">
            <h1>Jądro Czystej Energii</h1>
            <p className="subtitle">Nauka. Bezpieczeństwo. Przyszłość.</p>
          </div>
        </header>

        <main>
          <section className="grid-section">
            <article className="card">
              <h3>Technologia SMR</h3>
              <p>Małe reaktory modułowe (SMR) oferują pasywne systemy bezpieczeństwa i elastyczność w budowie, redukując koszty inwestycyjne.</p>
              <footer className="source">Źródło: World Nuclear Association (2024)</footer>
            </article>

            <article className="card">
              <h3>Gęstość Energii</h3>
              <p>Paliwo jądrowe posiada najwyższą gęstość energii ze wszystkich znanych źródeł. 1 kg Uranu-235 zastępuje ok. 2 500 ton węgla.</p>
              <footer className="source">Źródło: US Department of Energy</footer>
            </article>

            <article className="card">
              <h3>Dekarbonizacja</h3>
              <p>Według IPCC, osiągnięcie celów klimatycznych bez udziału energii jądrowej będzie znacznie trudniejsze i droższe.</p>
              <footer className="source">Źródło: Raport IPCC SR15</footer>
            </article>
          </section>

          <section id="details" className="text-content">
            <h2>Bezpieczeństwo i Środowisko</h2>
            <p>
              Nowoczesne elektrownie (Generacja III+) są wyposażone w systemy, które działają bez ingerencji człowieka 
              ani zasilania zewnętrznego w sytuacjach awaryjnych.
            </p>
          </section>
        </main>

        <footer className="main-footer">
          <p>&copy; 2026 Edukacja Jądrowa. Dane oparte na materiałach naukowych IAEA.</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;
