/**
 * Crumb & Cocoa — Haute Pâtisserie Atelier
 * Home Page & Bespoke Order Logic (assets/js/home.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('bespokeDate');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }
  recalculateBespokeEstimate();
});

// Quick Add from Catalogue Grid
function quickAdd(cakeId) {
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
    showToast(item.name, 'Added 1x 6-inch cake to your Bag.');
  }
}

function showToast(title, msg) {
  const toast = document.getElementById('quickToast');
  if (!toast) return;
  document.getElementById('toastTitle').innerText = title;
  document.getElementById('toastMessage').innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3500);
}

// Filter Cakes by Circular Avatar (Flipkart/Commercial App Pattern)
function filterCategoryCircle(category, el) {
  // Update circle active ring states
  const circles = document.querySelectorAll('.category-circle-btn');
  circles.forEach(btn => {
    const ring = btn.querySelector('.category-circle-ring');
    const label = btn.querySelector('.category-circle-label');
    if (ring) {
      ring.classList.remove('border-secondary', 'ring-2', 'ring-secondary/30');
      ring.classList.add('border-outline-variant');
    }
    if (label) {
      label.classList.remove('text-primary', 'font-bold');
      label.classList.add('text-on-surface-variant', 'font-medium');
    }
  });

  if (el) {
    const ring = el.querySelector('.category-circle-ring');
    const label = el.querySelector('.category-circle-label');
    if (ring) {
      ring.classList.remove('border-outline-variant');
      ring.classList.add('border-secondary', 'ring-2', 'ring-secondary/30');
    }
    if (label) {
      label.classList.remove('text-on-surface-variant', 'font-medium');
      label.classList.add('text-primary', 'font-bold');
    }
  }

  // Also sync the filter-btn chips below
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => {
    b.classList.remove('bg-primary', 'text-on-primary');
    b.classList.add('bg-surface-container', 'text-on-surface-variant');
    if (b.innerText.toLowerCase().includes(category.toLowerCase())) {
      b.classList.remove('bg-surface-container', 'text-on-surface-variant');
      b.classList.add('bg-primary', 'text-on-primary');
    }
  });

  // Filter the cake cards
  const cards = document.querySelectorAll('.cake-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category') || '';
    if (category === 'All' || cat.includes(category)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Scroll smoothly down to the product section
  const cakesSec = document.getElementById('all-cakes');
  if (cakesSec) {
    const navOffset = 90;
    const elementPosition = cakesSec.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - navOffset,
      behavior: 'smooth'
    });
  }
}

// Filter Cakes by Category Chips
function filterCakes(category, btnElement) {
  const cards = document.querySelectorAll('.cake-card');
  const buttons = document.querySelectorAll('.filter-btn');

  if (btnElement) {
    buttons.forEach(b => {
      b.classList.remove('bg-primary', 'text-on-primary');
      b.classList.add('bg-surface-container', 'text-on-surface-variant');
    });
    btnElement.classList.remove('bg-surface-container', 'text-on-surface-variant');
    btnElement.classList.add('bg-primary', 'text-on-primary');
  }

  // Also sync category circle ring if matching
  const circles = document.querySelectorAll('.category-circle-btn');
  circles.forEach(btn => {
    const ring = btn.querySelector('.category-circle-ring');
    const label = btn.querySelector('.category-circle-label');
    const catName = btn.getAttribute('data-circle-cat');
    if (catName === category) {
      if (ring) {
        ring.classList.remove('border-outline-variant');
        ring.classList.add('border-secondary', 'ring-2', 'ring-secondary/30');
      }
      if (label) {
        label.classList.remove('text-on-surface-variant', 'font-medium');
        label.classList.add('text-primary', 'font-bold');
      }
    } else {
      if (ring) {
        ring.classList.remove('border-secondary', 'ring-2', 'ring-secondary/30');
        ring.classList.add('border-outline-variant');
      }
      if (label) {
        label.classList.remove('text-primary', 'font-bold');
        label.classList.add('text-on-surface-variant', 'font-medium');
      }
    }
  });

  cards.forEach(card => {
    const cat = card.getAttribute('data-category') || '';
    if (category === 'All' || cat.includes(category)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Bespoke Custom Form Calculations
function updateColorChoice(colorName) {
  const label = document.getElementById('estColorName');
  if (label) label.innerText = colorName;
}

function updateCharCount(input) {
  const counter = document.getElementById('pipingCharCount');
  if (counter) counter.innerText = `${input.value.length} / 28 chars`;
}

function toggleAddressField(val) {
  const container = document.getElementById('bespokeAddressContainer');
  const addressInput = document.getElementById('bespokeAddress');
  if (!container || !addressInput) return;
  if (val === 'Pickup') {
    container.classList.add('opacity-40');
    addressInput.disabled = true;
    addressInput.placeholder = 'Atelier Kitchen Pickup (Indiranagar) - Address not required';
  } else {
    container.classList.remove('opacity-40');
    addressInput.disabled = false;
    addressInput.placeholder = 'Flat / Villa number, Apartment name, Street, Pincode';
  }
}

function recalculateBespokeEstimate() {
  const cakeSelect = document.getElementById('customCakeSelect');
  const sizeSelect = document.getElementById('customSizeSelect');
  if (!cakeSelect || !sizeSelect) return;

  const selectedCakeOpt = cakeSelect.options[cakeSelect.selectedIndex];
  const selectedSizeOpt = sizeSelect.options[sizeSelect.selectedIndex];

  const basePrice = parseFloat(selectedCakeOpt.getAttribute('data-price') || 3400);
  const multiplier = parseFloat(selectedSizeOpt.getAttribute('data-multiplier') || 1.35);

  const total = Math.round(basePrice * multiplier / 50) * 50;

  const cakeLabel = document.getElementById('estCakeName');
  const sizeLabel = document.getElementById('estSizeName');
  const priceLabel = document.getElementById('estTotalPrice');

  if (cakeLabel) cakeLabel.innerText = selectedCakeOpt.value;
  if (sizeLabel) sizeLabel.innerText = selectedSizeOpt.value;
  if (priceLabel) priceLabel.innerText = CC_CORE.formatINR(total);
}

function handleBespokeSubmit(e) {
  e.preventDefault();

  const cakeSelect = document.getElementById('customCakeSelect');
  const sizeSelect = document.getElementById('customSizeSelect');
  const cakeName = cakeSelect.value;
  const size = sizeSelect.value;
  const colorInput = document.querySelector('input[name="bespoke_color"]:checked');
  const creamColor = colorInput ? colorInput.value : 'Classic Valrhona Noir';
  const writing = document.getElementById('bespokePiping').value.trim() || 'Custom Celebration';
  const theme = document.getElementById('bespokeTheme').value.trim();
  const date = document.getElementById('bespokeDate').value;
  const slot = document.getElementById('bespokeSlot').value;
  const fulfilment = document.getElementById('bespokeFulfilment').value;
  const address = document.getElementById('bespokeAddress').value.trim();
  const patronName = document.getElementById('bespokeName').value.trim();
  const phone = document.getElementById('bespokePhone').value.trim();
  const email = document.getElementById('bespokeEmail').value.trim();

  const basePrice = parseFloat(cakeSelect.options[cakeSelect.selectedIndex].getAttribute('data-price') || 3400);
  const multiplier = parseFloat(sizeSelect.options[sizeSelect.selectedIndex].getAttribute('data-multiplier') || 1.35);
  const total = Math.round(basePrice * multiplier / 50) * 50;

  // Find template image
  const match = CC_CORE.catalogue.find(c => c.name.toLowerCase().includes(cakeName.toLowerCase().split(' ')[0]));
  const imgUrl = match ? match.image : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfQP7STYDi9tOM7hTybS4GMnv5lvT8zQAGR6JHgDqyjGe5gMiuwWRl3-eb87bn9B1dOuVHPohjXZqu77PK5aPQPJD_QZQ9E-VMYa2r6p_HocOGkpHlhTjmdagV_DSmCdxgQYPvplVwrhwXidzNeszsEhtEDPmR4BkwmiTlbCDfc_MQnyvv1kz3AoS7rLMaALEc9ac7lelSTcpdSd76Ze-8MvlYvgo1K9HJDt1hFbCK1M06NYV_NfAt';

  // Add as bespoke item to cart
  CC_CORE.addToCart({
    cakeId: 'custom-' + Date.now(),
    name: cakeName + ' (Bespoke Commission)',
    size: size,
    flavor: match ? match.flavor : 'Custom Atelier Flavor',
    creamColor: creamColor,
    writingOnCake: writing,
    designNotes: theme,
    price: total,
    quantity: 1,
    image: imgUrl,
    eggless: true,
    isBespoke: true
  });

  // Save customer pre-fill info in localStorage
  localStorage.setItem('cc_prefill_patron', JSON.stringify({
    name: patronName,
    phone: phone,
    email: email,
    fulfillment: fulfilment,
    address: address,
    requestedDate: date,
    timeSlot: slot,
    notes: theme ? `Design theme: ${theme}. Piping: "${writing}"` : `Piping: "${writing}"`
  }));

  showToast(cakeName + ' Added', 'Bespoke specifications saved to your Atelier Bag.');

  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 700);
}
