import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req: Request) => {
  // Gelen isteğin tarayıcıdan gelen bir "preflight" isteği olup olmadığını kontrol et
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // İstek gövdesinden gerekli verileri al
    const { title, content, userId } = await req.json();

    // Gerekli verilerin eksik olup olmadığını kontrol et
    if (!content || !userId) {
      throw new Error("İçerik (content) ve kullanıcı kimliği (userId) gereklidir.");
    }

    // Fonksiyon içinden veritabanına erişmek için bir "admin" istemcisi oluştur.
    // Bu, RLS politikalarını bypass ederek tüm etiketleri okumamızı sağlar.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')! // SERVICE_ROLE_KEY'i kullanıyoruz!
    );
    
    // Kullanıcının veritabanındaki mevcut etiketlerini çek
    const { data: existingTagsData, error: tagsError } = await supabaseAdmin
      .from('tags')
      .select('name')
      .eq('user_id', userId);

    if (tagsError) {
      console.error("Mevcut etiketler çekilirken hata:", tagsError);
      // Bu kritik bir hata değil, en kötü ihtimalle mevcut etiketleri tekrar öneririz.
    }

    const existingTagNames = existingTagsData ? existingTagsData.map(t => t.name) : [];
    
    // Google AI (Gemini) API anahtarını güvenli bir şekilde al
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error("Sunucuda GEMINI_API_KEY bulunamadı.");
    }
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    // Yapay zekaya gönderilecek komut istemini (prompt) oluştur
    const prompt = `
      Bir kişisel bilgi yönetimi sistemi için, aşağıdaki başlık ve içeriğe sahip olan nota en uygun, tek kelimelik ve küçük harflerle 3 ila 5 adet etiket öner.
      ÖNEMLİ KURAL: Aşağıdaki listede bulunan etiketleri KESİNLİKLE ÖNERME.
      Mevcut Etiketler Listesi: [${existingTagNames.join(', ')}]

      Cevabı SADECE ve SADECE aşağıdaki JSON formatında ver. Başka hiçbir açıklama, metin veya kod bloğu (\`\`\`) ekleme:
      { "tags": ["yeni_etiket1", "yeni_etiket2", "yeni_etiket3"] }

      Analiz edilecek metin:
      Başlık: "${title}"
      İçerik: "${content}"
    `;

    // Gemini API'sine isteği gönder
    const geminiResponse = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      }),
    });
    
    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Google AI API Hatası:", errorBody);
      throw new Error(`Google AI API hatası: ${geminiResponse.statusText}`);
    }
    
    const geminiData = await geminiResponse.json();
    
    const suggestionsText = geminiData.candidates[0].content.parts[0].text;
    const suggestions = JSON.parse(suggestionsText);

    // Başarılı sonucu JSON olarak döndür
    return new Response(JSON.stringify(suggestions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    console.error("[FUNCTION_ERROR] suggest-tags:", error.message);
    // Hata durumunda, hatayı JSON olarak döndür
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});