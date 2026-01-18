$(document).ready(function() {

    AOS.init({ duration: 900, once: true });


    $('#hamburger').on('click', function() {
        $('#nav-links').toggleClass('active');
    });

    $('.nav-links a').on('click', function() {
        if ($(window).width() < 768) {
            $('#nav-links').removeClass('active');
        }
    });


    $('#hrbInput').on('input', function() {
        const hrb = parseFloat($(this).val());
        if (!isNaN(hrb) && hrb > 0) {
            const hb = (hrb * 2.15) + 15; // Aproksymacja inżynierska
            $('#hbResult').text(hb.toFixed(1));
        } else {
            $('#hbResult').text('---');
        }
    });


    $('#searchOrder').on('click', async function() {
        const id = $('#orderId').val();
        const resultDiv = $('#orderResult');

        if (!id || id < 1 || id > 200) {
            alert("Podaj ID z przedziału 1-200.");
            return;
        }

        const url = `https://jsonplaceholder.typicode.com/todos/${id}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const status = data.completed ?
                '<span style="color:#27ae60">Zrealizowane</span>' :
                '<span style="color:#f39c12">W realizacji</span>';

            resultDiv.hide().html(`
                <div class="result-box" style="text-align:left; font-size:0.95rem;">
                    <p><strong>Zlecenie:</strong> #${data.id}</p>
                    <p><strong>Próbka:</strong> ${data.title.substring(0, 30)}...</p>
                    <p><strong>Status:</strong> ${status}</p>
                </div>
            `).fadeIn();
        } catch (e) {
            alert("Błąd bazy danych.");
        }
    });


    $('#getWeather').on('click', async function() {
        const city = $('#cityInput').val();
        const apiKey = 'cd884457988a03b853ce72ab445950e1';

        if (!city) return alert("Wpisz miasto.");

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pl`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                const humidity = data.main.humidity;
                const risk = humidity > 65 ?
                    '<b style="color:#e74c3c">KRYTYCZNE</b>' :
                    '<b style="color:#27ae60">BEZPIECZNE</b>';

                $('#weatherResult').hide().html(`
                    <div class="result-box" style="text-align:left;">
                        <p><b>Temp:</b> ${data.main.temp}°C</p>
                        <p><b>Wilgotność:</b> ${humidity}%</p>
                        <p><b>Ryzyko Korozji:</b> ${risk}</p>
                    </div>
                `).fadeIn();
            } else {
                alert("Nie znaleziono miasta.");
            }
        } catch (e) {
            alert("Błąd połączenia z satelitą.");
        }
    });


    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        const email = $('#email').val();
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailReg.test(email)) {
            $('#emailError').text('Nieprawidłowy adres e-mail.');
        } else {
            $('#emailError').text('');
            $(this).html('<h3 style="color:#27ae60; text-align:center;">Wiadomość została zakodowana i wysłana!</h3>');
        }
    });
});
