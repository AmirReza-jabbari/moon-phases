function getMoonPhase() {
    const city = document.getElementById('city').value;

    // برای دریافت موقعیت جغرافیایی شهر از API استفاده می‌کنیم
    fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                // برای محاسبه فاز ماه از موقعیت جغرافیایی استفاده می‌کنیم
                fetch(`https://api.ipgeolocation.io/astronomy?apiKey=e774b8767deb4c09965a219f6d8896ac&lat=${lat}&long=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        const moonPhase = data.moon_phase;
                        displayMoonPhase(moonPhase);
                    });
            } else {
                alert("شهر پیدا نشد. لطفاً نام صحیحی وارد کنید.");
            }
        });
}

function displayMoonPhase(moonPhase) {
    let phaseSymbol;
    switch (moonPhase) {
        case "New Moon":
            phaseSymbol = "🌑 ماه نو";
            break;
        case "WAXING_CRESCENT":
            phaseSymbol = "🌒 هلال فزاینده";
            break;
        case "FIRST_QUARTER":
            phaseSymbol = "🌓 تربیع (ربع) اول";
            break;
        case "WAXING_GIBBOUS":
            phaseSymbol = "🌔 کوژماه یا تحدب فزاینده";
            break;
        case "FULL_MOON":
            phaseSymbol = "🌕 ماه کامل";
            break;
        case "WANING_GIBBOUS":
            phaseSymbol = "🌖 کوژماه یا تحدت کاهنده";
            break;
        case "LAST_QUARTER":
            phaseSymbol = "🌗 تربیع (ربع) آخر";
            break;
        case "WANING_CRESCENT":
            phaseSymbol = "🌘 هلال کاهنده";
            break;
        default:
            phaseSymbol = "فاز نامشخص";
            break;
    }

    document.getElementById('moon-phase').textContent = phaseSymbol;
    
}
document.getElementById('city').addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        getMoonPhase();
    }
})