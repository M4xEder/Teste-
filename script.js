$(document).ready(function () {

  /* ==========================================
     INIT SMOOTH SCROLLBAR
  ========================================== */
  const Scrollbar = window.Scrollbar;
  const OverscrollPlugin = window.OverscrollPlugin;

  Scrollbar.use(OverscrollPlugin);

  const scrollContainer = document.querySelector('.js-scroll-list');

  if (!scrollContainer) return;

  const scrollbar = Scrollbar.init(scrollContainer, {
    damping: 0.08,
    alwaysShowTracks: false,
    plugins: {
      overscroll: {
        effect: 'bounce'
      }
    }
  });

  /* ==========================================
     ELEMENTOS
  ========================================== */
  const $items = $('.js-scroll-list-item');

  // Estado inicial
  $items.addClass('item-hide');
  $items.eq(0).removeClass('item-hide').addClass('item-focus');
  $items.eq(1).removeClass('item-hide').addClass('item-next');

  let isSnapping = false;
  let snapTimeout = null;

  /* ==========================================
     LISTENER DE SCROLL
  ========================================== */
  scrollbar.addListener(({ offset }) => {
    if (isSnapping) return;

    const scrollTop = offset.y;
    let closestIndex = 0;
    let closestDistance = Infinity;

    $items.each(function (index) {
      const itemTop = $(this).position().top;
      const distance = Math.abs(scrollTop - itemTop);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // Atualiza estados visuais
    $items
      .removeClass('item-focus item-next')
      .addClass('item-hide');

    $items.eq(closestIndex)
      .removeClass('item-hide')
      .addClass('item-focus');

    $items.eq(closestIndex + 1)
      .removeClass('item-hide')
      .addClass('item-next');
  });

  /* ==========================================
     SNAP AUTOMÁTICO AO PARAR O SCROLL
  ========================================== */
  scrollbar.addListener(() => {
    clearTimeout(snapTimeout);

    snapTimeout = setTimeout(() => {

      const scrollTop = scrollbar.offset.y;
      let targetY = 0;
      let closestDistance = Infinity;

      $items.each(function () {
        const itemTop = $(this).position().top;
        const distance = Math.abs(scrollTop - itemTop);

        if (distance < closestDistance) {
          closestDistance = distance;
          targetY = itemTop;
        }
      });

      isSnapping = true;
      scrollbar.scrollTo(0, targetY, 600);

      setTimeout(() => {
        isSnapping = false;
      }, 650);

    }, 120);
  });

});
