require('dotenv').config();
const { getJson } = require("serpapi");

export function fetchShoppingResults(query) {
  return new Promise((resolve, reject) => {
    getJson({
      engine: "google",
      api_key: serpApiKey, 
      tbm: "shop",
      tbs: "mr:1,merchagg:g784994%7Cm10046|m122214550|g8299768%7Cm8175035|g126652263%7Cm117989436",
      q: query,  
      num: 100,
      location: 'College Station, Texas',
    }, (data) => {
      const shoppingResults = data["shopping_results"];
  
      if (shoppingResults && Array.isArray(shoppingResults)) {
        resolve(shoppingResults);
      } else {
        reject("No valid shopping results found in the JSON response.");
      }
    });
  });
}

