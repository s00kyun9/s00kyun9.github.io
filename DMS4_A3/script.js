// ✅ 페이지 로드시 해당 페이지 타입 확인 후 초기화 실행
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading");
  if (loader) loader.style.display = "none";

  const pageId = document.body.id;

  if (pageId === "write-page") {
    initWritePage();
  } else if (pageId === "lettering-page") {
    initLetteringPage();
  }
});

// ✍️ Write 페이지 - 폼 제출 이벤트 연결
function initWritePage() {
  const form = document.querySelector("form");
  form.addEventListener("submit", saveLetter);
}

// 📨 Write 페이지 - 편지 내용 저장 + 이동
function saveLetter(event) {
  event.preventDefault();

  const to = document.getElementById("to").value.trim();
  const message = document.getElementById("message").value.trim();
  const from = document.getElementById("from").value.trim();

  if (!to || !message || !from) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  localStorage.setItem("letterTo", to);
  localStorage.setItem("letterMessage", message);
  localStorage.setItem("letterFrom", from);

  if (!localStorage.getItem("selectedColor")) {
    localStorage.setItem("selectedColor", "cream");
  }

  document.getElementById("loading").style.display = "flex";
  setTimeout(() => {
    window.location.href = "lettering_3.html";
  }, 3000);
}

const messageBox = document.getElementById('message');
const charCount = document.getElementById('char-count');

messageBox.addEventListener('input', () => {
  charCount.textContent = messageBox.value.length;
});

window.addEventListener("DOMContentLoaded", () => {
      const music = document.getElementById("bg-music");
      document.body.addEventListener("click", () => {
        if (music.paused) {
          music.play();
        }
      }, { once: true });
    });
    