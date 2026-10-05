const storyText = document.getElementById("storyText");

const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const readingTime = document.getElementById("readingTime");

const speedSlider = document.getElementById("speedSlider");
const volumeSlider = document.getElementById("volumeSlider");

const speedValue = document.getElementById("speedValue");
const volumeValue = document.getElementById("volumeValue");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");

const clearBtn = document.getElementById("clearBtn");
const fileInput = document.getElementById("fileInput");

const status = document.getElementById("status");
const themeBtn = document.getElementById("themeBtn");


// ===============================
// Story Statistics
// ===============================

function updateStatistics() {

    const text = storyText.value.trim();

    const characters = storyText.value.length;

    const words = text === "" ?
        0 :
        text.split(/\s+/).filter(word => word.length > 0).length;

    const minutes = words === 0 ?
        0 :
        Math.ceil(words / 150);

    wordCount.textContent = words;
    charCount.textContent = characters;
    readingTime.textContent = minutes;
}


storyText.addEventListener("input", updateStatistics);


// ===============================
// Speed Control
// ===============================

speedSlider.addEventListener("input", function() {

    speedValue.textContent = this.value;

});


// ===============================
// Volume Control
// ===============================

volumeSlider.addEventListener("input", function() {

    volumeValue.textContent = this.value + "%";

});


// ===============================
// Play
// ===============================

playBtn.addEventListener("click", async function() {

    const text = storyText.value.trim();

    if (!text) {

        setStatus("Please enter a story first.", "error");

        storyText.focus();

        return;
    }

    setStatus("🎙️ Story narration started...");

    try {

        const response = await fetch("/speak", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                text: text,

                rate: Number(speedSlider.value),

                volume: Number(volumeSlider.value) / 100

            })

        });


        const data = await response.json();


        if (!data.success) {

            setStatus(data.message, "error");

            return;
        }


        setStatus("🔊 StoryVoice is reading your story...");

    } catch (error) {

        setStatus(
            "Could not connect to the server.",
            "error"
        );

        console.error(error);
    }

});


// ===============================
// Pause
// ===============================

pauseBtn.addEventListener("click", function() {

    setStatus(
        "⏸ Pause is controlled by your system speech engine."
    );

});


// ===============================
// Resume
// ===============================

resumeBtn.addEventListener("click", function() {

    setStatus(
        "▶ Resume is controlled by your system speech engine."
    );

});


// ===============================
// Stop
// ===============================

stopBtn.addEventListener("click", async function() {

    try {

        const response = await fetch("/stop", {

            method: "POST"

        });


        const data = await response.json();


        if (data.success) {

            setStatus("⏹ Narration stopped.");

        } else {

            setStatus(
                "Unable to stop narration.",
                "error"
            );

        }

    } catch (error) {

        console.error(error);

        setStatus(
            "Server connection error.",
            "error"
        );

    }

});


// ===============================
// Upload Story
// ===============================

fileInput.addEventListener("change", async function() {

    const file = this.files[0];

    if (!file) {
        return;
    }


    if (!file.name.toLowerCase().endsWith(".txt")) {

        setStatus(
            "Please upload a .txt file.",
            "error"
        );

        return;
    }


    const formData = new FormData();

    formData.append("file", file);


    setStatus("📄 Loading your story...");


    try {

        const response = await fetch("/upload", {

            method: "POST",

            body: formData

        });


        const data = await response.json();


        if (data.success) {

            storyText.value = data.text;

            updateStatistics();

            setStatus(
                `📖 ${data.filename} loaded successfully.`
            );

        } else {

            setStatus(
                data.message,
                "error"
            );

        }

    } catch (error) {

        console.error(error);

        setStatus(
            "Could not upload the story.",
            "error"
        );

    }

});


// ===============================
// Clear
// ===============================

clearBtn.addEventListener("click", async function() {

    storyText.value = "";

    updateStatistics();

    await stopSpeech();

    setStatus("Story cleared.");

});


// ===============================
// Stop Speech Helper
// ===============================

async function stopSpeech() {

    try {

        await fetch("/stop", {
            method: "POST"
        });

    } catch (error) {

        console.error(error);

    }

}


// ===============================
// Status
// ===============================

function setStatus(message, type = "normal") {

    status.textContent = message;

    if (type === "error") {

        status.style.color = "#dc2626";

    } else {

        status.style.color = "";

    }

}


// ===============================
// Theme
// ===============================

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "storyvoice-theme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "storyvoice-theme",
            "light"
        );

    }

});


// ===============================
// Load Saved Theme
// ===============================

window.addEventListener("DOMContentLoaded", function() {

    const savedTheme =
        localStorage.getItem("storyvoice-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    }


    updateStatistics();

});