# Abdul Kader Sanish — Resume & Bio-data Website

A 4-page personal website built with **HTML5, CSS3, JavaScript and jQuery**, ready to host free on
**GitHub Pages**. No database, no build step, no paid tools.

```
Default Project/
├── index.html        ← Page 1: Resume (profile, skills, learning/activities, education, certificates)
├── biodata.html      ← Page 2: Bio-data (personal / contact / family / academic tables + declaration)
├── projects.html     ← Page 3: Projects with a jQuery category filter
├── contact.html      ← Page 4: Contact form with jQuery validation
├── css/
│   └── style.css     ← All styling, dark mode, responsive layout, print styles
├── js/
│   ├── app.js        ← Mobile nav, scroll reveal, skill bars, filter, form
│   └── vendor/
│       └── jquery.min.js   ← jQuery 3.7.1 stored locally (works offline)
├── assets/
│   ├── photo.jpg     ← Your profile photo (600 × 600)
│   ├── avatar.svg    ← Fallback illustration if photo.jpg is missing
│   ├── favicon.svg   ← Browser-tab icon
│   └── projects/
│       ├── hydroponic.jpg  ← Reference photo for the hydroponic project
│       ├── event.jpg       ← Reference photo for the event project
│       └── parking.jpg     ← Reference photo for the car-parking project
├── dev-server.js     ← Optional tiny local server (Node)
└── README.md         ← This guide
```

---

## 1. Preview it on your computer

1. Open the folder in **VS Code** (`File → Open Folder…`).
2. Double-click **`index.html`** in the Explorer, or right-click it → *Reveal in File Explorer* → double-click.
   It opens at `file:///C:/Users/sanis/Documents/Default Project/index.html` and everything works,
   because jQuery is stored locally.

**Better for editing:** install the **Live Server** extension (`Ctrl+Shift+X` → search “Live Server” →
Install), then right-click `index.html` → **Open with Live Server**. The page refreshes on every save.

**Or** use the included Node server (Node v24 is already installed):
```powershell
cd "C:\Users\sanis\Documents\Default Project"
node dev-server.js
# open http://localhost:5500
```

### Quick test checklist
- All four nav links open.
- Projects → **AI & IoT** shows only the hydroponic card; **All projects** brings everything back.
- Contact → **Send message** with empty fields shows red errors.
- `Ctrl+P` on the resume page gives a clean, sidebar-free A4 print preview.
- Narrow the window to ~375 px (or `F12` → `Ctrl+Shift+M`) → hamburger menu appears.

---

## 2. Your photo

Your photo is already installed as **`assets/photo.jpg`** (600 × 600 px, ~38 KB) and appears inside the
circle on both the resume and bio-data pages.

**To replace it later:** overwrite `assets\photo.jpg` with another image of the same name. Keep it
square (or it will be cropped), under ~300 KB. The pages need no change.

`assets/profile.jpg.jpeg` is your original portrait and is not used by the site — you can keep it as a
backup or delete it. If `photo.jpg` is ever missing, the illustrated `avatar.svg` is shown instead.

### Project reference photos

The three cards on `projects.html` use local photos in **`assets/projects/`**:

| File | Shows | Source |
|---|---|---|
| `hydroponic.jpg` | Lettuce in a hydroponic farm | Wikimedia Commons, CC0 (Kurt Kaiser) |
| `event.jpg` | Participants at a hackathon | Wikimedia Commons, CC0 (AnnaKhrobolova / WMUA) |
| `parking.jpg` | A car-park sensor | Wikimedia Commons, CC0 (ProjectManhattan) |
| `hackathon.jpg` | Your laptop at FUSION TECHATHON 4.0 | Your own WhatsApp photo |
| `workshop.jpg` | Your ROBO Race Workshop group | Your own WhatsApp photo |

The three project photos display in color, as do your two own photos in the *Participation & certifications*
cards. To swap any of them, overwrite the file
with a new photo of the same name (landscape, ~1000 px wide, under ~300 KB) — no HTML change needed.
If you remove a file, the old gradient block shows through instead. The Wikimedia photos are CC0, so no
attribution is legally required; the small credit line under the grid is a courtesy.

### Animation

The site has a small amount of motion built in (all pure CSS/JS, no libraries beyond jQuery):
a top reading-progress bar, a staggered hero entrance, a slow shimmer on the gradient name, a rotating
ring behind your photo, a cursor spotlight over the hero, a gentle 3D tilt on project cards, count-up
quick facts, scroll reveals and animated skill bars. All of it switches off automatically when the
visitor's system has **reduced motion** enabled, and is hidden in the print layout.

---

## 3. Details still marked as placeholders

Most content now comes straight from your resume. These are the only things left to confirm:

| Item | Where | Current value |
|---|---|---|
| Family names | `biodata.html` | “Not disclosed” (your edit) |
| 10th (SSLC) percentage | `biodata.html` | `—` |
| Hobbies, languages, mother tongue | `biodata.html` | Sample values — adjust if needed |
| Skill percentages | `index.html` | Estimated from “C, basic Python/Java/HTML” — tune to taste |

Everything else (summary, education, CGPA 8.27, PUC 88%, projects, roles, participation,
5 certifications, LinkedIn) is taken directly from `Abdul_Kader_Sanish_Resume-20.pdf`.

> **Never upload the `.venv` folder** or `dev-server.js` to GitHub — they are local-only. Upload just the
> HTML files plus `css/`, `js/` and `assets/`.

---

## 4. Host it on GitHub Pages (free)

Your choice: **GitHub Pages** → URL like
`https://sanishabdulkader-arch.github.io/my-resume/`

There are two ways. **Method A needs no Git install** — start there.

### Method A — Upload through the GitHub website (no Git, ~5 minutes)

1. **Sign in / sign up** at https://github.com (free).
2. Click **+ → New repository**.
   - Repository name: `my-resume`
   - Visibility: **Public** (required for free Pages)
   - Do **not** tick “Add a README”
   - Click **Create repository**.
3. On the empty repo page click **“uploading an existing file”** (or *Add file → Upload files*).
4. Open `C:\Users\sanis\Documents\Default Project` in File Explorer, select **all files and the
   `css`, `js`, `assets` folders**, and drag them into the upload box.
   - You must keep the folder structure (`css/style.css`, `js/app.js`, `assets/photo.jpg`,
     `assets/projects/hydroponic.jpg`).
   - `dev-server.js` and `README.md` are optional; uploading them is harmless.
5. Click **Commit changes**.
6. Go to **Settings → Pages**.
   - *Source:* **Deploy from a branch**
   - *Branch:* **main** · *Folder:* **/ (root)**
   - Click **Save**.
7. Wait 1–2 minutes, refresh the page — the green box shows your live URL:
   `https://sanishabdulkader-arch.github.io/my-resume/`

> All links in the site are relative (`css/style.css`, `biodata.html`), so it works correctly inside
> the `/my-resume/` subfolder.

### Method B — Publish from VS Code with Git (best for updates)

1. Install **Git for Windows**: https://git-scm.com/download/win → run the installer → accept defaults
   → **restart VS Code** (check with `git --version` in the VS Code terminal).
2. In VS Code: `Ctrl+Shift+G` (**Source Control**) → **Publish to GitHub**.
3. Sign in to GitHub in the browser window that opens.
4. Choose **public** repository, name it `my-resume` → **Publish**.
5. On GitHub: **Settings → Pages** → *Deploy from a branch* → **main** + **/ (root)** → **Save**.
6. Visit `https://sanishabdulkader-arch.github.io/my-resume/`.

**To update later:** edit files → Source Control → write a message → **Commit** → **Sync Changes**.
Pages redeploys automatically in ~1 minute.

<details>
<summary>Terminal version (optional)</summary>

```powershell
cd "C:\Users\sanis\Documents\Default Project"
git init
git add .
git commit -m "Resume and bio-data website"
git branch -M main
git remote add origin https://github.com/sanishabdulkader-arch/my-resume.git
git push -u origin main
```
</details>

### Alternative host — Netlify Drop (no account needed to try)

1. https://app.netlify.com/drop → sign in (free) → drag the whole project folder → live in ~10 seconds.
2. Rename under *Site configuration → Change site name*.
Useful if GitHub Pages ever gives you trouble; the files are identical.

---

## 5. Troubleshooting

| Problem | Fix |
|---|---|
| Page looks unstyled on the live site | Windows ignores letter case, GitHub does not. Keep paths exactly `css/style.css`, `js/app.js`, `assets/...` (lowercase). |
| Sections invisible / no animations | `js/vendor/jquery.min.js` didn’t upload. Upload the full `js` folder. (`app.js` un-hides content if jQuery is missing.) |
| 404 when clicking a nav link | Not all files were uploaded, or a folder wasn’t dragged. Re-upload the whole folder. |
| Photo not showing | The file must be exactly `assets/photo.jpg` (JPG). The avatar is shown while it’s missing. |
| Pages URL shows 404 | Wait 2 minutes; confirm *Settings → Pages* uses branch `main` and folder `/ (root)`. |
| Theme resets every page | `localStorage` is blocked in private/incognito mode — the site still works. |
| Contact form “does nothing” | It opens your email app via `mailto:`. For real server-side delivery, connect the form to **Formspree** or add `netlify` to the `<form>` tag on Netlify. |

---

## 6. How the code maps to the assignment (for your report / viva)

**HTML elements used:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `h1–h4`,
`p`, `ul`/`ol`/`li`, `table` with `caption`/`thead`/`tbody`/`th`/`td`, `form` with
`label`/`input`/`textarea`/`button`, `img`, `a`, `strong`, `span`, plus ARIA attributes
(`aria-label`, `aria-expanded`, `aria-describedby`, `role="progressbar"`).

**CSS techniques:** custom properties (variables) for theming, Flexbox, CSS Grid, `clamp()` fluid
typography, gradients, transitions/animations, `:focus-visible`, media queries for responsive design,
`prefers-reduced-motion`, and a dedicated `@media print` stylesheet.

**JavaScript / jQuery features:**
- light/dark theme with `localStorage` persistence;
- mobile navigation toggle;
- `IntersectionObserver` scroll-reveal and animated skill bars;
- project filtering with `fadeIn` / `fadeOut`;
- client-side form validation (email regex, inline errors, `aria-invalid`);
- back-to-top button, automatic footer year, print helpers.

**Pages:** `index.html` (resume), `biodata.html` (bio-data), `projects.html`, `contact.html`.

---

## 7. Before you submit

- [ ] `assets/photo.jpg` added and visible on both pages.
- [ ] School names, percentages, family details and certificates replaced.
- [ ] Live URL opens all four pages (test on your phone too).
- [ ] No 404s in the console (`F12` → Console).
- [ ] Dark mode + hamburger menu work on the live site.
- [ ] `Ctrl+P` → *Save as PDF* gives a clean resume.
- [ ] Bio-data table readable on a phone (no sideways scrolling).
- [ ] Empty contact form shows validation errors.
