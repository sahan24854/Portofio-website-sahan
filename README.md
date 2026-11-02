# Sahan Dissanayake’s portfolio

Personal portfolio for Sahan Dissanayake, a recent BSc (Hons) Electrical and Electronic Engineering graduate interested in AI/ML engineering and telecommunications engineering.

Built with Astro and Tailwind CSS. Content is based on the supplied CV; the homepage portrait was supplied by Sahan.

## Run locally

Requires Node.js 22.12 or later.

```sh
npm install
npm run dev
```

Open the local address printed in the terminal. To build the static website:

```sh
npm run build
npm run preview
```

## Content

- `src/components/Hero.astro`: portrait and introduction.
- `src/components/About.astro`: biography, education, and internship.
- `src/components/Contact.astro`: email and phone.
- `src/pages/skills.astro`: skills and certification.
- `src/content/works/`: six CV-based project summaries.
- `public/projects/`: abstract SVG project illustrations.
- `chatbot-worker/`: separate Ollama backend; see CHATBOT-SETUP.md.

The blog is empty until Sahan adds his own writing. The supplied CV is used as a content reference and is not copied to the public directory.

## GitHub Pages deployment

Repository: https://github.com/sahan24854/Portofio-website-sahan
Website: https://sahan24854.github.io/Portofio-website-sahan/

The GitHub Actions workflow builds and deploys pushes to main. In repository Settings → Pages, choose GitHub Actions as the source. The workflow sets SITE_URL and BASE_PATH; local development continues to run at `/`.

The optional repository Actions variable PUBLIC_CHAT_API_URL connects the separately deployed chatbot Worker. The Ollama key belongs only in Cloudflare Worker Secrets. Never commit `.env` or `.dev.vars` files. The original-owner archive is kept locally and excluded from Git.

To reproduce the Pages build locally:

```sh
BASE_PATH=/Portofio-website-sahan SITE_URL=https://sahan24854.github.io npm run build
```
