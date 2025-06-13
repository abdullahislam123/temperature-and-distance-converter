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

    // Define units for each conversion type
    const unitMap = {
        kmToMeter: { from: "km", to: "meters" },
        meterToKm: { from: "meters", to: "km" },
        inchToCm: { from: "inch", to: "cm" },
        cmToInch: { from: "cm", to: "inch" },
        cToF: { from: "°C", to: "°F" },
        fToC: { from: "°F", to: "°C" },
        mAtoA: { from: "mA", to: "A" },
        AtoMA: { from: "A", to: "mA" },
        mmolToMol: { from: "mmol", to: "mol" },
        molToMmol: { from: "mol", to: "mmol" },
        mcdToCd: { from: "mcd", to: "cd" },
        cdToMcd: { from: "cd", to: "mcd" }
    };

    const units = unitMap[type];
    if (!units) {
        output.innerHTML = "Unknown conversion type";
        return;
    }

    switch (type) {
        case "kmToMeter": result = input * 1000; break;
        case "meterToKm": result = input / 1000; break;
        case "inchToCm": result = input * 2.54; break;
        case "cmToInch": result = input / 2.54; break;
        case "cToF": result = (input * 9 / 5) + 32; break;
        case "fToC": result = (input - 32) * 5 / 9; break;
        case "mAtoA": result = input / 1000; break;
        case "AtoMA": result = input * 1000; break;
        case "mmolToMol": result = input / 1000; break;
        case "molToMmol": result = input * 1000; break;
        case "mcdToCd": result = input / 1000; break;
        case "cdToMcd": result = input * 1000; break;
    }

    result = result.toFixed(2);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fullTime = `${formattedDate}, ${formattedTime}`;

    // Update result with input unit
    output.innerHTML = `<strong>Converted:</strong> ${input} ${units.from} → <strong>${result} ${units.to}</strong>`;

    // Update history
    const historyItem = `${input} ${units.from} → ${result} ${units.to} (${fullTime})`;
    let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];
    history.push(historyItem);
    localStorage.setItem("conversionHistory", JSON.stringify(history));

    // Fade-in result box
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
function clearHistory() {
    localStorage.removeItem("conversionHistory");

    const box = document.getElementById("history-box");
    if (box) {
        box.innerHTML = "<p style='color: gray;'>History cleared.</p>";
    }

    // Optionally hide the history box
    setTimeout(() => {
        box.style.opacity = 0;
        setTimeout(() => {
            box.style.display = "none";
        }, 300);
    }, 1000);
}

