// myntra
import fetch from "node-fetch";
import { CookieJar } from "tough-cookie";
import fetchCookie from "fetch-cookie";

export default function mynta() {
  const CookieJarFetch = fetchCookie(fetch, new CookieJar());
  const productUrl = "https://www.myntra.com/gold-coin/mmtc-pamp/mmtc-pamp-24k-9999-purest-1-gram-gold-bar-lotus-1-gm-coin-lbma-certified/35714003/buy";
  const offersUrl = "https://www.myntra.com/gateway/v2/product/35714003/offers/36959";

  (async () => {
    // 1. Hit product page to get cookies
    await CookieJarFetch(productUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-IN,en;q=0.9",
      },
    });

    // 2. Call JSON API with same jar
    const res = await CookieJarFetch(offersUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-IN,en;q=0.9",
        Referer: productUrl,
        // If you see more headers in DevTools for this request, copy them here
      },
    });

    const response = await res.json();

    // fs.writeFileSync("data.json", JSON.stringify(response));
    console.log("---myntra---");
    console.log("price.mrp", response.bestPrice.price.mrp);
    console.log("price.discounted", response.bestPrice.price.discounted);
    console.log("=====================================");
  })();
}
