/**
 * CHAKRI CAPTURES — MASTER JAVASCRIPT
 * Plain Vanilla JavaScript implementation without external libraries or frameworks.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 1. Navigation Scroll Spy & Header Background Shift
  // --------------------------------------------------------------------------
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const heroSection = document.getElementById('home');

  function updateNav() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = heroSection ? heroSection.offsetHeight : 500;

    // Header background shift after hero
    if (scrollY > heroHeight - 120) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }

    // Scroll spy for active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Smooth Scrolling for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Fullscreen Mobile Navigation
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavModal = document.getElementById('mobileNavModal');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNavModal.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeMobileNav() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNavModal.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  if (hamburgerBtn && mobileNavModal) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileNavModal.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    mobileNavModal.addEventListener('click', (e) => {
      if (e.target === mobileNavModal) {
        closeMobileNav();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Hero Visual Reveal & Parallax
  // --------------------------------------------------------------------------
  const heroBgImage = document.querySelector('.hero-bg-image');
  const heroContent = document.querySelector('.hero-content');

  if (heroBgImage) {
    if (heroBgImage.complete) {
      heroBgImage.classList.add('loaded');
    } else {
      heroBgImage.addEventListener('load', () => {
        heroBgImage.classList.add('loaded');
      });
    }
  }

  if (heroContent) {
    // Reveal hero text smoothly
    setTimeout(() => {
      heroContent.classList.add('revealed');
    }, 200);
  }

  // Subtle restrained parallax on hero
  if (!prefersReducedMotion && heroBgImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY <= window.innerHeight) {
        heroBgImage.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 4. Scroll-Triggered Element Reveals (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.about-img-box, .about-content, .service-card, .gallery-tile, .contact-content'
  );

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target); // Runs once per element
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
      // Stagger animation timing for cards
      if (el.classList.contains('service-card')) {
        el.style.transitionDelay = `${(index % 3) * 0.15}s`;
      }
      observer.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --------------------------------------------------------------------------
  // 5. Gallery Category Filtering & Active State
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryTiles = document.querySelectorAll('.gallery-tile');

  // Keep track of currently visible tiles for lightbox navigation
  let visibleTiles = Array.from(galleryTiles);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      visibleTiles = [];
      galleryTiles.forEach(tile => {
        const tileCat = tile.getAttribute('data-category');
        if (filterValue === 'all' || tileCat === filterValue) {
          tile.classList.remove('filtered-out');
          visibleTiles.push(tile);
        } else {
          tile.classList.add('filtered-out');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. Accessible Lightbox with Filter Integration & Touch Gestures
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxMetaCat = document.getElementById('lightboxMetaCat');
  const lightboxMetaTitle = document.getElementById('lightboxMetaTitle');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  let currentFilteredIndex = 0;
  let lastFocusedElement = null;

  function openLightbox(tileElement) {
    lastFocusedElement = tileElement;
    currentFilteredIndex = visibleTiles.indexOf(tileElement);
    if (currentFilteredIndex === -1) currentFilteredIndex = 0;

    renderLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    if (lightboxCloseBtn) lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function renderLightboxContent() {
    if (!visibleTiles.length) return;
    const currentTile = visibleTiles[currentFilteredIndex];
    if (!currentTile) return;

    const img = currentTile.querySelector('img');
    const cat = currentTile.querySelector('.gallery-tile-cat');
    const title = currentTile.querySelector('.gallery-tile-title');

    if (img && lightboxImg) {
      lightboxImg.src = img.getAttribute('src');
      lightboxImg.alt = img.getAttribute('alt') || '';
    }

    if (cat && lightboxMetaCat) {
      lightboxMetaCat.textContent = cat.textContent;
    }

    if (title && lightboxMetaTitle) {
      lightboxMetaTitle.textContent = title.textContent;
    }
  }

  function prevImage() {
    if (!visibleTiles.length) return;
    currentFilteredIndex = (currentFilteredIndex - 1 + visibleTiles.length) % visibleTiles.length;
    renderLightboxContent();
  }

  function nextImage() {
    if (!visibleTiles.length) return;
    currentFilteredIndex = (currentFilteredIndex + 1) % visibleTiles.length;
    renderLightboxContent();
  }

  // Attach click & enter triggers to gallery tiles
  galleryTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      openLightbox(tile);
    });

    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(tile);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevImage);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextImage);

  // Close lightbox on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation & Escape support
  window.addEventListener('keydown', (e) => {
    // If mobile menu is open
    if (mobileNavModal && mobileNavModal.classList.contains('open') && e.key === 'Escape') {
      closeMobileNav();
      return;
    }

    // If lightbox is open
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    }
  });

  // Touch swipe support for mobile lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const threshold = 50; // min swipe threshold
    if (swipeDistance > threshold) {
      // Swiped right -> previous image
      prevImage();
    } else if (swipeDistance < -threshold) {
      // Swiped left -> next image
      nextImage();
    }
  }

  // --------------------------------------------------------------------------
  // 7. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  }
});

