# Archetype: Commerce Website

**Covers**: e-commerce, marketplaces, booking, classifieds.

Build the page as **Nexus Shop** — a store, not a landing page. The product grid and
cart are the page; marketing copy is one compact banner.

Anatomy:

1. **Promo strip** (`#hero`) — dismissible free-shipping alert, first thing on the page.
2. **Collection banner + featured product** (`arch-split--wide-left`) — short seasonal pitch with two CTAs on the left; on the right a featured-product card: scarcity tag, name, description, `price`, star/review meta, Add to Cart (`showToast`).
3. **Shop All** (`#features`) — left filter rail (`arch-main-aside--aside-left`, sticky): Category checkboxes with counts, Price radios, Availability + Apply button. Main: 3-column grid of 9 product cards — icon, name, `price`, stock tag (In Stock / Low Stock / Preorder), Add to Cart.
4. **Your Cart** — the only archetype with an order table: item/maker/qty/price rows, Remove buttons, `tfoot` subtotal/shipping/total, secure-checkout meta, Checkout button (opens signup popup).
5. **Lookbook** — the mandatory slider, five styled rooms referencing the products.
6. **Order Support** (`#contact`) — the mandatory contact form; subjects: Where's my order / Return / Product question / Wholesale.

Signature elements: prices everywhere, stock badges, filters, cart totals.
Tone: tactile, product-first, trust in logistics.
