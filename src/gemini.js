import {
  GoogleGenerativeAI
} from "@google/generative-ai";

const apiKey =
  import.meta.env
    .VITE_GEMINI_API_KEY;

const genAI =
  new GoogleGenerativeAI(
    apiKey
  );

const model =
  genAI.getGenerativeModel({

    
      model: "gemini-2.0-flash",
  });

export async function generateFashionAdvice(
  prompt
) {

  const result =
    await model.generateContent(
      prompt
    );

  const response =
    await result.response;

  return response.text();
}