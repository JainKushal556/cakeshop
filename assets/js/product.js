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
let isWishlisted = false;

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
  setupTouchGestures();
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

  // Eggless Indicator
  const egglessPill = document.getElementById('egglessPill');
  const egglessText = document.getElementById('egglessText');
  if (egglessPill && egglessText) {
    if (found.eggless !== false) {
      egglessText.innerText = 'Eggless available';
    } else {
      egglessText.innerText = 'Contains Fresh Eggs';
    }
  }

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
  displayCurrentImage();

  // Calculate Size Card Prices
  calculateSizePrices();

  // Set initial character count
  const msgInput = document.getElementById('customMessageInput');
  if (msgInput) updateCharCount(msgInput);
}

function calculateSizePrices() {
  if (!currentCake) return;
  const basePrice = currentCake.price || 650;
  
  // 0.5 kg (1x)
  const p0 = Math.round(basePrice);
  // 1 kg (~1.6923x, e.g. 650 -> 1100)
  const p1 = Math.round((basePrice * 1.6923) / 50) * 50;
  // 1.5 kg (~2.3846x, e.g. 650 -> 1550)
  const p2 = Math.round((basePrice * 2.3846) / 50) * 50;

  const sp0 = document.getElementById('sizePrice0');
  const sp1 = document.getElementById('sizePrice1');
  const sp2 = document.getElementById('sizePrice2');

  if (sp0) sp0.innerText = `₹${p0.toLocaleString('en-IN')}`;
  if (sp1) sp1.innerText = `₹${p1.toLocaleString('en-IN')}`;
  if (sp2) sp2.innerText = `₹${p2.toLocaleString('en-IN')}`;

  updateSummary();
}

function selectSize(sizeStr, multiplier, servings, buttonEl) {
  selectedSize = sizeStr;
  selectedMultiplier = multiplier;

  // Toggle active card styling
  document.querySelectorAll('.size-card').forEach(btn => {
    btn.className = 'size-card flex flex-col items-center justify-center p-2.5 xs:p-3 rounded-2xl border border-brand-border bg-white hover:border-[#b5655a]/60 transition-all cursor-pointer text-center select-none';
  });

  if (buttonEl) {
    buttonEl.className = 'size-card flex flex-col items-center justify-center p-2.5 xs:p-3 rounded-2xl border-2 border-[#b5655a] bg-[#faece9] transition-all cursor-pointer text-center select-none shadow-xs';
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

  if (dynPrice) dynPrice.innerText = priceFormatted;
  if (bottomBarPrice) bottomBarPrice.innerText = priceFormatted;
  if (bottomBarSummary) bottomBarSummary.innerText = `${selectedSize} • ${selectedShape}`;
}

function displayCurrentImage() {
  const mainImg = document.getElementById('mainProductImage');
  const badge = document.getElementById('imageCounterBadge');

  if (mainImg && currentGallery[currentImageIndex]) {
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
      mainImg.src = currentGallery[currentImageIndex];
      mainImg.style.opacity = '1';
    }, 120);
  }

  if (badge) {
    badge.innerText = `${currentImageIndex + 1}/${currentGallery.length}`;
  }
}

function nextImage() {
  if (currentGallery.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
  displayCurrentImage();
}

function prevImage() {
  if (currentGallery.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
  displayCurrentImage();
}

function setupTouchGestures() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) {
      nextImage(); // Swipe left -> next
    } else if (touchEndX > touchStartX + 40) {
      prevImage(); // Swipe right -> prev
    }
  }, { passive: true });
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
    flavor: currentCake.flavor || 'Signature Truffle Ganache',
    writingOnCake: customMessage,
    customMessage: customMessage || 'None',
    deliveryDate: deliveryDate,
    price: finalPrice,
    quantity: 1,
    image: currentGallery[0] || currentCake.image,
    eggless: currentCake.eggless !== false
  };

  CC_CORE.addToCart(cartItem);
  updateFloatingCartBadge();

  // Show Toast
  showToast(`<strong>${currentCake.name}</strong> (${selectedSize} • ${selectedShape}) added!`);
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
