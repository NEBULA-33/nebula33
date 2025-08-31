import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) throw new Error("Sunucuda GEMINI_API_KEY bulunamadı.");
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const { noteContents, difficulty } = await req.json();

    const prompt = `Aşağıdaki metinlerden, zorluk seviyesi "${difficulty}" olan 3 adet çoktan seçmeli soru oluştur. Cevapları SADECE aşağıdaki JSON formatında ver, başka hiçbir metin veya açıklama ekleme: [{"soru": "...", "secenekler": { "A": "...", "B": "...", "C": "...", "D": "..." }, "dogruCevap": "..."}] Metinler: ${noteContents.join("\n---\n")}`;

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google AI API Hatası:", errorBody);
      throw new Error(`Google AI API hatası: ${response.statusText}`);
    }

    const data = await response.json();
    const questionsText = data.candidates[0].content.parts[0].text;
    const questions = JSON.parse(questionsText);

    return new Response(JSON.stringify({ questions }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("[FUNCTION_ERROR] generate-questions:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});