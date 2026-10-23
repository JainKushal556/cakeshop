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
      if (p.address && document.getElementById('custAddress')) document.getElementById('custAddress').value = p.address;
      if (p.fulfillment && document.getElementById('custFulfilment')) {
        document.getElementById('custFulfilment').value = p.fulfillment;
        toggleCartAddressField(p.fulfillment);
      }
      if (p.requestedDate && document.getElementById('custDate')) document.getElementById('custDate').value = p.requestedDate;
      if (p.timeSlot && document.getElementById('custTimeSlot')) document.getElementById('custTimeSlot').value = p.timeSlot;
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
    input.placeholder = 'Atelier Kitchen Collection (Indiranagar) - Address not required';
  } else {
    block.classList.remove('opacity-40');
    input.required = true;
    input.placeholder = 'Flat / Villa number, Apartment name, Street, Pincode';
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

  if (container) {
    container.innerHTML = cart.map(item => {
      const itemTotal = item.price * (item.quantity || 1);
      return `
        <article class="py-5 first:pt-2 flex flex-col sm:flex-row gap-5 items-start">
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-outline-variant bg-surface-container">
            <img class="w-full h-full object-cover" src="${item.image}" alt="${item.name}"/>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h3 class="font-headline-sm text-lg text-primary font-medium">${item.name}</h3>
                <p class="text-xs text-on-surface-variant">Flavour: <span class="text-primary font-medium">${item.flavor || 'Signature'}</span></p>
                ${item.creamColor ? `<p class="text-xs text-on-surface-variant">Cream Finish: <span class="text-secondary font-semibold">${item.creamColor}</span></p>` : ''}
                ${item.writingOnCake ? `<p class="text-xs text-secondary mt-0.5 italic">Piping: "${item.writingOnCake}"</p>` : ''}
              </div>
              <div class="text-left sm:text-right mt-1 sm:mt-0">
                <span class="font-headline-sm text-lg text-primary font-semibold">${CC_CORE.formatINR(itemTotal)}</span>
                <p class="text-[11px] text-secondary">Taxes Included</p>
              </div>
            </div>
            <div class="mt-2.5 flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-container border border-outline-variant text-[11px] font-semibold text-primary">
                Size: ${item.size || 'Standard'}
              </span>
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary-fixed/40 text-[11px] font-semibold text-on-secondary-fixed-variant">
                <span class="material-symbols-outlined text-[13px]">ac_unit</span> Chilled Box
              </span>
              ${item.eggless ? `
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-[11px] font-semibold">
                  <span class="material-symbols-outlined text-[13px]">eco</span> Eggless
                </span>
              ` : ''}
            </div>
            <div class="mt-4 flex items-center justify-between border-t border-dashed border-outline-variant/60 pt-3">
              <!-- Quantity Controls -->
              <div class="inline-flex items-center border border-outline-variant rounded-lg bg-surface-container-low">
                <button type="button" class="px-2.5 py-1 text-on-surface hover:bg-surface-container transition-colors" onclick="changeItemQty('${item.id}', -1)">
                  <span class="material-symbols-outlined text-[14px]">remove</span>
                </button>
                <span class="px-3 py-1 text-xs font-semibold text-primary">${item.quantity || 1}</span>
                <button type="button" class="px-2.5 py-1 text-on-surface hover:bg-surface-container transition-colors" onclick="changeItemQty('${item.id}', 1)">
                  <span class="material-symbols-outlined text-[14px]">add</span>
                </button>
              </div>
              <!-- Remove Action -->
              <button type="button" class="text-xs text-error hover:opacity-80 transition-opacity flex items-center gap-1" onclick="removeItem('${item.id}')">
                <span class="material-symbols-outlined text-[16px]">delete_outline</span>
                <span>Remove</span>
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

  if (subVal) subVal.innerText = CC_CORE.formatINR(subtotal);
  if (delVal) delVal.innerText = deliveryFee === 0 ? 'Free' : CC_CORE.formatINR(deliveryFee);
  if (totVal) totVal.innerText = CC_CORE.formatINR(total);
  
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

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const fulfilment = document.getElementById('custFulfilment').value;
  const address = document.getElementById('custAddress').value.trim();
  const date = document.getElementById('custDate').value;
  const slot = document.getElementById('custTimeSlot').value;
  const notes = document.getElementById('custNotes').value.trim();

  const subtotal = CC_CORE.getCartSubtotal();
  const deliveryFee = (fulfilment === 'Pickup' || subtotal >= 5000) ? 0 : 150;
  const total = subtotal + deliveryFee;

  const orderPayload = {
    customerName: name,
    phone: phone,
    email: email,
    fulfillment: fulfilment,
    address: fulfilment === 'Pickup' ? 'Atelier Kitchen Collection (Indiranagar)' : address,
    requestedDate: date,
    timeSlot: slot,
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
  if (phoneDesc) phoneDesc.innerHTML = `Chef Clara calling <strong class="text-primary">${order.phone}</strong> within 1 hour to verify cold-chain arrival and flavor balance.`;
  if (emailDesc) emailDesc.innerHTML = `Detailed commission summary dispatched to <strong class="text-primary">${order.email}</strong>.`;
  if (dateSlot) dateSlot.innerText = `${order.requestedDate} • ${order.timeSlot}`;
  if (addrDesc) addrDesc.innerText = order.fulfillment === 'Pickup' ? 'Self pickup at Atelier Kitchen (Indiranagar)' : `Chilled courier dispatch to ${order.address}`;
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
