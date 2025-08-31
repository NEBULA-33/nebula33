"use client";

import React, { useState, useEffect, forwardRef } from 'react';
import { Note } from '../app/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

interface NoteCreatorProps {
  user: User | null;
  onNoteAdd: (title: string, content: string, file: File | null) => void;
  onNoteUpdate: (title: string, content: string, file: File | null) => void;
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
}

const NoteCreator = forwardRef<HTMLDivElement, NoteCreatorProps>(({ user, onNoteAdd, onNoteUpdate, editingNote, setEditingNote }, ref) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isSuggestingTags, setIsSuggestingTags] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggestingContent, setIsSuggestingContent] = useState(false);
  const [contentSuggestions, setContentSuggestions] = useState<string[]>([]);
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setImageFile(null);
      setFileName("");
      setSuggestedTags([]);
      setContentSuggestions([]);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFileName(file.name);
    }
  };

const handleSubmit = () => {
    if (title.trim()) {
      // DÜZELTME: Sadece editingNote'un varlığına değil, ID'sinin 0'dan farklı
      // olduğuna da bakarak bunun mevcut bir not olduğunu anlıyoruz.
      if (editingNote && editingNote.id !== 0) { 
        onNoteUpdate(title, content, imageFile);
      } else { 
        onNoteAdd(title, content, imageFile);
      }

      setTitle("");
      setContent("");
      setImageFile(null);
      setFileName("");
      setSuggestedTags([]);
      setContentSuggestions([]);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } else {
      alert("Lütfen bir başlık girin.");
    }
  };
  
  const handleSuggestTags = async () => {
    if (!user) {
      alert("Kullanıcı bilgisi bulunamadı.");
      return;
    }
    if (!content.trim() && !title.trim()) {
      alert("Etiket önermesi için lütfen önce bir başlık veya içerik yazın.");
      return;
    }
    setIsSuggestingTags(true);
    setSuggestedTags([]);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-tags', {
        body: { title, content, userId: user.id },
      });
      if (error) throw error;
      const existingTagsInContent = content.match(/#\w+/g)?.map(t => t.substring(1).toLowerCase()) || [];
      const newSuggestions = data.tags.filter((tag: string) => !existingTagsInContent.includes(tag.toLowerCase()));
      setSuggestedTags(newSuggestions);
    } catch (error: any) {
      alert(`Etiket önerisi alınırken hata: ${error.message}`);
    } finally {
      setIsSuggestingTags(false);
    }
  };

  const handleSuggestContent = async () => {
    if (!user) {
      alert("Kullanıcı bilgisi bulunamadı.");
      return;
    }
    if (!content.trim() && !title.trim()) {
      alert("İçerik önermesi için lütfen önce bir başlık veya içerik yazın.");
      return;
    }
    setIsSuggestingContent(true);
    setContentSuggestions([]);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-content', {
        body: { title, content },
      });
      if (error) throw error;
      setContentSuggestions(data.suggestions);
    } catch (error: any) {
      alert(`İçerik önerisi alınırken hata: ${error.message}`);
    } finally {
      setIsSuggestingContent(false);
    }
  };

  const appendTag = (tag: string) => {
    setContent(prevContent => `${prevContent.trim()} #${tag} `);
  };

  return (
    <div ref={ref} className="mt-12 w-full max-w-2xl">
      <input
        type="text"
        className="w-full p-4 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Not Başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full h-40 p-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Aklınızdan ne geçiyor? [[Bağlantı]] veya #etiket kullanabilirsiniz."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      <div className="mt-4 flex justify-between items-center">
        <label htmlFor="file-upload" className="cursor-pointer text-blue-400 hover:text-blue-500 p-2 rounded-md hover:bg-gray-700">
          {fileName ? `Seçilen: ${fileName}` : '🖼️ Bir Resim Ekle'}
        </label>
        <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        
        <div className="flex space-x-2">
          <button
            onClick={handleSuggestContent}
            disabled={isSuggestingContent}
            className="px-4 py-2 text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed"
          >
            {isSuggestingContent ? 'Öneriliyor...' : '🧠 İçerik Öner'}
          </button>
          <button
            onClick={handleSuggestTags}
            disabled={isSuggestingTags}
            className="px-4 py-2 text-sm bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed"
          >
            {isSuggestingTags ? 'Öneriliyor...' : '✨ Etiket Öner'}
          </button>
        </div>
      </div>
      
      {suggestedTags.length > 0 && (
        <div className="mt-4 p-2 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Önerilen Etiketler (eklemek için tıkla):</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map(tag => (
              <button key={tag} onClick={() => appendTag(tag)} className="px-2 py-1 text-xs bg-gray-600 rounded-full hover:bg-gray-500">
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {contentSuggestions.length > 0 && (
        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">İçerik Önerileri:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {contentSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end items-center mt-4">
        {editingNote && (
          <button onClick={() => setEditingNote(null)} className="px-6 py-2 text-gray-400 font-semibold rounded-lg hover:bg-gray-700">
            İptal
          </button>
        )}
        <button onClick={handleSubmit} className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {editingNote ? 'Notu Güncelle' : 'Notu Kaydet'}
        </button>
      </div>
    </div>
  );
});

NoteCreator.displayName = 'NoteCreator';
export default NoteCreator;