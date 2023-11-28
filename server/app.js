const express = require('express');
const { getJson } = require('serpapi');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();

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
  const userPrompt = req.query.q;

  if (!userPrompt) {
    return res.status(400).json({ error: 'Missing prompt parameter.' });
  }

  try {
    const chatGptApiKey = process.env.CHATGPT_API_KEY;

    // Implement a function to make the OpenAI request with retry logic
    const makeOpenAIRequest = async () => {
      try {
        const response = await axios.post(
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
        return response.data.choices[0].text;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Check if the 'retry-after' header is present
          const retryAfter = error.response.headers['retry-after'];

          if (retryAfter) {
            console.log(`Rate limit exceeded. Waiting for ${retryAfter} seconds.`);
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return makeOpenAIRequest(); // Retry the request
          } else {
            console.log('Rate limit exceeded. Waiting for a default 5 seconds.');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return makeOpenAIRequest(); // Retry the request
          }
        } else {
          throw error; // Propagate other errors
        }
      }
    };

    const generatedText = await makeOpenAIRequest();

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