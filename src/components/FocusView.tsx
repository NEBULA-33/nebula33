"use client";

import React from 'react';
import { Note } from '../app/page';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FocusViewProps {
  note: Note;
  onClose: () => void;
}

export default function FocusView({ note, onClose }: FocusViewProps) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex justify-center p-8 overflow-y-auto">
      <div className="w-full max-w-4xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          &larr; Geri
        </button>
        <h1 className="text-5xl font-bold mb-8 mt-12 text-center">{note.title}</h1>
        <div className="prose prose-invert prose-xl max-w-none mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}