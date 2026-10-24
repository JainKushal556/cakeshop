/**
 * Crumb & Cocoa — Haute Pâtisserie Atelier
 * Cart Review & Order Submission Logic (assets/js/cart.js)
 */

let latestCreatedOrder = null;

document.addEventListener('DOMContentLoaded', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const dateEl = document.getElementById('custDate');
  if (dateEl) {
    dateEl.min = `${yyyy}-${mm}-${dd}`;
    dateEl.value = `${yyyy}-${mm}-${dd}`;
  }

  // Pre-fill patron data if set from bespoke builder
  const prefill = localStorage.getItem('cc_prefill_patron');
  if (prefill) {
    try {
      const p = JSON.parse(prefill);
      if (p.name && document.getElementById('custName')) document.getElementById('custName').value = p.name;
      if (p.phone && document.getElementById('custPhone')) document.getElementById('custPhone').value = p.phone;
      if (p.email && document.getElementById('custEmail')) document.getElementById('custEmail').value = p.email;
      if (p.notes && document.getElementById('custNotes')) document.getElementById('custNotes').value = p.notes;
    } catch(e) {}
  }

  renderCart();
});

function toggleCartAddressField(val) {
  const block = document.getElementById('cartAddressBlock');
  const input = document.getElementById('custAddress');
  if (!block || !input) return;
  if (val === 'Pickup') {
    block.classList.add('opacity-40');
    input.required = false;
  } else {
    block.classList.remove('opacity-40');
    input.required = true;
  }
  recalculateCartTotals();
}

function renderCart() {
  const cart = CC_CORE.getCart();
  const container = document.getElementById('cartItemsList');
  const countEl = document.getElementById('stepperItemCount');
  const summaryPill = document.getElementById('summaryPill');
  const checkoutLayout = document.getElementById('checkoutMainLayout');
  const emptyCartView = document.getElementById('emptyCartView');
  const headerActions = document.getElementById('cartHeaderActions');
  const pageTitle = document.getElementById('cartPageTitle');
  const pageSubtext = document.getElementById('cartPageSubtext');
  const headerBadge = document.getElementById('cartHeaderBadge');

  if (cart.length === 0) {
    // Hide checkout layout completely (forms, stepper, price breakdown, submit button)
    if (checkoutLayout) checkoutLayout.classList.add('hidden');
    // Reveal clean empty state view
    if (emptyCartView) emptyCartView.classList.remove('hidden');
    // Hide demo view switcher
    if (headerActions) headerActions.classList.add('hidden');
    
    // Set appropriate page titles
    if (pageTitle) pageTitle.textContent = 'Your Cart';
    if (pageSubtext) pageSubtext.textContent = 'Your cart is currently waiting for your sweet celebration selection.';
    if (headerBadge) headerBadge.textContent = 'Fresh Artisanal Bakes • Bengaluru';

    if (countEl) countEl.innerText = '0 Creations';
    if (summaryPill) summaryPill.innerText = '0 Creations';
    recalculateCartTotals();
    CC_CORE.updateBadges();
    return;
  }

  // Cart has items: Show checkout layout and hide empty cart state
  if (checkoutLayout) checkoutLayout.classList.remove('hidden');
  if (emptyCartView) emptyCartView.classList.add('hidden');
  if (headerActions) headerActions.classList.remove('hidden');

  if (pageTitle) pageTitle.textContent = 'Cart Review & Checkout';
  if (pageSubtext) pageSubtext.textContent = 'Handcrafted daily with cold-pressed French butter & single-origin Valrhona chocolate. No payment collected online.';
  if (headerBadge) headerBadge.textContent = 'Artisan Batch Reservation • Direct Baker Verification';

  if (countEl) countEl.innerText = `${cart.length} Creation${cart.length > 1 ? 's' : ''}`;
  if (summaryPill) summaryPill.innerText = `${cart.length} Creation${cart.length > 1 ? 's' : ''}`;

  // Manage mobile sticky checkout bar visibility
  const mobileCheckoutBar = document.getElementById('mobileCheckoutBar');
  if (mobileCheckoutBar) {
    if (cart.length === 0) {
      mobileCheckoutBar.classList.add('hidden');
    } else {
      mobileCheckoutBar.classList.remove('hidden');
    }
  }

  if (container) {
    container.innerHTML = cart.map(item => {
      const itemTotal = item.price * (item.quantity || 1);
      return `
        <article class="py-4 first:pt-1 flex flex-row gap-3 xs:gap-4 sm:gap-5 items-start">
          <!-- Cake Thumbnail -->
          <div class="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-outline-variant bg-surface-container shadow-2xs">
            <img class="w-full h-full object-cover" src="${item.image}" alt="${item.name}"/>
          </div>

          <!-- Cake Details -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-1.5">
              <div class="min-w-0 pr-1">
                <h3 class="font-headline-sm text-base sm:text-lg text-primary font-medium truncate">${item.name}</h3>
                <p class="text-xs text-on-surface-variant truncate">Flavour: <span class="text-primary font-medium">${item.flavor || 'Signature'}</span></p>
                ${item.creamColor ? `<p class="text-[11px] xs:text-xs text-on-surface-variant truncate">Cream: <span class="text-secondary font-semibold">${item.creamColor}</span></p>` : ''}
                ${item.writingOnCake ? `<p class="text-[11px] text-secondary mt-0.5 italic truncate">Piping: "${item.writingOnCake}"</p>` : ''}
              </div>
              <div class="text-right shrink-0">
                <span class="font-headline-sm text-base sm:text-lg text-primary font-bold whitespace-nowrap">${CC_CORE.formatINR(itemTotal)}</span>
                <p class="text-[10px] text-secondary">Taxes incl.</p>
              </div>
            </div>

            <!-- Tags / Pills -->
            <div class="mt-1.5 xs:mt-2 flex flex-wrap items-center gap-1 xs:gap-1.5">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-container border border-outline-variant text-[10px] xs:text-[11px] font-semibold text-primary">
                ${item.size || '0.5 kg'}
              </span>
              <span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-secondary-fixed/40 text-[10px] xs:text-[11px] font-semibold text-on-secondary-fixed-variant">
                <span class="material-symbols-outlined text-[12px]">ac_unit</span> Chilled
              </span>
              ${item.eggless ? `
                <span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] xs:text-[11px] font-semibold">
                  <span class="material-symbols-outlined text-[12px]">eco</span> Eggless
                </span>
              ` : `
                <span class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 text-[10px] xs:text-[11px] font-semibold">
                  <span class="material-symbols-outlined text-[12px]">egg</span> With Egg
                </span>
              `}
            </div>

            <!-- Actions Row: Quantity & Remove -->
            <div class="mt-2.5 xs:mt-3 flex items-center justify-between border-t border-dashed border-outline-variant/60 pt-2 xs:pt-2.5">
              <!-- Quantity Controls -->
              <div class="inline-flex items-center border border-outline-variant rounded-lg bg-surface-container-low">
                <button type="button" class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95 cursor-pointer" onclick="changeItemQty('${item.id}', -1)" aria-label="Decrease quantity">
                  <span class="material-symbols-outlined text-[13px]">remove</span>
                </button>
                <span class="px-2 text-xs font-bold text-primary min-w-[20px] text-center">${item.quantity || 1}</span>
                <button type="button" class="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95 cursor-pointer" onclick="changeItemQty('${item.id}', 1)" aria-label="Increase quantity">
                  <span class="material-symbols-outlined text-[13px]">add</span>
                </button>
              </div>

              <!-- Remove Action -->
              <button type="button" class="text-xs text-error hover:opacity-80 transition-opacity flex items-center gap-0.5 xs:gap-1 cursor-pointer py-1 px-1.5 active:scale-95" onclick="removeItem('${item.id}')">
                <span class="material-symbols-outlined text-[15px]">delete_outline</span>
                <span class="text-[11px] xs:text-xs">Remove</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  recalculateCartTotals();
  CC_CORE.updateBadges();
}

function changeItemQty(itemId, delta) {
  CC_CORE.updateQuantity(itemId, delta);
  renderCart();
}

function removeItem(itemId) {
  CC_CORE.removeFromCart(itemId);
  renderCart();
}

function clearAllCart() {
  if (confirm("Are you sure you wish to clear all cakes from your Atelier Bag?")) {
    CC_CORE.clearCart();
    renderCart();
  }
}

function recalculateCartTotals() {
  const subtotal = CC_CORE.getCartSubtotal();
  const fulfilment = document.getElementById('custFulfilment') ? document.getElementById('custFulfilment').value : 'Delivery';
  
  // Free delivery if subtotal > ₹5000 or Pickup
  let deliveryFee = (fulfilment === 'Pickup' || subtotal >= 5000 || subtotal === 0) ? 0 : 150;
  const total = subtotal + deliveryFee;

  const subVal = document.getElementById('cartSubtotalVal');
  const delVal = document.getElementById('deliveryFeeVal');
  const totVal = document.getElementById('cartTotalVal');
  const mobTotVal = document.getElementById('mobileBottomTotal');

  if (subVal) subVal.innerText = CC_CORE.formatINR(subtotal);
  if (delVal) delVal.innerText = deliveryFee === 0 ? 'Free' : CC_CORE.formatINR(deliveryFee);
  if (totVal) totVal.innerText = CC_CORE.formatINR(total);
  if (mobTotVal) mobTotVal.innerText = CC_CORE.formatINR(total);
  
  const submitBtn = document.getElementById('submitOrderBtn');
  if (submitBtn) {
    submitBtn.querySelector('span').innerText = `Submit Order Request (${CC_CORE.formatINR(total)})`;
    submitBtn.disabled = subtotal === 0;
  }
}

function submitOrderBtnClick() {
  const form = document.getElementById('checkoutForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  form.requestSubmit();
}

function handleOrderSubmission(e) {
  e.preventDefault();

  const cart = CC_CORE.getCart();
  if (cart.length === 0) {
    alert("Your cart is empty. Please select a cake from the collection first.");
    return;
  }

  const name = document.getElementById('custName') ? document.getElementById('custName').value.trim() : 'Customer';
  const phone = document.getElementById('custPhone') ? document.getElementById('custPhone').value.trim() : '';
  const email = document.getElementById('custEmail') ? document.getElementById('custEmail').value.trim() : '';
  const notes = document.getElementById('custNotes') ? document.getElementById('custNotes').value.trim() : '';

  const subtotal = CC_CORE.getCartSubtotal();
  const deliveryFee = 0; // Free direct delivery with phone verification
  const total = subtotal + deliveryFee;

  const orderPayload = {
    customerName: name,
    phone: phone,
    email: email,
    fulfillment: 'Home Delivery (Phone Verification)',
    address: 'Baker will note during confirmation call',
    requestedDate: 'Scheduled on call',
    timeSlot: 'Slot confirmed on call',
    notes: notes,
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    totalValue: total,
    items: cart.map(i => ({
      name: i.name,
      size: i.size,
      flavor: i.flavor,
      creamColor: i.creamColor || 'Classic Noir',
      writingOnCake: i.writingOnCake || '',
      qty: i.quantity || 1,
      price: i.price
    }))
  };

  latestCreatedOrder = CC_CORE.createOrder(orderPayload);
  populateSuccessModal(latestCreatedOrder);
  toggleSuccessModal(true);
  renderCart();
}

function populateSuccessModal(order) {
  const refEl = document.getElementById('successModalRefId');
  const badgeEl = document.getElementById('toggleRefBadge');
  const headEl = document.getElementById('successHeading');
  const subEl = document.getElementById('successSubtext');
  const phoneDesc = document.getElementById('successPhoneDesc');
  const emailDesc = document.getElementById('successEmailDesc');
  const dateSlot = document.getElementById('successDateSlot');
  const addrDesc = document.getElementById('successAddressDesc');
  const summTitle = document.getElementById('successSummaryTitle');
  const summItems = document.getElementById('successSummaryItems');
  const summTot = document.getElementById('successSummaryTotal');

  if (refEl) refEl.innerText = `Order Request Reference: #${order.id}`;
  if (badgeEl) badgeEl.innerText = `#${order.id}`;
  if (headEl) headEl.innerText = `Merci, ${order.customerName}. Your order request is in our oven queue.`;
  if (subEl) subEl.innerText = `We have acknowledged your request for ${order.items.length} artisan cake${order.items.length > 1 ? 's' : ''}. Our Head Chef will review and call you shortly.`;
  if (phoneDesc) phoneDesc.innerHTML = `Head Chef calling <strong class="text-primary">${order.phone}</strong> within 1 hour to note your delivery address, timing, and custom piping notes.`;
  if (emailDesc) emailDesc.innerHTML = `Detailed commission summary dispatched to <strong class="text-primary">${order.email}</strong>.`;
  if (dateSlot) dateSlot.innerText = `Scheduled via Baker Phone Call`;
  if (addrDesc) addrDesc.innerText = `Our Head Chef will note your delivery address during the phone verification call.`;
  if (summTitle) summTitle.innerText = `Summary: ${order.items.length} Artisan Cake${order.items.length > 1 ? 's' : ''}`;
  if (summItems) summItems.innerText = order.items.map(i => `${i.name} (${i.size})`).join(' + ');
  if (summTot) summTot.innerText = CC_CORE.formatINR(order.totalValue);
}

function toggleSuccessModal(show) {
  const modal = document.getElementById('orderSuccessModal');
  if (!modal) return;
  if (show) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  } else {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function switchMainView(view) {
  const btnReview = document.getElementById('viewBtnReview');
  const btnSuccess = document.getElementById('viewBtnSuccess');

  if (view === 'success') {
    if (btnSuccess) {
      btnSuccess.classList.add('bg-primary', 'text-on-primary');
      btnSuccess.classList.remove('text-on-surface-variant');
    }
    if (btnReview) {
      btnReview.classList.remove('bg-primary', 'text-on-primary');
      btnReview.classList.add('text-on-surface-variant');
    }

    if (!latestCreatedOrder) {
      const orders = CC_CORE.getOrders();
      if (orders.length > 0) {
        populateSuccessModal(orders[0]);
      }
    }
    toggleSuccessModal(true);
  } else {
    if (btnReview) {
      btnReview.classList.add('bg-primary', 'text-on-primary');
      btnReview.classList.remove('text-on-surface-variant');
    }
    if (btnSuccess) {
      btnSuccess.classList.remove('bg-primary', 'text-on-primary');
      btnSuccess.classList.add('text-on-surface-variant');
    }
    toggleSuccessModal(false);
  }
}
