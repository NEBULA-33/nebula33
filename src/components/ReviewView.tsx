"use client";

import React, { useState } from 'react';
import { Note } from '../app/page';

interface ReviewViewProps {
  reviewNotes: Note[];
  onReview: (noteId: number, rating: number) => void;
}

export default function ReviewView({ reviewNotes, onReview }: ReviewViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (reviewNotes.length === 0) {
    return (
      <div className="mt-8 w-full max-w-2xl text-center p-8 bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Tekrar Zamanı</h2>
        <p className="text-green-400">Tebrikler! Tekrar edilecek not kalmadı.</p>
      </div>
    );
  }

  const currentNote = reviewNotes[currentIndex];

  const handleRating = (rating: number) => {
    onReview(currentNote.id, rating);
    setIsFlipped(false);
    // Eğer son kart değilse bir sonrakine geç
    if (currentIndex < reviewNotes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Son kart ise "bitti" mesajı için listeyi boşaltmış gibi davranabiliriz
      // (Bu, ana sayfadaki state tarafından yönetilecek)
    }
  };

  return (
    <div className="mt-8 w-full max-w-2xl flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Tekrar Zamanı ({reviewNotes.length} not)</h2>
      {/* Flashcard Alanı */}
      <div className="flashcard-container w-full h-80 perspective-1000">
        <div 
          className={`flashcard-inner w-full h-full relative transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Kartın Ön Yüzü (Başlık) */}
          <div className="flashcard-front absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer">
            <h2 className="text-3xl font-bold text-center">{currentNote.title}</h2>
          </div>
          {/* Kartın Arka Yüzü (İçerik) */}
          <div className="flashcard-back absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer rotate-y-180">
            <p className="text-center whitespace-pre-wrap">{currentNote.content}</p>
          </div>
        </div>
      </div>

      {/* Değerlendirme Butonları (Kart çevrildikten sonra gösterilir) */}
      {isFlipped && (
        <div className="mt-6 flex justify-around w-full">
          <button onClick={() => handleRating(1)} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 w-1/3">Zor</button>
          <button onClick={() => handleRating(3)} className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 w-1/3">Normal</button>
          <button onClick={() => handleRating(5)} className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 w-1/3">Kolay</button>
        </div>
      )}
    </div>
  );
}