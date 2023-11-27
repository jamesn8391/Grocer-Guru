const env = import.meta.env;
import { getJson } from 'serpapi';
import querystring from 'querystring';
window.querystring = querystring;
import http from 'http';

export function fetchShoppingResults(query) {
  return new Promise((resolve, reject) => {
    const serpApiKey = import.meta.env.VITE_SERP_KEY;
    getJson({
      engine: "google",
      api_key: serpApiKey, 
      tbm: "shop",
      q: query,  
      num: 100,
      location: 'College Station, Texas',
      searchParams:{
        tbs: "mr:1,merchagg:g784994%7Cm10046|m122214550|g8299768%7Cm8175035|g126652263%7Cm117989436",
      },
    }, (data) => {
      const shoppingResults = data["shopping_results"];
  
      if (shoppingResults && Array.isArray(shoppingResults)) {
        // Extract only the required information for each item
        const simplifiedResults = shoppingResults.map(item => ({
          title: item.title,
          source: item.source,
          thumbnail: item.thumbnail,
        }));

        resolve(simplifiedResults);
      } else {
        reject("No valid shopping results found in the JSON response.");
      }
    });
  });
}

