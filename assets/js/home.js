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

  // Initialize hero carousel with progress loader
  initHeroSlider();
});

// --- Hero Carousel Slider with Loading Pill Progress ---
let currentHeroSlide = 0;
const totalHeroSlides = 3;

function initHeroSlider() {
  const heroSection = document.getElementById('heroSliderSection');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      heroSection.classList.add('is-paused');
    });
    heroSection.addEventListener('mouseleave', () => {
      heroSection.classList.remove('is-paused');
    });
  }
  updateHeroSlider();
}

function updateHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  if (track) {
    track.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
  }

  // Update indicators: active slide has elongated pill with animated loader bar, others are compact dots
  const indicators = document.querySelectorAll('.hero-indicator');
  indicators.forEach((indicator, idx) => {
    indicator.innerHTML = ''; // Clear previous loader element

    if (idx === currentHeroSlide) {
      // Active slide: minimal small loading pill
      indicator.className = 'hero-indicator relative h-1.5 w-6 sm:w-7 rounded-full bg-brand-primary/25 cursor-pointer overflow-hidden transition-all duration-300';
      
      const loader = document.createElement('div');
      loader.className = 'hero-pill-loader h-full bg-brand-primary rounded-full';
      loader.style.width = '0%';
      
      // When the loader animation completes, advance to next slide automatically
      loader.addEventListener('animationend', () => {
        nextHeroSlide();
      }, { once: true });
      
      indicator.appendChild(loader);
    } else {
      // Inactive slides: minimal small dots
      indicator.className = 'hero-indicator relative h-1.5 w-1.5 rounded-full bg-brand-primary/35 hover:bg-brand-primary/60 cursor-pointer transition-all duration-300';
    }
  });
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
  updateHeroSlider();
}

function prevHeroSlide() {
  currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
  updateHeroSlider();
}

function goToHeroSlide(index) {
  currentHeroSlide = index;
  updateHeroSlider();
}

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
      ring.classList.remove('border-[#e06b74]', 'ring-2', 'ring-[#e06b74]/30', 'scale-105', 'shadow-md');
      ring.classList.add('border-[#f0d5ce]/80');
    }
    if (label) {
      label.classList.remove('text-[#3d1411]', 'font-bold');
      label.classList.add('text-[#3d1411]/70', 'font-medium');
    }
  });

  if (el) {
    const ring = el.querySelector('.category-circle-ring');
    const label = el.querySelector('.category-circle-label');
    if (ring) {
      ring.classList.remove('border-[#f0d5ce]/80');
      ring.classList.add('border-[#e06b74]', 'ring-2', 'ring-[#e06b74]/30', 'scale-105', 'shadow-md');
    }
    if (label) {
      label.classList.remove('text-[#3d1411]/70', 'font-medium');
      label.classList.add('text-[#3d1411]', 'font-bold');
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

// --- Track Order Modal Handlers ---
function openTrackOrderModal() {
  const modal = document.getElementById('trackOrderModal');
  if (modal) {
    modal.classList.remove('hidden');
    const orders = window.CC_CORE ? CC_CORE.getOrders() : [];
    const latestOrder = orders.length > 0 ? orders[0] : null;
    const input = document.getElementById('trackOrderInput');
    if (input && latestOrder && !input.value) {
      input.value = latestOrder.id;
    }
    executeTrackOrder();
  }
}

function closeTrackOrderModal() {
  const modal = document.getElementById('trackOrderModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function executeTrackOrder() {
  const input = document.getElementById('trackOrderInput');
  const query = input ? input.value.trim().toUpperCase() : '';
  const resultContainer = document.getElementById('trackOrderResult');
  if (!resultContainer) return;

  const orders = window.CC_CORE ? CC_CORE.getOrders() : [];
  let found = null;
  if (query) {
    found = orders.find(o => o.id.toUpperCase().includes(query) || (o.phone && o.phone.includes(query)));
  }
  if (!found && orders.length > 0) {
    found = orders[0];
  }

  if (!found) {
    resultContainer.innerHTML = `
      <div class="text-center py-6 text-brand-dark/60 text-xs">
        <span class="material-symbols-outlined text-3xl text-brand-dark/30 mb-2 block">receipt_long</span>
        No orders found for reference "${query}". Please verify your order ID.
      </div>
    `;
    return;
  }

  resultContainer.innerHTML = `
    <div class="p-3.5 bg-brand-peach/50 rounded-2xl border border-brand-border/60 text-xs space-y-2">
      <div class="flex items-center justify-between">
        <span class="font-bold text-brand-dark">Order ${found.id}</span>
        <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">${found.status || 'Baking in Oven'}</span>
      </div>
      <p class="text-brand-dark/70 text-[11px]">Patron: <strong>${found.customerName}</strong> • ${found.items && found.items.length ? found.items[0].name : 'Artisan Cake'}</p>
      <p class="text-brand-dark/60 text-[10px]">Estimated Delivery: <strong>${found.requestedDate || 'Today'}, ${found.timeSlot || '2:00 PM - 5:00 PM'}</strong></p>
    </div>

    <!-- Stepper Tracker -->
    <div class="relative pl-6 space-y-4 border-l-2 border-brand-pink/40 ml-3 py-1">
      <div class="relative flex items-center gap-3">
        <span class="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-pink flex items-center justify-center text-white text-[10px]">✓</span>
        <div>
          <h4 class="font-bold text-xs text-brand-dark">Order Confirmed &amp; Queued</h4>
          <p class="text-[10px] text-brand-dark/60">Ingredients selected &amp; baker assigned</p>
        </div>
      </div>
      <div class="relative flex items-center gap-3">
        <span class="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-pink flex items-center justify-center text-white text-[10px]">✓</span>
        <div>
          <h4 class="font-bold text-xs text-brand-dark">Freshly Baking in Oven</h4>
          <p class="text-[10px] text-brand-dark/60">180°C slow sponge baking in progress</p>
        </div>
      </div>
      <div class="relative flex items-center gap-3">
        <span class="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-primary animate-pulse flex items-center justify-center text-white text-[10px]">●</span>
        <div>
          <h4 class="font-bold text-xs text-brand-primary">Frosting &amp; Chilled Courier Dispatch</h4>
          <p class="text-[10px] text-brand-dark/60">Hand-piped decorations &amp; packed in insulated box</p>
        </div>
      </div>
    </div>
  `;
}
