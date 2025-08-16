addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
const penguins = [
  'https://penguin-api-superfood.vercel.app/.images/cooked.jpg',
  "https://penguin-api-superfood.vercel.app/.images/penggy.png",
  "https://penguin-api-superfood.vercel.app/.images/skiii.png",
  'https://penguin-api-superfood.vercel.app/.images/jp.jpeg',
  "https://penguin-api-superfood.vercel.app/.images/skippy.png",
  'https://penguin-api-superfood.vercel.app/.images/ido.jpg',
  "https://penguin-api-superfood.vercel.app/.images/helios522.jpeg",
  "https://penguin-api-superfood.vercel.app/.images/c.jpg",
  "https://penguin-api-superfood.vercel.app/.images/2.jpg",
  "https://penguin-api-superfood.vercel.app/.images/1.jpg",
  "https://penguin-api-superfood.vercel.app/.images/3.webp",
  "https://penguin-api-superfood.vercel.app/.images/4.jpg",
  'https://penguin-api-superfood.vercel.app/.images/webpwebpwebpwebp.webp',
  "https://penguin-api-superfood.vercel.app/.images/miniahhhbooogh.jpeg",
  "https://penguin-api-superfood.vercel.app/.images/ok.jpeg",
  "https://penguin-api-superfood.vercel.app/.images/avif.jpeg",
  "https://penguin-api-superfood.vercel.app/.images/avif.png",
  "https://penguin-api-superfood.vercel.app/.images/pev.png",
  'https://penguin-api-superfood.vercel.app/.images/fish.jpg',
  'https://penguin-api-superfood.vercel.app/.images/poop.jpg',
  'https://penguin-api-superfood.vercel.app/.images/bloons.jpg'
];

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
