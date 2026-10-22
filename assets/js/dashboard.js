/**
 * Crumb & Cocoa — Haute Pâtisserie Atelier
 * Owner Dashboard & Kitchen Command Logic (assets/js/dashboard.js)
 */

let currentFilter = 'All';

document.addEventListener('DOMContentLoaded', () => {
  refreshDashboard();
  renderCatalogue();
});

function refreshDashboard() {
  const orders = CC_CORE.getOrders();
  renderMetrics(orders);
  renderOrdersTable(orders);
  renderSalesLedger(orders);
}

function renderMetrics(orders) {
  const newOrders = orders.filter(o => o.status === 'New / Pending Review');
  const confirmed = orders.filter(o => o.status === 'Confirmed');
  const preparing = orders.filter(o => o.status === 'Preparing' || o.status === 'Ready');
  const completed = orders.filter(o => o.status === 'Completed');

  const totalSales = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.totalValue || 0), 0);
  const totalReceived = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.amountReceived || 0), 0);
  const unpaid = totalSales - totalReceived;

  const mNew = document.getElementById('metricNewCount');
  const mConf = document.getElementById('metricConfirmedCount');
  const mPrep = document.getElementById('metricPreparingCount');
  const mComp = document.getElementById('metricCompletedCount');
  const mSales = document.getElementById('metricTotalSales');
  const mUnpaid = document.getElementById('metricUnpaidBalance');

  if (mNew) mNew.innerText = newOrders.length;
  if (mConf) mConf.innerText = confirmed.length;
  if (mPrep) mPrep.innerText = preparing.length;
  if (mComp) mComp.innerText = completed.length;
  if (mSales) mSales.innerText = CC_CORE.formatINR(totalSales);
  if (mUnpaid) mUnpaid.innerText = CC_CORE.formatINR(unpaid);
}

function setOrderStatusFilter(status, btnEl) {
  currentFilter = status;
  document.querySelectorAll('.order-filter-chip').forEach(chip => {
    chip.classList.remove('bg-primary', 'text-on-primary');
    chip.classList.add('bg-surface-container', 'text-on-surface-variant');
  });
  if (btnEl) {
    btnEl.classList.remove('bg-surface-container', 'text-on-surface-variant');
    btnEl.classList.add('bg-primary', 'text-on-primary');
  }
  filterOrdersTable();
}

function filterOrdersTable() {
  const searchInput = document.getElementById('orderSearchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  let orders = CC_CORE.getOrders();

  if (currentFilter !== 'All') {
    orders = orders.filter(o => o.status === currentFilter);
  }

  if (query) {
    orders = orders.filter(o => 
      o.id.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.phone.toLowerCase().includes(query)
    );
  }

  renderOrdersTable(orders);
}

function renderOrdersTable(orders) {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-8 text-on-surface-variant text-xs">
          No orders found matching the filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    let statusBadge = 'bg-surface-container text-primary';
    if (order.status === 'New / Pending Review') statusBadge = 'bg-amber-100 text-amber-900 border border-amber-300';
    else if (order.status === 'Confirmed') statusBadge = 'bg-blue-100 text-blue-900 border border-blue-300';
    else if (order.status === 'Preparing') statusBadge = 'bg-purple-100 text-purple-900 border border-purple-300';
    else if (order.status === 'Ready') statusBadge = 'bg-teal-100 text-teal-900 border border-teal-300';
    else if (order.status === 'Completed') statusBadge = 'bg-emerald-100 text-emerald-900 border border-emerald-300';
    else if (order.status === 'Cancelled') statusBadge = 'bg-rose-100 text-rose-900 border border-rose-300';

    let paymentBadge = 'bg-rose-100 text-rose-800';
    if (order.paymentStatus === 'Paid') paymentBadge = 'bg-emerald-100 text-emerald-800';
    else if (order.paymentStatus === 'Partially Paid') paymentBadge = 'bg-amber-100 text-amber-800';

    const itemsSummary = (order.items || []).map(i => `
      <div class="mb-1">
        <span class="font-semibold text-primary">${i.name}</span> (${i.size})
        ${i.creamColor ? `<br/><span class="text-[11px] text-secondary font-medium">Cream: ${i.creamColor}</span>` : ''}
        ${i.writingOnCake ? `<br/><span class="text-[11px] text-outline italic">Piping: "${i.writingOnCake}"</span>` : ''}
      </div>
    `).join('');

    return `
      <tr class="hover:bg-surface-container-low/70 transition-colors">
        <td class="py-3.5 px-4 font-semibold text-primary font-mono">${order.id}</td>
        <td class="py-3.5 px-4">
          <span class="font-semibold text-primary block">${order.customerName}</span>
          <a href="tel:${order.phone}" class="text-secondary hover:underline flex items-center gap-1 font-mono mt-0.5">
            <span class="material-symbols-outlined text-[13px]">call</span>
            <span>${order.phone}</span>
          </a>
        </td>
        <td class="py-3.5 px-4 max-w-xs">${itemsSummary}</td>
        <td class="py-3.5 px-4">
          <span class="font-medium text-primary block">${order.requestedDate}</span>
          <span class="text-[11px] text-on-surface-variant block">${order.timeSlot || 'Afternoon'}</span>
          <span class="text-[10px] text-outline block uppercase mt-0.5">${order.fulfillment || 'Delivery'}</span>
        </td>
        <td class="py-3.5 px-4 font-semibold text-primary">${CC_CORE.formatINR(order.totalValue)}</td>
        <td class="py-3.5 px-4">
          <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${statusBadge}">
            ${order.status}
          </span>
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${paymentBadge}">
            ${order.paymentStatus}
          </span>
          ${order.amountReceived > 0 ? `<span class="block text-[10px] text-outline mt-0.5">Rec: ${CC_CORE.formatINR(order.amountReceived)}</span>` : ''}
        </td>
        <td class="py-3.5 px-4 text-right">
          <button onclick="openOrderDetail('${order.id}')" class="px-2.5 py-1.5 bg-surface-container border border-outline-variant hover:border-secondary rounded text-xs font-semibold text-primary transition-all">
            Review &amp; Update
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSalesLedger(orders) {
  const tbody = document.getElementById('salesLedgerBody');
  if (!tbody) return;

  tbody.innerHTML = orders.map(o => {
    const balance = (o.totalValue || 0) - (o.amountReceived || 0);
    return `
      <tr class="hover:bg-surface-container-low/70">
        <td class="py-3 px-4 font-mono font-semibold text-primary">${o.id}</td>
        <td class="py-3 px-4 font-medium text-primary">${o.customerName}</td>
        <td class="py-3 px-4 font-semibold text-primary">${CC_CORE.formatINR(o.totalValue)}</td>
        <td class="py-3 px-4 font-medium text-emerald-800">${CC_CORE.formatINR(o.amountReceived)}</td>
        <td class="py-3 px-4 font-bold ${balance > 0 ? 'text-rose-800' : 'text-emerald-800'}">${CC_CORE.formatINR(balance)}</td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${o.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}">
            ${o.paymentStatus}
          </span>
        </td>
        <td class="py-3 px-4 text-outline text-[11px]">${o.ownerNotes || 'Manual payment upon handoff'}</td>
      </tr>
    `;
  }).join('');
}

function renderCatalogue() {
  const grid = document.getElementById('catalogueGrid');
  if (!grid) return;

  grid.innerHTML = CC_CORE.catalogue.map(cake => `
    <div class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
      <div>
        <div class="aspect-[4/3] w-full overflow-hidden bg-surface-container relative">
          <img src="${cake.image}" alt="${cake.name}" class="w-full h-full object-cover"/>
          <span class="absolute top-3 left-3 bg-surface-container-lowest/90 px-2 py-0.5 rounded text-[11px] font-semibold text-primary border border-outline-variant">
            ${cake.category}
          </span>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex justify-between items-start">
            <h3 class="font-headline-sm text-lg text-primary font-medium">${cake.name}</h3>
            <span class="font-headline-sm text-lg font-bold text-primary">${CC_CORE.formatINR(cake.price)}</span>
          </div>
          <p class="text-xs text-on-surface-variant line-clamp-2">${cake.desc}</p>
          <p class="text-[11px] text-secondary font-medium">Flavour: ${cake.flavor}</p>
        </div>
      </div>
      <div class="p-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-low/50">
        <span class="text-xs text-emerald-800 font-semibold flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Active on Store
        </span>
        <a href="product.html?id=${cake.id}" class="text-xs text-primary font-semibold hover:underline">
          View Product →
        </a>
      </div>
    </div>
  `).join('');
}

function openOrderDetail(orderId) {
  const orders = CC_CORE.getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const idInput = document.getElementById('editOrderId');
  const refLbl = document.getElementById('modalOrderRef');
  const dateLbl = document.getElementById('modalOrderDate');
  const patName = document.getElementById('modalPatronName');
  const patEmail = document.getElementById('modalPatronEmail');
  const callBtn = document.getElementById('modalCallBtn');
  const fulfLbl = document.getElementById('modalFulfilment');
  const slotLbl = document.getElementById('modalSlot');
  const addrLbl = document.getElementById('modalAddress');
  const notesLbl = document.getElementById('modalNotes');

  if (idInput) idInput.value = order.id;
  if (refLbl) refLbl.innerText = `Order #${order.id}`;
  if (dateLbl) dateLbl.innerText = `Placed: ${new Date(order.createdAt).toLocaleString('en-IN')}`;
  if (patName) patName.innerText = order.customerName;
  if (patEmail) patEmail.innerText = order.email;
  if (callBtn) {
    callBtn.href = `tel:${order.phone}`;
    const txtSpan = callBtn.querySelector('span:last-child');
    if (txtSpan) txtSpan.innerText = `Call ${order.phone}`;
  }
  if (fulfLbl) fulfLbl.innerText = order.fulfillment;
  if (slotLbl) slotLbl.innerText = `${order.requestedDate} (${order.timeSlot})`;
  if (addrLbl) addrLbl.innerText = order.address || 'Pickup from Indiranagar Kitchen';
  if (notesLbl) notesLbl.innerText = order.notes || 'None';

  const statSelect = document.getElementById('editStatus');
  const payStatSelect = document.getElementById('editPaymentStatus');
  const amtInput = document.getElementById('editAmountReceived');
  const totInput = document.getElementById('editTotalValue');
  const ownerNotes = document.getElementById('editOwnerNotes');

  if (statSelect) statSelect.value = order.status;
  if (payStatSelect) payStatSelect.value = order.paymentStatus || 'Unpaid';
  if (amtInput) amtInput.value = order.amountReceived || 0;
  if (totInput) totInput.value = CC_CORE.formatINR(order.totalValue);
  if (ownerNotes) ownerNotes.value = order.ownerNotes || '';

  const itemsContainer = document.getElementById('modalItemsList');
  if (itemsContainer) {
    itemsContainer.innerHTML = (order.items || []).map(i => `
      <div class="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex justify-between items-start text-xs">
        <div>
          <p class="font-semibold text-primary text-sm">${i.name} <span class="font-normal text-xs">(${i.size})</span></p>
          <p class="text-secondary font-medium">Flavour: ${i.flavor}</p>
          <p class="text-on-surface-variant font-medium">Cream Colour: <strong class="text-primary">${i.creamColor || 'Classic Noir'}</strong></p>
          ${i.writingOnCake ? `<p class="text-primary italic mt-1 bg-surface-container p-1 rounded">Piping Plaque: "${i.writingOnCake}"</p>` : ''}
        </div>
        <div class="text-right">
          <span class="font-semibold text-primary text-sm">${CC_CORE.formatINR(i.price)}</span>
          <span class="block text-outline text-[11px]">Qty: ${i.qty || 1}</span>
        </div>
      </div>
    `).join('');
  }

  const modal = document.getElementById('orderDetailModal');
  if (modal) modal.classList.remove('hidden');
}

function closeOrderDetailModal() {
  const modal = document.getElementById('orderDetailModal');
  if (modal) modal.classList.add('hidden');
}

function handleOrderUpdateSubmit(e) {
  e.preventDefault();
  const orderId = document.getElementById('editOrderId').value;
  const status = document.getElementById('editStatus').value;
  const paymentStatus = document.getElementById('editPaymentStatus').value;
  const amountReceived = document.getElementById('editAmountReceived').value;
  const notes = document.getElementById('editOwnerNotes').value;

  CC_CORE.updateOrderStatus(orderId, status, paymentStatus, amountReceived, notes);
  closeOrderDetailModal();
  refreshDashboard();
}

function switchTab(tabName, btnEl) {
  document.querySelectorAll('.dash-tab').forEach(t => {
    t.classList.remove('bg-primary', 'text-on-primary');
    t.classList.add('text-on-surface-variant');
  });
  if (btnEl) {
    btnEl.classList.remove('text-on-surface-variant');
    btnEl.classList.add('bg-primary', 'text-on-primary');
  }

  const tabOrd = document.getElementById('tabOrders');
  const tabCat = document.getElementById('tabCatalogue');
  const tabSal = document.getElementById('tabSales');

  if (tabOrd) tabOrd.classList.add('hidden');
  if (tabCat) tabCat.classList.add('hidden');
  if (tabSal) tabSal.classList.add('hidden');

  if (tabName === 'orders' && tabOrd) tabOrd.classList.remove('hidden');
  else if (tabName === 'catalogue' && tabCat) tabCat.classList.remove('hidden');
  else if (tabName === 'sales' && tabSal) tabSal.classList.remove('hidden');
}
