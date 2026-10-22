# Crumb & Cocoa — Haute Pâtisserie Atelier
**Artisan Cake Boutique Web Application & Kitchen Command System**  
*Location: Indiranagar, Bengaluru | Aesthetic: Luxury French Haute Pâtisserie*

---

## 📁 Professional Project Directory Structure

```text
CakeShop/
├── index.html                 # Main Homepage, Atelier Showcase & Bespoke Cake Builder
├── product.html               # Product Customizer & Single Cake Showcase (dynamic ?id=...)
├── cart.html                  # Atelier Bag, Date/Time Scheduling & Checkout Order Form
├── dashboard.html             # Owner Portal: Live Kitchen Orders, Call Patrons, Sales Ledger
├── assets/
│   ├── css/
│   │   └── main.css           # Global typography, custom color tokens, scrollbars, swatch rings
│   └── js/
│       ├── core.js            # Shared data store: seed cakes, LocalStorage cart/orders, INR currency format
│       ├── home.js            # Homepage category filters, quick-add toast, live bespoke pricing engine
│       ├── product.js         # Single product details, weight/price tiers, cream color swatch & piping counter
│       ├── cart.js            # Cart items renderer, quantity manager, order form validation & confirmation modal
│       └── dashboard.js       # Kitchen metrics, orders filter/search, phone call triggers & offline payment ledger
├── docs/
│   └── Artisan_Cake_Business_Website_Requirements.docx # Full Business SRS Document
└── archive/
    └── legacy_version/        # Safely preserved original draft files
```

---

## 🍰 Core Feature Architecture & Business Rules (SRS Compliance)

1. **Atelier Collection (Ready-Made Cakes)**:
   - 6 artisan signatures: *Velvet Noir Opera, Pistache Royale & Citrus, Ivoire Framboise, Caramel Beurre Salé & Espresso, Noisette Praliné & Gianduja, Tahitian Vanilla & Poached Pear*.
   - Dynamic weight and sizing options: Small (0.5 kg), Standard (1.0 kg), Grande (1.5 kg).
   - Cream color customization: *Classic Noir, Blush Rose, Ivory Pearl, Golden Ochre, Sage Pistachio*.
   - Chocolate plaque personalization with live 30-character limit counter.

2. **Bespoke Atelier Cake Builder**:
   - Custom sponge base, signature filling, exterior cream color swatch selection, custom piping message, and dietary preference switches (Eggless / Standard).
   - Real-time dynamic price calculation and direct add-to-bag workflow.

3. **Ordering & Scheduling (No Payment Gateway Needed)**:
   - Fulfillment: Temperature-regulated cold-chain Delivery (Bengaluru metro) or Kitchen Self-Pickup.
   - Date picker with minimum 24-hour advance bake window and slot selection (Morning / Afternoon / Evening).
   - Generation of unique artisan reference numbers (e.g., `#CC-2026-4819`).

4. **Owner Portal & Kitchen Dashboard (`dashboard.html`)**:
   - **One-Click Patron Calling**: `tel:...` direct link for the Head Baker to call customers within 60 minutes to confirm specifications.
   - **Order Lifecycle Tracking**: `New / Pending Review` ➔ `Contacted` ➔ `Confirmed` ➔ `Preparing` ➔ `Ready` ➔ `Completed` ➔ `Cancelled`.
   - **Offline Payment Ledger**: Track total sales, advance UPI/Cash deposits, and unpaid balances collected upon courier handover.

---

## 🚀 How to Run Locally

Because this project is built using modern standard Vanilla HTML, CSS, and JavaScript, it runs instantly in any modern web browser without requiring complex build steps or node server dependencies:

- **Option 1 (Direct)**: Double-click [index.html](file:///c:/Users/jaink/OneDrive/Desktop/CakeShop/index.html) or right-click and open with your preferred browser (Chrome, Edge, Firefox, Brave, Safari).
- **Option 2 (Live Server)**: If using VS Code or IDE, right-click `index.html` and select **"Open with Live Server"**.
- **Option 3 (Python HTTP Server)**:
  ```bash
  python -m http.server 3000
  ```
  Then visit `http://localhost:3000`.
