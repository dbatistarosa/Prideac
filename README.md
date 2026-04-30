# Pride Air Conditioning & Plumbing — Website

**Company:** Pride Air Conditioning & Plumbing  
**Phone:** 800.955.1086 | 866.269.4327  
**Address:** 2150 NW 18th Street, Pompano Beach, FL 33069  

---

## ✅ How to Deploy on Vercel (Plain HTML — No Build Required)

1. Push this entire folder's contents to GitHub (files go at the ROOT of the repo)
2. Go to vercel.com → New Project → Import your GitHub repo
3. Use these exact settings:

| Setting | Value |
|---|---|
| Framework Preset | **Other** |
| Root Directory | `./ ` (leave blank / default) |
| Build Command | *(leave completely empty)* |
| Output Directory | `./ ` (leave blank / default) |
| Install Command | *(leave completely empty)* |

4. Click Deploy — done. No build step, no Node.js, no dependencies.

---

## File Structure

```
/ (repo root)
├── index.html              ← Homepage
├── 404.html                ← Custom error page
├── sitemap.xml             ← Submit to Google Search Console
├── robots.txt              ← Search engine crawl rules
├── manifest.json           ← PWA manifest
├── README.md               ← This file
├── css/
│   └── global.css          ← All styles
├── js/
│   └── global.js           ← All JavaScript
├── images/
│   └── favicon.svg         ← Site icon
└── pages/
    ├── ac-repair.html
    ├── ac-replacement.html
    ├── ac-maintenance.html
    ├── plumbing.html
    ├── home-warranty.html
    ├── air-quality.html
    ├── commercial.html
    ├── about.html
    ├── reviews.html
    ├── offers.html
    ├── service-areas.html
    └── contact.html
```

---

## After Deploying

1. Submit `sitemap.xml` to Google Search Console
2. Verify both Google Business Profile listings (Pompano Beach + Port St. Lucie)
3. Add Google Analytics 4 tracking ID to each page `<head>`
4. Replace emoji placeholders with real photography
