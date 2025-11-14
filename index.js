const fs = require("fs");

fetch(
  "https://www.ajio.com/mmtc-pamp-1-gm-24-kt-999-9--lotus-yellow-gold-bar/p/6005363110_multi?",
)
  .then((response) => response.text())
  .then((text) => {
    fs.writeFileSync("data.html", text);
    const match = text.match(/window\.__PRELOADED_STATE__ = (\{.*\});/);
    if (match && match[1]) {
      try {
        const preloadedState = JSON.parse(match[1]);
        console.log(preloadedState);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("Could not find __PRELOADED_STATE__");
    }
  })
  .catch((error) => console.error("Error:", error));
