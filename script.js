const track = document.querySelector(".track");
const sections = document.querySelectorAll(".section");

// Altura fake pra scroll vertical
document.body.style.height = `${sections.length * 100}vh`;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - innerHeight;
  const maxTranslate = track.scrollWidth - innerWidth;

  const progress = scrollTop / maxScroll;
  track.style.transform = `translateX(-${progress * maxTranslate}px)`;
});

// Observer animações
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".fade, .slide-left").forEach(el => {
  observer.observe(el);
});
