addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
const cdn_0 = Array.from({ length: 29 }, (_, id) =>
  `https://penguin-api-superfood.vercel.app/assets/${id}.jpg`
);
const cdn_1 = Array.from({ length: 29 }, (_, i) =>
  `https://cdn-penguins.netlify.app/assets/${i}.jpg`
);
const penguins = [...cdn_0, ...cdn_1];
const RATE_LIMIT_WINDOW = 4_000; 
const MAX_REQUESTS = 3;
const ipMap = new Map();
async function handleRequest(request) {
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
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    let timestamps = ipMap.get(ip) || [];
    timestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
    
    if (timestamps.length >= MAX_REQUESTS) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    timestamps.push(now);
    ipMap.set(ip, timestamps);
    const randomUrl = penguins[Math.floor(Math.random() * penguins.length)];
    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "X-Penguin-URL": randomUrl
    });
    const body = JSON.stringify({ image: randomUrl });
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