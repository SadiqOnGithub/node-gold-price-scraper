const fs = require("fs");

fetch("https://www.ajio.com/search/?text=mmtc%20pamp%201gm")
  .then((response) => response.text())
  .then((text) => {
    // fs.writeFileSync("data.html", text);
    const match = text.match(/window\.__PRELOADED_STATE__ = (\{.*\});/);
    if (match && match[1]) {
      try {
        const preloadedState = JSON.parse(match[1]);
        const product = preloadedState.grid.entities[600536311];
        // fs.writeFileSync("data.json", JSON.stringify(product));
        console.log("---ajio.com---");
        console.log("price", product.price.value);
        console.log("wasPriceData", product.wasPriceData.value);
        console.log("offerPrice", product.offerPrice.value);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("Could not find ajio data");
    }
  })
  .catch((error) => console.error("Error:", error))
  .finally(() => {
    console.log("=====================================");
  });

fetch("https://www.mmtcpamp.com/shop/gold/lotus-gold-bar-24k-1gm")
  .then((response) => response.text())
  .then((data) => {
    // console.log(data);
    // fs.writeFileSync("data.html", data);

    const match = data.match(/<script id="__NEXT_DATA__" type="application\/json">\s*([\s\S]*?)\s*<\/script>/);
    // console.log(match);
    if (match && match[1]) {
      try {
        const parsedScriptTag = JSON.parse(match[1]);
        const product = parsedScriptTag.props.pageProps.selectedSku;
        console.log("---MMTC Pamp---");
        // fs.writeFileSync("data.json", JSON.stringify(product));
        console.log("mrpAmount", product.mrpAmount);
        console.log("preTaxAmount", product.preTaxAmount);
        console.log("taxAmount", product.taxAmount);
        console.log("preTaxAmount", product.preTaxAmount);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("Could not find mmtc-pamp data");
    }
  })
  .then(() => {
    console.log("=====================================");
  });

fetch("https://www.amazon.in/MMTC-PAMP-Lotus-24k-999-9-Gold/dp/B08KSPYJX2/", {
  headers: {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-IN,en;q=0.9",
  },
})
  .then((response) => response.text())
  .then((text) => {
    console.log("---Amazon---");
    // fs.writeFileSync("data.html", text);

    const re = /<div[^>]*class="[^"]*twister-plus-buying-options-price-data[^"]*"[^>]*>\s*([\s\S]*?)\s*<\/div>/i;
    const match = text.match(re);
    if (match && match[1]) {
      const parsedData = JSON.parse(match[1]);
      const product = parsedData.desktop_buybox_group_1[0];
      // fs.writeFileSync("data.json", JSON.stringify(product));
      console.log("priceAmount:", product.priceAmount);
    } else {
      console.log("Could not find price data");
    }
  })
  .catch(console.error);
