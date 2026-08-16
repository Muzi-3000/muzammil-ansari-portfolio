import { mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const client = new URL('../dist/client/', import.meta.url);
const server = new URL('../dist/server/', import.meta.url);

await rm(client, { recursive: true, force: true });
await mkdir(client, { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (entry.name === 'client' || entry.name === 'server') continue;
  await rename(join(dist.pathname, entry.name), join(client.pathname, entry.name));
}

await mkdir(server, { recursive: true });
await writeFile(new URL('index.js', server), `
const cleanPath = (pathname) => {
  if (pathname === '/') return '/index.html';
  if (pathname.endsWith('/')) return pathname + 'index.html';
  if (!pathname.split('/').pop().includes('.')) return pathname + '/index.html';
  return pathname;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetUrl = new URL(request.url);
    assetUrl.pathname = cleanPath(url.pathname);
    let response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (response.status === 404 && request.headers.get('accept')?.includes('text/html')) {
      const fallback = new URL(request.url);
      fallback.pathname = '/404.html';
      response = await env.ASSETS.fetch(new Request(fallback, request));
      return new Response(response.body, { status: 404, headers: response.headers });
    }
    return response;
  }
};
`);
