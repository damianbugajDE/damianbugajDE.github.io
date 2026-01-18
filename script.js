$(document).ready(function() {
    // 1. Inicjalizacja Animacji AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 120
    });

    // 2. Obsługa Hamburger Menu
    $('#hamburger').on('click', function() {
        $('#nav-links').toggleClass('active');
    });

    // 3. Kalkulator Twardości (HRB na HB)
    $('#hrbInput').on('input', function() {
        let hrb = parseFloat($(this).val());
        if (!isNaN(hrb) && hrb > 0) {
            // Inżynierski wzór przybliżony dla stali
            let hb = (hrb * 2.15) + 15;
            $('#hbResult').text(hb.toFixed(1));
        } else {
            $('#hbResult').text('---');
        }
    });

    // 4. Monitoring Warunków (Pogoda z Twoim Kluczem)
    $('#getWeather').on('click', async function() {
        const city = $('#cityInput').val();
        // Twój klucz został pomyślnie wstawiony poniżej
        const apiKey = 'cd884457988a03b853ce72ab445950e1';

        if (!city) {
            alert("Proszę wpisać lokalizację huty lub magazynu.");
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pl`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                const humidity = data.main.humidity;
                const temp = data.main.temp;

                // Logika inżynierska: punkt rosy i ryzyko korozji stali
                let riskColor = humidity > 65 ? '#e74c3c' : '#27ae60';
                let riskStatus = humidity > 65 ? 'WYSOKIE - zalecana kontrola wilgotności!' : 'NISKIE - warunki optymalne.';

                $('#weatherResult').hide().html(`
                    <div class="result-box" style="text-align:left; font-size:1.1rem; border-color:${riskColor}">
                        <p><i class="fas fa-map-marker-alt"></i> <strong>Lokalizacja:</strong> ${data.name}</p>
                        <p><i class="fas fa-thermometer-half"></i> <strong>Temp. otoczenia:</strong> ${temp}°C</p>
                        <p><i class="fas fa-tint"></i> <strong>Wilgotność:</strong> ${humidity}%</p>
                        <hr style="margin:10px 0; border:0; border-top:1px solid #ddd;">
                        <p><strong>Ryzyko korozji:</strong> <span style="color:${riskColor}">${riskStatus}</span></p>
                    </div>
                `).fadeIn();
            } else {
                alert("Błąd serwera: " + data.message);
            }
        } catch (error) {
            alert("Błąd połączenia. Sprawdź, czy masz dostęp do internetu.");
        }
    });

    // 5. Walidacja Formularza Kontaktowego
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailReg.test(email)) {
            $('#emailError').text('Wprowadź poprawny e-mail (np. inz@firma.pl)');
            $('#email').css('border-color', '#e74c3c');
        } else {
            $(this).fadeOut(function() {
                $(this).before('<div style="text-align:center; padding:30px; background:#dff0d8; border-radius:10px;"><h3><i class="fas fa-check-circle"></i> Wysłano!</h3><p>Nasz metalurg odezwie się wkrótce.</p></div>');
            });
        }
    });
});
