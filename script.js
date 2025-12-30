
// Scroll vertical controlando horizontal
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  document.querySelector(".horizontal").style.transform =
    `translateX(-${scrollTop}px)`;
});

document.body.style.height = "400vw";

// Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".fade, .slide-left").forEach(el => {
  observer.observe(el);
});
