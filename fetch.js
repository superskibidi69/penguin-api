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
    const randomUrl = penguins[Math.floor(Math.random() * penguins.length)];
    let cached = await PENGUIN_CACHE.get(randomUrl);
    if (!cached) {
      const data = { image: randomUrl };
      cached = JSON.stringify(data);
      await PENGUIN_CACHE.put(randomUrl, cached, { expirationTtl: 6000 });
    }

    return new Response(cached, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}