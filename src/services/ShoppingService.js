const { getJson } = require("serpapi");

getJson({
  engine: "google",
  api_key: '9c8df8889532b8222db45b170f14edd19d87869d21550103b838a15e64d2897a', 
  tbm: "shop",
  tbs: "mr:1,merchagg:g784994%7Cm10046|m122214550|g8299768%7Cm8175035|g126652263%7Cm117989436",
  q: "potato chips",  
  num: 100,
  location: "College Station, Texas",
}, (data) => {
    const shoppingResults = data["shopping_results"]; // Correct variable name

    if (shoppingResults && Array.isArray(shoppingResults)) {
        shoppingResults.forEach((shoppingResult) => {
            console.log(`Title: ${shoppingResult.title}`);
            console.log(`Price: ${shoppingResult.price}`);
            console.log(`Store: ${shoppingResult.source}`);
            console.log(`Thumbnail: ${shoppingResult.thumbnail}`);
        });
    } else {
        console.error("No valid shopping results found in the JSON response.");
    }
});
