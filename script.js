window.onload = () => {
    let userInput;
    do {
        userInput = prompt("🔐 Enter numeric password to access the site:");
        if (userInput === null) {
            alert("Access denied!");
            location.reload();
            return;
        }
    } while (!/^[0-9]+$/.test(userInput));

    const correctPassword = "12345";
    if (userInput !== correctPassword) {
        alert("Incorrect password!");
        location.reload();
        return;
    }

    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark");
        document.getElementById("icon").textContent = "☀️";
    } else {
        document.getElementById("icon").textContent = "🌙";
    }

    document.getElementById("input-value").value = "";
    document.getElementById("conversion-type").selectedIndex = 0;

    updateDateTime();
    setInterval(updateDateTime, 1000);
};

function convert() {
    let input = document.getElementById("input-value").value;
    let type = document.getElementById("conversion-type").value;
    let output = document.getElementById("result");
    let result = 0;
    let unit = "";

    input = parseFloat(input);
    if (isNaN(input)) {
        output.innerText = "Please enter a valid number";
        return;
    }

    switch (type) {
        case "kmToMeter": result = input * 1000; unit = "meters"; break;
        case "meterToKm": result = input / 1000; unit = "km"; break;
        case "inchToCm": result = input * 2.54; unit = "cm"; break;
        case "cmToInch": result = input / 2.54; unit = "inch"; break;
        case "cToF": result = (input * 9 / 5) + 32; unit = "°F"; break;
        case "fToC": result = (input - 32) * 5 / 9; unit = "°C"; break;
        case "mAtoA": result = input / 1000; unit = "A"; break;
        case "AtoMA": result = input * 1000; unit = "mA"; break;
        case "mmolToMol": result = input / 1000; unit = "mol"; break;
        case "molToMmol": result = input * 1000; unit = "mmol"; break;
        case "mcdToCd": result = input / 1000; unit = "cd"; break;
        case "cdToMcd": result = input * 1000; unit = "mcd"; break;
    }

    result = result.toFixed(2);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const fullTime = `${formattedDate}, ${formattedTime}`;

    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    const historyItem = `${input} → ${result} ${unit} (${fullTime})`;
    history.push(historyItem);
    localStorage.setItem("conversionHistory", JSON.stringify(history));

    output.innerHTML = `<strong>Converted:</strong> ${input} → <strong>${result} ${unit}</strong>`;
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
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    document.getElementById("datetime").textContent = `${date} — ${time}`;
}

function toggleHistory() {
    const box = document.getElementById("history-box");
    const history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    box.innerHTML = "";
    if (box.style.display === "none" || box.style.display === "") {
        history.reverse().forEach(entry => {
            const li = document.createElement("li");
            li.textContent = entry;
            box.appendChild(li);
        });
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}