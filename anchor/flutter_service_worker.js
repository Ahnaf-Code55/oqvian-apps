'use strict';
const PREFIX = "oqvian-anchor-" + self.registration.scope;
const CACHE = PREFIX + "69eec19d3473f7d0";
const RESOURCES = [".last_build_id", "assets/AssetManifest.bin", "assets/AssetManifest.bin.json", "assets/FontManifest.json", "assets/NOTICES", "assets/fonts/MaterialIcons-Regular.otf", "assets/fonts/fallback/Roboto-Regular.ttf", "assets/packages/cupertino_icons/assets/CupertinoIcons.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-Black.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-Bold.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-ExtraBold.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-ExtraLight.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-Light.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-Medium.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-OFL.txt", "assets/packages/oqvian_ui/assets/fonts/Fraunces-Regular.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-SemiBold.ttf", "assets/packages/oqvian_ui/assets/fonts/Fraunces-Thin.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-Black.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-Bold.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-ExtraBold.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-ExtraLight.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-Light.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-Medium.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-OFL.txt", "assets/packages/oqvian_ui/assets/fonts/Inter-Regular.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-SemiBold.ttf", "assets/packages/oqvian_ui/assets/fonts/Inter-Thin.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-Bold.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-ExtraBold.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-ExtraLight.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-Light.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-Medium.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-OFL.txt", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-Regular.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-SemiBold.ttf", "assets/packages/oqvian_ui/assets/fonts/JetBrainsMono-Thin.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceGrotesk-Bold.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceGrotesk-Light.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceGrotesk-Medium.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceGrotesk-OFL.txt", "assets/packages/oqvian_ui/assets/fonts/SpaceGrotesk-Regular.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceGrotesk-SemiBold.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceMono-Bold.ttf", "assets/packages/oqvian_ui/assets/fonts/SpaceMono-OFL.txt", "assets/packages/oqvian_ui/assets/fonts/SpaceMono-Regular.ttf", "assets/shaders/ink_sparkle.frag", "assets/shaders/stretch_effect.frag", "canvaskit/canvaskit.js", "canvaskit/canvaskit.wasm", "canvaskit/chromium/canvaskit.js", "canvaskit/chromium/canvaskit.wasm", "favicon.png", "flutter.js", "flutter_bootstrap.js", "icons/Icon-192.png", "icons/Icon-512.png", "icons/Icon-maskable-192.png", "icons/Icon-maskable-512.png", "index.html", "main.dart.js", "manifest.json", "version.json"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(['./', ...RESOURCES].map(path => new URL(path, self.registration.scope).href));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) {
      if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || !url.href.startsWith(self.registration.scope)) return;
  const relative = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (request.mode !== 'navigate' && !RESOURCES.includes(relative)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') {
      try { const response = await fetch(request); if (response.ok) return response; }
      catch (_) { /* Use the installed app shell when offline. */ }
      return await cache.match(new URL('./', self.registration.scope).href);
    }
    const cached = await cache.match(request, {ignoreSearch: true});
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  })());
});
