// ================= CONFIG =================
const works = [
  { src: "images/work1.jpg" },
  { src: "images/work2.jpg" },
  { src: "images/work3.jpg" },
  { src: "images/work4.jpg" },
  { src: "images/work5.jpg" },
  { src: "images/work6.jpg" },
  { src: "images/work7.jpg" },
  { src: "images/work8.jpg" },
  { src: "images/work9.jpg" },
  { src: "images/work10.jpg" },
  { src: "images/work11.jpg" },
  { src: "images/work12.jpg" },
  { src: "images/work13.jpg" },
  { src: "images/work14.jpg" },
  { src: "images/work15.jpg" },

];

// ================= ACTIVE NAV LINK =================
document.querySelectorAll(".site-nav a").forEach(link => {
  if (link.href === window.location.href) link.classList.add("active");
});

// ================= WORKS GRID =================
const grid = document.getElementById("works-grid");

if (grid) {
  works.forEach((work, index) => {
    const div = document.createElement("div");
    div.classList.add("work-item");

    const img = document.createElement("img");
    img.src = work.src;
    img.alt = "";

    div.appendChild(img);
    grid.appendChild(div);

    div.addEventListener("click", () => openLightbox(index));
  });
}

// ================= LIGHTBOX =================
const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn    = document.getElementById("close");
  let currentIndex  = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = works[index].src;
    lightbox.style.display = "flex";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % works.length;
    lightboxImg.src = works[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + works.length) % works.length;
    lightboxImg.src = works[currentIndex].src;
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", e => {
    if (lightbox.style.display === "none") return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft")  showPrev();
  });
}
