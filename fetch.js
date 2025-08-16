addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
const penguins = [
  "https://birdlifedata.blob.core.windows.net/species-images/22697748.jpg",
  "https://storage.googleapis.com/oceanwide_web/media-dynamic/cache/widen_1600/media/default/0001/05/30627f237982b80399f5d2db0c8daeeea38a5950.jpeg",
  "https://files.worldwildlife.org/wwfcmsprod/images/Gentoo_Penguin/story_full_width/6r9szjshh_HI_292876WHYMatter1.jpg",
  "https://i.natgeofe.com/n/4ddebecc-42e9-45cc-ae11-f98ab3b92a83/MM10111_231215_10606.jpg",
  "https://d1jyxxz9imt9yb.cloudfront.net/medialib/4763/image/s768x1300/_DSC_0102_cropped.jpg"
];

async function handleRequest(request) {
  const randomUrl = penguins[Math.floor(Math.random() * penguins.length)];

  const data = { url: randomUrl };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
