jQuery(function ($) {
  // Open and Close Menu
  const body = document.querySelector('body');
  const btn = document.querySelector('.btn-menu');
  const label = document.querySelector('.btn-menu__label');
  const menu = document.querySelector('.header__menu');

  btn.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    menu.classList.toggle('header__menu--expand');

    if (body.classList.contains('menu-open')) {
      label.innerHTML = 'Close';
    } else {
      label.innerHTML = 'Menu';
    }
  });

  // Home Intro - Image Loop
  function imageLoop() {
    const images = document.querySelectorAll('.home-intro__image');
    const intervalTime = 750;

    images.forEach((image, idx) => {
      const length = images.length;

      const interval = setInterval(() => {
        images[idx].style.display = 'none';
        idx === length - 1 ? (idx = 0) : idx++;
        images[idx].style.display = 'block';
      }, intervalTime);
    });
  }

  imageLoop();

  // Home Specials (Marquee)
  const imageLink = document.querySelector('.home-specials');
  const image = document.querySelector('.home-specials__image');
  const marquee = document.querySelector('.home-specials__marquee');

  if (imageLink && image) {
    imageLink.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const w = window.innerWidth / 2;
      rotation = gsap.utils.interpolate(
        -20,
        20,
        gsap.utils.normalize(-w, w, x - w)
      );

      gsap.to(image, {
        autoAlpha: 1,
        xPercent: -50,
        x,
        rotation,
        scale: 1,
        display: 'block',
        duration: 0.2,
      });
    });

    imageLink.addEventListener('mouseleave', () => {
      gsap.to(image, {
        autoAlpha: 0,
        scale: 0.7,
        display: 'none',
        duration: 0.2,
      });
    });
  }

  function handleMarquee() {
    let spanWidth = parseInt(
      getComputedStyle(marquee.querySelector('span')).width,
      10
    );
    gsap.fromTo(
      marquee,
      { x: 0 },
      {
        x: -spanWidth,
        duration: 5,
        ease: 'linear',
        repeat: -1,
        overwrite: true,
      }
    );
  }

  if (marquee) {
    handleMarquee();
    window.addEventListener('resize', () => {
      handleMarquee();
    });
  }

  // Home Slider
  const slider = document.querySelector('.home-slider');

  if (slider) {
    const swiper = new Swiper('.home-slider', {
      autoplay: {
        delay: 4000,
      },

      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },

      keyboard: {
        enabled: true,
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  // Text and Image Animations
  gsap.registerPlugin(ScrollTrigger);

  let textReveal = gsap.utils.toArray('.text-and-image__text--reveal');
  let imageReveal = gsap.utils.toArray(
    '.text-and-image__image-container--reveal'
  );

  ScrollTrigger.saveStyles([...textReveal, ...imageReveal]);
  ScrollTrigger.matchMedia({
    '(min-width: 768px)': () => {
      textReveal.forEach((text) => {
        gsap.from(text, {
          y: 100,
          scrollTrigger: {
            trigger: text,
            scrub: true,
          },
        });
        gsap.from(text, {
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            start: 'top bottom-=100px',
            trigger: text,
          },
        });
      });
      imageReveal.forEach((container) => {
        gsap.from(container, {
          opacity: 0,
          y: 20,
          duration: 1,
          scrollTrigger: {
            trigger: container,
          },
        });
      });
    },
  });

  // Alert Modal
  var $alert = $('#modal-alert');

  function setAlertCookie() {
    var token = $alert.data('alert-token');
    Cookies.set('alertModal', token, { expires: 30 });
  }

  // Check if alert is enabled
  if ($alert.length) {
    var token = $alert.data('alert-token');
    var cookie = Cookies.get('alertModal');

    // Show alert if cookie is not equal to the token
    if (cookie !== token) {
      $alert.modal('show');
    }

    // Set alert cookie on alert dismiss
    $alert.on('hidden.bs.modal', function () {
      setAlertCookie();
    });

    // Set alert cookie on "more" link click
    $alert.find('a.modal-alert__btn').on('click', function () {
      setAlertCookie();
    });
  }

  // Mobile mega menu controls
  /* $(".main-menu__toggle").on("click", function (e) {
    var parent = $(this).parents(".menu-item-has-children");
    if (parent.hasClass("menu-item--show-sub")) {
      parent.removeClass("menu-item--show-sub");
    } else {
      $(".menu-item").removeClass("menu-item--show-sub");
      parent.addClass("menu-item--show-sub");
    }
  });

  $(".main-menu__back").on("click", function (e) {
    $(this)
      .parents(".menu-item-has-children")
      .removeClass("menu-item--show-sub");
  }); */
});
