addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request, event));
});
const cdn_0 = Array.from({ length: 29 }, (_, id) =>
  `https://penguin-api-superfood.vercel.app/assets/${id}.jpg`
);
const cdn_1 = Array.from({ length: 29 }, (_, i) =>
  `https://cdn-penguins.netlify.app/assets/${i}.jpg`
);
const penguins = [...cdn_0, ...cdn_1];
const GLOBAL_CACHE_NAME = "penguin-cache";
const CACHE_TTL = 6524;
async function handleRequest(request, event) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }
  try {
    const cache = await caches.open(GLOBAL_CACHE_NAME);
    const randomUrl = penguins[Math.floor(Math.random() * penguins.length)];
    const cacheKey = new Request(randomUrl);
    let response = await cache.match(cacheKey);
    const cacheStatus = response ? "HIT" : "MISS";
    if (response) {
      console.log("cache hit:", randomUrl);
    } else {
      console.log("cache miss:", randomUrl);
      const data = { image: randomUrl, cache: "MISS" };
      response = new Response(JSON.stringify(data));
      event.waitUntil(cache.put(cacheKey, response.clone()));
    }
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "*");
    headers.set("Cache-Control", `public, max-age=${CACHE_TTL}`);
    headers.set("CDN-Cache-Control", `max-age=${CACHE_TTL}`);
    headers.set("X-Cache-Status", cacheStatus);
    headers.set("X-Penguin-URL", randomUrl);
    const body = JSON.stringify({ image: randomUrl, cache: cacheStatus });
    return new Response(body, { headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      status: 500,
    });
  }
}