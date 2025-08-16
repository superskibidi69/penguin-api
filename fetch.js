addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
const penguins = [
  "https://birdlifedata.blob.core.windows.net/species-images/22697748.jpg",
  "https://plus.unsplash.com/premium_photo-1664303875699-8e95cd12601a?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1664302172889-5534aedc1582?q=80&w=396&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/widen_1600/media/default/0001/05/30627f237982b80399f5d2db0c8daeeea38a5950.jpeg",
  "https://images.unsplash.com/photo-1552326731-fa4d01c2f36f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://files.worldwildlife.org/wwfcmsprod/images/Gentoo_Penguin/story_full_width/6r9szjshh_HI_292876WHYMatter1.jpg",
  "https://i.natgeofe.com/n/4ddebecc-42e9-45cc-ae11-f98ab3b92a83/MM10111_231215_10606.jpg",
  "https://d1jyxxz9imt9yb.cloudfront.net/medialib/4763/image/s768x1300/_DSC_0102_cropped.jpg",
  "https://penguin-api-superfood.vercel.app/.images/2.jpg",
  "https://penguin-api-superfood.vercel.app/.images/1.jpg",
  "https://penguin-api-superfood.vercel.app/.images/3.webp",
  "https://penguin-api-superfood.vercel.app/.images/4.jpg",
  "https://penguin-api-superfood.vercel.app/.images/miniahhhbooogh.jpeg",
  "https://penguin-api-superfood.vercel.app/.images/ok.jpeg",
  "https://images.unsplash.com/photo-1746311507414-bce6f67abb44?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1712921674663-0bf5370a2ce7?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1551986782-d0169b3f8fa7?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
