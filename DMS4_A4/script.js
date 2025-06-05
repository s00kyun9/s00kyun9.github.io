// 디지털 편지 내용
const modalContent = {
  Purpose: `The primary goal of this project was to recreate the emotional and aesthetic experience of writing a handwritten letter in a browser-based interaction. In a world where digital communication is quickly consumed, I centered the experience around emotional values like slowness and sincerity. The aim was to make the act of emotional delivery itself a mindful, immersive interaction — not just a functional feature.`,

  Worth: `Rather than technical novelty, I valued sincerity and emotional resonance. I focused on making the experience feel like a genuine emotional delivery rather than a web toy. Elements like handwriting-inspired fonts, warm color schemes, and analog touches like wax seals were all chosen based on these values.`,

  Framing: `This project intentionally limited its scope to the act of writing a letter. I excluded real-time messaging or multi-user functionality to deepen the intimacy of 1:1 emotional expression. Technically, I kept the framework simple — using only HTML, CSS, and JS without external libraries — so that the emotional flow could remain the primary focus.`,

  Appearance: `The overall visual theme was designed around softness, nostalgia, and emotional warmth. Serif fonts evoked the feeling of printed paper, while a cursive title font added a personal touch. The ivory paper-like background and pastel accents provided a gentle mood. Visual decorations like masking tape and wax seals were used not just for style but as tools of emotional expression, aligning with the project’s tone.`,

  Quality: `Technically, I prioritized code simplicity, intuitive functions, and emotional continuity. localStorage was used to maintain state between pages without server-side logic. I removed complex features like login or database integration to keep things light. A loading animation added a sense of ceremony to transitions, visually representing the act of sealing and sending a letter.`,

  Composition: `The structure follows a linear path — write → decorate → reflect — with careful attention to maintaining emotional flow. Emotional background music was added during the writing and decorating stages to help users stay immersed. These songs were not just audio decoration but tools that sustained emotional rhythm. The postcard was treated as a canvas for emotional expression, and the decorating tools were deliberately restrained for clarity.`,

  Navigation: `I prioritized emotional pacing over convenience. Short loading animations during transitions created the feel of performing a small ceremony — like folding and sealing a real letter. Once the letter is submitted, users cannot go back, reinforcing the seriousness of sending something physical and irreversible, just like in real life.`,

  Cookie: `` // 쿠키 페이지는 별도 이동
};

// 🔹 편지 내용 모달 열기
function openModal(section) {
  if (section === 'Cookie') {
    window.location.href = 'cookie.html';
    return;
  }

  document.getElementById('modalTitle').textContent = section;
  document.getElementById('modalContent').textContent = modalContent[section];
  document.getElementById('modalOverlay').style.display = 'flex';
}

// 🔹 편지 내용 모달 닫기
function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

// 🔹 영상 모달 열기 + 영상 재생
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('demoVideo');

  modal.style.display = 'flex';
  video.play(); // 영상 자동 재생
}

// 🔹 영상 모달 닫기 + 영상 일시정지
function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('demoVideo');

  video.pause(); // 영상 멈춤
  modal.style.display = 'none';
}
