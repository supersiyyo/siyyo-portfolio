# Siyyo Portfolio

Personal portfolio site for [siyyo.dev](https://siyyo.dev), built with Next.js and deployed to SiteGround via GitHub Actions.

## Tech Stack

- **Framework:** Next.js 16.1.3 (App Router, static export)
- **React Version:** 19.2.3
- **Node.js Version:** 24 (LTS)
- **Styling:** Tailwind CSS 4
- **Hosting:** SiteGround
- **CI/CD:** GitHub Actions → FTPS to SiteGround (Port 21)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site locally.

## Deployment

Pushing to `master` automatically builds and deploys via GitHub Actions.

The workflow ([deploy.yml](file:///c:/Users/super/Documents/siyyo-portfolio/.github/workflows/deploy.yml)) performs the following:
1.  Cleans up `legacy_components/` directory.
2.  Builds the site using `npm run build`.
3.  Uploads the static contents of `./out/` to SiteGround via **FTPS (Port 21)**.

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `SITEGROUND_HOST` | SiteGround FTP/SFTP hostname |
| `SITEGROUND_USERNAME` | FTP/SFTP username |
| `SITEGROUND_PASSWORD` | FTP password |
| `SITEGROUND_DEPLOY_PATH` | Server directory (e.g. `public_html/`) |

## Project Structure

```
app/
  layout.tsx       — Root layout with Geist font
  page.tsx         — Home page with interactive canvas
  globals.css      — Global Tailwind styles
  projects/        — Project-specific routes (e.g., /projects/foodi)
  components/      — Shared React components
assets/            — Project media (img, vid)
data/              — JSON data or site content (if applicable)
public/            — Static assets (favicon, etc.)
legacy_components/ — Older components (removed during CI/CD)
```

