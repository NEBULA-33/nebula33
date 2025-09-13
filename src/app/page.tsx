"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import NoteCreator from '@/components/NoteCreator';
import NoteList from '@/components/NoteList';
import AIQuizGenerator from '@/components/AIQuizGenerator';
import FlashcardView from '@/components/FlashcardView';
import dynamic from 'next/dynamic';
import ReviewView from '@/components/ReviewView'; 
import TagSidebar from '@/components/TagSidebar';
import FocusView from '@/components/FocusView';
import ReadingPane from '@/components/ReadingPane';
import MagicModal from '@/components/MagicModal';

const DynamicGraphView = dynamic(() => import('@/components/GraphView'), {
  ssr: false,
});

export interface Note {
  id: number;
  title: string;
  content: string;
  user_id: string;
  srs_interval: number;
  srs_ease_factor: number;
  srs_due_date: string;
}

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [allNotes, setAllNotes] = useState<Note[]>([]); // Tüm notların ana kaynağı
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'graph' | 'flashcard' | 'review'>('list');
  const [reviewNotes, setReviewNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<{id: number, name: string}[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [focusedNote, setFocusedNote] = useState<Note | null>(null);
  const noteCreatorRef = useRef<HTMLDivElement>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isQuizGeneratorVisible, setIsQuizGeneratorVisible] = useState(false);
  const [isAIImporterVisible, setIsAIImporterVisible] = useState(false);

  // --- DERIVED STATE (Hesaplanan Durum) ---
  const notesToDisplay = useMemo(() => {
    let notes = allNotes;

    if (selectedTag) {
      const lowercasedSelectedTag = selectedTag.toLowerCase();
     notes = allNotes.filter(note => 
  note.content.toLowerCase().match(/#[\p{L}0-9_]+/gu)?.some(tag => tag === `#${lowercasedSelectedTag}`)
);
    }

    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      notes = notes.filter(note => 
        note.title.toLowerCase().includes(lowerCaseSearchTerm) || 
        note.content.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    return notes;
  }, [allNotes, selectedTag, searchTerm]);

  // --- FONKSİYONLAR ---
  const handleCreateNotesFromAI = async (notesToCreate: { title: string; content: string }[]) => {
    if (!user) return;
    for (const note of notesToCreate) {
      await handleAddNote(note.title, note.content, null);
    }
  };

  const handleSelectNote = (note: Note) => {
    if (activeNote?.id === note.id) return;
    setViewMode('list');
    setEditingNote(null);
    setActiveNote(note);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(note.id);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const goBack = () => {
    if (historyIndex > 0) {
      const prevNoteId = history[historyIndex - 1];
      const prevNote = allNotes.find(n => n.id === prevNoteId);
      if (prevNote) setActiveNote(prevNote);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextNoteId = history[historyIndex + 1];
      const nextNote = allNotes.find(n => n.id === nextNoteId);
      if (nextNote) setActiveNote(nextNote);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setActiveNote(null);
    setTimeout(() => noteCreatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
  };
  
  const handleReview = async (noteId: number, rating: number) => {
    const note = allNotes.find(n => n.id === noteId);
    if (!user || !note) return;
    let { srs_interval: interval, srs_ease_factor: easeFactor } = note;
    if (rating >= 3) {
      if (interval === 0) interval = 1;
      else if (interval === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
    } else {
      interval = 1;
    }
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);
    const { data, error } = await supabase.from('notes').update({
      srs_interval: interval, srs_ease_factor: easeFactor, srs_due_date: dueDate.toISOString(),
    }).match({ id: noteId }).select().single();
    if (error) console.error("Error updating SRS data:", error);
    else if (data) {
      setAllNotes(allNotes.map(n => n.id === noteId ? data : n));
      setReviewNotes(reviewNotes.filter(n => n.id !== noteId));
    }
  };

  const startReviewMode = () => {
    console.clear(); 
    console.log("--- 🕵️‍♂️ TEKRAR MODU HATA AYIKLAMA BAŞLADI 🕵️‍♂️ ---");
    console.log(`Toplam ${allNotes.length} adet not state içinde mevcut:`, JSON.parse(JSON.stringify(allNotes)));
    const now = new Date();
    console.log(`Karşılaştırma zamanı (Now): ${now.toISOString()}`);
    console.log("--- Notlar tek tek kontrol ediliyor... ---");
    const dueNotes = allNotes.filter(note => {
      const dueDate = new Date(note.srs_due_date);
      const isDateValid = !isNaN(dueDate.getTime());
      const isDue = isDateValid && dueDate <= now;
      console.log(
        `[KONTROL] Not ID: ${note.id}, Başlık: "${note.title}"\n` +
        `  • DB Tarihi (srs_due_date): ${note.srs_due_date}\n` +
        `  • Yorumlanan Tarih: ${isDateValid ? dueDate.toISOString() : 'GEÇERSİZ TARİH'}\n` +
        `  • Tekrar Zamanı Geldi mi? (dueDate <= now): ${isDue}\n` +
        `  • Tarih Geçerli mi?: ${isDateValid}\n` +
        `  ➡️ SONUÇ: Tekrar listesine EKLENECEK Mİ? 👉 ${isDue || !isDateValid}`
      );
      return isDue || !isDateValid;
    });
    console.log("--- ✅ HATA AYIKLAMA TAMAMLANDI ✅ ---");
    console.log(`Filtreleme sonucu ${dueNotes.length} adet tekrar edilecek not bulundu.`);
    console.log("Bulunan notlar:", dueNotes);
    console.log("-------------------------------------------------");
    setReviewNotes(dueNotes);
    setViewMode('review');
  };
  
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }
      setUser(session.user);
      
      const { data: tagsData, error: tagsError } = await supabase.from('tags').select('id, name').order('name');
      if (tagsError) console.error('Error fetching tags:', tagsError);
      else if (tagsData) setTags(tagsData);

      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
      if (error) console.error('Error fetching notes:', error);
      else if (data) setAllNotes(data);
    };
    fetchData();
  }, [supabase, router]);

  const handleAddNote = async (title: string, content: string, file: File | null) => {
    if (!user) return;
    let finalContent = content;
    if (file) {
      const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.\-_]/g, '-');
      const filePath = `${user.id}/${Date.now()}-${cleanFileName}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('note_images').upload(filePath, file);
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('note_images').getPublicUrl(uploadData.path);
        if(urlData.publicUrl) finalContent += `\n\n![${cleanFileName}](${urlData.publicUrl})`;
      } else { 
        console.error('Error uploading image:', uploadError); 
        return; 
      }
    }
    const { data, error } = await supabase.from('notes').insert([{ 
      title, 
      content: finalContent, 
      user_id: user.id,
      srs_due_date: new Date().toISOString(),
      srs_interval: 0,
      srs_ease_factor: 2.5
    }]).select().single();
    if (data) {
      await processTags(data.id, finalContent);
      setAllNotes([data, ...allNotes]);
    } else console.error('Error adding note:', error);
  };
  
  const handleUpdateNote = async (title: string, content: string, file: File | null) => {
    if (!user || !editingNote) return;
    let finalContent = content;
    if (file) {
      const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.\-_]/g, '-');
      const filePath = `${user.id}/${Date.now()}-${cleanFileName}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('note_images').upload(filePath, file);
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('note_images').getPublicUrl(uploadData.path);
        if(urlData.publicUrl) finalContent += `\n\n![${cleanFileName}](${urlData.publicUrl})`;
      } else { 
        console.error('Error uploading image:', uploadError); 
        return; 
      }
    }
    const { data, error } = await supabase.from('notes').update({ title, content: finalContent }).match({ id: editingNote.id }).select().single();
    if (data) {
      await processTags(data.id, finalContent);
      setAllNotes(allNotes.map(note => (note.id === editingNote.id ? data : note)));
      setEditingNote(null);
    } else console.error('Error updating note:', error);
  };
  
  const processTags = async (noteId: number, content: string) => {
    if (!user) return;
    await supabase.from('note_tags').delete().eq('note_id', noteId);
    // DOĞRU SATIR
    const tagsInContent = content.match(/#[\p{L}0-9_]+/gu)?.map(tag => tag.substring(1).toLowerCase()) || [];
    if (tagsInContent.length === 0) {
      await supabase.rpc('cleanup_orphan_tags');
      const { data: updatedTags } = await supabase.from('tags').select('id, name').order('name');
      if (updatedTags) setTags(updatedTags);
      return;
    }
    const uniqueTags = [...new Set(tagsInContent)];
    const { data: upsertedTags, error: tagsError } = await supabase.from('tags').upsert(uniqueTags.map(tag => ({ name: tag, user_id: user.id })), { onConflict: 'name, user_id' }).select('id, name');
    if (tagsError) { 
      console.error('Error upserting tags:', tagsError); 
      return; 
    }
    if (upsertedTags) {
      const noteTagLinks = upsertedTags.map(tag => ({ note_id: noteId, tag_id: tag.id, user_id: user.id }));
      const { error: noteTagsError } = await supabase.from('note_tags').insert(noteTagLinks);
      if (noteTagsError) console.error('Error inserting new note-tag links:', noteTagsError);
      else {
        await supabase.rpc('cleanup_orphan_tags');
        const { data: updatedTags } = await supabase.from('tags').select('id, name').order('name');
        if (updatedTags) setTags(updatedTags);
      }
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    const { error } = await supabase.from('notes').delete().match({ id: noteId });
    if (!error) setAllNotes(allNotes.filter(note => note.id !== noteId));
    else console.error('Error deleting note:', error);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  const handleNoteSelectionChange = (noteId: number) => {
    setSelectedNoteIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(noteId)) newSelected.delete(noteId);
      else newSelected.add(noteId);
      return newSelected;
    });
  };
  
  const selectedNotes = allNotes.filter(note => selectedNoteIds.has(note.id));

  // --- RENDER ---
  return (
    <>
      {focusedNote ? (
        <FocusView note={focusedNote} onClose={() => setFocusedNote(null)} />
      ) : (
        <div className="flex h-screen bg-gray-900 text-white">
          <TagSidebar tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
          <NoteList 
            notes={notesToDisplay}
            onSelectNote={handleSelectNote} 
            activeNoteId={activeNote?.id}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNewNote={() => {
              setActiveNote(null);
              setViewMode('list');
              setEditingNote({
                id: 0, title: '', content: '', user_id: user!.id,
                srs_due_date: new Date().toISOString(), srs_ease_factor: 2.5, srs_interval: 0,
              });
              setTimeout(() => noteCreatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
            }}
            onStartReview={startReviewMode} 
            selectedNoteIds={selectedNoteIds}
            onNoteSelectionChange={handleNoteSelectionChange}
            isQuizGeneratorVisible={isQuizGeneratorVisible}
            onToggleQuizGenerator={() => setIsQuizGeneratorVisible(!isQuizGeneratorVisible)}
            onToggleAIImporter={() => setIsAIImporterVisible(true)} 
          />
          <div className="flex-1 flex flex-col border-l border-gray-700">
            {viewMode === 'list' && (
              editingNote ? (
                <div ref={noteCreatorRef} className="p-6 overflow-y-auto h-full">
                  <NoteCreator user={user} onNoteAdd={handleAddNote} onNoteUpdate={(title, content, file) => {
                    handleUpdateNote(title, content, file);
                    const updatedNote = allNotes.find(n => n.id === editingNote?.id);
                    setEditingNote(null);
                    if(updatedNote) setActiveNote(updatedNote);
                  }} editingNote={editingNote} setEditingNote={setEditingNote} />
                </div>
              ) : (
                <ReadingPane activeNote={activeNote} notes={allNotes} onEdit={handleEditClick} onNoteLinkClick={handleSelectNote} onGoBack={goBack} onGoForward={goForward} canGoBack={historyIndex > 0} canGoForward={historyIndex < history.length - 1} />
              )
            )}
             {viewMode === 'graph' && <DynamicGraphView notes={notesToDisplay} onNodeClick={handleSelectNote} />}
            {viewMode === 'flashcard' && <FlashcardView notes={allNotes} />}
            {viewMode === 'review' && <ReviewView reviewNotes={reviewNotes} onReview={handleReview} />}
            {isQuizGeneratorVisible && <AIQuizGenerator selectedNotes={selectedNotes} />}
          </div>
        </div>
      )}
      <MagicModal
        open={isAIImporterVisible}
        onClose={() => setIsAIImporterVisible(false)}
        onConfirm={(gelenMetin: string) => {
          try {
            const parsedData = JSON.parse(gelenMetin);
            const notesToCreate = parsedData.map((item: any) => ({
              title: item.baslik,
              content: item.detaylar,
            }));
            handleCreateNotesFromAI(notesToCreate);
          } catch (e) {
            console.error("Hatalı JSON formatı:", e);
          }
        }}
      />
    </>
  );
}