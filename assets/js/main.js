/**
 * Chakri Captures — Interactive Portfolio Engine
 * Author: Chakri Captures
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gallery Data Mapping
  const galleryItems = [
    {
      id: 1,
      src: 'assets/images/hero.jpg',
      category: 'portrait',
      categoryName: 'Photographer Portrait',
      title: 'The Eye Behind the Lens',
      desc: 'Candid outdoor portrait of Chakri holding his Nikon camera, surveying the light and preparing to frame raw moments.'
    },
    {
      id: 2,
      src: 'assets/images/portrait-2.jpg',
      category: 'portrait',
      categoryName: 'Photographer Portrait',
      title: 'Contemplation & Canvas',
      desc: 'Artistic fine art sepia profile of Chakri in formal suit, reflecting upon visual composition and creative philosophy.'
    },
    {
      id: 3,
      src: 'assets/images/gokart-1.jpg',
      category: 'gokart',
      categoryName: 'Go-Kart',
      title: 'Apex Velocity: Kart #6',
      desc: 'High-speed track action capturing racer in vibrant red jumpsuit maneuvering through asphalt turns under natural daylight.'
    },
    {
      id: 4,
      src: 'assets/images/gokart-2.jpg',
      category: 'gokart',
      categoryName: 'Go-Kart',
      title: 'Vega Captain',
      desc: 'Motorsport racing captain in Vega flight suit and Axor helmet walking purposefully toward the racing grid.'
    },
    {
      id: 5,
      src: 'assets/images/nature-1.jpg',
      category: 'nature',
      categoryName: 'Nature and Sky',
      title: 'Golden Tide Horizon',
      desc: 'Tranquil coastal golden hour with breaking ocean foam and gleaming sunbeam reflection across wet sand.'
    },
    {
      id: 6,
      src: 'assets/images/nature-2.jpg',
      category: 'nature',
      categoryName: 'Nature and Sky',
      title: 'Twilight Thunderhead',
      desc: 'Massive atmospheric cumulus cloud formations glowing in molten amber against deep nocturnal skies.'
    },
    {
      id: 7,
      src: 'assets/images/nature-3.jpg',
      category: 'nature',
      categoryName: 'Nature and Sky',
      title: 'Dusk Over the Ghats',
      desc: 'Golden sun sinking behind silhouetted mountain ranges and palm trees with piercing crepuscular rays.'
    },
    {
      id: 8,
      src: 'assets/images/nature-4.jpg',
      category: 'nature',
      categoryName: 'Nature and Sky',
      title: 'Solar Tapestry',
      desc: 'High dynamic range sunburst radiating through layered cloud textures in deep cyan skies.'
    },
    {
      id: 9,
      src: 'assets/images/animal-1.jpg',
      category: 'animals',
      categoryName: 'Animals',
      title: 'Feline Sentinel',
      desc: 'Striking eye-level focus on a domestic striped tabby with luminous amber eyes against rustic painted walls.'
    },
    {
      id: 10,
      src: 'assets/images/animal-2.jpg',
      category: 'animals',
      categoryName: 'Animals',
      title: 'Curious Watchers',
      desc: 'Intimate low-light study of alert grey feline eyes with companion silhouette peeking from background shadows.'
    },
    {
      id: 11,
      src: 'assets/images/animal-3.jpg',
      category: 'animals',
      categoryName: 'Animals',
      title: 'Shoreline Steed',
      desc: 'Sepia fine art composition of a saddled white horse and handler pacing the sandy coast beneath coastal thatch.'
    },
    {
      id: 12,
      src: 'assets/images/festival-1.jpg',
      category: 'festivals',
      categoryName: 'Festivals',
      title: 'Radha & Krishna: Vasantotsav',
      desc: 'Cultural festival enactment with Krishna in sacred yellow dhoti presenting red gulal powder to maiden in traditional attire.'
    },
    {
      id: 13,
      src: 'assets/images/festival-2.jpg',
      category: 'festivals',
      categoryName: 'Festivals',
      title: 'Invocation of Mahakali',
      desc: 'Mesmerizing nocturnal ritual performance with goddess impersonator holding blazing fire torches in both hands.'
    },
    {
      id: 14,
      src: 'assets/images/still-life-1.jpg',
      category: 'still-life',
      categoryName: 'Everyday and Still Life',
      title: 'Aromatic Vapor',
      desc: 'Warm backlit café still life featuring rising steam plumes in front of typography art celebrating coffee.'
    },
    {
      id: 15,
      src: 'assets/images/still-life-2.jpg',
      category: 'still-life',
      categoryName: 'Everyday and Still Life',
      title: 'Verses in Crimson',
      desc: 'Romantic macro composition of deep red roses resting upon handwritten calligraphy parchment and metallic fabric.'
    },
    {
      id: 16,
      src: 'assets/images/still-life-3.jpg',
      category: 'still-life',
      categoryName: 'Everyday and Still Life',
      title: 'Solitary Beacon',
      desc: 'Architectural silhouette of an ornate wrought-iron lantern post framed against vast drifting cloud banks.'
    },
    {
      id: 17,
      src: 'assets/images/still-life-4.jpg',
      category: 'still-life',
      categoryName: 'Everyday and Still Life',
      title: 'Soul of the Street',
      desc: 'Tender black-and-white documentary portrait of an elderly woman smiling warmly during daily preparation (@Chakri_Captures_).'
    }
  ];

  // 2. Render Gallery Cards
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    galleryGrid.innerHTML = galleryItems.map((item, index) => `
      <article class="gallery-item" data-category="${item.category}" data-index="${index}" tabindex="0" role="button" aria-label="View photo: ${item.title}">
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-overlay">
          <span class="gallery-item-cat">${item.categoryName}</span>
          <h3 class="gallery-item-title">${item.title}</h3>
          <span class="gallery-item-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
            Click to View Full Frame
          </span>
        </div>
      </article>
    `).join('');
  }

  // 3. Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allCards = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      allCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 4. Interactive Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxCat.textContent = item.categoryName;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  // Gallery Card Click
  allCards.forEach(card => {
    card.addEventListener('click', () => {
      const index = parseInt(card.getAttribute('data-index'), 10);
      openLightbox(index);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const index = parseInt(card.getAttribute('data-index'), 10);
        openLightbox(index);
      }
    });
  });

  // Highlight Cards click to open lightbox
  document.querySelectorAll('.highlight-card').forEach(card => {
    card.addEventListener('click', () => {
      const targetId = parseInt(card.getAttribute('data-id'), 10);
      const foundIdx = galleryItems.findIndex(i => i.id === targetId);
      if (foundIdx !== -1) {
        openLightbox(foundIdx);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Close on backdrop click
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // 5. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeToggleBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
    }
  }

  // 6. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 7. Header Scroll Shadow
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 8. Contact & Booking Form Simulation
  const bookingForm = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');

  if (bookingForm && formStatus) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formStatus.textContent = 'Thank you! Your inquiry has been sent to Chakri Captures. We will get back to you within 24 hours.';
        formStatus.className = 'form-status success';
        bookingForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 6000);
      }, 1200);
    });
  }

  // 9. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
