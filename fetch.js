addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
const cdnbase = Array.from({ length: 28 }, (_, id) =>
  `https://penguin-api.rookiecookierc.workers.dev/assets/${id}.jpg`
);
const cdn1 = Array.from({ length: 26}, (_, i) =>
  `https://cdn-penguins.netlify.app/assets/${i}.jpg`
);
const penguins = [...cdnbase, ...cdn1];
async function handleRequest(_request) {
  const randomUrl = penguins[Math.floor(Math.random() * penguins.length)];
  const data = { image: randomUrl };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "*"
    }
  });
}