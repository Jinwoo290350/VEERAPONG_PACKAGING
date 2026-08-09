// Tell Bing, Yandex, Seznam and Naver that the site changed, via IndexNow.
// Unlike Search Console's "Request indexing" there is no daily quota, so this
// can run after every content deploy.
//
// Run: node scripts/ping-indexnow.js
//
// The key is the basename of the key file in public/ — IndexNow verifies
// ownership by fetching https://<host>/<key>.txt and matching its contents.
const fs = require("fs");
const path = require("path");

const HOST = "veerapong-packaging.vercel.app";
const PUBLIC_DIR = path.join(__dirname, "..", "public");

function findKey() {
  const file = fs
    .readdirSync(PUBLIC_DIR)
    .find((f) => /^[0-9a-f]{8,128}\.txt$/.test(f));
  if (!file) throw new Error("No IndexNow key file found in public/");
  const key = path.basename(file, ".txt");
  const body = fs.readFileSync(path.join(PUBLIC_DIR, file), "utf8").trim();
  if (body !== key) throw new Error(`${file} must contain exactly "${key}"`);
  return key;
}

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  // Every <loc> plus each hreflang alternate, so all four locales get pinged
  const urls = new Set();
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  for (const m of xml.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)) urls.add(m[1]);
  return [...urls];
}

async function main() {
  const key = findKey();
  const urlList = await sitemapUrls();
  console.log(`Submitting ${urlList.length} URLs for ${HOST}`);

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key,
      keyLocation: `https://${HOST}/${key}.txt`,
      urlList,
    }),
  });

  // 200 = accepted, 202 = accepted but key still being validated
  console.log(`IndexNow responded ${res.status} ${res.statusText}`);
  const text = await res.text();
  if (text) console.log(text);
  if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
