# Deploy — GitHub Pages (5 minutes)

This folder IS the site. Push its contents as a repo root — zero build step.

## Files in this folder

`index.html` · `style.css` · `app.js` · `resume.html` · `404.html` ·
`Saksham-Saini-Resume.txt` · `robots.txt` · `sitemap.xml` · `.nojekyll` ·
`README.md` · `DEPLOYMENT.md` · `.gitignore`

## Steps

1. **Test locally** — inside this folder run `python -m http.server 8000`,
   open `http://127.0.0.1:8000`. Click everything, send a test message.
2. **Activate email forwarding** — after your first test send, open
   `sakshamsainisaini0@gmail.com` and click the FormSubmit activation link.
   Without this click, messages only reach the browser console.
3. **Create repo** — on GitHub, new **public** repository, e.g. `portfolio`.
   Do NOT add README/license (files already exist here).
4. **Push this folder as repo root:**
   `cd portfolio-project`
   `git init`
   `git add .`
   `git commit -m "Launch portfolio"`
   `git branch -M main`
   `git remote add origin https://github.com/<you>/portfolio.git`
   `git push -u origin main`
5. **Enable Pages** — repo Settings → Pages → Source: `Deploy from a branch`
   → Branch: `main`, Folder: `/ (root)` → Save. Wait 1–2 min, open
   `https://<you>.github.io/portfolio/`.
6. **After deploy** — replace `https://example.com` in `robots.txt` and
   `sitemap.xml` with your real Pages URL, commit + push. Then submit the
   sitemap in Google Search Console.

Notes: `.nojekyll` tells Pages to serve files exactly as-is. `404.html` is
picked up automatically for bad URLs. HTTPS is enforced by GitHub.
Rollback: `git revert HEAD && git push`.
