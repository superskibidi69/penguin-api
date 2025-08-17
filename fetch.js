addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});
const cdn0 = Array.from({ length: 29 }, (_, id) =>
  `https://penguin-api-superfood.vercel.app/assets/${id}.jpg`
);
const cdn1 = Array.from({ length: 26 }, (_, i) =>
  `https://cdn-penguins.netlify.app/assets/${i}.jpg`
);
const penguins = [...cdn0, ...cdn1];
async function handleRequest(event) {
  try {
    const cache = caches.default;
    const randomUrl = penguins[Math.floor(Math.random() * penguins.length)];
    const cacheKey = new Request(`penguin:${randomUrl}`);
    let response = await cache.match(cacheKey);

    if (!response) {
      const data = { image: randomUrl };
      response = new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Cache-Control": "public, max-age=2700"
        }
      });
      event.waitUntil(cache.put(cacheKey, response.clone()));
    }

    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
