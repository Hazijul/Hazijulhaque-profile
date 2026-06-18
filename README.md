# Cyber-Physical HUD Portfolio

Interactive 3D portfolio built with React, Vite, and Three.js.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to Vercel (via GitHub)

### 1. Push this project to GitHub

```bash
cd e:\Portfolio
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub details.

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project**.
3. Select your GitHub repository.
4. Vercel auto-detects **Vite**. Keep these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**.

Your site will be live at a URL like `https://your-project.vercel.app`.

### 3. After deploy

- Every push to `main` triggers a new deployment automatically.
- Customize content in `src/data/portfolioData.ts`.
- Replace `public/portrait.svg` with your photo and update `personalData.portrait`.

## Customize before going live

Edit `src/data/portfolioData.ts`:

- `personalData.name`, `title`, `email`, `github`, `linkedin`
- `projects`, `experience`, `skills`

## Build locally (optional)

```bash
npm run build
npm run preview
```
