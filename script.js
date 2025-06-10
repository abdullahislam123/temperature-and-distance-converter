function convert(){
    let input = document.getElementById("input-value").value;
    let type = document.getElementById("conversion-type").value;
    let result = 0;
    input = parseFloat(input);
    if(isNaN(input)){
        document.getElementById("result").innerText = "Please enter a valid number";
        return;
    }
    switch(type){
        case "kmToMeter":
            result = input * 1000;
            break;
        case "meterToKm":
            result = input / 1000;
            break;
        case "inchToCm":
            result = input * 2.54;
            break;
        case "cmToInch":
            result = input / 2.54;
            break;
        case "cToF":
        result = (input * 9/5) + 32;
        break;
        case "fToC":
        result = (input - 32) * 5/9;
        break;
    }
    document.getElementById("result").innerText = `Converted value: ${result}`;
}
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById("icon");
    const isDark = document.body.classList.contains("dark");
    icon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

    // Toast as before...
}

window.onload = () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark");
        document.getElementById("icon").textContent = "☀️";
    }
}

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById("datetime").textContent = `${date} — ${time}`;
}

// Call once immediately and then every 1 sec
updateDateTime();
setInterval(updateDateTime, 1000);
