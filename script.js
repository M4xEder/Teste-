$(document).ready(function () {

  if (window.innerWidth <= 900) {
  return;
}
  /* MENU MOBILE */
  $('#hamburger').on('click', function () {
    $('#nav').toggleClass('open');
  });

  /* FADE AO SCROLL */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade').forEach(el => observer.observe(el));

  /* SMOOTH SCROLL PROJETOS */
  const Scrollbar = window.Scrollbar;
  Scrollbar.use(window.OverscrollPlugin);

  const container = document.querySelector('.js-scroll-list');
  if (!container) return;

  const scrollbar = Scrollbar.init(container, {
    damping: 0.08,
    plugins: {
      overscroll: { effect: 'bounce' }
    }
  });

  const $items = $('.js-scroll-list-item');

  $items.addClass('item-hide');
  $items.eq(0).addClass('item-focus').removeClass('item-hide');
  $items.eq(1).addClass('item-next').removeClass('item-hide');

  let isSnapping = false;
  let timer;

  scrollbar.addListener(({ offset }) => {
    if (isSnapping) return;

    let closest = 0;
    let min = Infinity;

    $items.each(function (i) {
      const dist = Math.abs(offset.y - $(this).position().top);
      if (dist < min) {
        min = dist;
        closest = i;
      }
    });

    $items.removeClass('item-focus item-next').addClass('item-hide');
    $items.eq(closest).addClass('item-focus').removeClass('item-hide');
    $items.eq(closest + 1).addClass('item-next').removeClass('item-hide');
  });

  scrollbar.addListener(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let target = 0;
      let min = Infinity;

      $items.each(function () {
        const dist = Math.abs(scrollbar.offset.y - $(this).position().top);
        if (dist < min) {
          min = dist;
          target = $(this).position().top;
        }
      });

      isSnapping = true;
      scrollbar.scrollTo(0, target, 600);
      setTimeout(() => isSnapping = false, 650);
    }, 120);
  });

});
