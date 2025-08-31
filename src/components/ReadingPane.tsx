"use client";

import React, { useState, useEffect } from 'react';
import { Note } from '../app/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReadingPaneProps {
  activeNote: Note | null;
  notes: Note[];
  onEdit: (note: Note) => void;
  onNoteLinkClick: (note: Note) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

const WikiLinkRenderer = ({ content, notes, onNoteLinkClick }: { content: string, notes: Note[], onNoteLinkClick: (note: Note) => void }) => {
  if (!content) return null;

  const parts = content.split(/(\[\[.*?\]\])/g);

  return (
    <div className="whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          const noteTitle = part.substring(2, part.length - 2);
          const linkedNote = notes.find(n => n.title.toLowerCase() === noteTitle.toLowerCase());
          
          if (linkedNote) {
            return (
              <a 
                key={index} 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNoteLinkClick(linkedNote); }}
                className="inline-block text-purple-400 font-semibold hover:underline bg-purple-900 bg-opacity-30 p-1 rounded mx-1"
              >
                {noteTitle}
              </a>
            );
          }
          return <span key={index} className="text-gray-500 italic p-1">{noteTitle}</span>;
        }
        
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
};

export default function ReadingPane({ activeNote, notes, onEdit, onNoteLinkClick, onGoBack, onGoForward, canGoBack, canGoForward }: ReadingPaneProps) {
  const supabase = createClientComponentClient();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [backlinks, setBacklinks] = useState<{ id: number; title: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (activeNote) {
      setIsLoading(true);
      setSuggestions([]); setTags([]); setBacklinks([]);
      const timer = setTimeout(async () => {
        try {
          const [contentRes, tagsRes, backlinksRes] = await Promise.all([
            supabase.functions.invoke('suggest-content', { body: { title: activeNote.title, content: activeNote.content } }),
            supabase.functions.invoke('suggest-tags', { body: { title: activeNote.title, content: activeNote.content, userId: activeNote.user_id } }),
            supabase.rpc('get_backlinks_for_note', { note_title: activeNote.title })
          ]);
          if (contentRes.data) setSuggestions(contentRes.data.suggestions);
          if (tagsRes.data && Array.isArray(tagsRes.data.tags)) setTags(tagsRes.data.tags.filter((tag: string) => !activeNote.content.includes(`#${tag}`)));
          if (backlinksRes.data) setBacklinks(backlinksRes.data);
        } catch (error) {
          console.error("AI Assistant Error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeNote, supabase]);

  if (!activeNote) {
    return (
      <div className="p-6 flex-1 flex items-center justify-center text-gray-500">
        Okumak ve etkileşim kurmak için lütfen not listesinden bir not seçin.
      </div>
    );
  }

  return (
    <div className="p-6 flex-1 flex flex-col overflow-y-auto">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <button onClick={onGoBack} disabled={!canGoBack} className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </button>
            <button onClick={onGoForward} disabled={!canGoForward} className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </button>
            <h1 className="text-4xl font-bold">{activeNote.title}</h1>
          </div>
          <button onClick={() => onEdit(activeNote)} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">Düzenle</button>
        </div>
        <div className="prose prose-invert prose-lg max-w-none">
          <WikiLinkRenderer content={activeNote.content} notes={notes} onNoteLinkClick={onNoteLinkClick} />
        </div>
      </div>
      
      <div className="flex-shrink-0 mt-8 pt-6 border-t border-gray-700">
        <h2 className="text-xl font-bold mb-4">✨ AI Asistan</h2>
        {isLoading ? <p className="text-gray-400">Öneriler yükleniyor...</p> : 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-300 mb-2">İçerik Önerileri</h3>
              {suggestions && suggestions.length > 0 ? <ul className="list-disc list-inside space-y-1 text-sm">{suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul> : <p className="text-sm text-gray-500">Uygun öneri bulunamadı.</p>}
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-2">Etiket Önerileri</h3>
              {tags && tags.length > 0 ? <div className="flex flex-wrap gap-2">{tags.map(tag => <span key={tag} className="px-2 py-1 text-xs bg-gray-700 rounded-full">#{tag}</span>)}</div> : <p className="text-sm text-gray-500">Uygun öneri bulunamadı.</p>}
            </div>
            <div>
              <h3 className="font-semibold text-gray-300 mb-2">Geri Bağlantılar (Backlinks)</h3>
              {backlinks && backlinks.length > 0 ? <div className="flex flex-wrap gap-2">{backlinks.map(link => <button key={link.id} onClick={() => onNoteLinkClick(notes.find(n=>n.id===link.id)!)} className="px-2 py-1 text-xs bg-gray-700 rounded-full hover:bg-gray-600">[[{link.title}]]</button>)}</div> : <p className="text-sm text-gray-500">Bu nota link veren başka not bulunamadı.</p>}
            </div>
          </div>
        }
      </div>
    </div>
  );
}