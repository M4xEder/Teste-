/* ===============================
   MENU MOBILE
================================ */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

/* ===============================
   ANIMAÇÕES FADE / SLIDE
================================ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade, .slide-left').forEach(el => {
  observer.observe(el);
});

/* ===============================
   SCROLL HORIZONTAL (DESKTOP)
================================ */
const track = document.querySelector('.track');
const sections = document.querySelectorAll('.section');

if (window.innerWidth > 900) {
  let current = 0;

  window.addEventListener('wheel', e => {
    if (document.querySelector('.js-scroll-list:hover')) return;

    if (e.deltaY > 0 && current < sections.length - 1) {
      current++;
    } else if (e.deltaY < 0 && current > 0) {
      current--;
    }

    track.style.transform = `translateX(-${current * 100}vw)`;
  });

  /* MENU LINKS */
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      current = Number(link.dataset.index);
      track.style.transform = `translateX(-${current * 100}vw)`;

      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ===============================
   SCROLL PROJETOS (DESKTOP)
================================ */
if (window.innerWidth > 900) {

  const Scrollbar = window.Scrollbar;
  const list = document.querySelector('.js-scroll-list');

  if (list && Scrollbar) {

    Scrollbar.use(window.OverscrollPlugin);

    const scrollbar = Scrollbar.init(list, {
      damping: 0.08,
      alwaysShowTracks: false,
      plugins: {
        overscroll: true
      }
    });

    const items = document.querySelectorAll('.js-scroll-list-item');

    if (items.length) {
      items[0].classList.add('item-focus');
      if (items[1]) items[1].classList.add('item-next');
    }

    scrollbar.addListener(status => {
      const top = status.offset.y;

      items.forEach((item, index) => {
        const offset = item.offsetTop;
        const distance = Math.abs(top - offset);

        item.classList.remove('item-focus', 'item-next', 'item-hide');

        if (distance < 60) {
          item.classList.add('item-focus');
          if (items[index + 1]) items[index + 1].classList.add('item-next');
        } else if (offset < top) {
          item.classList.add('item-hide');
        }
      });
    });
  }
}
