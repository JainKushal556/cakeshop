/**
 * Crumb & Cocoa — Haute Pâtisserie Atelier
 * Product Details & Customizer Logic (assets/js/product.js)
 */

let currentCake = null;
let selectedSize = '6 inch';
let selectedMultiplier = 1.0;
let selectedWeight = '1.0 kg';
let currentQty = 1;

// Multi-photo gallery images per cake
const cakeGalleries = {
  'velvet-noir': [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBWHtgLvx7Q2r_fdMQ9AFqIuPo_SSuXGQ9makUUoHQoY3fW2FshkBU3_Ui7p0J4Q4Lp1x-Vb36upG_-5M42koFbCK1_weQ098ZLMjXC4j4UAoSvVC0rQVx_-75l1KLf_xGKS37lB1-QzUUfIrFlWZ-PGTCb-HnpJdjRnWivXUnsq9y4LK5cyu4Z3HrJCYQDso91LB0AFO3MOyDI-cilwwu8db_1cn11tTY5VLjhCVgcyaPP7hlnUT9s',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzIPI1ZLCHBo4cxUiQ7fOIhk3Sx-3xehgbvQ_3EHXaG4-_Doj1_WV-HTRQ_vPJ-B--949hOnPmkYzmAPSv308zG4DBIx0gmRmcb7yf1rYySkWnJVotHcRPuycOXMiQTtVeHs5JkACkCRtX9VoBG1LwRjfXa61umjPSuKvuLxRmyxdNfSvtvRo6ydgcVdnWe-aHKE55ov1Hz2_1XTH6V7lLJ7Mpmrt17sTmrcjzxgLbkIy4XEWiTPKD',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtqgTVd2ofpvyUrNY6pkU_Y-ILOXrBtgNvxM2WmRYwyi4ybdtTuRZWV7XXb8N5cNmUATom5QzTunQcqwjFepoAS1bOrkTCxiXKneoAbAuyYJpzuz31FUpNd5rA9PXsHrx61qH7W_bS4-tyIuzH28Y86ZoWTkxg0Z-HExnuMHA5M_MA6eEfWHEYmYtd06JgF9rp8o0r25gX5ApoKWdW__p9a_uVSaNHhpwRMQKyfil-g2iRCWRFkIGP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CfHczdDwhpuTBbKTAtK7S_QGTbtcJ11P0oaV7z2bSAOwS5-hp8hKTQn_nNizxSCpiqk6a7ZVpwuMCJPwWYTLyKzOyCA1ZrIbXWe8GtoE8Je5t-hphPvEsbw2e8E40dDXr6SkwXovXxdBrVO110j8nCy2BCJSsfoFyLBQqd-3vQhfC1D-zGRxYKUkNibNnXf81Vn3YA5L2S8EZ7D2g3mIqEJACg1xxL3-Jx3G-Ho954gvcLGcwsiO'
  ],
  'pistache-citrus': [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqoGlU7n9zurE82ONBHMuhviIVJvAlWXK762qzTE5bpTuN2D_Vb6hjJC29zc0ujwUpz3-QTFCpxs1xgCOTKsKkNi6rzUQHtm67yOAsZXqvODKoo-MykLRChf04PLzqn-fnq7r7Ojo5vhxHqBkrG6b2PyRfTmrppdJLq01aJT0IBE5_IzuZKBCqzgNhd9J8mSSwSW21lhle4nxTVwyubHgbmbt2lVBoX2cavVuDWeHGFPjp1d-k8TIi',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDhpgl5gclsAB_nQDrFU42FIK90rUDAX3l-mI0xsvbi-hez6J94HcVsP0zo-mZt5YNLwmpCDzyaNzmJGdgnmXIkslzEv7rSi8XTJRI3v71huTO9YngLYmKzLRCY_YACthnjvMoWgoiBBNSu8gM85AOdgEDswL0uGbTaV4GwKd4ruF1agbW3_mk75KHJC907WOCtlXTrHfOFqf-cHkwXPUEpr7X6HuGLjlifE9twj2HZRvPhZUZYNkCO',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCznAvGQOCtUcQBnoS_87xB2Hms5lGDmldk_s1JWgjWJz2GIJkJ4zqDWxOi4yRePYD0cq2nm4Py25DTPyGOwr1KXBR9qNhxnNf-ns4xGSy2tWlVV6rce7R2X1ifyLhEVH69zNiXAVSmF3XXUYRqbkKVTJNs6ajhTC8Zo3OTx_IHlNqgpo5yZ2OIWCqv24WlDu9gBRGB6KL5jFsJXEbPghEyKhCvBwxN3I3enhOEYIFNKW9IxoOUSfAz',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CfHczdDwhpuTBbKTAtK7S_QGTbtcJ11P0oaV7z2bSAOwS5-hp8hKTQn_nNizxSCpiqk6a7ZVpwuMCJPwWYTLyKzOyCA1ZrIbXWe8GtoE8Je5t-hphPvEsbw2e8E40dDXr6SkwXovXxdBrVO110j8nCy2BCJSsfoFyLBQqd-3vQhfC1D-zGRxYKUkNibNnXf81Vn3YA5L2S8EZ7D2g3mIqEJACg1xxL3-Jx3G-Ho954gvcLGcwsiO'
  ],
  'ivoire-framboise': [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBBYtXfau0VSXOBOL-RoopFRcx5V9fffxtFEftsd0YJnL919GIy0aQD5cjKPIYCfgWU7R-0fCDUtuscHK7zS3qBvxgyw-2SkwdW5Wikf1glUdLSgzSq7w9KegTKYw7pYQZoAE5NneOlZZcRwm7UWbm69r48Tknbrd2agfiUDY34DEOND9zrvC8UcFzIf644m6BlM4fm5EkvqfwKDEgiI5SqvNOt0lceux7Pl7J895bPzStN7GIus9c8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBobSYylttAxmQg5hwfYP9YuGMxNm9nQ_A1N4zRvbDgclfDoDYgF4XbP_B4ZAsLlexFjSN78ZfKt1YlnJ1anshPoq7KgQsm9lUNIyZWMy70RLo6Y4vMzv_eTdtookWckHSCFfeAedaU73JP-4KmY4QUJnjo25ine6MO8wLndzJwmxS39AmapPGZX6rvTf0ln_f-LFCJ7KCKrRWitpkACXBEbNF5wk1dQmquYZF8jVE9522V40MvrdDY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0LmfiCi-C7IYxZDVI89LvlBP57iSg541mDvQfrtZsTyZsk6y3A8NkIKSBFLsOXgqtjT80aoK-aak-XdhwahMbKLS2C2EVx2Oahh2Iy8efGO7gtKNQIMXQwtdgqAUnJ0EjHn608rNiD8QV9XdMDwkL3puUsv1rDcew61sN0hMGIvbSpjdVkOL2P928yauOBhnkHryA9z0fhcYmtdrMZEV71SCBgzJRrUQ-pNUTIiP0ZXBRhPl0HNtX',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CfHczdDwhpuTBbKTAtK7S_QGTbtcJ11P0oaV7z2bSAOwS5-hp8hKTQn_nNizxSCpiqk6a7ZVpwuMCJPwWYTLyKzOyCA1ZrIbXWe8GtoE8Je5t-hphPvEsbw2e8E40dDXr6SkwXovXxdBrVO110j8nCy2BCJSsfoFyLBQqd-3vQhfC1D-zGRxYKUkNibNnXf81Vn3YA5L2S8EZ7D2g3mIqEJACg1xxL3-Jx3G-Ho954gvcLGcwsiO'
  ],
  'caramel-espresso': [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDwy_P0vxRp9I-4BsBZBEcuTTWeXe1ilRk2i_YrERpmQfotNbMQETy_fgmxhQygASjsTFKkg4ze0HVEl3HELOx8x0tpT7BBgl7W1Kjgj4mnO3PEczxUcQWlJBu-Xwr1IDBOgD86va0MetO01AvuBphGkpu-1zudRWeRW0zvroGykEgzHvMzTqnNUBFrRjxdCQ9c5K7b0HifMBzvBnDwxLaARCHBvPWOcXfArU-WdpWxJu-oTVOCjhZK',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzIPI1ZLCHBo4cxUiQ7fOIhk3Sx-3xehgbvQ_3EHXaG4-_Doj1_WV-HTRQ_vPJ-B--949hOnPmkYzmAPSv308zG4DBIx0gmRmcb7yf1rYySkWnJVotHcRPuycOXMiQTtVeHs5JkACkCRtX9VoBG1LwRjfXa61umjPSuKvuLxRmyxdNfSvtvRo6ydgcVdnWe-aHKE55ov1Hz2_1XTH6V7lLJ7Mpmrt17sTmrcjzxgLbkIy4XEWiTPKD',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtqgTVd2ofpvyUrNY6pkU_Y-ILOXrBtgNvxM2WmRYwyi4ybdtTuRZWV7XXb8N5cNmUATom5QzTunQcqwjFepoAS1bOrkTCxiXKneoAbAuyYJpzuz31FUpNd5rA9PXsHrx61qH7W_bS4-tyIuzH28Y86ZoWTkxg0Z-HExnuMHA5M_MA6eEfWHEYmYtd06JgF9rp8o0r25gX5ApoKWdW__p9a_uVSaNHhpwRMQKyfil-g2iRCWRFkIGP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CfHczdDwhpuTBbKTAtK7S_QGTbtcJ11P0oaV7z2bSAOwS5-hp8hKTQn_nNizxSCpiqk6a7ZVpwuMCJPwWYTLyKzOyCA1ZrIbXWe8GtoE8Je5t-hphPvEsbw2e8E40dDXr6SkwXovXxdBrVO110j8nCy2BCJSsfoFyLBQqd-3vQhfC1D-zGRxYKUkNibNnXf81Vn3YA5L2S8EZ7D2g3mIqEJACg1xxL3-Jx3G-Ho954gvcLGcwsiO'
  ],
  'hazelnut-praline': [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAcE09B7lFxzjRO6Flud49S79k6JO0XsTTdunBqORVf5Tbjsp7VD1QtiL6bk4fokU56WIRu0ecEZFqVyWpI0bJh6J6KBkWCrc-CcddctTMfkCIhdFmYnZzO9uX7rdlidKFNCYzC34JDaNBU04g0ImNVAXUy-UoLSYgPPShQG_hJTzzvbtUoGfj8dB8VbMLEsH2_ujsAvIn2nNC2POYIzignchdlfLpNdimP-QFk3-tzOiDhxe57MCtP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzIPI1ZLCHBo4cxUiQ7fOIhk3Sx-3xehgbvQ_3EHXaG4-_Doj1_WV-HTRQ_vPJ-B--949hOnPmkYzmAPSv308zG4DBIx0gmRmcb7yf1rYySkWnJVotHcRPuycOXMiQTtVeHs5JkACkCRtX9VoBG1LwRjfXa61umjPSuKvuLxRmyxdNfSvtvRo6ydgcVdnWe-aHKE55ov1Hz2_1XTH6V7lLJ7Mpmrt17sTmrcjzxgLbkIy4XEWiTPKD',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtqgTVd2ofpvyUrNY6pkU_Y-ILOXrBtgNvxM2WmRYwyi4ybdtTuRZWV7XXb8N5cNmUATom5QzTunQcqwjFepoAS1bOrkTCxiXKneoAbAuyYJpzuz31FUpNd5rA9PXsHrx61qH7W_bS4-tyIuzH28Y86ZoWTkxg0Z-HExnuMHA5M_MA6eEfWHEYmYtd06JgF9rp8o0r25gX5ApoKWdW__p9a_uVSaNHhpwRMQKyfil-g2iRCWRFkIGP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CfHczdDwhpuTBbKTAtK7S_QGTbtcJ11P0oaV7z2bSAOwS5-hp8hKTQn_nNizxSCpiqk6a7ZVpwuMCJPwWYTLyKzOyCA1ZrIbXWe8GtoE8Je5t-hphPvEsbw2e8E40dDXr6SkwXovXxdBrVO110j8nCy2BCJSsfoFyLBQqd-3vQhfC1D-zGRxYKUkNibNnXf81Vn3YA5L2S8EZ7D2g3mIqEJACg1xxL3-Jx3G-Ho954gvcLGcwsiO'
  ],
  'tahitian-vanilla': [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDYjzmRz10GGMYjmty7F2gStu-EwPaT2fuvAfJ9l1bNBFsyo3Kc03HXDJA7K-DFPRsGb2kMEvFX3VbT600EJUXNibFRavNT0OaubEenycJ1ztD-GS8udMV8H-i9kudlqa1GGcVBMv15rsxK9guGqxzIEfWOwhNHdQ5tdPSSEkba0xTawlJIEdZVnSHuuFJPLv_HuHB8U8jJF4LaZAdzZkYKX4AmzQsThq8ndjgXSLTeOaha36RKd8-r',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCzIPI1ZLCHBo4cxUiQ7fOIhk3Sx-3xehgbvQ_3EHXaG4-_Doj1_WV-HTRQ_vPJ-B--949hOnPmkYzmAPSv308zG4DBIx0gmRmcb7yf1rYySkWnJVotHcRPuycOXMiQTtVeHs5JkACkCRtX9VoBG1LwRjfXa61umjPSuKvuLxRmyxdNfSvtvRo6ydgcVdnWe-aHKE55ov1Hz2_1XTH6V7lLJ7Mpmrt17sTmrcjzxgLbkIy4XEWiTPKD',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0LmfiCi-C7IYxZDVI89LvlBP57iSg541mDvQfrtZsTyZsk6y3A8NkIKSBFLsOXgqtjT80aoK-aak-XdhwahMbKLS2C2EVx2Oahh2Iy8efGO7gtKNQIMXQwtdgqAUnJ0EjHn608rNiD8QV9XdMDwkL3puUsv1rDcew61sN0hMGIvbSpjdVkOL2P928yauOBhnkHryA9z0fhcYmtdrMZEV71SCBgzJRrUQ-pNUTIiP0ZXBRhPl0HNtX',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CfHczdDwhpuTBbKTAtK7S_QGTbtcJ11P0oaV7z2bSAOwS5-hp8hKTQn_nNizxSCpiqk6a7ZVpwuMCJPwWYTLyKzOyCA1ZrIbXWe8GtoE8Je5t-hphPvEsbw2e8E40dDXr6SkwXovXxdBrVO110j8nCy2BCJSsfoFyLBQqd-3vQhfC1D-zGRxYKUkNibNnXf81Vn3YA5L2S8EZ7D2g3mIqEJACg1xxL3-Jx3G-Ho954gvcLGcwsiO'
  ]
};

let currentGallery = cakeGalleries['velvet-noir'];

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cakeId = urlParams.get('id') || 'velvet-noir';
  
  const found = CC_CORE.catalogue.find(c => c.id === cakeId) || CC_CORE.catalogue[0];
  currentCake = found;

  const pageTitle = document.getElementById('pageTitle');
  const breadcrumb = document.getElementById('breadcrumbName');
  const title = document.getElementById('cakeTitle');
  const desc = document.getElementById('cakeDescription');
  const catBadge = document.getElementById('cakeCategoryBadge');

  if (pageTitle) pageTitle.innerText = `${found.name} — Crumb & Cocoa Haute Pâtisserie Atelier`;
  if (breadcrumb) breadcrumb.innerText = found.name;
  if (title) title.innerText = found.name;
  if (desc) desc.innerText = found.desc;
  if (catBadge) catBadge.innerText = found.category;

  if (!found.eggless) {
    const eggIndicator = document.getElementById('egglessIndicator');
    const specEgg = document.getElementById('specEggless');
    if (eggIndicator) eggIndicator.classList.add('hidden');
    if (specEgg) specEgg.innerHTML = '<span class="text-amber-800 font-medium">Contains Fresh Free-Range Eggs</span>';
  }

  // Gallery
  if (cakeGalleries[found.id]) {
    currentGallery = cakeGalleries[found.id];
    const mainImg = document.getElementById('mainProductImage');
    if (mainImg) mainImg.src = currentGallery[0];
    for (let i = 0; i < 4; i++) {
      const th = document.getElementById('thumb' + i);
      if (th && currentGallery[i]) th.src = currentGallery[i];
    }
  }

  // Update size prices
  const p6 = Math.round(found.price);
  const p8 = Math.round(found.price * 1.35 / 50) * 50;
  const p10 = Math.round(found.price * 1.8 / 50) * 50;

  const pr6 = document.getElementById('price6');
  const pr8 = document.getElementById('price8');
  const pr10 = document.getElementById('price10');

  if (pr6) pr6.innerText = CC_CORE.formatINR(p6);
  if (pr8) pr8.innerText = CC_CORE.formatINR(p8);
  if (pr10) pr10.innerText = CC_CORE.formatINR(p10);

  recalculatePrice();
});

function changeImage(index) {
  if (currentGallery && currentGallery[index]) {
    const mainImg = document.getElementById('mainProductImage');
    if (mainImg) {
      mainImg.style.opacity = '0.4';
      setTimeout(() => {
        mainImg.src = currentGallery[index];
        mainImg.style.opacity = '1';
      }, 150);
    }
  }

  const thumbs = document.querySelectorAll('#thumbnailStrip button');
  thumbs.forEach((thumb, i) => {
    if(i === index) {
      thumb.classList.remove('border-outline-variant');
      thumb.classList.add('border-primary', 'border-2');
    } else {
      thumb.classList.remove('border-primary', 'border-2');
      thumb.classList.add('border-outline-variant');
    }
  });
}

function selectSize(sizeName, multiplier, weightStr, inputEl) {
  selectedSize = sizeName;
  selectedMultiplier = multiplier;
  selectedWeight = weightStr;

  document.querySelectorAll('.size-card').forEach(card => {
    card.classList.remove('border-2', 'border-primary');
    card.classList.add('border', 'border-outline-variant');
    const dot = card.querySelector('.radio-indicator');
    if (dot) {
      dot.innerHTML = '';
      dot.className = 'radio-indicator w-3.5 h-3.5 rounded-full border border-outline-variant';
    }
  });

  const parentCard = inputEl.closest('.size-card');
  if (parentCard) {
    parentCard.classList.remove('border', 'border-outline-variant');
    parentCard.classList.add('border-2', 'border-primary');
    const dot = parentCard.querySelector('.radio-indicator');
    if (dot) {
      dot.className = 'radio-indicator w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center';
      dot.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white"></span>';
    }
  }

  const weightLbl = document.getElementById('selectedWeightLabel');
  if (weightLbl) weightLbl.innerText = `${weightStr} (Calibrated)`;
  recalculatePrice();
}

function recalculatePrice() {
  if (!currentCake) return;
  const unitPrice = Math.round(currentCake.price * selectedMultiplier / 50) * 50;
  const dynPrice = document.getElementById('dynamicPrice');
  const origPrice = document.getElementById('originalPrice');
  if (dynPrice) dynPrice.innerText = CC_CORE.formatINR(unitPrice);
  if (origPrice) origPrice.innerText = CC_CORE.formatINR(Math.round(unitPrice * 1.15 / 50) * 50);

  // Sticky bottom mobile action bar update
  const stickyPrice = document.getElementById('stickyMobilePrice');
  const stickySize = document.getElementById('stickyMobileSize');
  if (stickyPrice) stickyPrice.innerText = CC_CORE.formatINR(unitPrice);
  if (stickySize) stickySize.innerText = `${selectedSize} (${selectedWeight})`;
}

function incrementQty() {
  if (currentQty < 5) {
    currentQty++;
    document.getElementById('qtyVal').innerText = currentQty;
  }
}

function decrementQty() {
  if (currentQty > 1) {
    currentQty--;
    document.getElementById('qtyVal').innerText = currentQty;
  }
}

function getSelectedOptions() {
  const flavorInput = document.querySelector('input[name="flavor"]:checked');
  const flavor = flavorInput ? flavorInput.value : currentCake.flavor;
  const unitPrice = Math.round(currentCake.price * selectedMultiplier / 50) * 50;

  return {
    cakeId: currentCake.id,
    name: currentCake.name,
    size: `${selectedSize} (${selectedWeight})`,
    flavor: flavor,
    price: unitPrice,
    quantity: currentQty,
    image: currentCake.image,
    eggless: currentCake.eggless
  };
}

function handleAddToCart() {
  const item = getSelectedOptions();
  CC_CORE.addToCart(item);

  const toast = document.getElementById('cartToast');
  const desc = document.getElementById('toastCakeDesc');
  if (desc) desc.innerHTML = `<strong>${item.name}</strong> (${item.size}) added to your Atelier Bag.`;
  if (toast) {
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4500);
  }
}

function handleBuyNow() {
  const item = getSelectedOptions();
  CC_CORE.addToCart(item);
  window.location.href = 'cart.html';
}

function quickAddRelated(cakeId) {
  const item = CC_CORE.catalogue.find(c => c.id === cakeId);
  if (item) {
    CC_CORE.addToCart({
      cakeId: item.id,
      name: item.name,
      size: '6 inch (1.0 kg)',
      flavor: item.flavor,
      creamColor: item.creamColor,
      writingOnCake: 'Atelier Selection',
      price: item.price,
      quantity: 1,
      image: item.image,
      eggless: item.eggless
    });
    const toast = document.getElementById('cartToast');
    const desc = document.getElementById('toastCakeDesc');
    if (desc) desc.innerHTML = `<strong>${item.name}</strong> added to your Atelier Bag.`;
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 4000);
    }
  }
}
