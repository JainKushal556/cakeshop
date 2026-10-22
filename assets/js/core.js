/**
 * Crumb & Cocoa — Haute Pâtisserie Atelier
 * Shared Store State & Cart Management Core (assets/js/core.js)
 */

const CC_CORE = {
  CART_KEY: 'cc_cart_items',
  ORDERS_KEY: 'cc_orders_list',

  // Master Catalogue Seed
  catalogue: [
    {
      id: 'velvet-noir',
      name: 'The Velvet Noir',
      price: 3400,
      baseWeight: '1.0 kg',
      size: '6 inch',
      flavor: 'Signature Dark Valrhona',
      creamColor: 'Classic Cocoa Noir',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWHtgLvx7Q2r_fdMQ9AFqIuPo_SSuXGQ9makUUoHQoY3fW2FshkBU3_Ui7p0J4Q4Lp1x-Vb36upG_-5M42koFbCK1_weQ098ZLMjXC4j4UAoSvVC0rQVx_-75l1KLf_xGKS37lB1-QzUUfIrFlWZ-PGTCb-HnpJdjRnWivXUnsq9y4LK5cyu4Z3HrJCYQDso91LB0AFO3MOyDI-cilwwu8db_1cn11tTY5VLjhCVgcyaPP7hlnUT9s',
      category: 'Chocolate Cakes',
      eggless: true,
      desc: '72% Valrhona dark chocolate mousse, salted hazelnut praline crunch, dark cocoa mirror glaze, and flourless chocolate sponge.'
    },
    {
      id: 'pistache-citrus',
      name: 'Pistache & Citrus',
      price: 3600,
      baseWeight: '1.0 kg',
      size: '6 inch',
      flavor: 'Sicilian Pistachio & Candied Zest',
      creamColor: 'Pale Rose Pistache',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqoGlU7n9zurE82ONBHMuhviIVJvAlWXK762qzTE5bpTuN2D_Vb6hjJC29zc0ujwUpz3-QTFCpxs1xgCOTKsKkNi6rzUQHtm67yOAsZXqvODKoo-MykLRChf04PLzqn-fnq7r7Ojo5vhxHqBkrG6b2PyRfTmrppdJLq01aJT0IBE5_IzuZKBCqzgNhd9J8mSSwSW21lhle4nxTVwyubHgbmbt2lVBoX2cavVuDWeHGFPjp1d-k8TIi',
      category: 'Classic Cakes',
      eggless: true,
      desc: 'Bronte pistachio praline mousseline, tart lemon curd jelly, and almond dacquoise base.'
    },
    {
      id: 'ivoire-framboise',
      name: "L'Ivoire & Framboise",
      price: 3200,
      baseWeight: '1.0 kg',
      size: '6 inch',
      flavor: 'White Chocolate & Wild Raspberry',
      creamColor: 'Ivory Chantilly',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBYtXfau0VSXOBOL-RoopFRcx5V9fffxtFEftsd0YJnL919GIy0aQD5cjKPIYCfgWU7R-0fCDUtuscHK7zS3qBvxgyw-2SkwdW5Wikf1glUdLSgzSq7w9KegTKYw7pYQZoAE5NneOlZZcRwm7UWbm69r48Tknbrd2agfiUDY34DEOND9zrvC8UcFzIf644m6BlM4fm5EkvqfwKDEgiI5SqvNOt0lceux7Pl7J895bPzStN7GIus9c8',
      category: 'Celebration Cakes',
      eggless: true,
      desc: 'Velvety white chocolate mousse layered with wild raspberry confit and buttery genoise.'
    },
    {
      id: 'caramel-espresso',
      name: 'Caramel Salé & Espresso',
      price: 2900,
      baseWeight: '1.0 kg',
      size: '6 inch',
      flavor: 'Salted Caramel & Cold Brew',
      creamColor: 'Caramel Gold',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwy_P0vxRp9I-4BsBZBEcuTTWeXe1ilRk2i_YrERpmQfotNbMQETy_fgmxhQygASjsTFKkg4ze0HVEl3HELOx8x0tpT7BBgl7W1Kjgj4mnO3PEczxUcQWlJBu-Xwr1IDBOgD86va0MetO01AvuBphGkpu-1zudRWeRW0zvroGykEgzHvMzTqnNUBFrRjxdCQ9c5K7b0HifMBzvBnDwxLaARCHBvPWOcXfArU-WdpWxJu-oTVOCjhZK',
      category: 'Classic Cakes',
      eggless: false,
      desc: 'Guerande sea-salted caramel swirl, cold-brew coffee soaked sponge, and whipped mascarpone.'
    },
    {
      id: 'hazelnut-praline',
      name: 'Hazelnut Praliné Crunch',
      price: 3500,
      baseWeight: '1.0 kg',
      size: '6 inch',
      flavor: 'Piedmont Hazelnut & Milk Chocolate',
      creamColor: 'Golden Praliné',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcE09B7lFxzjRO6Flud49S79k6JO0XsTTdunBqORVf5Tbjsp7VD1QtiL6bk4fokU56WIRu0ecEZFqVyWpI0bJh6J6KBkWCrc-CcddctTMfkCIhdFmYnZzO9uX7rdlidKFNCYzC34JDaNBU04g0ImNVAXUy-UoLSYgPPShQG_hJTzzvbtUoGfj8dB8VbMLEsH2_ujsAvIn2nNC2POYIzignchdlfLpNdimP-QFk3-tzOiDhxe57MCtP',
      category: 'Chocolate Cakes',
      eggless: false,
      desc: 'Roasted Piedmont hazelnut paste, crisp feuilletine wafers, and single-origin milk chocolate.'
    },
    {
      id: 'tahitian-vanilla',
      name: 'Tahitian Vanilla Bean Chiffon',
      price: 2800,
      baseWeight: '1.0 kg',
      size: '6 inch',
      flavor: 'Cured Tahitian Vanilla Bean',
      creamColor: 'Whipped Pearl White',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYjzmRz10GGMYjmty7F2gStu-EwPaT2fuvAfJ9l1bNBFsyo3Kc03HXDJA7K-DFPRsGb2kMEvFX3VbT600EJUXNibFRavNT0OaubEenycJ1ztD-GS8udMV8H-i9kudlqa1GGcVBMv15rsxK9guGqxzIEfWOwhNHdQ5tdPSSEkba0xTawlJIEdZVnSHuuFJPLv_HuHB8U8jJF4LaZAdzZkYKX4AmzQsThq8ndjgXSLTeOaha36RKd8-r',
      category: 'Classic Cakes',
      eggless: true,
      desc: 'Pure cured Tahitian vanilla beans infused into feather-light chiffon with fresh whipped cream.'
    }
  ],

  // Cart operations
  getCart() {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      if (!data) {
        const seedCart = [
          {
            id: 'velvet-noir-8',
            cakeId: 'velvet-noir',
            name: 'The Velvet Noir',
            size: '8 inch (1.5 kg)',
            flavor: 'Signature Dark Valrhona',
            creamColor: 'Classic Cocoa Noir',
            writingOnCake: 'Happy 30th Birthday Rhea',
            price: 4600,
            quantity: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJxY7pJCe9LR8e7DzWtA1rx7CgvVoSKF6Xt_wBv2nkLbtfZwZMTHI_qRQ5Jp3BOqKr2WXKjO44tbfRv1lcZh_bXJ7v0UrxoItqMrj7FW9qKnb5wza2jS-gk5pIcf1r0n4pYxfZ88hTCHBTgdQ-RQweZlVt7sqPRu4f4YSxwKVMrNELIRwmXmyp7fxMvKiVMeykW9XTJY9RUBw7Vxk_RbdrPGaH2M5T3_TG-PRsrJgRUijR_kdjLFWa',
            eggless: true
          },
          {
            id: 'pistache-citrus-6',
            cakeId: 'pistache-citrus',
            name: 'Pistache & Citrus',
            size: '6 inch (1.0 kg)',
            flavor: 'Sicilian Pistachio & Candied Zest',
            creamColor: 'Pale Rose Pistache',
            writingOnCake: 'Bonne Fête',
            price: 3600,
            quantity: 1,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCznAvGQOCtUcQBnoS_87xB2Hms5lGDmldk_s1JWgjWJz2GIJkJ4zqDWxOi4yRePYD0cq2nm4Py25DTPyGOwr1KXBR9qNhxnNf-ns4xGSy2tWlVV6rce7R2X1ifyLhEVH69zNiXAVSmF3XXUYRqbkKVTJNs6ajhTC8Zo3OTx_IHlNqgpo5yZ2OIWCqv24WlDu9gBRGB6KL5jFsJXEbPghEyKhCvBwxN3I3enhOEYIFNKW9IxoOUSfAz',
            eggless: true
          }
        ];
        this.saveCart(seedCart);
        return seedCart;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading cart', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
      this.updateBadges();
    } catch (e) {
      console.error('Error saving cart', e);
    }
  },

  addToCart(item) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(i => 
      i.name === item.name && 
      i.size === item.size && 
      i.flavor === item.flavor && 
      i.creamColor === item.creamColor &&
      i.writingOnCake === item.writingOnCake
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += (item.quantity || 1);
    } else {
      cart.push({
        id: 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        ...item,
        quantity: item.quantity || 1
      });
    }

    this.saveCart(cart);
    return cart;
  },

  removeFromCart(id) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== id);
    this.saveCart(cart);
    return cart;
  },

  updateQuantity(id, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        return this.removeFromCart(id);
      }
      this.saveCart(cart);
    }
    return cart;
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartTotalCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  },

  getCartSubtotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  },

  updateBadges() {
    const count = this.getCartTotalCount();
    const countEls = document.querySelectorAll('.cart-badge-count, #cartBadge, .cart-count-pill');
    countEls.forEach(el => {
      el.textContent = count;
      if (count > 0) {
        el.classList.remove('hidden');
      }
    });

    const bagTextEls = document.querySelectorAll('.cart-bag-text');
    bagTextEls.forEach(el => {
      el.textContent = `Bag (${count})`;
    });

    // Commercial App Floating Bottom Bag Bar update for phones
    const mobileBagBar = document.getElementById('mobileBagBar');
    const mobileBagTotal = document.getElementById('mobileBagTotal');
    const mobileBagCount = document.getElementById('mobileBagCount');
    if (mobileBagBar) {
      if (count > 0) {
        mobileBagBar.classList.remove('hidden');
        if (mobileBagTotal) mobileBagTotal.textContent = this.formatINR(this.getCartSubtotal());
        if (mobileBagCount) mobileBagCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
      } else {
        mobileBagBar.classList.add('hidden');
      }
    }
  },

  // Orders Management (For Customer Checkout & Owner Dashboard)
  getOrders() {
    try {
      const data = localStorage.getItem(this.ORDERS_KEY);
      if (!data) {
        const seedOrders = [
          {
            id: 'CC-2026-109',
            createdAt: '2026-10-20T14:15:00',
            customerName: 'Aanya Sen',
            phone: '+91 98201 44521',
            email: 'aanya.sen@example.com',
            fulfillment: 'Delivery',
            address: 'Flat 402, Magnolia Enclave, 12th Main Road, Indiranagar, Bengaluru - 560038',
            requestedDate: '2026-10-21',
            timeSlot: '2:00 PM - 5:00 PM',
            items: [
              { name: 'The Velvet Noir', size: '8 inch (1.5 kg)', flavor: 'Signature Dark Valrhona', creamColor: 'Classic Cocoa Noir', writingOnCake: 'Happy 30th Birthday Rhea', qty: 1, price: 4600 },
              { name: 'Pistache & Citrus', size: '6 inch (1.0 kg)', flavor: 'Sicilian Pistachio & Candied Zest', creamColor: 'Pale Rose Pistache', writingOnCake: 'Bonne Fête', qty: 1, price: 3600 }
            ],
            notes: 'Please ring bell twice, temperature-sensitive package. Chilled travel box requested.',
            subtotal: 8200,
            deliveryFee: 0,
            totalValue: 8200,
            status: 'New / Pending Review',
            paymentStatus: 'Unpaid',
            amountReceived: 0,
            ownerNotes: 'Need to verify gate pass entry code with customer.'
          },
          {
            id: 'CC-2026-108',
            createdAt: '2026-10-20T11:30:00',
            customerName: 'Karan Mehra',
            phone: '+91 99002 88412',
            email: 'karan.m@lavelleroad.org',
            fulfillment: 'Delivery',
            address: 'Penthouse B, 4 Lavelle Road, Shanthala Nagar, Bengaluru - 560001',
            requestedDate: '2026-10-21',
            timeSlot: '11:00 AM - 1:00 PM',
            items: [
              { name: 'Caramel Salé & Espresso', size: '8 inch (1.5 kg)', flavor: 'Salted Caramel & Cold Brew', creamColor: 'Caramel Gold', writingOnCake: 'Happy 10th Anniversary', qty: 1, price: 4200 }
            ],
            notes: 'Eggless celebration. Dedicated chilled courier van required.',
            subtotal: 4200,
            deliveryFee: 150,
            totalValue: 4350,
            status: 'Confirmed',
            paymentStatus: 'Partially Paid',
            amountReceived: 2000,
            ownerNotes: 'Confirmed by phone. Advance ₹2000 received via UPI on call.'
          },
          {
            id: 'CC-2026-107',
            createdAt: '2026-10-19T18:40:00',
            customerName: 'Pooja Shenoy',
            phone: '+91 97410 33290',
            email: 'pooja.shenoy@koramangala.in',
            fulfillment: 'Pickup',
            address: 'Atelier Kitchen Collection (Indiranagar)',
            requestedDate: '2026-10-20',
            timeSlot: '4:00 PM - 6:00 PM',
            items: [
              { name: "L'Ivoire & Framboise", size: '6 inch (1.0 kg)', flavor: 'White Chocolate & Wild Raspberry', creamColor: 'Ivory Chantilly', writingOnCake: 'Best Wishes Pooja', qty: 1, price: 3200 }
            ],
            notes: 'Pickup at 4:30 PM sharp before dinner soirée.',
            subtotal: 3200,
            deliveryFee: 0,
            totalValue: 3200,
            status: 'Completed',
            paymentStatus: 'Paid',
            amountReceived: 3200,
            ownerNotes: 'Handed over in thermodynamic hatbox with knife & candle.'
          }
        ];
        this.saveOrders(seedOrders);
        return seedOrders;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading orders', e);
      return [];
    }
  },

  saveOrders(orders) {
    try {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const count = orders.length + 110;
    const refId = `CC-2026-${count}`;

    const newOrder = {
      id: refId,
      createdAt: new Date().toISOString(),
      status: 'New / Pending Review',
      paymentStatus: 'Unpaid',
      amountReceived: 0,
      ownerNotes: '',
      ...orderData
    };

    orders.unshift(newOrder);
    this.saveOrders(orders);
    this.clearCart();
    return newOrder;
  },

  updateOrderStatus(orderId, newStatus, newPaymentStatus, amountReceived, ownerNotes) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      if (newStatus !== undefined) order.status = newStatus;
      if (newPaymentStatus !== undefined) order.paymentStatus = newPaymentStatus;
      if (amountReceived !== undefined) order.amountReceived = parseFloat(amountReceived) || 0;
      if (ownerNotes !== undefined) order.ownerNotes = ownerNotes;
      this.saveOrders(orders);
    }
    return orders;
  },

  formatINR(amount) {
    return '₹' + Number(amount || 0).toLocaleString('en-IN');
  }
};

// Initialize badges on load
document.addEventListener('DOMContentLoaded', () => {
  CC_CORE.updateBadges();
});
