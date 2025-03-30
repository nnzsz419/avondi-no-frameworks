// link bg colors
document.querySelectorAll('.primary-link').forEach(link => {
  const bg = link.dataset.bg;
  const color = link.dataset.color;
  link.style.setProperty('--hover-bg', bg);
  link.style.setProperty('--hover-color', color);
});

// background changes on hover
document.querySelectorAll('.how-card').forEach(card => {
  const howSection = document.querySelector('.how-it-works');
  const chevrons = document.querySelectorAll('.chevron-top, .chevron-bottom');
  const howText = document.querySelector('.how-text');

  const bgColor = card.dataset.bg;
  const chevronColor = card.dataset.chevron;
  const textColor = card.dataset.text;

  card.addEventListener('mouseenter', () => {
    if (bgColor) howSection.style.backgroundColor = bgColor;
    if (chevronColor) {
      chevrons.forEach(chev => {
        chev.style.backgroundColor = chevronColor;
      });
    }
    if (textColor) {
      howText.querySelectorAll('h2, p').forEach(el => {
        el.style.color = textColor;
      });
    }
  });

  card.addEventListener('mouseleave', () => {
    howSection.style.backgroundColor = '';
    chevrons.forEach(chev => {
      chev.style.backgroundColor = '';
    });
    howText.querySelectorAll('h2, p').forEach(el => {
      el.style.color = '#000';
    });
  });

});

// carousel
const carouselTrack = document.querySelector('.carousel-signup-carousel .carousel-track');

if (carouselTrack) {
  const originalSlides = Array.from(carouselTrack.children);
  originalSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    carouselTrack.appendChild(clone);
  });

  let startX = 0;
  let scrollLeft = 0;
  let isTouching = false;

  carouselTrack.addEventListener('touchstart', (e) => {
    isTouching = true;
    startX = e.touches[0].pageX;
    scrollLeft = carouselTrack.scrollLeft;
  });

  carouselTrack.addEventListener('touchmove', (e) => {
    if (!isTouching) return;
    const x = e.touches[0].pageX;
    const walk = startX - x;
    carouselTrack.scrollLeft = scrollLeft + walk;
  });

  carouselTrack.addEventListener('touchend', () => {
    isTouching = false;
  });
}

// slider cards
document.querySelectorAll('.card-slide').forEach(card => {
  const content = card.querySelector('.card-content');
  const forwardBtn = card.querySelector('.slide-toggle');
  const backBtn = card.querySelector('.slide-back');
  let isFlipped = false;

  forwardBtn.addEventListener('click', () => {
    content.style.transform = 'translateX(-50%)';
    isFlipped = true;
  });

  backBtn.addEventListener('click', () => {
    content.style.transform = 'translateX(0)';
    isFlipped = false;
  });

  let startX = 0;

  card.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  card.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      content.style.transform = 'translateX(-50%)';
      isFlipped = true;
    } else if (endX - startX > 50) {
      content.style.transform = 'translateX(0)';
      isFlipped = false;
    }
  });

  let mouseDown = false;
  let dragStartX = 0;

  card.addEventListener('mousedown', e => {
    mouseDown = true;
    dragStartX = e.clientX;
  });

  card.addEventListener('mouseup', e => {
    if (!mouseDown) return;
    mouseDown = false;
    const dragEndX = e.clientX;
    if (dragStartX - dragEndX > 50) {
      content.style.transform = 'translateX(-50%)';
      isFlipped = true;
    } else if (dragEndX - dragStartX > 50) {
      content.style.transform = 'translateX(0)';
      isFlipped = false;
    }
  });
});

