import express from "express";
import * as dotenv from "dotenv";
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';
import auth from "../middleware/auth.js";

// const { OpenAIApi, Configuration } = require('openai')
dotenv.config()

const router =  express.Router();
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
//   });
const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
})

// const openai2 = new OpenAIApi(configuration)

router.route('/').get((req,res) => {
    res.send('Hello from AI')
})

router.route('/').post(auth, async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
  
      const image = aiResponse.data[0].b64_json

      return res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
  });
  
export default router