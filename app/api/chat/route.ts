import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, context, history } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Falta la API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const cleanHistory = history
      .filter((msg: any) => msg.id !== "welcome") 
      .map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `ESTÁS VIENDO ESTA NOTICIA AHORA:\n${context}\n\n(Usa este contexto para responder, pero recuerda que el usuario puede preguntarte cosas sobre la conversación anterior).` }]
        },
        {
          role: "model",
          parts: [{ text: "Entendido. Tengo el contexto de la noticia actual y recuerdo nuestra conversación previa." }]
        },
        ...cleanHistory
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error("Error en route.ts:", error);
    return NextResponse.json({ error: "Error procesando la solicitud." }, { status: 500 });
  }
}