const goTopBtn = document.querySelector('.go-top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', goTop);

function trackScroll() {
  const scrollY = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrollY > coords) {
    goTopBtn.classList.add('go-top-show');
  } else {
    goTopBtn.classList.remove('go-top-show');
  }
}

function goTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -25);
    setTimeout(goTop, 0);
  }
}
