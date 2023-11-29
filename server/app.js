const express = require('express');
const { getJson } = require('serpapi');
const querystring = require('querystring');
require('dotenv').config()
const axios = require('axios');
const OpenAI = require('openai');


const openai = new OpenAI({apiKey: process.env.CHATGPT_API_KEY});
const app = express();
const port = 3001;
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/shopping-results', (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter.' });
  }

  const serpApiKey = process.env.NODE_ENV_SERP_KEY;

  getJson({
    engine: "google",
    api_key: serpApiKey,
    tbm: "shop",
    tbs: "mr:1,merchagg:g784994%7Cm10046|m122214550|g8299768%7Cm8175035|g126652263%7Cm117989436",
    q: query,
    num: 25,
    location: 'College Station, Texas',
  }, (data) => {
    const shoppingResults = data["shopping_results"];

    if (shoppingResults && Array.isArray(shoppingResults)) {
      const simplifiedResults = shoppingResults.map(item => ({
        title: item.title,
        source: item.source,
        thumbnail: item.thumbnail,
        price: item.price,
      }));

      res.json(simplifiedResults);
    } else {
      res.status(500).json({ error: "No valid shopping results found in the JSON response." });
    }
  });
});

app.post('/ask', async (req, res) => {
  try {
    if (!req.body || !req.body.prompt) {
      throw new Error("Invalid request. 'prompt' is missing in the request body.");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user", 
        content: req.body.prompt
      }]
    });

    res.status(200).json({
      message: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});