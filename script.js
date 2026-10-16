
const CORRECT_PIN = "143";

let enteredPIN = "";
let currentScreen = "lock-screen";

const pinDisplay = document.getElementById("pin-display");
const pinMessage = document.getElementById("pin-message");

const screens = [
  "lock-screen",
  "welcome-screen",
  "memories-screen",
  "letter-screen"
];

function showScreen(screenId) {
  screens.forEach(id => {
    document.getElementById(id).classList.add("hidden");
  });

  document.getElementById(screenId).classList.remove("hidden");
  currentScreen = screenId;
}

function updatePINDisplay() {
  const dots = ["○", "○", "○"];

  for (let i = 0; i < enteredPIN.length; i++) {
    dots[i] = "●";
  }

  pinDisplay.textContent = dots.join(" ");
}

function addDigit(digit) {
  if (enteredPIN.length >= 3) return;

  enteredPIN += digit;
  updatePINDisplay();
  pinMessage.textContent = "";
}

function clearPIN() {
  enteredPIN = "";
  updatePINDisplay();
  pinMessage.textContent = "";
}

function deleteDigit() {
  enteredPIN = enteredPIN.slice(0, -1);
  updatePINDisplay();
  pinMessage.textContent = "";
}

document.querySelectorAll(".key").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.digit !== undefined) {
      addDigit(button.dataset.digit);
    } else if (button.dataset.action === "clear") {
      clearPIN();
    } else if (button.dataset.action === "delete") {
      deleteDigit();
    }
  });
});

document.getElementById("unlock-button").addEventListener("click", () => {
  if (enteredPIN === CORRECT_PIN) {
    

document.getElementById("background-music").play().catch(() => {
  console.log("Tap Play Music to start the music.");
});


    pinMessage.textContent = "Unlocked! Your surprise awaits ❤️";

    setTimeout(() => {
      showScreen("welcome-screen");
      clearPIN();
    }, 600);
  } else {
    pinMessage.textContent = "Oops! Try the correct secret PIN 💗";
    enteredPIN = "";
    updatePINDisplay();
  }
});

document.getElementById("continue-button").addEventListener("click", () => {
  showScreen("memories-screen");
});

document.getElementById("letter-button").addEventListener("click", () => {
  showScreen("letter-screen");
});

function loadPhotos() {
  const gallery = document.getElementById("photo-gallery");

  // Add your photo filenames here after uploading them.
const photos = [
  {
    src: "photos/photo1.jpeg",
    label: "Beautiful memory ❤️"
  },
  {
    src: "photos/photo2.jpeg",
    label: "A special moment 💗"
  }
];

  photos.forEach(photo => {
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.label;

    img.onerror = () => {
      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder";
      placeholder.innerHTML =
        "<span>📷</span><p>Add your photo here</p>";
      img.replaceWith(placeholder);
    };

    gallery.appendChild(img);
  });
}

loadPhotos();

document.getElementById("celebrate-button").addEventListener("click", () => {
  const message = document.getElementById("letter-text");

  message.textContent =
    "May your life be filled with happiness, love, laughter, and beautiful memories. Happy Birthday! ❤️🎂";

  launchConfetti();
});

function launchConfetti() {
  const area = document.getElementById("confetti-area");
  const symbols = ["❤️", "💖", "✨", "🎉", "💕", "🌹"];

  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";
    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDuration = 2 + Math.random() * 3 + "s";
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.fontSize = 14 + Math.random() * 18 + "px";

    area.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

// Also allow PIN entry from a physical keyboard.
document.addEventListener("keydown", event => {
  if (currentScreen !== "lock-screen") return;

  if (/^\d$/.test(event.key)) {
    addDigit(event.key);
  } else if (event.key === "Backspace") {
    deleteDigit();
  } else if (event.key === "Escape") {
    clearPIN();
  } else if (event.key === "Enter") {
    document.getElementById("unlock-button").click();
  }
});


const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
    } else {
      music.pause();
    }
  } catch (error) {
    console.log("Music could not be played.", error);
  }
});

music.addEventListener("play", () => {
  musicToggle.textContent = "⏸ Pause Music";
});

music.addEventListener("pause", () => {
  musicToggle.textContent = "🎵 Play Music";
});

