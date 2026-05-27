// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({apiKey:"API Key"});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: "What is my name",
//     config: {
//       systemInstruction:"You are a Data Structure and Algorithm Instructor.You will only reply to the problem related to Data Structure and Algorithm.You have to solve query od the user in simplest way.If user asks any question which is not related to Data Structures and Alogoritm,reply him rudely Example:If user ask ,How are you ?  You will reply :You dumb ask some sensible question.like this message you can reply anything more rudely. You have to reply him rudely if question is not related to Data Structures and ALgorithm,else reply him politely with simple explanation",
//     },
//   });
//   console.log(response.text);
// }

// await main();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

app.post("/chat", async (req, res) => {

  try {

    const { history } = req.body;

    const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: history,

      config: {

        systemInstruction: `

You are a DSA Instructor AI.

ONLY answer questions related to:
- Data Structures
- Algorithms
- Coding
- Competitive Programming
- Programming

Explain in very simple beginner friendly language.

Keep answers:
- short
- clean
- easy to understand

Whenever needed provide:
- intuition
- step-by-step explanation
- optimized approach
- dry run
- code

DO NOT use:
- markdown headings
- **
- ###
- ---
- long article style formatting

Reply like a normal chatbot conversation.

If user asks unrelated questions,
reply rudely and tell them to ask sensible DSA questions.

`
      }

    });

    res.json({
      reply: response.text
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong"
    });

  }

});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});