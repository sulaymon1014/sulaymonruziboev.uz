document.addEventListener("DOMContentLoaded", function () {
  // ===== NAV BAR START =====
  const header = document.querySelector('header');
  const scrollWatcher = document.createElement('div');

  scrollWatcher.setAttribute('data-scroll-watcher', '');
  header.before(scrollWatcher);

  const navObserver = new IntersectionObserver((entries) => {
    header.classList.toggle('sticking', !entries[0].isIntersecting)
  });

  navObserver.observe(scrollWatcher)

  // ===== HERO SLIDER START =====
  const heroSlides = document.querySelectorAll(".hero-slide");
  const indicators = document.querySelectorAll(".hero-indicator");
  const pauseBtn = document.querySelector(".hero-pause");
  const pauseIcon = pauseBtn ? pauseBtn.querySelector(".icon-pause") : null;
  const playIcon = pauseBtn ? pauseBtn.querySelector(".icon-play") : null;

  if (heroSlides.length && indicators.length && pauseBtn) {
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;

    function showSlide(index) {
      heroSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        indicators[i].classList.toggle("active", i === index);
      });

      currentSlide = index;
    }

    function nextSlide() {
      const newIndex = (currentSlide + 1) % heroSlides.length;
      showSlide(newIndex);
    }

    function startSlider() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    indicators.forEach((indicator, i) => {
      indicator.addEventListener("click", () => {
        clearInterval(slideInterval);
        showSlide(i);
        startSlider();
      });
    });

    pauseBtn.addEventListener("click", () => {
      if (!isPaused) {
        clearInterval(slideInterval);
        pauseBtn.classList.add("paused");
        pauseIcon.style.display = "none";
        playIcon.style.display = "block";
        isPaused = true;
      } else {
        startSlider();
        pauseBtn.classList.remove("paused");
        pauseIcon.style.display = "block";
        playIcon.style.display = "none";
        isPaused = false;
      }
    });

    showSlide(0);
    startSlider();
  }

  const heroText = document.querySelector('.hero-text');

  if (heroText) {
    setTimeout(() => {
      heroText.classList.add('show');
    }, 500); // delay to ensure it appears after slide loads
  }

  // ===== HERO SLIDER END =====

  // ===== PROJECTS SWIPER START =====
  if (typeof Swiper !== "undefined") {
    const swiper = new Swiper(".swiper-container", {
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 100,
      navigation: {
        nextEl: ".lam-carousel__control--next",
        prevEl: ".lam-carousel__control--prev",
      },
    });

    const descriptions = [
      "Custom YouTube designs featuring banners, thumbnails, and logos crafted to make channels stand out. Each piece blends creativity, style, and branding to attract viewers and leave a memorable impression.",
      "Eye-catching Instagram visuals designed to elevate profiles and campaigns. From covers to logos and ads, every piece is crafted with bold design choices and attention to detail that capture the audience’s attention.",
      "Comprehensive logo designs for brands, startups, and businesses, including brand books and logo guidelines. Each design reflects the brand’s identity with creativity and professionalism, ensuring a consistent and memorable visual presence.",
      "Creative covers, promotional visuals, and logos tailored for streamers and small businesses.",
      "Dynamic YouTube project visuals, including banners, thumbnails, and branding elements for content growth."
    ];

    swiper.on('slideChange', function () {
      document.getElementById('slide-description').textContent = descriptions[this.realIndex];
    });
  }

  // ===== PROJECTS SWIPER END =====


  // ===== NAV BAR BLOCKING SCROLLBAR FIX START =====
  const navBlock = document.querySelector("header");

  function getScrollbarWidth() {
    const div = document.createElement("div");
    div.style.visibility = "hidden";
    div.style.overflow = "scroll";
    div.style.position = "absolute";
    div.style.width = "100px";
    div.style.height = "100px";
    document.body.appendChild(div);

    const innerDiv = document.createElement("div");
    innerDiv.style.width = "100%";
    innerDiv.style.height = "100%";
    div.appendChild(innerDiv);

    const scrollbarWidth = div.offsetWidth - innerDiv.offsetWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
  }

  function updateNavBlockWidth() {
    if (!navBlock) return;
    const scrollWidth = getScrollbarWidth();
    navBlock.style.width = `calc(100vw - ${scrollWidth}px)`;
  }

  updateNavBlockWidth();
  window.addEventListener("resize", updateNavBlockWidth);
  // ===== NAV BACKGROUND BLOCK WIDTH FIX END =====


  const orderSlides = document.querySelectorAll("#recent-orders .slide");
  let orderIndex = 0;

  if (orderSlides.length) {
    function showOrderSlide(index) {
      orderSlides.forEach((slide, i) =>
        slide.classList.toggle("active", i === index)
      );
    }

    function nextOrderSlide() {
      orderIndex = (orderIndex + 1) % orderSlides.length;
      showOrderSlide(orderIndex);
    }

    setInterval(nextOrderSlide, 3000); // change every 3s
    showOrderSlide(0);
  }


  // ===== RECENT ORDERS SECTION  =====


  // ===== RECENT ORDERS POPUP START =====
  const orderCards = document.querySelectorAll(".order-card");
  const popupOverlay = document.querySelector(".popup-overlay");
  const popupImage = popupOverlay.querySelector(".popup-content img");
  const popupClose = popupOverlay.querySelector(".popup-close");

  // Click on order card to open popup
  orderCards.forEach(card => {
    card.addEventListener("click", () => {
      const imgSrc = card.querySelector("img").src;
      popupImage.src = imgSrc;
      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // prevent scroll
    });
  });

  // Click on close button to hide popup
  popupClose.addEventListener("click", () => {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  });

  // Click outside the popup content to close
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = ""; // restore scroll
    }
  });
  // ===== RECENT ORDERS POPUP END =====




  // ===== RECENT ORDERS SECTION END =====

});



// ===== RECENT ORDERS FLASHLIGHT =====




// Spotlight effect only for this section
const recentOrders = document.getElementById("recent-orders");
const spotlight = recentOrders.querySelector(".orders-spotlight");

recentOrders.addEventListener("mousemove", (e) => {
  const rect = recentOrders.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  spotlight.style.setProperty("--x", `${x}px`);
  spotlight.style.setProperty("--y", `${y}px`);
});

// Move spotlight off-screen when leaving
recentOrders.addEventListener("mouseleave", () => {
  spotlight.style.setProperty("--x", `-500px`);
  spotlight.style.setProperty("--y", `-500px`);
});

const orderCards = document.querySelectorAll(".order-card");

// Create backdrop (only once)
const backdrop = document.createElement("div");
backdrop.classList.add("lightbox-backdrop");
document.body.appendChild(backdrop);

orderCards.forEach(card => {
  card.addEventListener("click", () => {
    // Clear previous expanded content
    backdrop.innerHTML = "";

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("lightbox-content");

    // Clone only the image
    const img = card.querySelector("img").cloneNode(true);
    wrapper.appendChild(img);

    backdrop.appendChild(wrapper);
    backdrop.classList.add("active");
    document.body.classList.add("no-scroll");
  });
});

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    backdrop.classList.remove("active");
    document.body.classList.remove("no-scroll");
    backdrop.innerHTML = "";
  }
});




// Slight parallax effect






// I LEFT HERE !!!!!!!!!!!!!!!!!!!!

