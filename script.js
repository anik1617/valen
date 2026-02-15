/* ============================================
   VALENTINE'S WEBSITE - INTERACTIVITY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- FLOATING HEARTS BACKGROUND (sunset colors) ----
  const heartsBg = document.getElementById('heartsBg');
  const heartColors = ['#e07830', '#f0a050', '#d4907a', '#b8768e', '#9a6a85', '#7a5080', '#ffc878'];

  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');

    const size = Math.random() * 20 + 10;
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 2;

    heart.style.left = left + '%';
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';

    heart.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}"/>
    </svg>`;

    heartsBg.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }

  setInterval(createFloatingHeart, 800);
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingHeart, i * 300);
  }


  // ---- SPARKLE CURSOR EFFECT (sunset sparkles) ----
  const sparkleContainer = document.getElementById('sparkleContainer');
  let lastSparkle = 0;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 80) return;
    lastSparkle = now;

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';

    const sparkleSize = Math.random() * 8 + 4;
    const colors = ['#f0a050', '#ffc878', '#d4907a', '#b8768e', '#e07830', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    sparkle.innerHTML = `<svg width="${sparkleSize}" height="${sparkleSize}" viewBox="0 0 20 20">
      <polygon points="10,0 12,8 20,10 12,12 10,20 8,12 0,10 8,8" fill="${color}"/>
    </svg>`;

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });


  // ---- SECTION 1: ENVELOPE & QUESTION ----
  const envelope = document.getElementById('envelope');
  const letterPull = document.getElementById('letterPull');
  const questionContent = document.getElementById('questionContent');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');

  let noClickCount = 0;
  const noTexts = [
    'No',
    'Are you sure?',
    'Really sure??',
    'Think again!',
    'Last chance!',
    'Surely not?',
    'You\'re breaking my heart!',
    'I\'m gonna cry...',
    'Okay fine... Yes!'
  ];

  // Envelope click
  envelope.addEventListener('click', () => {
    envelope.classList.add('opened');
    setTimeout(() => {
      envelope.style.display = 'none';
      questionContent.classList.remove('hidden');
    }, 800);
  });

  // Yes button
  btnYes.addEventListener('click', () => {
    transitionToCelebration();
  });

  // No button - shrinks and eventually turns to yes
  btnNo.addEventListener('click', () => {
    noClickCount++;

    if (noClickCount >= noTexts.length - 1) {
      btnNo.textContent = 'Yes!';
      btnNo.classList.remove('shrinking');
      btnNo.classList.add('converting');
      setTimeout(() => {
        transitionToCelebration();
      }, 600);
      return;
    }

    btnNo.textContent = noTexts[noClickCount];
    btnNo.classList.add('shrinking');

    const scale = 1 + (noClickCount * 0.08);
    btnYes.style.transform = `scale(${scale})`;
    btnYes.style.fontSize = (1.2 + noClickCount * 0.05) + 'rem';
  });

  // No button dodge on hover (desktop)
  let dodgeCount = 0;
  btnNo.addEventListener('mouseenter', () => {
    if (noClickCount === 0) {
      dodgeCount++;
      if (dodgeCount <= 3) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 100;
        btnNo.style.transform = `translate(${x}px, ${y}px) scale(0.85)`;
      }
    }
  });


  // ---- TRANSITION TO CELEBRATION ----
  function transitionToCelebration() {
    const questionSection = document.getElementById('questionSection');
    const celebrationSection = document.getElementById('celebrationSection');

    questionSection.classList.remove('active');
    celebrationSection.classList.add('active');

    createFireworks();

    setTimeout(() => {
      celebrationSection.classList.remove('active');
      document.getElementById('mainSection').classList.add('active');
      initMainSection();
    }, 3500);
  }


  // ---- FIREWORKS (sunset palette) ----
  function createFireworks() {
    const container = document.getElementById('fireworks');
    const colors = ['#f0a050', '#e07830', '#ffc878', '#d4907a', '#b8768e', '#9a6a85', '#ffffff'];

    for (let burst = 0; burst < 8; burst++) {
      setTimeout(() => {
        const cx = Math.random() * 80 + 10;
        const cy = Math.random() * 60 + 10;

        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.classList.add('firework-particle');
          particle.style.left = cx + '%';
          particle.style.top = cy + '%';
          particle.style.background = colors[Math.floor(Math.random() * colors.length)];

          const angle = (i / 20) * 360;
          const distance = Math.random() * 150 + 80;
          const tx = Math.cos(angle * Math.PI / 180) * distance;
          const ty = Math.sin(angle * Math.PI / 180) * distance;

          particle.style.setProperty('--tx', tx + 'px');
          particle.style.setProperty('--ty', ty + 'px');
          particle.style.animationDelay = Math.random() * 0.2 + 's';

          container.appendChild(particle);

          setTimeout(() => particle.remove(), 1500);
        }
      }, burst * 400);
    }
  }


  // ---- MAIN SECTION INIT ----
  function initMainSection() {
    initScrollAnimations();
    initGiftBox();
  }


  // ---- SCROLL REVEAL ANIMATIONS ----
  function initScrollAnimations() {
    const blocks = document.querySelectorAll('.content-block');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    blocks.forEach(block => observer.observe(block));
  }




  // ---- GIFT BOX ----
  function initGiftBox() {
    const gift = document.getElementById('gift');
    const giftReveal = document.getElementById('giftReveal');

    gift.addEventListener('click', () => {
      gift.classList.add('opened');
      setTimeout(() => {
        gift.style.display = 'none';
        giftReveal.classList.remove('hidden');

        const coupons = giftReveal.querySelectorAll('.coupon');
        coupons.forEach((coupon, i) => {
          coupon.style.opacity = '0';
          coupon.style.transform = 'translateY(20px)';
          setTimeout(() => {
            coupon.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            coupon.style.opacity = '1';
            coupon.style.transform = 'translateY(0)';
          }, 200 + i * 150);
        });
      }, 700);
    });
  }


  // ---- MUSIC TOGGLE ----
  const musicToggle = document.getElementById('musicToggle');
  let musicPlaying = false;

  musicToggle.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    musicToggle.style.background = musicPlaying ? 'rgba(240,160,80,0.3)' : 'rgba(255,255,255,0.08)';
    musicToggle.style.color = musicPlaying ? 'var(--sunset-gold)' : 'var(--sunset-gold)';

    const audio = document.getElementById('bgMusic');
    if (audio) {
      musicPlaying ? audio.play() : audio.pause();
    }
  });

});
