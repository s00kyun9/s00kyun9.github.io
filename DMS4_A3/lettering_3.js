// lettering_3.js

window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading");
  if (loader) loader.style.display = "none";

  const pageId = document.body.id;
  if (pageId === "lettering-page") {
    initLetteringPage();
  }
});

function initLetteringPage() {
  document.getElementById("to-text").textContent = localStorage.getItem("letterTo") || "[To]";
  document.getElementById("message-text").textContent = localStorage.getItem("letterMessage") || "[Message]";
  document.getElementById("from-text").textContent = localStorage.getItem("letterFrom") || "[From]";

  const color = localStorage.getItem("selectedColor");
  if (color) {
    document.getElementById("postcard").className = "postcard " + color;
  }

  const border = localStorage.getItem("selectedBorder");
  if (border) {
    const overlay = document.getElementById("frame-overlay");
    overlay.style.backgroundImage = `url('${border}')`;
    overlay.style.backgroundSize = "cover";
    overlay.style.backgroundPosition = "center";
    overlay.style.backgroundRepeat = "no-repeat";
  }

  const stickers = JSON.parse(localStorage.getItem("placedStickers") || "[]");
  stickers.forEach(s => placeSticker(s.src, s.left, s.top, s.id, s.scale, s.rotation));

  activateTool('color');
}

function activateTool(name) {
  const tabs = ['color', 'frame', 'sticker', 'tape', 'photo'];
  tabs.forEach(tab => {
    const panel = document.getElementById(`panel-${tab}`);
    const button = document.getElementById(`tab-${tab}`);
    if (panel && button) {
      panel.style.display = (tab === name ? 'flex' : 'none');
      button.classList.toggle('active', tab === name);
    }
  });
}

function changeColor(color) {
  document.getElementById("postcard").className = "postcard " + color;
  localStorage.setItem("selectedColor", color);
}

function setBorder(path) {
  const overlay = document.getElementById("frame-overlay");
  overlay.style.backgroundImage = `url('${path}')`;
  overlay.style.backgroundSize = "cover";
  overlay.style.backgroundPosition = "center";
  overlay.style.backgroundRepeat = "no-repeat";
  localStorage.setItem("selectedBorder", path);
}

function addSticker(src) {
  const layer = document.getElementById("sticker-layer");
  layer.onclick = null;

  // 👻 Preview sticker 따라다니게 만들기
  const preview = document.createElement("img");
  preview.src = src;
  preview.className = "placed-sticker";
  preview.style.opacity = "0.5";
  preview.style.pointerEvents = "none";
  preview.style.position = "absolute";
  preview.style.zIndex = 9999;
  preview.id = "preview-sticker";
  document.body.appendChild(preview);

  function movePreview(e) {
    preview.style.left = e.pageX - 30 + "px";
    preview.style.top = e.pageY - 30 + "px";
  }

  document.addEventListener("mousemove", movePreview);

  layer.onclick = function (e) {
    const id = Date.now();
    const rect = layer.getBoundingClientRect();
    const left = e.clientX - rect.left - 30;
    const top = e.clientY - rect.top - 30;

    placeSticker(src, left + "px", top + "px", id, 1, 0);

    const stickers = JSON.parse(localStorage.getItem("placedStickers") || "[]");
    stickers.push({ id, src, left: left + "px", top: top + "px", scale: 1, rotation: 0 });
    localStorage.setItem("placedStickers", JSON.stringify(stickers));

    // 🧼 remove preview
    document.body.removeChild(preview);
    document.removeEventListener("mousemove", movePreview);
    layer.onclick = null;
  };
}

function placeSticker(src, left, top, id, scale = 1, rotation = 0) {
  const layer = document.getElementById("sticker-layer");
  const img = document.createElement("img");

  img.src = src;
  img.className = "placed-sticker";
  img.style.left = left;
  img.style.top = top;
  img.style.position = "absolute";
  img.dataset.id = id;
  img.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
  img.style.transition = "transform 0.2s ease";

  // 확대/축소 기능
  img.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.shiftKey) {
      rotation += e.deltaY > 0 ? 5 : -5;
    } else {
      scale += e.deltaY > 0 ? -0.1 : 0.1;
      scale = Math.max(0.3, Math.min(3, scale));
    }
    img.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    updateStickerTransform(id, scale, rotation);
  });

  layer.appendChild(img);
}

function updateStickerTransform(id, scale, rotation) {
  let stickers = JSON.parse(localStorage.getItem("placedStickers") || "[]");
  const index = stickers.findIndex(s => s.id === id);
  if (index !== -1) {
    stickers[index].scale = scale;
    stickers[index].rotation = rotation;
    localStorage.setItem("placedStickers", JSON.stringify(stickers));
  }
}

function resetLetter() {
  localStorage.removeItem("placedStickers");
  const layer = document.getElementById("sticker-layer");
  if (layer) layer.innerHTML = "";
}

function showLoader(event) {
  event.preventDefault();
  document.getElementById("loading").style.display = "flex";
  setTimeout(() => {
    window.location.href = event.target.href;
  }, 2000);
}

// 📷 사용자 이미지 업로드 후 원하는 위치 클릭하여 배치
let tempUploadedImageSrc = null;

function uploadImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    tempUploadedImageSrc = e.target.result;
    alert("엽서에서 원하는 위치를 클릭하면 사진이 추가됩니다!");
    enableImagePlacement();
  };
  reader.readAsDataURL(file);
}

function enableImagePlacement() {
  const layer = document.getElementById("sticker-layer");
  layer.onclick = function (e) {
    if (!tempUploadedImageSrc) return;

    const rect = layer.getBoundingClientRect();
    const id = Date.now();
    const left = e.clientX - rect.left - 30;
    const top = e.clientY - rect.top - 30;

    placeSticker(tempUploadedImageSrc, left + "px", top + "px", id, 1, 0);
    tempUploadedImageSrc = null;
    layer.onclick = null;
  };
}

function savePostcardImage() {
  const postcard = document.getElementById("postcard");

  // html2canvas로 엽서 영역 렌더링
  html2canvas(postcard, {
    backgroundColor: null, // 투명 배경 유지
    scale: 2, // 더 선명하게 저장
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "my_postcard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function savePostcardImage() {
  const postcard = document.getElementById("postcard");

  html2canvas(postcard, {
    backgroundColor: null,
    scale: 2,
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "my_postcard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // ✅ 저장 완료 알림 표시
    const alertBox = document.getElementById("save-alert");
    alertBox.classList.add("show");

    // 2초 후 알림 숨기기
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 2000);
  });
}

 window.addEventListener("DOMContentLoaded", () => {
      const music = document.getElementById("bg-music");
      document.body.addEventListener("click", () => {
        if (music.paused) {
          music.play();
        }
      }, { once: true });
    });