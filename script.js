window.onload = () => {
    // 🔐 NUMERIC-ONLY PASSWORD CHECK
    let userInput;
    do {
        userInput = prompt("🔐 Enter numeric password to access the site:");
        if (userInput === null) {
            alert("Access denied!");
            location.reload();
            return;
        }
    } while (!/^\d+$/.test(userInput)); // Only digits allowed

    const correctPassword = "1234";
    if (userInput !== correctPassword) {
        alert("Incorrect password!");
        location.reload();
        return;
    }

    // 🌙 Dark Mode Setup
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark");
        document.getElementById("icon").textContent = "☀️";
    } else {
        document.getElementById("icon").textContent = "🌙";
    }

    // Clear input fields on load
    document.getElementById("input-value").value = "";
    document.getElementById("conversion-type").selectedIndex = 0;

    // Show conversion history
    const history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    if (history.length > 0) {
        document.getElementById("result").innerText = "Conversion History:\n" + history.reverse().join("\n");
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
};

function convert() {
    let input = document.getElementById("input-value").value;
    let type = document.getElementById("conversion-type").value;
    let result = 0;
    let unit = "";

    input = parseFloat(input);
    if (isNaN(input)) {
        document.getElementById("result").innerText = "Please enter a valid number";
        return;
    }

    // Store last input
    localStorage.setItem("lastInput", input);
    localStorage.setItem("lastType", type);

    // Conversion logic
    switch (type) {
        case "kmToMeter":
            result = input * 1000;
            unit = "meters";
            break;
        case "meterToKm":
            result = input / 1000;
            unit = "km";
            break;
        case "inchToCm":
            result = input * 2.54;
            unit = "cm";
            break;
        case "cmToInch":
            result = input / 2.54;
            unit = "inch";
            break;
        case "cToF":
            result = (input * 9 / 5) + 32;
            unit = "°F";
            break;
        case "fToC":
            result = (input - 32) * 5 / 9;
            unit = "°C";
            break;
    }

    result = result.toFixed(2);

    // Save history
    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    history.push(`${input} → ${result} ${unit}`);
    localStorage.setItem("conversionHistory", JSON.stringify(history));

    document.getElementById("result").innerText = `Converted value: ${result} ${unit}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const icon = document.getElementById("icon");
    const isDark = document.body.classList.contains("dark");
    icon.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
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