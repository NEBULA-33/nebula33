"use client";

import React, { useState } from 'react';
import { Note } from '../app/page';

interface FlashcardViewProps {
  notes: Note[];
}

export default function FlashcardView({ notes }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (notes.length === 0) {
    return (
      <div className="mt-8 w-full max-w-2xl text-center p-8 bg-gray-800 rounded-lg">
        <p className="text-gray-400">Flashcard oluşturmak için en az bir notunuz olmalı.</p>
      </div>
    );
  }

  const currentNote = notes[currentIndex];

  const goToNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % notes.length);
  };

  const goToPrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + notes.length) % notes.length);
  };

  return (
    <div className="mt-8 w-full max-w-2xl flex flex-col items-center">
      <div className="flashcard-container w-full h-80 perspective-1000">
        <div 
          className={`flashcard-inner w-full h-full relative transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-front absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer">
            <h2 className="text-3xl font-bold text-center">{currentNote.title}</h2>
          </div>
          <div className="flashcard-back absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer rotate-y-180">
            <p className="text-center whitespace-pre-wrap">{currentNote.content}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between w-full">
        <button onClick={goToPrev} className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700">Önceki</button>
        <p className="text-gray-400 self-center">{currentIndex + 1} / {notes.length}</p>
        <button onClick={goToNext} className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700">Sonraki</button>
      </div>
    </div>
  );
}