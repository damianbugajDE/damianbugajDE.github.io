import { useState, useEffect } from 'react';
import { createClient } from '@google/genai';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Swiper dla sekcji "Nowości"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './App.css';

// --- KOMPONENT 1: KALKULATOR ---
const CarbonCalculator = () => {
  const [energyAmount, setEnergyAmount] = useState(100);
  const CO2_COAL = 820;
  const CO2_NUCLEAR = 12;
  const savedCO2 = (energyAmount * (CO2_COAL - CO2_NUCLEAR) / 1000).toFixed(2);

  return (
    <section className="card full-width calculator-box" id="calc">
      <h3>Interaktywny Kalkulator Ekologiczny</h3>
      <div className="input-group">
        <label htmlFor="energy-production-input">
          Ilość wyprodukowanej energii (MWh):
        </label>
        <input
          id="energy-production-input"
          type="number"
          value={energyAmount}
          onChange={(e) => setEnergyAmount(e.target.value)}
          className="calc-input"
          aria-label="Wpisz ilość wyprodukowanej energii w megawatogodzinach, aby obliczyć oszczędność emisji CO2"
          aria-required="true"
        />
      </div>
      <div className="result">
        <p>Dzięki atomowi uniknięto emisji: <strong>{savedCO2} t CO₂</strong></p>
        <small>W porównaniu do spalania węgla kamiennego (Dane: IPCC).</small>
      </div>
    </section>
  );
};

// --- KOMPONENT 2: CHATBOT AI ---
const NuclearChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Witaj! Jestem AI-Atom. Zapytaj mnie o technologię SMR, fuzję lub bezpieczeństwo jądrowe.", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // MIEJSCE NA TWÓJ KLUCZ (Wklej go w cudzysłów poniżej)
  // 1. Inicjalizacja poza funkcją (RAZ)
const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  // 2. Inicjalizacja (pamiętaj o REACT_APP_GEMINI_KEY w Netlify)
  const client = createClient({
    apiKey: process.env.REACT_APP_GEMINI_KEY
  });

  const userMsg = { text: input, isBot: false };
  setMessages(prev => [...prev, userMsg]);
  setInput("");
  setIsLoading(true);

  try {
    // 3. Wywołanie Gemini 2.5 Flash
    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: input }] }],
    });

    // Pobranie tekstu z odpowiedzi
    const responseText = result.response.text();

    setMessages(prev => [...prev, { text: responseText, isBot: true }]);
  } catch (error) {
    console.error("Błąd API:", error);
    setMessages(prev => [...prev, { text: "Błąd połączenia z reaktorem AI. Spróbuj za chwilę.", isBot: true }]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'active' : ''}`}>
      <button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '⚛️'}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">Asystent Energetyki Jądrowej</div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>{m.text}</div>
            ))}
            {isLoading && <div className="message bot typing">AI analizuje dane...</div>}
          </div>
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Zapytaj o atom..."
            />
            <button onClick={handleSend} disabled={isLoading}>Wyślij</button>
          </div>
        </div>
      )}
    </div>
  );
};

const PrivacyPolicy = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="privacy-container">
      <button onClick={() => setShow(!show)} className="privacy-toggle">
        Polityka Prywatności
      </button>
      {show && (
        <div className="privacy-modal">
          <div className="privacy-content card">
            <button className="close-btn" onClick={() => setShow(false)}>✕</button>
            <h2>Polityka Prywatności</h2>
            <p><strong>Administrator danych:</strong> Damian Bugaj (Projekt Akademicki)</p>
            <p><strong>Pliki cookies:</strong> Strona wykorzystuje pliki cookies jedynie w celach statystycznych (GitHub Pages) oraz do poprawnego działania animacji i czatu AI.</p>
            <p><strong>Dane osobowe:</strong> Czat AI nie przechowuje Twoich danych osobowych. Wpisywane treści są przetwarzane lokalnie w celu symulacji odpowiedzi.</p>
            <p><strong>Twoje prawa:</strong> Masz prawo do wglądu w dane oraz żądania ich usunięcia, kontaktując się z administratorem przez GitHub.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- KOMPONENT GŁÓWNY: APP ---
function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
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
        <Helmet htmlAttributes={{ lang: 'pl' }}>
          {/* Podstawowe Meta Tagi */}
          <title>Jądro Czystej Energii</title>
          <meta name="description" content="Energetyka Jądrowa | Nowoczesne Kompendium Wiedzy i Bezpieczeństwa" />
          <link rel="canonical" href="https://damianbugajde.github.io/" />

          {/* Facebook / Open Graph */}
          <meta property="og:url" content="https://damianbugajde.github.io/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Jądro Czystej Energii" />
          <meta property="og:description" content="Energetyka Jądrowa | Nowoczesne Kompendium Wiedzy i Bezpieczeństwa" />
          <meta property="og:image" content="https://damianbugajde.github.io/social-preview.jpg" />

          {/* Twitter Meta Tags (TEGO BRAKOWAŁO) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="damianbugajde.github.io" />
          <meta property="twitter:url" content="https://damianbugajde.github.io/" />
          <meta name="twitter:title" content="Jądro Czystej Energii" />
          <meta name="twitter:description" content="Energetyka Jądrowa | Nowoczesne Kompendium Wiedzy i Bezpieczeństwa" />
          <meta name="twitter:image" content="https://damianbugajde.github.io/social-preview.jpg" />

          {/* Schema.org JSON-LD */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Jądro Czystej Energii - Kompendium o Atomie",
              "description": "Kompendium wiedzy o energetyce jądrowej i technologii SMR.",
              "image": "https://damianbugajde.github.io/social-preview.jpg",
              "author": {
                "@type": "Person",
                "name": "Damian Bugaj"
              }
            })}
          </script>
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
          <section className="news-slider">
            <h2 className="section-title">Nowości ze świata atomu</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{ 768: { slidesPerView: 2 } }}
              a11y={{
                prevSlideMessage: 'Poprzedni slajd',
                nextSlideMessage: 'Następny slajd',
              }}
            >
              <SwiperSlide>
                <div className="card news-card">
                  <img src="/smr-reaktor-modulowy.webp" alt="Reaktor SMR" loading="lazy" className="news-image" />
                  <h3>Postępy w technologii SMR</h3>
                  <p>Pierwsze komercyjne jednostki wchodzą w fazę certyfikacji.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card news-card">
                  <img src="/energia-gwiazdy.webp" alt="Fuzja jądrowa" loading="lazy" className="news-image" />
                  <h3>Fuzja Jądrowa</h3>
                  <p>Rekordowy czas podtrzymania plazmy przybliża nas do energii gwiazd.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card news-card">
                  <img src="/uran-jako-paliwo.webp" alt="Recykling uranu" loading="lazy" className="news-image" />
                  <h3>Recykling paliwa</h3>
                  <p>Nowe metody pozwalają odzyskać do 90% energii z uranu.</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>

          <section className="grid-section">
            <article className="card">
              <h3>Gęstość Energii</h3>
              <p>Jedna pastylka uranu (ok. 7g) generuje tyle energii co 1 tona węgla.</p>
            </article>
            <article className="card">
              <h3>Emisyjność</h3>
              <p>Energia jądrowa ma najniższy ślad węglowy (12g CO2/kWh).</p>
            </article>
          </section>

          <CarbonCalculator />

          <section className="card full-width text-content" id="edukacja-pro">
            <h2>Transformacja Energetyczna i Bezpieczeństwo</h2>
            <img
              src="/bezpieczenstwo-elektrowni-jadrowej.webp"
              alt="Systemy bezpieczeństwa"
              loading="lazy"
              className="featured-image"
              style={{ float: 'right', width: '300px', margin: '0 0 20px 20px' }}
            />
            <p>Współczesna energetyka jądrowa stanowi fundament niskoemisyjnego miksu energetycznego. Zapewnia stabilność sieci niezależnie od warunków pogodowych. Implementacja technologii jądrowej pozwala na redukcję spalania paliw kopalnych i realizację celów klimatycznych.</p>
            <p>Innowacje takie jak małe reaktory modułowe (SMR) rewolucjonizują podejście do budowy infrastruktury. Koszty stają się przewidywalne, a systemy bezpieczeństwa pasywnego gwarantują najwyższy poziom ochrony środowiska.</p>
          </section>

          <section className="sources-section">
            <h2>Źródła Naukowe</h2>
            <ul className="source-list">
              <li className="source-item"><strong>IPCC:</strong> <a href="https://www.ipcc.ch/sr15/">Raport 2018</a></li>
              <li className="source-item"><strong>IAEA:</strong> <a href="https://www.iaea.org/">Portal Wiedzy</a></li>
            </ul>
          </section>

          <NuclearChatbot />
        </main>

        <footer className="main-footer">
          <p>&copy; 2026 Projekt: Optymalizacja Stron Internetowych</p>
          <PrivacyPolicy />
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;
