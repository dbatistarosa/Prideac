/* ============================================================
   PRIDE AC — GLOBAL JAVASCRIPT
   Navigation · Scroll Reveal · Counters · FAQ · Forms · Toast
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── SCROLL PROGRESS ───────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ─── NAV SHADOW ON SCROLL ──────────────────────────────
  const mainNav = document.querySelector('.main-nav');
  if (mainNav) {
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ─── MOBILE DRAWER ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navDrawer = document.getElementById('nav-drawer');
  let drawerOpen  = false;

  function openDrawer() {
    drawerOpen = true;
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    navDrawer?.classList.add('open');
    navDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawerOpen = false;
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    navDrawer?.classList.remove('open');
    navDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', () => drawerOpen ? closeDrawer() : openDrawer());
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawerOpen) closeDrawer(); });
  navDrawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // ─── ACTIVE NAV LINK ───────────────────────────────────
  const sections = document.querySelectorAll('[data-section]');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-drawer a');
  if (sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.section;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href')?.includes(id));
          });
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));
  }

  // ─── SCROLL REVEAL ─────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
    reveals.forEach(el => revealObs.observe(el));
  }

  // Trigger elements already in viewport
  setTimeout(() => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) el.classList.add('visible');
    });
  }, 80);

  // ─── ANIMATED COUNTERS ─────────────────────────────────
  function animateCount(el, target, dur = 1800) {
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / dur, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCount(el, target);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

  // ─── FAQ ACCORDION ─────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item   = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
        setTimeout(() => {
          const rect = item.getBoundingClientRect();
          if (rect.bottom > window.innerHeight) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 350);
      }
    });
  });

  // ─── SMOOTH ANCHOR LINKS ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        if (drawerOpen) closeDrawer();
      }
    });
  });

  // ─── PHONE FORMAT ──────────────────────────────────────
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g, '');
      if (v.length >= 6) v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6,10);
      else if (v.length >= 3) v = '(' + v.slice(0,3) + ') ' + v.slice(3);
      input.value = v;
    });
  });

  // ─── TRUST BAR AUTO-SCROLL MOBILE ──────────────────────
  const trustBar = document.querySelector('.trust-bar-inner');
  if (trustBar && window.innerWidth < 768) {
    let pos = 0, paused = false;
    trustBar.addEventListener('touchstart', () => paused = true);
    trustBar.addEventListener('touchend',   () => paused = false);
    setInterval(() => {
      if (!paused) {
        pos = (pos >= trustBar.scrollWidth - trustBar.clientWidth) ? 0 : pos + 1;
        trustBar.scrollLeft = pos;
      }
    }, 30);
  }

  // ─── CITY TAGS → CONTACT FORM ──────────────────────────
  document.querySelectorAll('.city-tag[data-city]').forEach(tag => {
    tag.addEventListener('click', () => {
      const zipField = document.getElementById('c-zip') || document.getElementById('f-zip');
      if (zipField) {
        zipField.value = tag.dataset.city;
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const top = contactSection.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
          setTimeout(() => zipField.focus(), 700);
        }
      }
    });
  });

  // ─── KEYBOARD ACCESSIBILITY ────────────────────────────
  document.querySelectorAll('.service-card[role="link"], .offer-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter') card.click();
    });
  });

});

// ─── TOAST NOTIFICATION ──────────────────────────────────
window.showToast = function(message, duration = 4500) {
  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toast-msg');
  if (!toast || !msg) return;
  msg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
};

// ─── FORM SUBMISSION HANDLER ─────────────────────────────
window.handleForm = function(e, successMsg) {
  e.preventDefault();
  const form     = e.target;
  const btn      = form.querySelector('.btn-submit');
  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--red)';
      field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      valid = false;
    }
  });
  if (!valid) { showToast('Please fill in all required fields.'); return; }

  const orig      = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled    = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.textContent   = '✓ Sent!';
    btn.style.background = 'var(--green)';
    showToast(successMsg || '✓ Request received! We\'ll call you within 15 minutes.');
    form.reset();
    setTimeout(() => {
      btn.textContent      = orig;
      btn.disabled         = false;
      btn.style.opacity    = '';
      btn.style.background = '';
    }, 3000);
  }, 1200);
};

// ─── OFFER CARD CLAIM BUTTON ─────────────────────────────
window.claimOffer = function(label) {
  const contact = document.getElementById('contact') || document.querySelector('[data-section="contact"]');
  if (contact) {
    const top = contact.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    setTimeout(() => {
      const msgField = document.getElementById('c-message') || document.getElementById('f-message');
      if (msgField && label) { msgField.value = 'I\'d like to claim the offer: ' + label; }
    }, 700);
  }
};
