// ================= WORKS CONFIG =================
const works = [
  { src: "images/work1.jpg",  year: 2024, description: "Title, material, dimensions, year." },
  { src: "images/work2.jpg",  year: 2024 },
  { src: "images/work3.jpg",  year: 2024, description: "Another work description." },
  { src: "images/work4.jpg",  year: 2023 },
  { src: "images/work5.jpg",  year: 2023, description: "Work from 2023." },
  { src: "images/work6.jpg",  year: 2023 },
  { src: "images/work7.jpg",  year: 2022 },
  { src: "images/work8.jpg",  year: 2022 },
  { src: "images/work9.jpg",  year: 2022 },
];

// ================= INFO CONTENT =================
const info = {
  statement: "Short statement about the artist or practice.",
  cv: [
    "2024 – Exhibition Name",
    "2023 – Another Exhibition",
  ]
};

// ================= CONTACT CONTENT =================
const contact = {
  email: "artist@email.com",
  instagram: "@yoel_hayoun",
};

// ================= LOGO FONTS =================
const logoFonts = [
  "Helvetica Neue, Helvetica, Arial, sans-serif",
  "'Times New Roman', Times, serif",
  "Georgia, serif",
  "'EB Garamond', serif",
  "'Libre Baskerville', serif",
  "'Cormorant Garamond', serif",
  "Impact, Haettenschweiler, sans-serif",
  "'Oswald', sans-serif",
  "'Bebas Neue', sans-serif",
  "'Courier Prime', monospace",
  "'Space Mono', monospace",
  "'Roboto Mono', monospace",
  "'Playfair Display', serif",
  "'DM Serif Display', serif",
  "'Bodoni Moda', serif",
  "'Pacifico', cursive",
  "'Permanent Marker', cursive",
  "'Righteous', cursive",
  "Papyrus, fantasy",
  "'Comic Sans MS', 'Chalkboard SE', cursive",
  "'Fredoka One', cursive",
  "'Boogaloo', cursive",
];

const logoColors = [
  "#e63b2e","#e8720c","#d4a017","#2e7d32",
  "#1565c0","#6a1b9a","#ad1457","#00838f",
  "#4e342e","#37474f",
];

const logoName   = "Yoel Hayoun";
let logoFontIndex = 0;

function randomColor() {
  return logoColors[Math.floor(Math.random() * logoColors.length)];
}

function applyLogoStyle(el) {
  logoFontIndex = (logoFontIndex + 1) % logoFonts.length;
  el.style.fontFamily = logoFonts[logoFontIndex];

  const roll = Math.random();
  if (roll < 0.40) {
    el.innerHTML  = logoName;
    el.style.color = "#111";
  } else if (roll < 0.75) {
    el.innerHTML  = logoName;
    el.style.color = randomColor();
  } else {
    el.style.color = "";
    el.innerHTML = logoName
      .split("")
      .map(ch => ch === " " ? " " : `<span style="color:${randomColor()}">${ch}</span>`)
      .join("");
  }
}

// ================= ROUTING =================
const params  = new URLSearchParams(window.location.search);
const page    = params.get("page");   // "info" | "contact" | null
const yearParam = params.get("year");

const years   = [...new Set(works.map(w => w.year))].sort((a, b) => b - a);
const activeYear = parseInt(yearParam) || years[0];

const main    = document.getElementById("main-content");
const yearNav = document.getElementById("year-nav");

// ================= BUILD YEAR NAV =================
years.forEach(year => {
  const a = document.createElement("a");
  a.textContent = year;
  a.href = `?year=${year}`;
  // Active if we're on a works page AND this year matches
  if (!page && year === activeYear) a.classList.add("active");
  yearNav.appendChild(a);
});

// Mark Info / Contact active links
document.querySelectorAll(".site-nav > a").forEach(a => {
  const href = new URLSearchParams(new URL(a.href, location.origin).search).get("page");
  if (href === page) a.classList.add("active");
});

// ================= LOGO =================
const logoEl = document.querySelector(".site-name");
if (logoEl) {
  logoEl.addEventListener("click", e => {
    e.preventDefault();
    applyLogoStyle(logoEl);
  });
}

// ================= RENDER PAGE =================
if (page === "info") {
  renderInfo();
} else if (page === "contact") {
  renderContact();
} else {
  renderWorks();
}

// ---- Works ----
function renderWorks() {
  const grid = document.createElement("div");
  grid.className = "works-grid";
  main.appendChild(grid);

  const group = works.filter(w => w.year === activeYear);

  group.forEach((work, groupIndex) => {
    const div = document.createElement("div");
    div.classList.add("work-item");
    const img = document.createElement("img");
    img.src = work.src;
    img.alt = "";
    div.appendChild(img);
    grid.appendChild(div);
    div.addEventListener("click", () => openLightbox(group, groupIndex));
  });
}

// ---- Info ----
function renderInfo() {
  main.innerHTML = `
    <div class="text-page">
      <p>${info.statement}</p>
      <div class="cv">
        <h2>CV</h2>
        <ul>
          ${info.cv.map(item => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

// ---- Contact ----
function renderContact() {
  main.innerHTML = `
    <div class="text-page">
      <p><a href="mailto:${contact.email}">${contact.email}</a></p>
      <p>${contact.instagram}</p>
    </div>
  `;
}

// ================= LIGHTBOX =================
const lightbox    = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxDesc= document.getElementById("lightbox-desc");
const closeBtn    = document.getElementById("close");
const prevBtn     = document.getElementById("lb-prev");
const nextBtn     = document.getElementById("lb-next");

let currentGroup = [];
let currentIndex = 0;

function openLightbox(group, index) {
  currentGroup = group;
  currentIndex = index;
  updateLightbox();
  lightbox.style.display = "flex";
}

function updateLightbox() {
  const work = currentGroup[currentIndex];
  lightboxImg.src = work.src;
  lightboxDesc.textContent   = work.description || "";
  lightboxDesc.style.display = work.description ? "block" : "none";
  prevBtn.style.display = currentGroup.length > 1 ? "block" : "none";
  nextBtn.style.display = currentGroup.length > 1 ? "block" : "none";
}

function closeLightbox() { lightbox.style.display = "none"; }
function showNext() { currentIndex = (currentIndex + 1) % currentGroup.length; updateLightbox(); }
function showPrev() { currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length; updateLightbox(); }

if (lightbox) {
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener("keydown", e => {
    if (lightbox.style.display === "none") return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft")  showPrev();
  });
}
