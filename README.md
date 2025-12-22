# Remidi Works Platform Demos

Interactive demos for Remidi Works - Building Revenue Model Excellence.

**Target Audience:** Middle Market PE Firms & Portfolio Companies

## URLs

- `/` - Landing page with both demo options
- `/user` - Portfolio Company view (case study walkthrough)
- `/investor` - Investor Portfolio dashboard
- `/investor?client=fundname` - Custom investor view

## Core Value Proposition

- **WHAT:** See where you rank vs. peers (benchmark position)
- **SO WHAT:** Know what's broken (diagnosed gaps)
- **NOW WHAT:** Fix what matters (prioritized action)

## Adding New Investors

### Step 1: Create a JSON file

Create a new file in `src/data/` named after the investor (lowercase, hyphens for spaces):
- `jump-capital.json`
- `insight-partners.json`
- `summit-partners.json`

### Step 2: Use this template

```json
{
  "fundName": "Jump Capital",
  "fundType": "Growth Equity",
  "lastUpdated": "2025-12-22",
  "portfolio": [
    {
      "id": 1,
      "name": "Company Name",
      "sector": "Industry/Sector",
      "stage": "Series A/B/C",
      "website": "company.com",
      "healthScore": 6.5,
      "relativeScore": 0.7,
      "valueArticulation": 6.8,
      "pricingArchitecture": 5.5,
      "competitivePositioning": 7.0,
      "salesEnablement": 6.2,
      "customerROI": 6.5,
      "status": "average",
      "invested": 2023,
      "topGaps": ["Pricing Architecture"],
      "observation": "One-line observation about the company"
    }
  ]
}
```

### Field Definitions

| Field | Description |
|-------|-------------|
| `healthScore` | Overall score 0-10 (average of dimensions) |
| `relativeScore` | Difference from universe avg (5.8). Positive = above avg |
| `status` | `outperformer` (7+), `average` (5-7), `underperformer` (4-5), `critical` (<4) |
| `topGaps` | Array of dimensions needing work (empty if outperformer) |
| `observation` | Brief assessment visible in detail panel |

### Step 3: Share the custom URL

```
https://remidiworks.com/investor?client=jump-capital
```

The `?client=` value must match the filename (without `.json`).

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to GitHub. Vercel auto-deploys.

---

Remidi Works is a product of HG Partners.
