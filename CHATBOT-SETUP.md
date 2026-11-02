# NVIDIA chatbot + GitHub Pages

Your Astro website remains static on GitHub Pages. A separate Cloudflare Worker holds the NVIDIA key and answers chat requests. The Worker is prepared locally but has not been deployed. No real NVIDIA request has been tested yet.

## 1. Create a free Cloudflare account

Use https://dash.cloudflare.com/sign-up. You do not need to move your domain or website to Cloudflare. Workers has a free plan with usage limits. NVIDIA availability and credits are separate; check your NVIDIA account.

## 2. Deploy the prepared backend

Run these commands in the portfolio project folder:

```sh
npm run chat:knowledge
npx wrangler@4 login
npx wrangler@4 deploy --config chatbot-worker/wrangler.jsonc
npx wrangler@4 secret put NVIDIA_API_KEY --config chatbot-worker/wrangler.jsonc
```

The last command prompts for the API key. Paste it there, not into this chat, JavaScript files, GitHub or the command itself. Wrangler saves it as an encrypted Worker secret. Alternatively: Cloudflare dashboard → Workers & Pages → sahan-portfolio-chat → Settings → Variables and Secrets → Add → type Secret → name NVIDIA_API_KEY → paste value → deploy.

The deploy command prints a URL such as `https://sahan-portfolio-chat.YOUR-SUBDOMAIN.workers.dev`. Keep that URL for step 3.

The configured model is `meta/llama-3.1-8b-instruct`. If your NVIDIA key uses another supported chat model, change NVIDIA_MODEL in chatbot-worker/wrangler.jsonc to the exact model ID from NVIDIA's API example and deploy again.

## 3. Connect the website

Create `.env` in the portfolio root using your editor, containing only the public endpoint:

```dotenv
PUBLIC_CHAT_API_URL=https://sahan-portfolio-chat.YOUR-SUBDOMAIN.workers.dev/api/chat
```

Replace YOUR-SUBDOMAIN with the real value from deployment. This URL is public; it is not an API key. Restart `npm run dev` after changing it. Never put NVIDIA_API_KEY in any PUBLIC_ variable.

For GitHub Actions builds: repository Settings → Secrets and variables → Actions → Variables → New repository variable. Set PUBLIC_CHAT_API_URL to the same full endpoint URL. In the existing workflow, pass it to the build step:

```yaml
- name: Build website
  run: npm run build
  env:
    PUBLIC_CHAT_API_URL: ${{ vars.PUBLIC_CHAT_API_URL }}
```

Then rebuild and deploy your GitHub Pages website. If building manually instead, the root .env is read during `npm run build`; publish the resulting dist folder through your chosen Pages workflow. Changing a build-time variable requires rebuilding.

## 4. Check the allowed website address

`chatbot-worker/wrangler.jsonc` currently allows:

- https://sahan24854.github.io
- http://localhost:4322
- http://127.0.0.1:4322

ALLOWED_ORIGINS is a comma-separated list of exact origins (scheme + hostname + optional port), no trailing slash or repository path. Add your actual custom domain if used, or your local development port if different, then redeploy the Worker. Remove local origins when no longer needed.

The portfolio now includes a GitHub Pages workflow for `sahan24854/Portofio-website-sahan`. Its published address is `https://sahan24854.github.io/Portofio-website-sahan/`. Internal links, assets and SEO support this path; local development still uses `/`. Choose GitHub Actions under repository Settings → Pages. The workflow already reads the PUBLIC_CHAT_API_URL Actions variable, so only add the variable and rerun the workflow when connecting the chatbot. No NVIDIA key belongs in GitHub Pages settings.

## 5. Verify

Open the site and ask “What are Sahan's six projects?” and “How can I contact him?”. The chatbot should answer and the email and LinkedIn links should work. It does not send messages or book meetings on your behalf.

If it says it is not connected, verify PUBLIC_CHAT_API_URL and restart/rebuild. If unavailable, check the NVIDIA secret, model access, available quota and allowed origins. Never share a diagnostic containing your key.

Run `npm run test:chat` for mocked backend checks. Run `npm run chat:knowledge` and redeploy the Worker whenever project write-ups change. Profile facts are maintained in scripts/build-chat-knowledge.mjs.

## Operational notes

- Worker has 10 requests per minute per IP using Cloudflare's rate-limit binding. These counters are per Cloudflare location and approximate, not a global spending cap.
- Origin checks prevent other browser sites from calling the backend, but are not authentication; scripts can forge Origin. Public chat still consumes NVIDIA quota. Monitor provider usage and add bot protection if needed.
- Inputs, history, output length and timeouts are bounded. No key or provider diagnostic is returned to the browser. Conversations stay in page memory; the backend does not save them. NVIDIA receives conversation text for inference.
- Email and LinkedIn remain available if the AI service is down.

References: https://developers.cloudflare.com/workers/configuration/secrets/ · https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/ · https://docs.api.nvidia.com/nim/reference/meta-llama-3_1-8b-infer
