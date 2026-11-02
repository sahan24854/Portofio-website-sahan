import type { APIRoute } from 'astro';
import { sitePath } from '../lib/paths';
export const GET: APIRoute = ({ site }) => new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(sitePath('/sitemap-index.xml'), site).href}\n`, {headers: {'Content-Type':'text/plain'}});
