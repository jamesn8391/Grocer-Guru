export function calibrationQueryHelper(JSONstring) {
  const wordsInQuotes = JSONstring.match(/"([^"]*)"/g);

  const JSONwords = wordsInQuotes.map((match) => match.slice(1, -1));

  var titles = [];
  var sources = [];
  var thumbnails = [];
  var prices = [];

  for (let i = 0; i < JSONwords.length; i++) {
    switch (JSONwords[i]) {
      case "title":
        titles.push(JSONwords[i + 1]);
        break;

      case "source":
        sources.push(JSONwords[i + 1]);
        break;

      case "thumbnail":
        thumbnails.push(JSONwords[i + 1]);
        break;

      case "price":
        prices.push(JSONwords[i + 1]);
        break;
    }
  }

  return titles.map((title, index) => ({
    title: title,
    source: sources[index],
    thumbnail: thumbnails[index],
    price: prices[index],
  }));
}
