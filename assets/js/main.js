/* ================================================
   LUMIÈRE DERME — MAIN JAVASCRIPT
   Powers all interactive behaviour across both pages
   Mirrors how Shopify Dawn theme handles JS natively
   No libraries. No dependencies. Pure vanilla JS.
   ================================================ */


/* ================================================
   UTILITY: DOM READY
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  initFilterSidebar();
  initQuickView();
  initProductTabs();
  initVariantSelector();
  initThumbnailGallery();
  initStickyAtc();
  initFilterLogic();

});


/* ================================================
   1. FILTER SIDEBAR — ACCORDION TOGGLE
   In Shopify: snippets/filter-sidebar.liquid
   Mirrors Shopify's native filter API toggle behaviour
   ================================================ */

function initFilterSidebar() {

  const toggles = document.querySelectorAll('.filter-group__toggle');

  toggles.forEach(function (toggle) {

    const targetId = toggle.getAttribute('data-target');
    const target = document.getElementById(targetId);
    const icon = toggle.querySelector('.filter-group__icon');

    if (!target) return;

    target.classList.add('open');
    icon.classList.add('open');

    toggle.addEventListener('click', function () {
      const isOpen = target.classList.contains('open');

      if (isOpen) {
        target.classList.remove('open');
        icon.classList.remove('open');
      } else {
        target.classList.add('open');
        icon.classList.add('open');
      }
    });

  });

}


/* ================================================
   2. FILTER LOGIC — PRODUCT GRID FILTERING
   In Shopify: handled by Shopify Filter API + AJAX
   Here: demonstrated with data attributes
   ================================================ */

function initFilterLogic() {

  const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  const cards = document.querySelectorAll('.product-card');
  const countEl = document.getElementById('productCount');
  const clearBtn = document.getElementById('clearFilters');

  if (!checkboxes.length) return;

  function applyFilters() {

    const checked = {
      skin: [],
      concern: [],
      price: []
    };

    checkboxes.forEach(function (cb) {
      if (!cb.checked) return;

      const val = cb.value;

      if (['dry', 'oily', 'combination', 'sensitive'].includes(val)) {
        checked.skin.push(val);
      } else if (['hydration', 'brightening', 'anti-ageing', 'acne'].includes(val)) {
        checked.concern.push(val);
      } else {
        checked.price.push(val);
      }
    });

    let visible = 0;

    cards.forEach(function (card) {
      const skin = card.getAttribute('data-skin');
      const concern = card.getAttribute('data-concern');
      const price = card.getAttribute('data-price');

      const skinMatch = !checked.skin.length || checked.skin.includes(skin);
      const concernMatch = !checked.concern.length || checked.concern.includes(concern);
      const priceMatch = !checked.price.length || checked.price.includes(price);

      if (skinMatch && concernMatch && priceMatch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countEl) countEl.textContent = visible;

  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', applyFilters);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      checkboxes.forEach(function (cb) {
        cb.checked = false;
      });
      applyFilters();
    });
  }

}


/* ================================================
   3. QUICK VIEW DRAWER
   In Shopify: snippets/quick-view-drawer.liquid
   Triggered by product card Quick View button
   ================================================ */

const quickViewData = {
  1: {
    title: 'Barrier Repair Serum',
    category: 'Serums',
    price: '$78.00',
    desc: 'Ceramide complex that rebuilds the skin barrier in 72 hours.',
    image: 'https://images.unsplash.com/photo-1670201203295-172ff07b1cf8?w=800&auto=format&fit=crop'
  },
  2: {
    title: 'Clarifying BHA Toner',
    category: 'Toners',
    price: '$42.00',
    desc: '2% salicylic acid formula that clears pores without stripping.',
    image: 'https://images.unsplash.com/photo-1629732097571-b042b35aa3ed?w=800&auto=format&fit=crop'
  },
  3: {
    title: 'Vitamin C Brightening Serum',
    category: 'Serums',
    price: '$95.00',
    desc: '15% stable Vitamin C that visibly evens skin tone in 4 weeks.',
    image: 'https://images.unsplash.com/photo-1746227638992-50b1e1e0d96b?w=800&auto=format&fit=crop'
  },
  4: {
    title: 'Peptide Moisture Barrier Cream',
    category: 'Moisturisers',
    price: '$120.00',
    desc: 'Tripeptide formula that locks in hydration for 48 hours.',
    image: 'https://images.unsplash.com/photo-1670201203295-172ff07b1cf8?w=800&auto=format&fit=crop'
  },
  5: {
    title: 'Retinol Renewal Serum',
    category: 'Treatments',
    price: '$145.00',
    desc: 'Encapsulated 0.5% retinol that resurfaces without irritation.',
    image: 'https://images.unsplash.com/photo-1670201203295-172ff07b1cf8?w=800&auto=format&fit=crop'
  },
  6: {
    title: 'Niacinamide Balancing Serum',
    category: 'Serums',
    price: '$48.00',
    desc: '10% niacinamide that minimises pores and controls excess sebum.',
    image: 'https://images.unsplash.com/photo-1629732097571-b042b35aa3ed?w=800&auto=format&fit=crop'
  },
  7: {
    title: 'Hyaluronic Acid Plumping Serum',
    category: 'Serums',
    price: '$68.00',
    desc: 'Triple weight hyaluronic acid that plumps from surface to dermis.',
    image: 'https://images.unsplash.com/photo-1746227638992-50b1e1e0d96b?w=800&auto=format&fit=crop'
  },
  8: {
    title: 'Growth Factor Eye Cream',
    category: 'Eye Care',
    price: '$110.00',
    desc: 'EGF complex that visibly reduces fine lines around the eye area.',
    image: 'https://images.unsplash.com/photo-1670201203295-172ff07b1cf8?w=800&auto=format&fit=crop'
  }
};

function initQuickView() {

  const drawer = document.getElementById('quickViewDrawer');
  const overlay = document.getElementById('quickViewOverlay');
  const closeBtn = document.getElementById('closeQuickView');

  if (!drawer || !overlay) return;

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.product-card__quick-view');
    if (!btn) return;

    const productId = btn.getAttribute('data-product');
    const data = quickViewData[productId];
    if (!data) return;

    document.getElementById('quickViewTitle').textContent = data.title;
    document.getElementById('quickViewCategory').textContent = data.category;
    document.getElementById('quickViewPrice').textContent = data.price;
    document.getElementById('quickViewDesc').textContent = data.desc;
    document.getElementById('quickViewImage').src = data.image;
    document.getElementById('quickViewImage').alt = data.title;

    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

  });

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

}


/* ================================================
   4. PRODUCT TABS
   In Shopify: sections/product-tabs.liquid
   Switches between Ingredients, How To Use, Results, Reviews
   ================================================ */

function initProductTabs() {

  const triggers = document.querySelectorAll('.tabs__trigger');
  const panels = document.querySelectorAll('.tab-panel');

  if (!triggers.length) return;

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {

      triggers.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });

      trigger.classList.add('active');

      const tabId = 'tab-' + trigger.getAttribute('data-tab');
      const panel = document.getElementById(tabId);
      if (panel) panel.classList.add('active');

    });
  });

}


/* ================================================
   5. VARIANT SELECTOR
   In Shopify: snippets/variant-selector.liquid
   Updates price and ATC button text on selection
   ================================================ */

const variantPrices = {
  '30ml': '$52.00',
  '50ml': '$78.00',
  '100ml': '$138.00'
};

function initVariantSelector() {

  const options = document.querySelectorAll('.variant-option');
  const atcButton = document.getElementById('mainAtcButton');
  const stickyPrice = document.querySelector('.sticky-atc__price');

  if (!options.length) return;

  options.forEach(function (option) {
    option.addEventListener('click', function () {

      options.forEach(function (o) { o.classList.remove('active'); });
      option.classList.add('active');

      const value = option.getAttribute('data-value');
      const price = variantPrices[value] || '$78.00';

      if (atcButton) {
        atcButton.textContent = 'Add to Cart — ' + price;
      }

      if (stickyPrice) {
        stickyPrice.textContent = price;
      }

    });
  });

}


/* ================================================
   6. THUMBNAIL GALLERY
   In Shopify: handled natively by Dawn theme JS
   Switches main image on thumbnail click
   ================================================ */

function initThumbnailGallery() {

  const thumbs = document.querySelectorAll('.product-hero__thumb');
  const mainImage = document.getElementById('mainProductImage');

  if (!thumbs.length || !mainImage) return;

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {

      thumbs.forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');

      const newSrc = thumb.getAttribute('data-image');

      mainImage.style.opacity = '0';

      setTimeout(function () {
        mainImage.src = newSrc;
        mainImage.style.opacity = '1';
      }, 150);

    });
  });

}


/* ================================================
   7. STICKY ADD TO CART BAR
   In Shopify: sections/sticky-atc.liquid
   Appears after user scrolls past the main ATC button
   Mirrors Dawn theme scroll observer pattern
   ================================================ */

function initStickyAtc() {

  const stickyBar = document.getElementById('stickyAtc');
  const mainAtc = document.getElementById('mainAtcButton');

  if (!stickyBar || !mainAtc) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -100px 0px'
  });

  observer.observe(mainAtc);

}
