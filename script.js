window.onload = () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark");
        document.getElementById("icon").textContent = "☀️";
    } else {
        document.getElementById("icon").textContent = "🌙";
    }

    // Reset input and select to default
    document.getElementById("input-value").value = "";
    document.getElementById("conversion-type").selectedIndex = 0;

    updateDateTime();
    setInterval(updateDateTime, 1000);
};

function convert() {
    const inputElement = document.getElementById("input-value");
    const type = document.getElementById("conversion-type").value;
    const output = document.getElementById("result");

    let input = parseFloat(inputElement.value);
    if (isNaN(input)) {
        output.innerHTML = `<span style="color: red;">Please enter a valid number</span>`;
        return;
    }

    let result = 0;
    let unit = "";

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
        default: output.innerHTML = "Unknown conversion type"; return;
    }

    result = result.toFixed(2);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fullTime = `${formattedDate}, ${formattedTime}`;

    // Save to history
    const historyItem = `${input} → ${result} ${unit} (${fullTime})`;
    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    history.push(historyItem);
    localStorage.setItem("conversionHistory", JSON.stringify(history));

    // Show result with fade-in
    output.innerHTML = `<strong>Converted:</strong> ${input} → <strong>${result} ${unit}</strong>`;
    output.parentElement.style.opacity = 0;
    setTimeout(() => {
        output.parentElement.style.opacity = 1;
    }, 100);
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
        const ul = document.createElement("ul");
        history.reverse().forEach(entry => {
            const li = document.createElement("li");
            li.textContent = entry;
            ul.appendChild(li);
        });
        box.appendChild(ul);
        box.style.display = "block";
        box.style.opacity = 0;
        setTimeout(() => {
            box.style.opacity = 1;
        }, 100);
    } else {
        box.style.opacity = 0;
        setTimeout(() => {
            box.style.display = "none";
        }, 300);
    }
}
