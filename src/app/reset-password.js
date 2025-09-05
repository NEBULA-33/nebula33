// pages/api/admin/reset-password.js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Bu fonksiyonun sadece POST metoduyla çağrılmasını sağla
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 1. GÜVENLİK KONTROLÜ: İstek yapan kişi admin mi?
    // Normal bir Supabase istemcisi oluşturarak gelen isteğin yetkisini kontrol et
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: req.headers.authorization } },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Eğer istek yapan bir kullanıcı yoksa veya admin değilse, hata döndür
    // Kendi admin e-postanı buraya yazabilirsin veya daha gelişmiş bir rol kontrolü yapabilirsin
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Yetkiniz yok. Sadece adminler.' });
    }

    // --- Güvenlik kontrolü bitti, şimdi asıl işlem ---

    // 2. ADMİN İŞLEMİ: Güçlü anahtarı kullanarak şifreyi değiştir
    const { userId, newPassword } = req.body;
    if (!userId || !newPassword) {
      return res.status(400).json({ error: 'Kullanıcı ID ve yeni şifre gereklidir.' });
    }
    
    // Güçlü anahtarı SADECE sunucu tarafında kullan!
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL, 
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { password: newPassword }
    );
    
    if (updateError) throw updateError;

    // Her şey yolundaysa başarı mesajı gönder
    return res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}