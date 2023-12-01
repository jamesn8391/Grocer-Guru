export function calibrationQueryHelper(JSONstring, findItemByTitle) {
  const wordsInQuotes = JSONstring.match(/"([^"]*)"/g);

  const JSONwords = wordsInQuotes.map((match) => match.slice(1, -1));

  var titles = [];
  var sources = [];
  var prices = [];

  for (let i = 0; i < JSONwords.length; i++) {
    switch (JSONwords[i]) {
      case "title":
        titles.push(JSONwords[i + 1]);
        break;

      case "source":
        sources.push(JSONwords[i + 1]);
        break;

      case "price":
        prices.push(JSONwords[i + 1]);
        break;
    }
  }

  return titles.map((title, index) => {
    const curItem = findItemByTitle(title);
  
    return {
      title: title,
      source: curItem ? curItem.source : null,
      thumbnail: curItem ? curItem.thumbnail : null,
      price: curItem ? curItem.price : null,
    };
  });
  
}


export function finalQueryHelper(JSONstring) {
  const wordsInQuotes = JSONstring.match(/"([^"]*)"/g);

  const JSONwords = wordsInQuotes.map((match) => match.slice(1, -1));

  var titles = [];

  for (let i = 0; i < JSONwords.length; i++) {
    switch (JSONwords[i]) {
      case "title":
        titles.push(JSONwords[i + 1]);
        break;
    }
  }

  return titles;
}
