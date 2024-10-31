import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); // Ensure this is called at the beginning XYZ

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is loaded correctly XYZ
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Correct the model name if necessary XYZ
      prompt: `${prompt}`,
      temperature: 0, // Higher values mean the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion.
      top_p: 1, // Alternative to sampling with temperature, called nucleus sampling.
      frequency_penalty: 0.5, // Positive values penalize new tokens based on their existing frequency in the text so far.
      presence_penalty: 0, // Positive values penalize new tokens based on whether they appear in the text so far.
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || 'An error occurred');
  }
});


