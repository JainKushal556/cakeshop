# Crumb & Cocoa — Haute Pâtisserie Atelier
**Artisan Cake Boutique Web Application & Kitchen Command System**  
*Location: Indiranagar, Bengaluru | Aesthetic: Luxury French Haute Pâtisserie*

---

## 📁 Clean Project Directory Structure

```text
CakeShop/
├── index.html                 # Luxury Homepage, Cake Collection & Category Search
├── product.html               # Product Details, Weight & Flavor Customizer, Add to Bag
├── cart.html                  # Atelier Bag, Date/Time Scheduling & Checkout Order Form
├── dashboard.html             # Owner Portal: Kitchen Orders, Call Patrons, Status Updates
└── assets/
    ├── css/
    │   └── main.css           # Global typography, color tokens, and layout styles
    └── js/
        ├── core.js            # Shared data store: cakes catalogue, local storage cart/orders
        ├── home.js            # Homepage category filters, search input & quick add to bag
        ├── product.js         # Single product details, weight tiers, piping customizer
        ├── cart.js            # Cart items renderer, quantity manager, checkout modal
        └── dashboard.js       # Kitchen metrics, orders filter, status transitions
```

---

## 🍰 Core Functional Highlights

1. **Curated Cake Collection (`index.html`)**:
   - 6 artisan signatures: *The Velvet Noir, Pistache & Citrus, L'Ivoire & Framboise, Caramel Salé & Espresso, Hazelnut Praliné Crunch, Tahitian Vanilla Bean Chiffon*.
   - Filter by categories (*Chocolate*, *Classic*, *Celebration*, *100% Eggless*).
   - Real-time search bar for quick filtering.
   - Quick "Add to Bag" action with instant toast notifications.

2. **Single Cake Customizer (`product.html`)**:
   - Multi-angle high-resolution gallery.
   - Dynamic weight tiers: 0.5 kg, 1.0 kg, 1.5 kg with automatic price recalculation.
   - Cream color selection and personalized message piping with character limit counter.
   - Dietary & allergen notices (Eggless badge, chocolate origin).

3. **Cart & Ordering Experience (`cart.html`)**:
   - Dynamic bag management (update quantities, remove items, live subtotal & taxes).
   - Fulfillment choice: Cold-chain courier delivery (Bengaluru Metro) or Atelier Pickup.
   - Advance date picker & delivery time slot selection.
   - Order submission simulation with unique order tracking reference (e.g., `#CC-2026-8912`).

4. **Owner Portal & Kitchen Dashboard (`dashboard.html`)**:
   - Real-time metrics (Pending Review, Confirmed, Preparing, Ready, Completed).
   - Orders list with search, status filters, and phone call trigger (`tel:...`).
   - Catalogue inventory overview and price management.

---

## 🌐 Live Website (GitHub Pages)

Your website is deployed on GitHub Pages:
**[https://jainkushal556.github.io/cakeshop/](https://jainkushal556.github.io/cakeshop/)**

---

## 🚀 How to Run Locally

Open [index.html](file:///c:/Users/jaink/OneDrive/Desktop/CakeShop/index.html) in any modern browser. No complex build setup or server required.
