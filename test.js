import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

async function run() {
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash", // fast & cheap
    temperature: 0.7,
    apiKey:"AIzaSyAmvE7zZcmxQSlpMfZTzNSHykdRDuFvFp4"
  });

  const response = await model.invoke("Say hello in a friendly way");

  console.log(response.content);
}

run();