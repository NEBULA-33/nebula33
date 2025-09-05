// Dosya Yolu: src/app/admin/page.tsx

"use client";

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Bu component'in tipi için React.FC kullanabiliriz
const AdminPage: React.FC = () => {
  // Supabase client'ını oluşturuyoruz
  const supabase = createClientComponentClient();

  // State'ler: Input alanlarındaki verileri ve mesajları tutmak için
  const [targetUserId, setTargetUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Fonksiyon 1: Backend API ile konuşan ana fonksiyon
  async function handlePasswordReset(userIdToReset: string, passwordToSet: string) {
    setMessage("İşlem yapılıyor...");

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setMessage("Hata: Lütfen önce giriş yapın.");
      return;
    }

    // ÖNEMLİ: Next.js API rotasının yolu '/api/admin/reset-password' olmalı
    const response = await fetch('/api/admin/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        userId: userIdToReset,
        newPassword: passwordToSet,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage("Başarılı: " + result.message);
    } else {
      setMessage("Hata: " + result.error);
    }
  }

  // Fonksiyon 2: Butona tıklandığında çalışan yardımcı fonksiyon
  const sifreyiDegistir = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!targetUserId || !newPassword) {
      setMessage("Lütfen tüm alanları doldurun.");
      return;
    }
    handlePasswordReset(targetUserId, newPassword);
  };

  // JSX: Ekranda görünecek olan HTML formu
  return (
    <div style={{ padding: '50px', color: 'white', backgroundColor: '#111827', minHeight: '100vh' }}>
      <h1>Admin Paneli - Şifre Değiştirme</h1>
      <p>Bu sayfadan kullanıcıların şifrelerini güncelleyebilirsiniz.</p>
      
      <form onSubmit={sifreyiDegistir} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="userIdInput" style={{ display: 'block', marginBottom: '5px' }}>Kullanıcı ID:</label>
          <input
            id="userIdInput"
            type="text"
            placeholder="Değiştirilecek kullanıcının ID'si"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            style={{ padding: '10px', width: '350px', backgroundColor: '#374151', border: '1px solid #4B5563', borderRadius: '5px', color: 'white' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="newPasswordInput" style={{ display: 'block', marginBottom: '5px' }}>Yeni Şifre:</label>
          <input
            id="newPasswordInput"
            type="password"
            placeholder="Yeni şifreyi girin"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ padding: '10px', width: '350px', backgroundColor: '#374151', border: '1px solid #4B5563', borderRadius: '5px', color: 'white' }}
          />
        </div>
        <button 
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#10B981', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}
        >
          ŞİFREYİ GÜNCELLE
        </button>
      </form>
      
      {message && <p style={{ marginTop: '20px', color: message.startsWith('Hata') ? '#EF4444' : '#10B981' }}>{message}</p>}
    </div>
  );
};

export default AdminPage;