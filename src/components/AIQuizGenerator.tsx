"use client";

import React, { useState } from 'react';
import { Note } from '../app/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface AIQuizGeneratorProps {
  selectedNotes: Note[];
}

interface Question {
  soru: string;
  secenekler: { [key: string]: string };
  dogruCevap: string;
}

export default function AIQuizGenerator({ selectedNotes }: AIQuizGeneratorProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const handleGenerateQuiz = async () => {
    if (selectedNotes.length === 0) {
      alert("Lütfen en az bir not seçin.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setQuestions([]);

    const noteContents = selectedNotes.map(note => `Başlık: ${note.title}\nİçerik: ${note.content}`);

    try {
      const { data, error } = await supabase.functions.invoke('generate-questions', {
        body: { noteContents, difficulty: 'orta' }, // Zorluk seviyesini daha sonra dinamik hale getirebiliriz
      });

      if (error) throw error;
      
      setQuestions(data.questions);

    } catch (err: any) {
      setError(`Sorular üretilirken bir hata oluştu: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-4xl p-6 bg-gray-800 border border-gray-700 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Yapay Zeka Soru Üretici</h2>
      <p className="text-gray-400 mb-4">
        Sorular üretmek için listeden bir veya daha fazla not seçin. ({selectedNotes.length} not seçildi)
      </p>
      <button 
        onClick={handleGenerateQuiz}
        disabled={isLoading || selectedNotes.length === 0}
        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sorular Üretiliyor...' : 'Soruları Üret'}
      </button>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {questions.length > 0 && (
        <div className="mt-6 space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <p className="font-semibold mb-2">{index + 1}. {q.soru}</p>
              <ul className="space-y-1 list-inside">
                {Object.entries(q.secenekler).map(([key, value]) => (
                  <li key={key}>{key}) {value}</li>
                ))}
              </ul>
              <p className="mt-2 text-green-400 font-bold">Doğru Cevap: {q.dogruCevap}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}