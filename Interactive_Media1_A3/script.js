const sentences = [
  "i wanted.",
  "for too long,",
  "too deep.",
  "deeper.",
  "and deeper.",
  "even deeper.",
  "in a place so deep,",
  "no one could see.",
  "i wanted.",
  "truly—desperately.",
  "i yearned,",
  "with everything i had buried.",
  "that desire—",
  "even i was afraid of it.",
  "and yet,",
  "i couldn’t stop.",
  "what this longing might bring me—",
  "no one knew.",
  "not even i.",
  "then,",
  "suddenly,",
  "i realized:",
  "perhaps,",
  "forever,",
  "so deeply,",
  "so endlessly—",
  "i would continue to crave.",
  "and—",
  "even now,",
  "i know",
  "i still want.",
  "this yearning never quiets.",
  "no.",
  "yes.",
  "no—",
  "yes.",
  "agony.",
  "agony.",
  "agony endured.",
  "time passed,",
  "but it never lost its place.",
  "it became part of me—",
  "maybe all of me."
];

const backgrounds = Array.from({ length: 60 }, (_, i) => `img/Frame ${i + 1}.jpg`);

let i = 0; // Track current frame/text index

// On initial load, display the first sentence and background
window.onload = () => {
  const textEl = document.getElementById("text");
  const bgEl = document.getElementById("wrapper");
  textEl.textContent = sentences[i];
  bgEl.style.backgroundImage = `url('${backgrounds[i]}')`;
  i++;
};

// Called every time the user clicks on the screen (advances narrative)
function next() {
  const textEl = document.getElementById("text");
  const bgEl = document.getElementById("wrapper");

  // Fade out effect for smooth visual transition
  textEl.style.opacity = 0;
  bgEl.style.opacity = 0;

  setTimeout(() => {
    if (i < sentences.length) {
      // Update text and background for next sequence
      textEl.textContent = sentences[i];
      bgEl.style.backgroundImage = `url('${backgrounds[i]}')`;

      // Reset any animation class from previous state
      textEl.classList.remove("pulse");
      bgEl.classList.remove("blur");

      const s = sentences[i];

      // Trigger visual pulse for emotionally intense lines
      if (s.includes("truly—desperately") || s.includes("afraid")) {
        textEl.classList.add("pulse");
      }

      // Blur background during dreamlike or surreal moments
      if (s.includes("continue to crave") || s.includes("yearning")) {
        bgEl.classList.add("blur");
      }

      i++;
    } else if (i === sentences.length) {
      // Transition into a literary quote using a blinking cursor
      bgEl.style.backgroundImage = `url('${backgrounds[i]}')`;
      textEl.innerHTML = '<span id="cursor">|</span>';
      textEl.onclick = () => startDemianTyping();
      i++;
    }

    // Fade-in after the transition
    textEl.style.opacity = 1;
    bgEl.style.opacity = 1;
  }, 300);
}

// Handles typing animation for Hermann Hesse quote
function startDemianTyping() {
  const textEl = document.getElementById("text");
  textEl.onclick = null; // Prevent re-clicking

  // Demian quote broken into lines for controlled typing
  const demianLines = [
    "a bird",
    "fights to break from its egg.",
    "the egg is the world.",
    "to be born,",
    "one must destroy a world.",
    "— hermann hesse, demian"
  ];

  const fullText = demianLines.join("\n");
  let currentChar = 0;

  // Set up structure with a blinking cursor and empty span
  textEl.innerHTML = '<span id="typed-text" style="font-style: italic;"></span><span id="cursor">|</span>';
  const typedEl = document.getElementById("typed-text");

  // Letter-by-letter typing effect
  const interval = setInterval(() => {
    if (currentChar < fullText.length) {
      typedEl.textContent += fullText[currentChar];
      currentChar++;
    } else {
      clearInterval(interval);
      document.getElementById("cursor").style.display = "none";

      // After 2 seconds, apply fade-out (if desired later via class)
      setTimeout(() => {
        typedEl.classList.add("fade");
      }, 2000);
    }
  }, 70); // Typing speed (ms per character)
}
