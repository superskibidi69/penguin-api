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
const CACHE_TTL = 6000;
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
    if (response) {
      console.log("cache hit:", randomUrl);
      response = new Response(response.body, response);
      response.headers.set("X-Cache-Status", "HIT");
      response.headers.set("Access-Control-Allow-Origin", "*");
      return response;
    }
    console.log("cache miss:", randomUrl);
    const data = { image: randomUrl };
    response = new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Cache-Control": `public, max-age=${CACHE_TTL}`,
        "CDN-Cache-Control": `max-age=${CACHE_TTL}`,
        "X-Cache-Status": "MISS",
      },
    });

    event.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
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