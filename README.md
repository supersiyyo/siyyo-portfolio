# Siyyo Portfolio

Personal portfolio site for [siyyo.dev](https://siyyo.dev), built with Next.js and deployed to SiteGround via GitHub Actions.

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **Styling:** Tailwind CSS 4
- **Hosting:** SiteGround (FTPS deploy)
- **CI/CD:** GitHub Actions → FTPS to SiteGround (Port 21)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site locally.

## Deployment

Pushing to `master` automatically builds and deploys via GitHub Actions.

The workflow (`deploy.yml`) runs `npm run build` and uploads the static `./out` folder to SiteGround over FTPS (Port 21).

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `SITEGROUND_HOST` | SiteGround FTP hostname |
| `SITEGROUND_USERNAME` | FTP username |
| `SITEGROUND_PASSWORD` | FTP password |
| `SITEGROUND_DEPLOY_PATH` | Server directory (e.g. `public_html/`) |

## Project Structure

```
app/
  layout.tsx    — Root layout with Geist font
  page.tsx      — Home page with interactive particle canvas
  globals.css   — Global styles
public/         — Static assets
```
