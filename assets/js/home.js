/**
 * SweetNest — Homemade Cakes with Love
 * Home Page Logic (assets/js/home.js)
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
      size: item.size || '6 inch',
      flavor: item.flavor || 'Signature Bake',
      creamColor: item.creamColor || 'Original Frosting',
      writingOnCake: 'Fresh Bake',
      price: item.price,
      quantity: 1,
      image: item.image,
      eggless: item.eggless !== undefined ? item.eggless : true
    });
    showToast(item.name, 'Added to your cart!');
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

// Toggle Wishlist Heart Icon
function toggleWishlist(btn) {
  const icon = btn.querySelector('.material-symbols-outlined');
  if (!icon) return;
  const isFilled = icon.classList.contains('material-symbols-fill');
  if (isFilled) {
    icon.classList.remove('material-symbols-fill', 'text-red-500');
    icon.classList.add('text-on-surface-variant/70');
  } else {
    icon.classList.add('material-symbols-fill', 'text-red-500');
    icon.classList.remove('text-on-surface-variant/70');
    showToast('Saved to Wishlist', 'Item added to your favorites ♡');
  }
}

// Filter Cakes by Category Circle Avatars
function filterCategoryCircle(category, el) {
  const circles = document.querySelectorAll('.category-circle-btn');
  circles.forEach(btn => {
    const ring = btn.querySelector('.category-circle-ring');
    const label = btn.querySelector('.category-circle-label');
    if (ring) {
      ring.classList.remove('bg-[#e06b74]', 'text-white', 'shadow-md', 'scale-105');
      ring.classList.add('bg-[#fceee9]', 'text-[#521c19]');
    }
    if (label) {
      label.classList.remove('text-[#521c19]', 'font-bold');
      label.classList.add('text-on-surface-variant', 'font-medium');
    }
  });

  if (el) {
    const ring = el.querySelector('.category-circle-ring');
    const label = el.querySelector('.category-circle-label');
    if (ring) {
      ring.classList.remove('bg-[#fceee9]', 'text-[#521c19]');
      ring.classList.add('bg-[#e06b74]', 'text-white', 'shadow-md', 'scale-105');
    }
    if (label) {
      label.classList.remove('text-on-surface-variant', 'font-medium');
      label.classList.add('text-[#521c19]', 'font-bold');
    }
  }

  // Clear search input
  const searchInput = document.getElementById('cakeSearchInput');
  if (searchInput) searchInput.value = '';

  // Filter cards
  const cards = document.querySelectorAll('.cake-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category') || '';
    if (category === 'All' || cat.toLowerCase().includes(category.toLowerCase())) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  checkEmptyState();

  // Scroll down smoothly to cake catalog
  const cakesSec = document.getElementById('popular-cakes');
  if (cakesSec) {
    const navOffset = 90;
    const elementPosition = cakesSec.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navOffset,
      behavior: 'smooth'
    });
  }
}

// Filter Cakes by Search Query
function filterBySearch(query) {
  const cards = document.querySelectorAll('.cake-card');
  const cleanQuery = query.toLowerCase().trim();

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
