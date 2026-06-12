# Shopify Dawn Custom Sections
### A library of native Liquid sections built on Dawn theme architecture.
### Demonstrated live via Lumière Derme, a premium DTC skincare brand.
### No apps. No patches. Pure code.

---

## Live Demo
[View Lumière Derme Live Demo](https://waynelynx12.github.io/shopify-dawn-custom-sections)

---

## What This Repo Demonstrates

Every section in this library solves a specific conversion problem. This is not a design exercise. Each element is placed where it is because of how customers move through a purchase decision.

| Section | What It Does | CRO Problem It Solves |
|---|---|---|
| Collection Hero Banner | Editable headline and subtext via schema | Orients the customer immediately on landing |
| Custom Filter Sidebar | Native Liquid filter using Shopify Filter API | Reduces scroll fatigue and exit rate |
| Product Card with Quick View | Drawer opens product details without page load | Removes friction between browse and decision |
| Tabbed Product Description | Ingredients, How To Use, Reviews in native tabs | Answers objections before they form |
| Sticky Add To Cart Bar | Appears on scroll, always visible | Keeps purchase decision in frame without aggression |
| Trust Badge Strip | Custom icons with editable text via schema | Reduces purchase anxiety at the moment of doubt |
| Complementary Products | Pulls from metafields, no app required | Increases average order value natively |

---

## Architecture Diagram

```mermaid
graph TD
    A[Lumière Derme Store] --> B[Collection Page]
    A --> C[Product Page]

    B --> D[Collection Hero Banner]
    B --> E[Custom Filter Sidebar]
    B --> F[Product Card with Quick View Drawer]

    C --> G[Tabbed Product Description]
    C --> H[Sticky Add To Cart Bar]
    C --> I[Trust Badge Strip]
    C --> J[Complementary Products Section]

    E -->|Shopify Native Filter API| K[Filtered Results]
    J -->|Metafields| L[Related Products Data]
    F -->|Quick View Drawer| C
