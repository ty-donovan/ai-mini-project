var express = require('express');
var router = express.Router();
require("dotenv").config();
const axios = require('axios');

router.post('/openai', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 16,
      temperature: 0
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.openai_api_key}`
      }
    });

    res.json({ response: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
