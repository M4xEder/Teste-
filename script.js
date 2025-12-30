const track = document.querySelector(".track");
const sections = document.querySelectorAll(".section");
const links = document.querySelectorAll("nav a");
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");

function isDesktop() {
  return window.innerWidth > 900;
}

function setHeight() {
  document.body.style.height = isDesktop()
    ? `${sections.length * 100}vh`
    : "auto";
}

function horizontalScroll() {
  if (!isDesktop()) return;

  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const maxTranslate = track.scrollWidth - window.innerWidth;

  const progress = scrollTop / maxScroll;
  track.style.transform = `translateX(-${progress * maxTranslate}px)`;
}

window.addEventListener("scroll", horizontalScroll);
window.addEventListener("resize", () => {
  setHeight();
  horizontalScroll();
});

setHeight();

/* MENU CLICK */
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const index = link.dataset.index;

    if (isDesktop()) {
      window.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth"
      });
    } else {
      sections[index].scrollIntoView({ behavior: "smooth" });
      nav.classList.remove("open");
    }
  });
});

/* MENU ATIVO */
window.addEventListener("scroll", () => {
  if (!isDesktop()) return;

  const index = Math.round(window.scrollY / window.innerHeight);
  links.forEach(l => l.classList.remove("active"));
  links[index]?.classList.add("active");
});

/* MOBILE MENU */
hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

/* ANIMAÇÕES */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".fade, .slide-left").forEach(el => {
  observer.observe(el);
});
