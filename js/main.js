document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile navigation toggle ──────────────────────────────
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('navbar__toggle--open');
      navLinks.classList.toggle('navbar__links--open');
    });

    navLinks.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('navbar__toggle--open');
        navLinks.classList.remove('navbar__links--open');
      });
    });
  }

  // ── Navbar scroll shadow ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Publication abstract toggle ───────────────────────────
  document.querySelectorAll('[data-toggle-abstract]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.pub-card');
      if (!card) return;
      const abstract = card.querySelector('.pub-card__abstract');
      if (!abstract) return;
      const isOpen = abstract.classList.toggle('pub-card__abstract--open');
      btn.textContent = isOpen ? 'Hide Abstract' : 'Abstract';
    });
  });

  // ── Publication BibTeX copy ──────────────────────────────
  document.querySelectorAll('[data-copy-bibtex]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.pub-card');
      if (!card) return;
      const bibtex = card.querySelector('.pub-card__bibtex');
      if (!bibtex) return;
      navigator.clipboard.writeText(bibtex.textContent.trim()).then(() => {
        showToast('BibTeX copied to clipboard');
      });
    });
  });

  // ── Publication year filter ───────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      const year = btn.getAttribute('data-year');
      document.querySelectorAll('.pub-card').forEach(card => {
        if (year === 'all' || card.getAttribute('data-year') === year) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Toast helper ──────────────────────────────────────────
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
      setTimeout(() => toast.classList.remove('toast--visible'), 2200);
    });
  }

  // ── Scroll-in animations ──────────────────────────────────
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
