"use client";

import React from 'react';
import { Note } from '../app/page';

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  activeNoteId?: number | null;
  viewMode: 'list' | 'graph' | 'flashcard' | 'review';
  setViewMode: (mode: 'list' | 'graph' | 'flashcard' | 'review') => void;
  onNewNote: () => void;
  onStartReview: () => void;
  selectedNoteIds: Set<number>;
  onNoteSelectionChange: (noteId: number) => void;
  isQuizGeneratorVisible: boolean;
  onToggleQuizGenerator: () => void;
  searchTerm: string;
   onToggleAIImporter: () => void;
  onSearchChange: (term: string) => void;
}

export default function NoteList({ 
  notes, 
  onSelectNote, 
  activeNoteId, 
  viewMode, 
  setViewMode, 
  onNewNote, 
  onStartReview,
  selectedNoteIds,
  onNoteSelectionChange,
  isQuizGeneratorVisible,
  onToggleQuizGenerator,
  searchTerm,
  onSearchChange,
  onToggleAIImporter
}: NoteListProps) {

  return (
    <div className="w-80 border-r border-gray-700 overflow-y-auto flex-shrink-0 flex flex-col">
      {/* Üst Kısım */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <button 
          onClick={onNewNote} 
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold mb-4"
        >
          + Yeni Not Ekle
        </button>
        <div className="p-1 bg-gray-800 rounded-lg grid grid-cols-3 gap-1 text-center text-xs mb-4">
            <button onClick={() => setViewMode('list')} className={`px-2 py-1 rounded-md ${viewMode === 'list' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Liste</button>
            <button onClick={() => setViewMode('graph')} className={`px-2 py-1 rounded-md ${viewMode === 'graph' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Harita</button>
            <button onClick={() => setViewMode('flashcard')} className={`px-2 py-1 rounded-md ${viewMode === 'flashcard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>Kartlar</button>
            <button onClick={onStartReview} className={`px-2 py-1 rounded-md ${viewMode === 'review' ? 'bg-green-600' : 'hover:bg-gray-700'}`}>Tekrar</button>
            <button onClick={onToggleQuizGenerator} className={`px-2 py-1 rounded-md col-span-2 ${isQuizGeneratorVisible ? 'bg-purple-600' : 'hover:bg-gray-700'}`}>🤖 AI Quiz</button>
            <button onClick={onToggleAIImporter}>AI ile Aktar </button>
        </div>
        <input
          type="text"
          placeholder="Notlarda ara..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Alt Kısım: Notların Listesi */}
      <div className="p-4 flex-grow overflow-y-auto">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-sm">Görüntülenecek not yok.</p>
        ) : (
          <ul>
            {notes.map((note) => {
              const isSelected = selectedNoteIds.has(note.id);
              const isActive = activeNoteId === note.id;

              return (
                <li 
                  key={note.id}
                  className={`flex items-center p-3 rounded-lg mb-2 transition-colors cursor-pointer ${
                    isActive ? 'bg-gray-700' : // Aktif (okunan) not
                    isSelected ? 'bg-blue-900' : // Seçili not
                    'hover:bg-gray-800'      // Normal not
                  }`}
                  onClick={() => onSelectNote(note)} // Tıklayınca notu okuma modunda aç
                >
                  <input
                    type="checkbox"
                    className="mr-3 h-4 w-4 rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-600"
                    checked={isSelected}
                    onChange={() => onNoteSelectionChange(note.id)}
                    onClick={(e) => e.stopPropagation()} // Checkbox'a tıklayınca notun açılmasını engelle
                  />
                  <div className="flex-grow overflow-hidden">
                    <h3 className="font-semibold truncate text-white">{note.title || "Başlıksız Not"}</h3>
                    <p className="text-sm text-gray-400 truncate opacity-70 mt-1">
                      {note.content
                        .replace(/!\[.*?\]\(.*?\)/g, '[Resim]')
                        .replace(/#\w+/g, '')
                        
                        .replace(/\s+/g, ' ')
                        .trim() || 'İçerik yok'}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}