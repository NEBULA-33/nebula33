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

    const { title, content } = await req.json();
    if (!title && !content) throw new Error("Başlık veya içerik gerekli.");

    const prompt = `
      Bir öğrencinin kişisel notu için, aşağıdaki başlık ve içeriğe sahip olan metni zenginleştirecek 2-3 adet kısa ve öz konu önerisi yap. Öneriler, "Ayrıca şundan da bahsedebilirsin:" veya "Bu konuyla ilgili olarak..." gibi bir başlangıç yapmasın, doğrudan konunun kendisi olsun.
      Örnek: "Newton'un hareket yasaları." veya "Fotosentezin kimyasal denklemi."
      Cevabı SADECE aşağıdaki JSON formatında ver, başka hiçbir metin veya açıklama ekleme:
      {
        "suggestions": ["öneri 1", "öneri 2", "öneri 3"]
      }

      Başlık: "${title}"
      İçerik: "${content}"
    `;

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Google AI API hatası: ${errorBody}`);
    }

    const data = await response.json();
    const suggestionsText = data.candidates[0].content.parts[0].text;
    const suggestions = JSON.parse(suggestionsText);

    return new Response(JSON.stringify(suggestions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});