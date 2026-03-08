document.addEventListener('DOMContentLoaded', function () {
  // ===========================
  // Scroll Animations (IntersectionObserver)
  // ===========================
  var animatedElements = document.querySelectorAll('[data-animate]');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ===========================
  // Mobile menu toggle
  // ===========================
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var nav = document.querySelector('[data-nav]');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // ===========================
  // Sticky header with class toggle
  // ===========================
  var header = document.querySelector('[data-header]');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var currentScroll = window.scrollY;
      if (currentScroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ===========================
  // Quantity selectors
  // ===========================
  document.querySelectorAll('[data-qty-minus]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = this.parentElement.querySelector('[data-qty-input]');
      var val = parseInt(input.value, 10);
      if (val > 1) {
        input.value = val - 1;
      }
    });
  });

  document.querySelectorAll('[data-qty-plus]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = this.parentElement.querySelector('[data-qty-input]');
      input.value = parseInt(input.value, 10) + 1;
    });
  });

  // ===========================
  // Product page thumbnails
  // ===========================
  document.querySelectorAll('[data-thumbnail]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var mainImg = document.getElementById('product-main-img');
      if (mainImg) {
        mainImg.src = this.getAttribute('data-image-url');
      }
      document.querySelectorAll('[data-thumbnail]').forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // ===========================
  // Product option selectors
  // ===========================
  document.querySelectorAll('[data-option-selector]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      updateVariant();
    });
  });

  function updateVariant() {
    var selectedOptions = [];
    document.querySelectorAll('.product-option').forEach(function (optionGroup) {
      var checked = optionGroup.querySelector('input:checked');
      if (checked) {
        selectedOptions.push(checked.value);
      }
    });

    var variantSelect = document.querySelector('[data-variant-select]');
    if (!variantSelect) return;

    var options = variantSelect.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      var optionText = options[i].textContent.trim();
      var match = selectedOptions.every(function (opt) {
        return optionText.indexOf(opt) !== -1;
      });
      if (match) {
        variantSelect.value = options[i].value;
        break;
      }
    }
  }

  // ===========================
  // Accordion (product page + FAQ)
  // ===========================
  document.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var content = this.nextElementSibling;
      var isOpen = content.classList.contains('open');

      this.classList.toggle('active', !isOpen);
      content.classList.toggle('open', !isOpen);
    });
  });

  // ===========================
  // Collection sort
  // ===========================
  var sortSelect = document.querySelector('[data-sort-select]');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }

  // ===========================
  // Countdown Timer
  // ===========================
  document.querySelectorAll('[data-countdown]').forEach(function (countdown) {
    var endDate = new Date(countdown.getAttribute('data-countdown')).getTime();

    function updateCountdown() {
      var now = new Date().getTime();
      var distance = endDate - now;

      if (distance < 0) {
        countdown.style.display = 'none';
        return;
      }

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var daysEl = countdown.querySelector('[data-days]');
      var hoursEl = countdown.querySelector('[data-hours]');
      var minutesEl = countdown.querySelector('[data-minutes]');
      var secondsEl = countdown.querySelector('[data-seconds]');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
});
