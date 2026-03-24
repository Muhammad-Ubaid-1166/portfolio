import { NextRequest, NextResponse } from 'next/server';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const USER_INFO = `Muhammad Ubaid — AI Agent Developer, first-year CS student (Karachi).

Builds production-ready AI systems using FastAPI, LangChain, LangGraph, OpenAI Agents SDK, and n8n.

Skills: Python, JavaScript, ML, DL, NLP, PostgreSQL, Redis, Docker.

Focus: multi-agent systems, AI pipelines, backend + AI integration.

Goal: Full Stack AI Engineer.
`;

const SYSTEM_PROMPT = `
You are an AI assistant for Muhammad Ubaid.

Your job:
- Handle simple greetings in a friendly and natural way.
- Answer ONLY questions related to Muhammad Ubaid using the information below.
- Be professional, concise, and helpful.

STRICT RULES:
- If the message is a greeting → respond normally and warmly.
- If the question is related to Muhammad Ubaid → answer using the provided information.
- If the question is NOT related to Muhammad Ubaid → respond with:
  "Sorry, I am not designed to answer that."

Information:
${USER_INFO}
`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0.7,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // 🔥 Inject system prompt + user message
    const finalPrompt = `
${SYSTEM_PROMPT}

User Question:
${message}
`;

    const response = await model.invoke(finalPrompt);

    return NextResponse.json({
      response: response.content,
    });

  } catch (error: any) {
    console.error("Gemini Error:", error);

    return NextResponse.json({
      error: "Something went wrong with AI",
    }, { status: 500 });
  }
}