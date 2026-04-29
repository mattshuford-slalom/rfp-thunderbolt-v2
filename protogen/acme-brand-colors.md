
# ACME Financial Brand Color Scheme (HEX Reference)

This document captures the **official ACME Financial brand color palette** with hex values suitable for **portal theming, UI validation, and security whitelisting**. Values are sourced from internal brand guides and digital color tokens.

## Primary / Core Brand Colors

These are the safest and most defensible colors to whitelist.

| Name | HEX | Usage Notes |
|---|---|---|
| ACME Financial Blue | #0C62FB | Core brand color – must be present in compositions |
| ACME Financial Dark Blue | #002FAF | Headers, depth, contrast |
| White | #FFFFFF | Backgrounds |
| Black | #000000 | Body text, icons |

## 🎨 Secondary / Accent Colors

Used for charts, focus states, highlights, and UI accents.

| Name | HEX | Typical Use |
|---|---|---|
| Cyan | #1BE1F2 | Focus rings, charts |
| Coral Red | #FF4D5F | Errors, risk callouts |
| Purple | #C7B9FF | Data visualization, infographics |
| Chartreuse / Lime | #DEFF4D | Positive highlights |
| Dark Gray (Text Only) | #666666 | Secondary text |
| Light Gray | #E6E6E6 | Dividers, table rows |

## 🛡 Recommended Whitelists

### Minimal / Conservative

Use when you want strict brand validation with minimal exposure.

1. `#0C62FB`
2. `#002FAF`
3. `#FFFFFF`
4. `#000000`
5. `#666666`
6. `#E6E6E6`

### Expanded (Still Brand-Clean)

Use when allowing data visualization, focus states, and alerting.

1. `#0C62FB`
2. `#002FAF`
3. `#1BE1F2`
4. `#FF4D5F`
5. `#C7B9FF`
6. `#DEFF4D`
7. `#FFFFFF`
8. `#000000`
9. `#666666`
10. `#E6E6E6`

## ⚠️ Brand & Security Notes

- **Do not eyedrop colors** from slides or PDFs — this is discouraged due to color-profile drift.
- Use **HEX or RGB for digital** surfaces; PMS/CMYK values are for print only.
- Brand guidance recommends pairing **only one accent color** with the primary blues to avoid visual noise.
