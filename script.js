/**
 * FOR ARUSHI JHA — INTERACTIVE & CINEMATIC SCRIPT
 * Features: Lenis Smooth Scrolling, Canvas Particles, Ambient Piano Audio,
 * 3D Envelope & Dedicated Keepsake Letter, Confetti Engine, Lightbox, Dynamic Wishes
 */

(function () {
  'use strict';

  // --- DOM Elements ---
  const loadingScreen = document.getElementById('loadingScreen');
  const loaderPhase1 = document.getElementById('loaderPhase1');
  const loaderPhase2 = document.getElementById('loaderPhase2');
  const loaderPhase3 = document.getElementById('loaderPhase3');
  const skipIntroBtn = document.getElementById('skipIntroBtn');

  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  const ambientCanvas = document.getElementById('ambientCanvas');
  const bgAudio = document.getElementById('bgAudio');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicStatusText = document.getElementById('musicStatusText');
  const motionToggleBtn = document.getElementById('motionToggleBtn');

  // Envelope & Letter Modal
  const envelopeContainer = document.getElementById('envelopeContainer');
  const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
  const envelopeBtnText = document.getElementById('envelopeBtnText');
  const letterModal = document.getElementById('letterModal');
  const letterModalBackdrop = document.getElementById('letterModalBackdrop');
  const letterModalCloseBtn = document.getElementById('letterModalCloseBtn');

  // Smile Section
  const smileCommitBtn = document.getElementById('smileCommitBtn');
  const smileFeedback = document.getElementById('smileFeedback');

  // Photo Swap & Upload
  const changePhotoBtn = document.getElementById('changePhotoBtn');
  const portraitFileInput = document.getElementById('portraitFileInput');
  const arushiPortraitImg = document.getElementById('arushiPortraitImg');

  // Timeline
  const timelineTrack = document.getElementById('timelineTrack');
  const timelineBar = document.getElementById('timelineBar');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  // Gallery & Lightbox
  const memoryGalleryGrid = document.getElementById('memoryGalleryGrid');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const addMemoryBtn = document.getElementById('addMemoryBtn');
  const memoryFileInput = document.getElementById('memoryFileInput');
  const galleryCount = document.getElementById('galleryCount');

  // Wishes Wall & Modal
  const wishesWallContainer = document.getElementById('wishesWallContainer');
  const addWishBtn = document.getElementById('addWishBtn');
  const addWishModal = document.getElementById('addWishModal');
  const wishModalBackdrop = document.getElementById('wishModalBackdrop');
  const wishModalCloseBtn = document.getElementById('wishModalCloseBtn');
  const cancelWishBtn = document.getElementById('cancelWishBtn');
  const addWishForm = document.getElementById('addWishForm');
  const wishInput = document.getElementById('wishInput');

  // Finale
  const finaleSequence = document.getElementById('finaleSequence');
  const finaleGrandReveal = document.getElementById('finaleGrandReveal');

  // State
  let currentLightboxIndex = 0;
  let galleryItems = [];
  let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isMusicPlaying = false;
  let lenisInstance = null;

  /* ==========================================================================
     1. LENIS SMOOTH SCROLLER INITIALIZATION
     ========================================================================== */
  function initLenis() {
    if (typeof Lenis !== 'undefined' && !isReducedMotion) {
      try {
        lenisInstance = new Lenis({
          duration: 1.3,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis initialization notice:', err);
      }
    }
  }

  /* ==========================================================================
     2. CINEMATIC LOADING EXPERIENCE
     ========================================================================== */
  function runCinematicLoader() {
    // Step 1: "A little something for…"
    setTimeout(() => {
      loaderPhase1.classList.add('visible');
    }, 400);

    // Step 2: "ARUSHI JHA"
    setTimeout(() => {
      loaderPhase2.classList.add('visible');
    }, 1700);

    // Step 3: "Made with lots of good wishes ✨"
    setTimeout(() => {
      loaderPhase3.classList.add('visible');
    }, 3100);

    // Step 4: Fade out loader
    setTimeout(() => {
      dismissLoader();
    }, 4700);
  }

  function dismissLoader() {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
      triggerHeroReveals();
      initLenis();
    }
  }

  skipIntroBtn.addEventListener('click', dismissLoader);
  window.addEventListener('DOMContentLoaded', runCinematicLoader);

  /* ==========================================================================
     3. AMBIENT CANVAS (STARS + FLOATING FLOWER PETALS)
     ========================================================================== */
  let ctx;
  let canvasWidth, canvasHeight;
  let stars = [];
  let petals = [];
  let mouse = { x: null, y: null };

  function initAmbientCanvas() {
    if (!ambientCanvas) return;
    ctx = ambientCanvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    createStars(80);
    createPetals(24);
    requestAnimationFrame(renderAmbientCanvas);
  }

  function resizeCanvas() {
    canvasWidth = ambientCanvas.width = window.innerWidth;
    canvasHeight = ambientCanvas.height = window.innerHeight;
  }

  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: ['#ffffff', '#ddd6fe', '#fbcfe8', '#fde68a'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function createPetals(count) {
    petals = [];
    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight - canvasHeight,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.25,
        color: Math.random() > 0.5 ? 'rgba(251, 207, 232, ' : 'rgba(221, 214, 254, '
      });
    }
  }

  function renderAmbientCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (!isReducedMotion) {
      // Draw Stars
      for (let star of stars) {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.9 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Petals
      for (let petal of petals) {
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > canvasHeight + 20) {
          petal.y = -20;
          petal.x = Math.random() * canvasWidth;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.globalAlpha = petal.opacity;
        ctx.fillStyle = petal.color + petal.opacity + ')';

        // Organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(petal.size / 2, -petal.size / 2, petal.size, petal.size / 4, 0, petal.size);
        ctx.bezierCurveTo(-petal.size, petal.size / 4, -petal.size / 2, -petal.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(renderAmbientCanvas);
  }

  initAmbientCanvas();

  /* ==========================================================================
     4. CUSTOM CURSOR
     ========================================================================== */
  let cursorX = 0, cursorY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (cursorDot && cursorRing) {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
      cursorDot.style.left = `${cursorX}px`;
      cursorDot.style.top = `${cursorY}px`;
    }
  });

  function updateRing() {
    ringX += (cursorX - ringX) * 0.15;
    ringY += (cursorY - ringY) * 0.15;
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(updateRing);
  }
  updateRing();

  document.querySelectorAll('a, button, [role="button"], input, textarea, .glass-card, .gallery-item').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) {
        cursorRing.style.width = '55px';
        cursorRing.style.height = '55px';
        cursorRing.style.borderColor = 'var(--accent-gold)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorRing) {
        cursorRing.style.width = '34px';
        cursorRing.style.height = '34px';
        cursorRing.style.borderColor = 'rgba(196, 181, 253, 0.4)';
      }
    });
  });

  /* ==========================================================================
     5. HEADER SCROLL & NAVIGATION
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    updateActiveNav();
    updateTimelineProgress();
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     6. HERO REVEALS & SMOOTH ANCHOR NAVIGATION (LENIS INTEGRATED)
     ========================================================================== */
  function triggerHeroReveals() {
    document.querySelectorAll('#hero .reveal-fade').forEach((el) => {
      el.classList.add('revealed');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -60, duration: 1.4 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ==========================================================================
     7. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.scroll-reveal, .reveal-fade').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     8. PERSONAL PHOTO CUSTOMIZATION (LOCALSTORAGE SUPPORT)
     ========================================================================== */
  const savedPortrait = localStorage.getItem('arushi_custom_portrait');
  if (savedPortrait && arushiPortraitImg) {
    arushiPortraitImg.src = savedPortrait;
  }

  if (changePhotoBtn && portraitFileInput) {
    changePhotoBtn.addEventListener('click', () => {
      portraitFileInput.click();
    });

    portraitFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgData = event.target.result;
          arushiPortraitImg.src = imgData;
          localStorage.setItem('arushi_custom_portrait', imgData);
          showToast('Arushi\'s portrait updated beautifully! ✨');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  /* ==========================================================================
     9. 3D TILT EFFECT ON GLASS CARDS
     ========================================================================== */
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      if (isReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ==========================================================================
     10. TIMELINE SCROLL PROGRESS
     ========================================================================== */
  function updateTimelineProgress() {
    const journeySection = document.getElementById('journey');
    if (!journeySection || !timelineBar) return;

    const rect = journeySection.getBoundingClientRect();
    const windowH = window.innerHeight;

    if (rect.top <= windowH * 0.6 && rect.bottom >= windowH * 0.2) {
      const totalDist = rect.height;
      const scrolled = windowH * 0.6 - rect.top;
      const progress = Math.min(Math.max(scrolled / totalDist, 0), 1);

      const percent = progress * 100;
      if (window.innerWidth > 992) {
        timelineBar.style.width = `${percent}%`;
      } else {
        timelineBar.style.height = `${percent}%`;
      }

      timelineNodes.forEach((node, idx) => {
        const threshold = (idx + 0.2) / timelineNodes.length;
        if (progress >= threshold) {
          node.classList.add('active');
        } else if (idx > 0) {
          node.classList.remove('active');
        }
      });
    }
  }

  timelineNodes.forEach((node) => {
    node.addEventListener('click', () => {
      timelineNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');
    });
  });

  /* ==========================================================================
     11. 3D ENVELOPE & DEDICATED LUXURY LETTER VIEWPORT
     ========================================================================== */
  function openLetterExperience() {
    envelopeContainer.classList.add('opened');
    envelopeBtnText.textContent = 'LETTER OPENED 💌';
    spawnConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 35);
    playSparkleChime();

    setTimeout(() => {
      letterModal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      if (lenisInstance) lenisInstance.stop();
    }, 450);
  }

  function closeLetterModal() {
    letterModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
  }

  if (envelopeContainer) {
    envelopeContainer.addEventListener('click', openLetterExperience);
  }
  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener('click', openLetterExperience);
  }
  if (letterModalCloseBtn) {
    letterModalCloseBtn.addEventListener('click', closeLetterModal);
  }
  if (letterModalBackdrop) {
    letterModalBackdrop.addEventListener('click', closeLetterModal);
  }

  /* ==========================================================================
     12. “DON'T GET TOO ANGRY 😄” SECTION
     ========================================================================== */
  if (smileCommitBtn) {
    smileCommitBtn.addEventListener('click', () => {
      const rect = smileCommitBtn.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      spawnConfetti(originX, originY, 60);
      playWarmChime();

      smileFeedback.textContent = "That's the Arushi we want to see! ✨";
      smileFeedback.style.opacity = '1';

      smileCommitBtn.innerHTML = '<span>Smiled! 😊🤍</span>';
      setTimeout(() => {
        smileCommitBtn.innerHTML = '<span>Okay, I’ll Smile 😄</span>';
      }, 4000);
    });
  }

  /* ==========================================================================
     13. MEMORY GALLERY & LIGHTBOX
     ========================================================================== */
  function updateGalleryItems() {
    galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    if (galleryCount) {
      galleryCount.textContent = `Showing ${galleryItems.length} Memories`;
    }
  }
  updateGalleryItems();

  function openLightbox(index) {
    currentLightboxIndex = index;
    const item = galleryItems[index];
    if (!item) return;

    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || item.querySelector('.gallery-caption').textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;

    galleryLightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (lenisInstance) lenisInstance.stop();
  }

  function closeLightbox() {
    galleryLightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
  }

  function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    openLightbox(currentLightboxIndex);
  }

  function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentLightboxIndex);
  }

  memoryGalleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) {
      const index = galleryItems.indexOf(item);
      openLightbox(index);
    }
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

  window.addEventListener('keydown', (e) => {
    if (!galleryLightbox.hasAttribute('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    }
    if (!letterModal.hasAttribute('hidden')) {
      if (e.key === 'Escape') closeLetterModal();
    }
    if (!addWishModal.hasAttribute('hidden')) {
      if (e.key === 'Escape') closeWishModal();
    }
  });

  // Add Custom Memory
  if (addMemoryBtn && memoryFileInput) {
    addMemoryBtn.addEventListener('click', () => {
      memoryFileInput.click();
    });

    memoryFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgSrc = event.target.result;
          const userCaption = prompt('Add a short caption for this memory:', 'A wonderful moment with Arushi') || 'A beautiful memory';

          const newFig = document.createElement('figure');
          newFig.className = 'gallery-item';
          newFig.setAttribute('data-caption', userCaption);
          newFig.innerHTML = `
            <div class="gallery-img-wrapper">
              <img src="${imgSrc}" alt="${userCaption}" loading="lazy">
              <div class="gallery-overlay">
                <span class="overlay-icon">🔍</span>
                <span class="overlay-title">New Memory</span>
              </div>
            </div>
            <figcaption class="gallery-caption">${userCaption}</figcaption>
          `;

          memoryGalleryGrid.prepend(newFig);
          updateGalleryItems();
          showToast('New memory added to your gallery! 📸');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  /* ==========================================================================
     14. WISHES WALL & CUSTOM WISH PINNING
     ========================================================================== */
  function openWishModal() {
    addWishModal.removeAttribute('hidden');
    wishInput.value = '';
    wishInput.focus();
    if (lenisInstance) lenisInstance.stop();
  }

  function closeWishModal() {
    addWishModal.setAttribute('hidden', '');
    if (lenisInstance) lenisInstance.start();
  }

  if (addWishBtn) addWishBtn.addEventListener('click', openWishModal);
  if (wishModalCloseBtn) wishModalCloseBtn.addEventListener('click', closeWishModal);
  if (wishModalBackdrop) wishModalBackdrop.addEventListener('click', closeWishModal);
  if (cancelWishBtn) cancelWishBtn.addEventListener('click', closeWishModal);

  if (addWishForm) {
    addWishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = wishInput.value.trim();
      if (!text) return;

      const emojis = ['🌸', '✨', '🌟', '🤍', '🌷', '💫'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      const newWishCard = document.createElement('div');
      newWishCard.className = `floating-wish-card wish-float-${Math.floor(Math.random() * 7) + 1}`;
      newWishCard.innerHTML = `
        <span class="wish-pin">${randomEmoji}</span>
        <p class="wish-text">“${text}”</p>
      `;

      wishesWallContainer.prepend(newWishCard);
      closeWishModal();
      showToast('Your wish has been pinned to Arushi\'s wall! ✨');
      playSparkleChime();
    });
  }

  /* ==========================================================================
     15. FINALE SEQUENCE OBSERVER
     ========================================================================== */
  const finaleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lines = document.querySelectorAll('.finale-line');
          lines.forEach((line, idx) => {
            setTimeout(() => {
              line.classList.add('visible');
            }, idx * 1100);
          });

          setTimeout(() => {
            finaleGrandReveal.classList.add('visible');
            spawnConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 40);
          }, lines.length * 1100 + 400);
        }
      });
    },
    { threshold: 0.3 }
  );

  const finaleSec = document.getElementById('finale');
  if (finaleSec) {
    finaleObserver.observe(finaleSec);
  }

  /* ==========================================================================
     16. HIGH-QUALITY AMBIENT PIANO AUDIO & SOUND EFFECTS
     ========================================================================== */
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
  }

  function playTone(freq, duration, delay = 0, gainLevel = 0.08) {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

      gain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(gainLevel, audioCtx.currentTime + delay + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + delay);
      osc.stop(audioCtx.currentTime + delay + duration);
    } catch (e) {
      console.warn('Audio tone notice:', e);
    }
  }

  function playSparkleChime() {
    initAudioContext();
    if (audioCtx) {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        playTone(freq, 1.2, idx * 0.1, 0.06);
      });
    }
  }

  function playWarmChime() {
    initAudioContext();
    if (audioCtx) {
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        playTone(freq, 1.5, idx * 0.12, 0.065);
      });
    }
  }

  if (musicToggleBtn && bgAudio) {
    bgAudio.volume = 0.45;

    musicToggleBtn.addEventListener('click', () => {
      isMusicPlaying = !isMusicPlaying;
      if (isMusicPlaying) {
        initAudioContext();
        bgAudio.play().then(() => {
          musicToggleBtn.classList.add('playing');
          musicToggleBtn.setAttribute('aria-pressed', 'true');
          musicStatusText.textContent = 'Mute music 🎵';
          showToast('Playing relaxing ambient piano music 🎵');
        }).catch((err) => {
          console.warn('Audio play error, falling back:', err);
          musicToggleBtn.classList.add('playing');
          musicStatusText.textContent = 'Mute music 🎵';
        });
      } else {
        bgAudio.pause();
        musicToggleBtn.classList.remove('playing');
        musicToggleBtn.setAttribute('aria-pressed', 'false');
        musicStatusText.textContent = 'Play a little music 🎵';
      }
    });
  }

  /* ==========================================================================
     17. CONFETTI ENGINE
     ========================================================================== */
  function spawnConfetti(originX, originY, count = 35) {
    if (isReducedMotion) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';

      const colors = ['#fde68a', '#fbcfe8', '#c4b5fd', '#8b5cf6', '#fda4af', '#ffffff'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 6;

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 180 + 80;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 40;

      particle.style.cssText = `
        position: fixed;
        left: ${originX}px;
        top: ${originY}px;
        width: ${size}px;
        height: ${size * (Math.random() > 0.5 ? 1 : 1.6)}px;
        background: ${randomColor};
        border-radius: ${Math.random() > 0.4 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 99999;
        box-shadow: 0 0 10px ${randomColor};
        transform: translate(-50%, -50%);
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease;
      `;

      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) rotate(${Math.random() * 720}deg)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => {
        particle.remove();
      }, 1300);
    }
  }

  /* ==========================================================================
     18. TOAST NOTIFICATIONS
     ========================================================================== */
  function showToast(message) {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 5.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(15, 22, 44, 0.92);
      backdrop-filter: blur(16px);
      border: 1px solid var(--accent-lavender);
      color: #fff;
      padding: 0.75rem 1.6rem;
      border-radius: 999px;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), var(--glow-lavender);
      z-index: 10000;
      opacity: 0;
      transition: all 0.35s ease;
    `;

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* ==========================================================================
     19. REDUCED MOTION TOGGLE
     ========================================================================== */
  if (motionToggleBtn) {
    motionToggleBtn.addEventListener('click', () => {
      isReducedMotion = !isReducedMotion;
      document.body.classList.toggle('reduced-motion', isReducedMotion);
      motionToggleBtn.classList.toggle('reduced', isReducedMotion);

      if (isReducedMotion && lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      } else if (!isReducedMotion && !lenisInstance) {
        initLenis();
      }

      showToast(isReducedMotion ? 'Reduced animations enabled' : 'Smooth animations enabled');
    });
  }

})();
