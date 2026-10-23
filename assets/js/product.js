/**
 * SweetNest — Homemade Cakes with Love
 * Single Product View & Customizer (assets/js/product.js)
 */

let currentCake = null;
let currentImageIndex = 0;
let currentGallery = [];
let selectedSize = '0.5 kg';
let selectedMultiplier = 1.0;
let selectedShape = 'Round';
let selectedFlavor = 'Classic Chocolate Truffle (Recommended)';
let isEggless = true;
let isWishlisted = false;

// Curated Gourmet Flavour Profiles per cake
const cakeFlavors = {
  'choco-truffle': [
    'Classic Chocolate Truffle (Recommended)',
    '72% Dark Belgian Truffle',
    'Hazelnut Truffle Praline',
    'Choco Mocha & Espresso',
    'Chocolate Salted Caramel'
  ],
  'fresh-strawberry': [
    'Fresh Strawberry & Chantilly (Recommended)',
    'Strawberry White Chocolate',
    'Mixed Wild Berry Coulis',
    'Strawberry Vanilla Chiffon'
  ],
  'red-velvet': [
    'Artisan Cream Cheese Red Velvet (Recommended)',
    'Red Velvet White Chocolate Truffle',
    'Red Velvet Raspberry Swirl',
    'Red Velvet Choco Truffle Fusion'
  ],
  'butterscotch': [
    'Cashew Butterscotch Crunch (Recommended)',
    'Salted Butterscotch Caramel',
    'Butterscotch Almond Praline',
    'Butterscotch Vanilla Cream'
  ],
  'blueberry-cheesecake': [
    'Wild Maine Blueberry Baked (Recommended)',
    'Blueberry Meyer Lemon Swirl',
    'Blueberry White Chocolate Truffle'
  ],
  'unicorn-theme': [
    'Rainbow Vanilla Confetti (Recommended)',
    'Sweet Strawberry Marshmallow',
    'Bubblegum Buttercream Dream'
  ]
};

// 4 High-Resolution Gallery Shots for each cake
const cakeGalleries = {
  'choco-truffle': [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
  ],
  'fresh-strawberry': [
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611293388250-580b08c4a145?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
  ],
  'red-velvet': [
    'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616031037011-087000171abe?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
  ],
  'butterscotch': [
    'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1557308536-ee471ef2c390?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
  ],
  'blueberry-cheesecake': [
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
  ],
  'unicorn-theme': [
    'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
  updateFloatingCartBadge();
  initDeliveryDate();
});

function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const cakeId = urlParams.get('id') || 'choco-truffle';

  const found = CC_CORE.catalogue.find(c => c.id === cakeId) || CC_CORE.catalogue[0];
  currentCake = found;

  // Title and Page Title
  const pageTitle = document.getElementById('pageTitle');
  const cakeTitle = document.getElementById('cakeTitle');
  const cakeDesc = document.getElementById('cakeDescription');
  const reviewsCount = document.getElementById('reviewsCount');
  
  if (pageTitle) pageTitle.innerText = `${found.name} — SweetNest Homemade Cakes`;
  if (cakeTitle) cakeTitle.innerText = found.name;
  if (cakeDesc) cakeDesc.innerText = found.desc || 'Rich and moist homemade cake crafted with premium ingredients and love.';
  if (reviewsCount) reviewsCount.innerText = `(${found.reviewsCount || 120} reviews)`;

  // Dietary (Eggless / With Egg) Setup
  const isVegAvailable = found.eggless !== false;
  isEggless = isVegAvailable;
  initDietaryToggle(isVegAvailable);

  // Setup Gallery Images
  if (cakeGalleries[found.id]) {
    currentGallery = cakeGalleries[found.id];
  } else {
    currentGallery = [
      found.image,
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549589237-9e70b6be4da8?w=800&auto=format&fit=crop&q=80'
    ];
  }
  currentImageIndex = 0;
  initGallery();

  // Calculate Size Card Prices
  calculateSizePrices();

  // Initialize Flavour Dropdown
  initFlavors();

  // Populate Related Products
  initRelatedProducts();

  // Set initial character count
  const msgInput = document.getElementById('customMessageInput');
  if (msgInput) updateCharCount(msgInput);
}

function initFlavors() {
  const select = document.getElementById('flavorSelect');
  if (!select) return;

  const flavors = (currentCake && cakeFlavors[currentCake.id]) || [
    `${currentCake ? currentCake.name : 'Classic'} Signature (Recommended)`,
    'Rich Dark Cocoa Truffle',
    'Vanilla Buttercream Swirl',
    'Caramel Nut Praline'
  ];

  select.innerHTML = flavors.map((f, i) => `
    <option value="${f}" ${i === 0 ? 'selected' : ''}>${f}</option>
  `).join('');

  selectedFlavor = flavors[0];
}

function updateSelectedFlavor(selectEl) {
  if (selectEl) {
    selectedFlavor = selectEl.value;
  }
}

function initDietaryToggle(isVegAvailable) {
  const toggleWrapper = document.getElementById('dietaryToggleWrapper');
  if (!toggleWrapper) return;

  if (!isVegAvailable) {
    // Cake only contains fresh eggs (no veg available)
    toggleWrapper.innerHTML = `
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#fecaca] bg-[#fef2f2] text-[#b91c1c] text-[10px] xs:text-[11px] font-bold">
        <span class="w-3.5 h-3.5 rounded-[3px] border border-[#b91c1c] flex items-center justify-center p-[2px] bg-white shrink-0">
          <span class="w-1.5 h-1.5 rounded-full bg-[#b91c1c]"></span>
        </span>
        <span>With Fresh Egg</span>
      </div>
    `;
    updateDietaryUI(false);
  } else {
    updateDietaryUI(isEggless);
  }
}

function toggleDietaryPreference() {
  if (!currentCake || currentCake.eggless === false) return;
  isEggless = !isEggless;
  updateDietaryUI(isEggless);

  if (isEggless) {
    showToast('Switched to <strong>100% Eggless (Pure Veg)</strong> bake 🟢');
  } else {
    showToast('Switched to <strong>With Fresh Eggs</strong> bake 🔴');
  }
  updateSummary();
}

function updateDietaryUI(egglessActive) {
  const toggleBtn = document.getElementById('dietaryToggleBtn');
  const iconBox = document.getElementById('dietaryIconBox');
  const dot = document.getElementById('dietaryDot');
  const label = document.getElementById('dietaryLabel');
  const track = document.getElementById('dietarySwitchTrack');
  const thumb = document.getElementById('dietarySwitchThumb');
  
  const egglessPill = document.getElementById('egglessPill');
  const egglessDot = document.getElementById('egglessDot');
  const egglessText = document.getElementById('egglessText');

  if (egglessActive) {
    // 🟢 GREEN / VEG EGGLESS STATE
    if (toggleBtn) {
      toggleBtn.className = 'group flex items-center gap-1.5 xs:gap-2 px-2.5 py-1 rounded-full border border-[#c2e7cc] bg-[#f0f9f3] text-[#166534] transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-2xs hover:shadow-xs';
      toggleBtn.setAttribute('title', 'Currently Eggless (Pure Veg) — Click to switch to With Egg');
    }
    if (iconBox) {
      iconBox.className = 'w-3.5 h-3.5 rounded-[3px] border border-[#166534] flex items-center justify-center p-[2px] bg-white shrink-0';
    }
    if (dot) {
      dot.className = 'w-1.5 h-1.5 rounded-full bg-[#166534]';
    }
    if (label) {
      label.innerText = 'Eggless';
      label.className = 'text-[10px] xs:text-[11px] font-bold tracking-tight text-[#166534]';
    }
    if (track) {
      track.className = 'w-7 h-4 rounded-full bg-[#16a34a] p-0.5 flex items-center transition-colors duration-200';
    }
    if (thumb) {
      thumb.className = 'w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-200 translate-x-3';
    }

    // Top Pill Sync
    if (egglessPill) egglessPill.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#edf7f0] border border-[#d2edd9] text-[#235835] text-[10px] xs:text-[11px] font-semibold transition-all';
    if (egglessDot) egglessDot.className = 'w-2 h-2 rounded-full bg-emerald-600 transition-colors';
    if (egglessText) egglessText.innerText = '100% Eggless';
  } else {
    // 🔴 RED / WITH EGG STATE
    if (toggleBtn) {
      toggleBtn.className = 'group flex items-center gap-1.5 xs:gap-2 px-2.5 py-1 rounded-full border border-[#fecaca] bg-[#fef2f2] text-[#b91c1c] transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-2xs hover:shadow-xs';
      toggleBtn.setAttribute('title', 'Currently With Egg — Click to switch to Eggless');
    }
    if (iconBox) {
      iconBox.className = 'w-3.5 h-3.5 rounded-[3px] border border-[#b91c1c] flex items-center justify-center p-[2px] bg-white shrink-0';
    }
    if (dot) {
      dot.className = 'w-1.5 h-1.5 rounded-full bg-[#b91c1c]';
    }
    if (label) {
      label.innerText = 'With Egg';
      label.className = 'text-[10px] xs:text-[11px] font-bold tracking-tight text-[#b91c1c]';
    }
    if (track) {
      track.className = 'w-7 h-4 rounded-full bg-[#dc2626] p-0.5 flex items-center transition-colors duration-200';
    }
    if (thumb) {
      thumb.className = 'w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-200 translate-x-0';
    }

    // Top Pill Sync
    if (egglessPill) egglessPill.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-[10px] xs:text-[11px] font-semibold transition-all';
    if (egglessDot) egglessDot.className = 'w-2 h-2 rounded-full bg-red-600 transition-colors';
    if (egglessText) egglessText.innerText = 'Contains Fresh Eggs';
  }
}

function calculateSizePrices() {
  updateSummary();
}

function selectSize(sizeStr, multiplier, buttonEl) {
  selectedSize = sizeStr;
  selectedMultiplier = multiplier;

  // Toggle active card styling
  document.querySelectorAll('.size-card').forEach(btn => {
    btn.className = 'size-card py-2.5 px-3 rounded-2xl border border-brand-border bg-white text-[#705b56] hover:text-[#2e1511] text-xs xs:text-sm font-medium transition-all text-center cursor-pointer select-none';
  });

  if (buttonEl) {
    buttonEl.className = 'size-card py-2.5 px-3 rounded-2xl border-2 border-[#b5655a] bg-[#faece9] text-[#2e1511] text-xs xs:text-sm font-bold transition-all text-center cursor-pointer select-none shadow-xs';
  }

  updateSummary();
}

function selectShape(shapeName, buttonEl) {
  selectedShape = shapeName;

  document.querySelectorAll('.shape-btn').forEach(btn => {
    btn.className = 'shape-btn py-2.5 px-3 rounded-2xl border border-brand-border bg-white text-[#705b56] hover:text-[#2e1511] text-xs xs:text-sm font-medium transition-all text-center cursor-pointer select-none';
  });

  if (buttonEl) {
    buttonEl.className = 'shape-btn py-2.5 px-3 rounded-2xl border-2 border-[#b5655a] bg-[#faece9] text-[#2e1511] text-xs xs:text-sm font-bold transition-all text-center cursor-pointer select-none';
  }

  updateSummary();
}

function updateSummary() {
  if (!currentCake) return;
  const basePrice = currentCake.price || 650;
  let finalPrice = basePrice;

  if (selectedSize === '0.5 kg') {
    finalPrice = basePrice;
  } else if (selectedSize === '1 kg') {
    finalPrice = Math.round((basePrice * 1.6923) / 50) * 50;
  } else if (selectedSize === '1.5 kg') {
    finalPrice = Math.round((basePrice * 2.3846) / 50) * 50;
  }

  const priceFormatted = `₹${finalPrice.toLocaleString('en-IN')}`;
  
  const dynPrice = document.getElementById('dynamicPrice');
  const bottomBarPrice = document.getElementById('bottomBarPrice');
  const bottomBarSummary = document.getElementById('bottomBarSummary');

  if (dynPrice) {
    dynPrice.innerText = priceFormatted;
    dynPrice.classList.add('scale-105');
    setTimeout(() => dynPrice.classList.remove('scale-105'), 180);
  }
  if (bottomBarPrice) bottomBarPrice.innerText = priceFormatted;
  if (bottomBarSummary) {
    const dietTag = isEggless ? 'Veg' : 'With Egg';
    bottomBarSummary.innerText = `${selectedSize} • ${selectedShape} • ${dietTag}`;
  }
}

function initGallery() {
  const track = document.getElementById('productGalleryTrack');
  const thumb = document.getElementById('galleryScrollThumb');
  if (!track || !currentGallery) return;

  track.innerHTML = currentGallery.map((imgUrl, i) => `
    <div class="w-full h-full shrink-0 snap-center relative">
      <img class="w-full h-full object-cover select-none pointer-events-none" alt="${currentCake ? currentCake.name : 'Cake'} View ${i + 1}" src="${imgUrl}"/>
    </div>
  `).join('');

  if (thumb) {
    thumb.style.width = `${100 / currentGallery.length}%`;
    thumb.style.transform = 'translateX(0%)';
  }

  track.scrollLeft = 0;
  currentImageIndex = 0;
  handleGalleryScroll();
}

function handleGalleryScroll() {
  const track = document.getElementById('productGalleryTrack');
  const thumb = document.getElementById('galleryScrollThumb');
  const badge = document.getElementById('imageCounterBadge');
  if (!track || !currentGallery || currentGallery.length === 0) return;

  const scrollLeft = track.scrollLeft;
  const maxScroll = track.scrollWidth - track.clientWidth;
  
  if (maxScroll > 0) {
    const scrollRatio = Math.max(0, Math.min(1, scrollLeft / maxScroll));
    // When thumb width is (100 / length)%, total translation across track is (length - 1) * 100%
    const maxTranslatePercent = (currentGallery.length - 1) * 100;
    if (thumb) {
      thumb.style.transform = `translateX(${scrollRatio * maxTranslatePercent}%)`;
    }
  }

  const itemWidth = track.clientWidth;
  if (itemWidth > 0) {
    const index = Math.min(
      currentGallery.length - 1,
      Math.max(0, Math.round(scrollLeft / itemWidth))
    );
    currentImageIndex = index;
    if (badge) {
      badge.innerText = `${index + 1}/${currentGallery.length}`;
    }
  }
}

function scrollToImage(index) {
  const track = document.getElementById('productGalleryTrack');
  if (!track) return;
  const itemWidth = track.clientWidth;
  track.scrollTo({
    left: index * itemWidth,
    behavior: 'smooth'
  });
}

function nextImage() {
  if (currentGallery.length === 0) return;
  const nextIdx = (currentImageIndex + 1) % currentGallery.length;
  scrollToImage(nextIdx);
}

function prevImage() {
  if (currentGallery.length === 0) return;
  const prevIdx = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
  scrollToImage(prevIdx);
}

function updateCharCount(input) {
  const countLabel = document.getElementById('charCountLabel');
  if (countLabel && input) {
    countLabel.innerText = `${input.value.length}/30`;
  }
}

function initDeliveryDate() {
  const input = document.getElementById('deliveryDateInput');
  const display = document.getElementById('deliveryDateDisplay');
  
  // Set default to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');

  if (input) {
    input.min = `${yyyy}-${mm}-${dd}`;
    input.value = `${yyyy}-${mm}-${dd}`;
  }

  if (display) {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    display.innerText = tomorrow.toLocaleDateString('en-GB', options);
  }
}

function updateDeliveryDate(input) {
  const display = document.getElementById('deliveryDateDisplay');
  if (input && input.value && display) {
    const parts = input.value.split('-');
    const selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    display.innerText = selectedDate.toLocaleDateString('en-GB', options);
  }
}

function toggleWishlist() {
  isWishlisted = !isWishlisted;
  const icon = document.getElementById('wishlistIcon');
  const btn = document.getElementById('wishlistBtn');

  if (icon && btn) {
    if (isWishlisted) {
      icon.innerText = 'favorite';
      icon.classList.add('text-rose-500', 'material-symbols-fill');
      showToast(`${currentCake.name} saved to wishlist ♡`);
    } else {
      icon.innerText = 'favorite_border';
      icon.classList.remove('text-rose-500', 'material-symbols-fill');
      showToast('Removed from wishlist');
    }
  }
}

function navigateBack() {
  if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

function updateFloatingCartBadge() {
  const badge = document.getElementById('floatingCartBadge');
  if (!badge) return;
  const cart = CC_CORE.getCart();
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  badge.innerText = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function handleAddToCart() {
  if (!currentCake) return;

  const basePrice = currentCake.price || 650;
  let finalPrice = basePrice;
  if (selectedSize === '1 kg') {
    finalPrice = Math.round((basePrice * 1.6923) / 50) * 50;
  } else if (selectedSize === '1.5 kg') {
    finalPrice = Math.round((basePrice * 2.3846) / 50) * 50;
  }

  const msgInput = document.getElementById('customMessageInput');
  const customMessage = msgInput ? msgInput.value.trim() : '';

  const dateDisplay = document.getElementById('deliveryDateDisplay');
  const deliveryDate = dateDisplay ? dateDisplay.innerText : 'Tomorrow';

  const cartItem = {
    cakeId: currentCake.id,
    name: currentCake.name,
    size: `${selectedSize} (${selectedShape})`,
    shape: selectedShape,
    flavor: selectedFlavor || currentCake.flavor || 'Signature Truffle Ganache',
    writingOnCake: customMessage,
    customMessage: customMessage || 'None',
    deliveryDate: deliveryDate,
    price: finalPrice,
    quantity: 1,
    image: currentGallery[0] || currentCake.image,
    eggless: isEggless,
    dietary: isEggless ? '100% Eggless (Pure Veg)' : 'With Fresh Eggs'
  };

  CC_CORE.addToCart(cartItem);
  updateFloatingCartBadge();

  // Show Toast
  const shortFlavor = (selectedFlavor || '').replace(/\(Recommended\)/i, '').trim();
  const dietBadge = isEggless ? 'Eggless 🟢' : 'With Egg 🔴';
  showToast(`<strong>${currentCake.name}</strong> (${selectedSize} • ${dietBadge}) added!`);
}

function showToast(htmlContent) {
  const toast = document.getElementById('cartToast');
  const desc = document.getElementById('toastCakeDesc');
  if (desc) desc.innerHTML = htmlContent;
  if (toast) {
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3500);
  }
}

// Populate Related / You May Also Like Cakes
function initRelatedProducts() {
  const container = document.getElementById('relatedProductsContainer');
  if (!container || !window.CC_CORE) return;

  const otherCakes = CC_CORE.catalogue
    .filter(c => !currentCake || c.id !== currentCake.id)
    .slice(0, 4);

  container.innerHTML = otherCakes.map(cake => `
    <div class="p-2.5 rounded-2xl bg-[#fdfbf9] border border-brand-border/70 hover:border-brand-primary/40 transition-all flex flex-col justify-between group shadow-2xs">
      <div>
        <a href="product.html?id=${cake.id}" class="block aspect-square rounded-xl overflow-hidden bg-brand-pill/40 relative">
          <img src="${cake.image}" alt="${cake.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
          ${cake.eggless ? `
            <span class="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs text-emerald-900 text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Eggless
            </span>
          ` : ''}
        </a>
        <div class="mt-2 space-y-0.5">
          <a href="product.html?id=${cake.id}" class="font-serif text-xs xs:text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors line-clamp-1 block">
            ${cake.name}
          </a>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[#5e201b]">₹${cake.price.toLocaleString('en-IN')}</span>
            <div class="flex items-center text-[10px] text-amber-500 font-semibold">
              <span class="material-symbols-outlined text-[12px] material-symbols-fill">star</span>
              <span class="text-brand-dark/70 ml-0.5">${cake.rating || '4.9'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-2.5 pt-2 border-t border-brand-border/40 flex items-center justify-between gap-1.5">
        <a href="product.html?id=${cake.id}" class="text-[10px] font-semibold text-[#705b56] hover:text-[#b5655a] transition-colors">
          View
        </a>
        <button type="button" onclick="quickAddRelated('${cake.id}')" class="px-2.5 py-1 bg-brand-dark hover:bg-brand-primary text-white text-[10px] font-bold rounded-lg transition-all active:scale-95 flex items-center gap-0.5 cursor-pointer shadow-xs">
          <span class="material-symbols-outlined text-[13px]">add</span>
          <span>Add</span>
        </button>
      </div>
    </div>
  `).join('');
}

function quickAddRelated(cakeId) {
  const item = CC_CORE.catalogue.find(c => c.id === cakeId);
  if (!item) return;

  CC_CORE.addToCart({
    cakeId: item.id,
    name: item.name,
    size: '0.5 kg (Round)',
    shape: 'Round',
    flavor: item.flavor || 'Signature Flavour',
    writingOnCake: 'Celebration',
    customMessage: 'None',
    deliveryDate: 'Tomorrow',
    price: item.price,
    quantity: 1,
    image: item.image,
    eggless: item.eggless !== false
  });

  updateFloatingCartBadge();
  showToast(`<strong>${item.name}</strong> added to your cart!`);
}

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
    <div class="p-3.5 bg-[#faece9]/50 rounded-2xl border border-brand-border/60 text-xs space-y-2">
      <div class="flex items-center justify-between">
        <span class="font-bold text-brand-dark">Order ${found.id}</span>
        <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">${found.status || 'Baking in Oven'}</span>
      </div>
      <p class="text-brand-dark/70 text-[11px]">Patron: <strong>${found.customerName}</strong> • ${found.items && found.items.length ? found.items[0].name : 'Artisan Cake'}</p>
      <p class="text-brand-dark/60 text-[10px]">Estimated Delivery: <strong>${found.requestedDate || 'Today'}, ${found.timeSlot || '2:00 PM - 5:00 PM'}</strong></p>
    </div>

    <!-- Stepper Tracker -->
    <div class="relative pl-6 space-y-4 border-l-2 border-brand-primary/40 ml-3 py-1">
      <div class="relative flex items-center gap-3">
        <span class="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center text-white text-[10px]">✓</span>
        <div>
          <h4 class="font-bold text-xs text-brand-dark">Order Confirmed &amp; Queued</h4>
          <p class="text-[10px] text-brand-dark/60">Ingredients selected &amp; baker assigned</p>
        </div>
      </div>
      <div class="relative flex items-center gap-3">
        <span class="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center text-white text-[10px]">✓</span>
        <div>
          <h4 class="font-bold text-xs text-brand-dark">Freshly Baking in Oven</h4>
          <p class="text-[10px] text-brand-dark/60">180°C slow sponge baking in progress</p>
        </div>
      </div>
      <div class="relative flex items-center gap-3">
        <span class="absolute -left-[31px] w-4 h-4 rounded-full bg-brand-border flex items-center justify-center text-brand-dark/40 text-[10px]">3</span>
        <div>
          <h4 class="font-bold text-xs text-brand-dark/60">Cold-Chain Hand-Courier</h4>
          <p class="text-[10px] text-brand-dark/40">Thermodynamic chilled box dispatch</p>
        </div>
      </div>
    </div>
  `;
}
