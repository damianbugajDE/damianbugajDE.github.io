import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Swiper dla sekcji "Nowości"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './App.css';

const CarbonCalculator = () => {
  const [energyAmount, setEnergyAmount] = useState(100);
  const CO2_COAL = 820;
  const CO2_NUCLEAR = 12;
  const savedCO2 = (energyAmount * (CO2_COAL - CO2_NUCLEAR) / 1000).toFixed(2);

  return (
    <section className="card full-width calculator-box">
      <h3>Interaktywny Kalkulator Ekologiczny</h3>
      <div className="input-group">
        <label>Ilość wyprodukowanej energii (MWh): </label>
        <input
          type="number"
          value={energyAmount}
          onChange={(e) => setEnergyAmount(e.target.value)}
          className="calc-input"
        />
      </div>
      <div className="result">
        <p>Dzięki atomowi uniknięto emisji: <strong>{savedCO2} t CO₂</strong></p>
        <small>W porównaniu do spalania węgla kamiennego (Dane: IPCC).</small>
      </div>
    </section>
  );
};

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Przywrócona konfiguracja z reakcją na myszkę
  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" }, // Reakcja na ruch myszy
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.5 } },
      },
    },
    particles: {
      color: { value: "#00f2ff" },
      links: { color: "#00f2ff", distance: 150, enable: true, opacity: 0.2 },
      move: { enable: true, speed: 1.5 },
      number: { value: 60, density: { enable: true, area: 800 } },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.4 }
    },
    detectRetina: true,
  };

  return (
    <HelmetProvider>
      <div className="app-wrapper">
        <Helmet>
          <title>Energetyka Jądrowa | Nowoczesne Kompendium</title>
        </Helmet>

        {init && <Particles id="tsparticles" options={particlesOptions} />}

        <header className="hero">
          <div className="atom-container">
            <div className="atom-core"></div>
            <div className="atom-orbit orbit-1"></div>
            <div className="atom-orbit orbit-2"></div>
            <div className="atom-orbit orbit-3"></div>
          </div>
          <div className="hero-content">
            <h1>Jądro Czystej Energii</h1>
            <p className="subtitle">Nauka • Bezpieczeństwo • Przyszłość</p>
          </div>
        </header>

        <main className="container">
          {/* NOWA SEKCJA: Slider z nowościami */}
          <section className="news-slider">
            <h2 className="section-title">Nowości ze świata atomu</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{
                768: { slidesPerView: 2 }
              }}
            >
              <SwiperSlide>
                <div className="card news-card">
                  <h4>Postępy w technologii SMR</h4>
                  <p>Pierwsze komercyjne jednostki małych reaktorów modułowych wchodzą w fazę certyfikacji końcowej.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card news-card">
                  <h4>Fuzja Jądrowa</h4>
                  <p>Naukowcy osiągnęli rekordowy czas podtrzymania plazmy, przybliżając nas do energii gwiazd na Ziemi.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card news-card">
                  <h4>Recykling paliwa</h4>
                  <p>Nowe metody przetwarzania wypalonego paliwa pozwalają odzyskać do 90% energii z Uranu.</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>

          {/* POWRÓT: Główne sekcje merytoryczne */}
          <section className="grid-section">
            <article className="card">
              <h3>Gęstość Energii</h3>
              <p>Jedna pastylka uranu (ok. 7g) generuje tyle energii co 1 tona węgla.</p>
              <footer className="source">Źródło: US Department of Energy</footer>
            </article>
            <article className="card">
              <h3>Emisyjność</h3>
              <p>Energia jądrowa ma najniższy ślad węglowy w całym cyklu życia (12g CO2/kWh).</p>
              <footer className="source">Źródło: IPCC</footer>
            </article>
          </section>

          {/* POWRÓT: Kalkulator jako stały element */}
          <CarbonCalculator />

          <section className="card full-width text-content">
            <h2>Bezpieczeństwo III+ Generacji</h2>
            <p>Współczesne konstrukcje wykorzystują systemy pasywne, które nie wymagają interwencji człowieka ani prądu do schłodzenia rdzenia.</p>
          </section>

          <section className="sources-section">
            <h2>Źródła Naukowe</h2>
            <ul className="source-list">
              <li className="source-item"><strong>IPCC:</strong> Raport 2018 <a href="https://www.ipcc.ch/sr15/">Link</a></li>
              <li className="source-item"><strong>IAEA:</strong> Portal Wiedzy <a href="https://www.iaea.org/">Link</a></li>
            </ul>
          </section>
        </main>

        <footer className="main-footer">
          <p>&copy; 2026 Projekt: Optymalizacja Stron Internetowych</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;
