import Swiper, { Navigation, Pagination } from 'swiper';
import charityArray from './support-items';
import imageArray from './support-img-array';

Swiper.use([Navigation, Pagination]);

const charityContainer = document.querySelector('.swiper-wrapper');

function createTemplate(objectArray, imageArray) {
  return objectArray
    .map((org, index) => {
      const images = imageArray[index];

      const image1x = images[`image${index + 1}`];
      const image2x = images[`image${index + 1}x2`];

      return `<li class="swiper-slide">
        <a
          class="charity-link"
          rel="nofollow noreferrer noopener"
          target="_blank"
          href="${org.url}"
        >
          <img
            src="${image1x}"
            srcset="${image2x} 2x"
            class="charity-img"
            alt="${org.title}"
          />
        </a>
      </li>`;
    })
    .join('');
}

let template = createTemplate(charityArray, imageArray);
charityContainer.insertAdjacentHTML('beforeend', template);

// --------------Swiper ------------

const swiperOptions = {
  direction: 'vertical',

  spaceBetween: 20,

  navigation: {
    nextEl: '.swiper-button-next',
  },

  observer: true,
  observeParents: true,
  slidesPerColumnFill: 'row',

  breakpoints: {
    320: {
      slidesPerView: 4,
    },

    768: {
      slidesPerView: 6,
    },

    1440: {
      slidesPerView: 6,
    },
  },
};

const swiper = new Swiper('.swiper', swiperOptions);

const upBtn = document.querySelector('.swiper-button-up');

window.addEventListener('resize', function () {
  swiper.update();
});

upBtn.addEventListener('click', () => {
  swiper.slideTo(0, 800);
  upBtn.classList.add('is-hidden');
});

swiper.on('slideChange', () => {
  const activeSlideIndex = swiper.activeIndex;
  const totalSlides = swiper.slides.length;

  let slideNumberToGoUp = totalSlides - getNumberOfClicksForSwiper();

  if (activeSlideIndex === slideNumberToGoUp) {
    upBtn.classList.remove('is-hidden');
  }
});

function getNumberOfClicksForSwiper() {
  const windowWidth = window.innerWidth;
  let currentSlidesPerView;

  if (windowWidth >= 1440) {
    currentSlidesPerView = swiperOptions.breakpoints[1440].slidesPerView;
  } else if (windowWidth >= 768) {
    currentSlidesPerView = swiperOptions.breakpoints[768].slidesPerView;
  } else {
    currentSlidesPerView = swiperOptions.breakpoints[320].slidesPerView;
  }

  return currentSlidesPerView;
}
