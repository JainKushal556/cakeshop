/**
 * Crumb & Cocoa — Haute Pâtisserie Atelier
 * Clean Home Page Logic (assets/js/home.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart badge
  if (window.CC_CORE) {
    CC_CORE.updateCartBadges();
  }

  // Setup search input listener
  const searchInput = document.getElementById('cakeSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterBySearch(e.target.value);
    });
  }
});

// Quick Add from Catalogue Grid
function quickAdd(cakeId) {
  if (!window.CC_CORE) return;
  const item = CC_CORE.catalogue.find(c => c.id === cakeId);
  if (item) {
    CC_CORE.addToCart({
      cakeId: item.id,
      name: item.name,
      size: '6 inch (1.0 kg)',
      flavor: item.flavor,
      creamColor: item.creamColor,
      writingOnCake: 'Fresh Atelier Bake',
      price: item.price,
      quantity: 1,
      image: item.image,
      eggless: item.eggless
    });
    showToast(item.name, 'Added to your bag.');
  }
}

// Show Toast feedback
function showToast(title, msg) {
  const toast = document.getElementById('quickToast');
  if (!toast) return;
  const titleEl = document.getElementById('toastTitle');
  const msgEl = document.getElementById('toastMessage');
  if (titleEl) titleEl.innerText = title;
  if (msgEl) msgEl.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3200);
}

// Filter Cakes by Category Chips
function filterCakes(category, btnElement) {
  const cards = document.querySelectorAll('.cake-card');
  const buttons = document.querySelectorAll('.filter-btn');

  if (btnElement) {
    buttons.forEach(b => {
      b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      b.classList.add('bg-surface-container', 'text-on-surface-variant');
    });
    btnElement.classList.remove('bg-surface-container', 'text-on-surface-variant');
    btnElement.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
  }

  // Clear search input if category clicked
  const searchInput = document.getElementById('cakeSearchInput');
  if (searchInput) searchInput.value = '';

  cards.forEach(card => {
    const cat = card.getAttribute('data-category') || '';
    if (category === 'All' || cat.toLowerCase().includes(category.toLowerCase())) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  checkEmptyState();
}

// Filter Cakes by Search Query
function filterBySearch(query) {
  const cards = document.querySelectorAll('.cake-card');
  const cleanQuery = query.toLowerCase().trim();

  // Reset category buttons to All
  if (cleanQuery.length > 0) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(b => {
      b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
      b.classList.add('bg-surface-container', 'text-on-surface-variant');
    });
  }

  cards.forEach(card => {
    const name = (card.querySelector('.cake-name')?.innerText || '').toLowerCase();
    const desc = (card.querySelector('.cake-desc')?.innerText || '').toLowerCase();
    const flavor = (card.getAttribute('data-flavor') || '').toLowerCase();
    const category = (card.getAttribute('data-category') || '').toLowerCase();

    if (!cleanQuery || name.includes(cleanQuery) || desc.includes(cleanQuery) || flavor.includes(cleanQuery) || category.includes(cleanQuery)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  checkEmptyState();
}

// Check and show empty state if all cards hidden
function checkEmptyState() {
  const cards = document.querySelectorAll('.cake-card');
  const emptyState = document.getElementById('emptySearchState');
  if (!emptyState) return;

  let visibleCount = 0;
  cards.forEach(card => {
    if (!card.classList.contains('hidden')) visibleCount++;
  });

  if (visibleCount === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }
}
