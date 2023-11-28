const express = require('express');
const { getJson } = require('serpapi');
const querystring = require('querystring');
require('dotenv').config()

const app = express();
const port = 3001;

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
    q: query,
    num: 25,
    location: 'College Station, Texas',
    searchParams: {
      tbs: "mr:1,merchagg:g784994%7Cm10046|m122214550|g8299768%7Cm8175035|g126652263%7Cm117989436",
    },
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

app.get('/chat', async (req, res) => {
  const userPrompt = req.query.prompt;

  if (!userPrompt) {
    return res.status(400).json({ error: 'Missing prompt parameter.' });
  }

  try {
    const chatGptApiKey = process.env.CHATGPT_API_KEY;

    const chatGptResponse = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: userPrompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${chatGptApiKey}`,
        },
      }
    );

    const generatedText = chatGptResponse.data.choices[0].text;

    res.json({ response: generatedText });
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});