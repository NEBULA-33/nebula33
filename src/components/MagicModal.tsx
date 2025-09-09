// src/components/MagicModal.tsx

import React, { useState } from 'react';

// İsim burada da değişti
interface MagicModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
}

// Fonksiyonun adı burada da değişti
export default function MagicModal({ open, onClose, onConfirm }: MagicModalProps) {
  const [value, setValue] = useState('');

  if (!open) {
    return null;
  }

  const handleConfirm = () => {
    onConfirm(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl text-white border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Yapay Zeka İçeriği İçe Aktar</h2>
        <p className="text-gray-400 mb-4">
          Metni yapıştırın ve onaylayın. Her bir eleman yeni bir not olarak oluşturulacaktır.
        </p>
        <textarea
          className="w-full h-48 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='[{"baslik": "...", "detaylar": "..."}]'
        />
        <div className="flex justify-end mt-6 space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors">
            İptal
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 font-semibold transition-colors">
            Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}