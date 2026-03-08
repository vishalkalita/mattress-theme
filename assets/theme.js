document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
  }

  // Sticky header shadow on scroll
  const header = document.querySelector('[data-header]');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // Quantity selectors
  document.querySelectorAll('[data-qty-minus]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('[data-qty-input]');
      const val = parseInt(input.value, 10);
      if (val > 1) {
        input.value = val - 1;
      }
    });
  });

  document.querySelectorAll('[data-qty-plus]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('[data-qty-input]');
      input.value = parseInt(input.value, 10) + 1;
    });
  });

  // Product page thumbnails
  document.querySelectorAll('[data-thumbnail]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const mainImg = document.getElementById('product-main-img');
      if (mainImg) {
        mainImg.src = this.getAttribute('data-image-url');
      }
      document.querySelectorAll('[data-thumbnail]').forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Product option selectors
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

  // Accordion
  document.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var content = this.nextElementSibling;
      var isOpen = content.classList.contains('open');

      this.classList.toggle('active', !isOpen);
      content.classList.toggle('open', !isOpen);
    });
  });

  // Collection sort
  var sortSelect = document.querySelector('[data-sort-select]');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }
});
