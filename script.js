document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.pageYOffset / totalHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }
  });

  // 3. Hero Copy Text animation (Split characters with sequential line delay)
  const titleBlocks = document.querySelectorAll('.title-block');
  let charOffset = 0;
  titleBlocks.forEach((block) => {
    const text = block.textContent.trim();
    block.textContent = '';
    [...text].forEach((char) => {
      const span = document.createElement('span');
      // If it's a space, preserve it
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      span.classList.add('char-span');
      // Apply cumulative delay across all lines
      span.style.animationDelay = `${charOffset * 0.12}s`;
      block.appendChild(span);
      charOffset++;
    });
    // Add a pause (equivalent to 5 characters, or 0.6s) between lines
    charOffset += 5;
  });

  // 4. Hamburger Menu Logic
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = mobileNav.querySelectorAll('a');

  function toggleMenu() {
    const isOpen = menuToggle.classList.contains('open');
    if (isOpen) {
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
    } else {
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('open');
    }
  }

  menuToggle.addEventListener('click', toggleMenu);

  // Close drawer when clicking nav links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
    });
  });

  // 5. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 6. Timeline Scroll Activation
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    timelineObserver.observe(timeline);
  }

  // 7. Sine Wave Canvas Animation
  const canvas = document.getElementById('waveCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let offset = 0;
    function drawWave() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Wave 1: Deep Navy/Blue (Base)
      ctx.fillStyle = 'rgba(15, 43, 92, 0.08)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = Math.sin(x * 0.004 + offset) * 20 + canvas.height / 2;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Wave 2: Royal Blue (Middle)
      ctx.fillStyle = 'rgba(29, 78, 216, 0.05)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = Math.cos(x * 0.005 + offset * 0.8) * 15 + canvas.height / 2 + 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Wave 3: Cyan (Accent)
      ctx.fillStyle = 'rgba(14, 165, 233, 0.04)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = Math.sin(x * 0.007 + offset * 1.2) * 12 + canvas.height / 2 - 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      offset += 0.015;
      requestAnimationFrame(drawWave);
    }
    
    drawWave();
  }

  // 8. Floating Conversion Buttons Visibility
  const floatingCv = document.getElementById('floatingCv');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      floatingCv.classList.add('visible');
    } else {
      floatingCv.classList.remove('visible');
    }
  });

  // 9. Contact Form Validation and Submission Mock
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  const clientName = document.getElementById('clientName');
  const emailAddress = document.getElementById('emailAddress');
  const phoneNumber = document.getElementById('phoneNumber');
  const messageContent = document.getElementById('messageContent');

  const inputs = [clientName, emailAddress, phoneNumber, messageContent];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    if (!clientName.value.trim()) {
      clientName.closest('.form-group').classList.add('has-error');
      hasError = true;
    }

    if (!emailAddress.value.trim() || !emailRegex.test(emailAddress.value)) {
      emailAddress.closest('.form-group').classList.add('has-error');
      hasError = true;
    }

    if (!phoneNumber.value.trim()) {
      phoneNumber.closest('.form-group').classList.add('has-error');
      hasError = true;
    }

    if (!messageContent.value.trim()) {
      messageContent.closest('.form-group').classList.add('has-error');
      hasError = true;
    }

    if (!hasError) {
      successModal.classList.add('open');
      contactForm.reset();
    } else {
      const firstError = contactForm.querySelector('.has-error input, .has-error textarea');
      if (firstError) {
        firstError.focus();
      }
    }
  });

  closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('open');
  });

  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('open');
    }
  });


});
