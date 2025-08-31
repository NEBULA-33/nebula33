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

// GraphView'i sadece tarayıcıda çalışması için dinamik olarak yüklüyoruz
const DynamicGraphView = dynamic(() => import('@/components/GraphView'), {
  ssr: false,
});

// Projemizdeki bir notun tam yapısı
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
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'graph' | 'flashcard' | 'review'>('list');
  const [reviewNotes, setReviewNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Arama kutusunun içeriğini tutar
  const [searchResults, setSearchResults] = useState<Note[] | null>(null); // Arama sonuçlarını tutar
  const [tags, setTags] = useState<{id: number, name: string}[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [focusedNote, setFocusedNote] = useState<Note | null>(null);
  const noteCreatorRef = useRef<HTMLDivElement>(null);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isQuizGeneratorVisible, setIsQuizGeneratorVisible] = useState(false);
  // Aralıklı Tekrar (SRS) Algoritması
  const handleSelectNote = (note: Note) => {
    if (activeNote?.id === note.id) return;
    
    setViewMode('list'); // DÜZELTME: Herhangi bir moddayken nota tıklanınca liste moduna geç.
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
      const prevNote = notes.find(n => n.id === prevNoteId);
      if (prevNote) setActiveNote(prevNote);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextNoteId = history[historyIndex + 1];
      const nextNote = notes.find(n => n.id === nextNoteId);
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
    const note = notes.find(n => n.id === noteId);
    if (!user || !note) return;

    let { srs_interval: interval, srs_ease_factor: easeFactor } = note;
    
    if (rating >= 3) { // Doğru hatırlandı
      if (interval === 0) {
        interval = 1;
      } else if (interval === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
    } else { // Yanlış hatırlandı
      interval = 1; // Tekrar aralığını sıfırla
    }

    // Kolaylık faktörünü güncelle
    easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    // Bir sonraki tekrar tarihini hesapla (mevcut zamana gün ekleyerek)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + interval);

    // Veritabanını yeni değerlerle güncelle
    const { data, error } = await supabase
      .from('notes')
      .update({
        srs_interval: interval,
        srs_ease_factor: easeFactor,
        srs_due_date: dueDate.toISOString(),
      })
      .match({ id: noteId })
      .select()
      .single();

    if (error) {
      console.error("Error updating SRS data:", error);
    } else if (data) {
      // Local state'i de güncelle
      setNotes(notes.map(n => n.id === noteId ? data : n));
      // Tekrar edilen notu listeden çıkar
      setReviewNotes(reviewNotes.filter(n => n.id !== noteId));
    }
  };

  // Tekrar moduna geçerken, zamanı gelmiş notları filtrele
// --- GEÇİCİ HATA AYIKLAMA KODU ---
  const startReviewMode = () => {
    console.clear(); // Her butona basıldığında konsolu temizle
    console.log("--- 🕵️‍♂️ TEKRAR MODU HATA AYIKLAMA BAŞLADI 🕵️‍♂️ ---");

    // 1. Filtrelemeden ÖNCE state'teki tüm notları görelim
    console.log(`Toplam ${notes.length} adet not state içinde mevcut:`, JSON.parse(JSON.stringify(notes)));

    const now = new Date();
    // 2. Karşılaştırma için kullanılan "şimdi" zamanını görelim
    console.log(`Karşılaştırma zamanı (Now): ${now.toISOString()}`);
    console.log("--- Notlar tek tek kontrol ediliyor... ---");

    const dueNotes = notes.filter(note => {
      const dueDate = new Date(note.srs_due_date);
      const isDateValid = !isNaN(dueDate.getTime());
      const isDue = isDateValid && dueDate <= now;

      // 3. Her bir not için karar sürecini detaylıca yazdıralım
      console.log(
        `[KONTROL] Not ID: ${note.id}, Başlık: "${note.title}"\n` +
        `  • DB Tarihi (srs_due_date): ${note.srs_due_date}\n` +
        `  • Yorumlanan Tarih: ${isDateValid ? dueDate.toISOString() : 'GEÇERSİZ TARİH'}\n` +
        `  • Tekrar Zamanı Geldi mi? (dueDate <= now): ${isDue}\n` +
        `  • Tarih Geçerli mi?: ${isDateValid}\n` +
        `  ➡️ SONUÇ: Tekrar listesine EKLENECEK Mİ? 👉 ${isDue || !isDateValid}`
      );

      // Önceki mantığımız: Tarih geçmişse VEYA tarih geçersizse ekle.
      return isDue || !isDateValid;
    });

    // 4. Filtreleme sonrası sonuçları görelim
    console.log("--- ✅ HATA AYIKLAMA TAMAMLANDI ✅ ---");
    console.log(`Filtreleme sonucu ${dueNotes.length} adet tekrar edilecek not bulundu.`);
    console.log("Bulunan notlar:", dueNotes);
    console.log("-------------------------------------------------");


    setReviewNotes(dueNotes);
    setViewMode('review');
  };
  
  // --- INITIALIZATION ---
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

    // Etiketleri her zaman çekiyoruz
    const { data: tagsData, error: tagsError } = await supabase.from('tags').select('id, name').order('name');
    if (tagsError) {
      console.error('Error fetching tags:', tagsError);
    } else if (tagsData) {
      setTags(tagsData);
    }

    let notesData = null;
    let notesError = null;

    // Seçili bir etiket VARSA, yeni fonksiyonumuzu kullanarak notları çek
    if (selectedTag) {
      const { data, error } = await supabase.rpc('get_notes_by_tag', { tag_name: selectedTag });
      notesData = data;
      notesError = error;
    } else {
      // Seçili bir etiket YOKSA, tüm notları çek
      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
      notesData = data;
      notesError = error;
    }

    if (notesError) {
      console.error('Error fetching notes:', notesError);
    } else if (notesData) {
      setNotes(notesData);
    }
  };

  fetchData();
}, [supabase, router, selectedTag]); // <-- DİKKAT: selectedTag'i bağımlılıklara ekledik.

  // SİLDİĞİN YERE BUNU EKLE
// YENİ ARAMA MANTIĞI - SİLDİĞİN YERE BUNU EKLE
useEffect(() => {
  if (searchTerm.trim() === '') {
    setSearchResults(null);
  } else {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = notes.filter(note => 
      note.title.toLowerCase().includes(lowerCaseSearchTerm) || 
      note.content.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setSearchResults(results);
  }
}, [searchTerm, notes]);

  // --- CORE NOTE OPERATIONS ---
  const handleAddNote = async (title: string, content: string, file: File | null) => {
    if (!user) return;
    let finalContent = content;

    if (file) {
      const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.\-_]/g, '-');
      const filePath = `${user.id}/${Date.now()}-${cleanFileName}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from('note_images').upload(filePath, file);
      if (uploadData) {
        const { data: urlData } = supabase.storage.from('note_images').getPublicUrl(uploadData.path);
        if(urlData.publicUrl) {
          finalContent += `\n\n![${cleanFileName}](${urlData.publicUrl})`;
        }
      } else { console.error('Error uploading image:', uploadError); return; }
    }
    // DÜZELTME: Yeni not için başlangıç SRS değerlerini ekliyoruz.
    const { data, error } = await supabase.from('notes').insert([{ 
      title, 
      content: finalContent, 
      user_id: user.id,
      srs_due_date: new Date().toISOString(), // Tekrar tarihi "şimdi" olarak ayarlanır
      srs_interval: 0,                       // Aralık sıfırdan başlar
      srs_ease_factor: 2.5                     // Standart kolaylık faktörü
    }]).select().single();
    if (data) {
      await processTags(data.id, finalContent);
      setNotes([data, ...notes]);
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
        if(urlData.publicUrl) {
          finalContent += `\n\n![${cleanFileName}](${urlData.publicUrl})`;
        }
      } else { console.error('Error uploading image:', uploadError); return; }
    }
    const { data, error } = await supabase.from('notes').update({ title, content: finalContent }).match({ id: editingNote.id }).select().single();
    if (data) {
      await processTags(data.id, finalContent);
      setNotes(notes.map(note => (note.id === editingNote.id ? data : note)));
      setEditingNote(null);
    } else console.error('Error updating note:', error);
  };
  const processTags = async (noteId: number, content: string) => {
    if (!user) return;
    const { error: deleteError } = await supabase.from('note_tags').delete().eq('note_id', noteId);
    if (deleteError) console.error('Error deleting old note-tag links:', deleteError);
    const tagsInContent = content.match(/#\w+/g)?.map(tag => tag.substring(1).toLowerCase()) || [];
    if (tagsInContent.length === 0) {
      // Etiket kalmadıysa tag listesini yenileyelim
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
      if (noteTagsError) {
        console.error('Error inserting new note-tag links:', noteTagsError);
      } else {
        // Etiketler değiştiği için kenar çubuğunu güncelle
        const { data: updatedTags } = await supabase.from('tags').select('id, name').order('name');
        if (updatedTags) setTags(updatedTags);
      }
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    const { error } = await supabase.from('notes').delete().match({ id: noteId });
    if (!error) setNotes(notes.filter(note => note.id !== noteId));
    else console.error('Error deleting note:', error);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };


  // --- UI HANDLERS ---
  const handleNoteSelectionChange = (noteId: number) => {
    setSelectedNoteIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(noteId)) newSelected.delete(noteId);
      else newSelected.add(noteId);
      return newSelected;
    });
  };
  const selectedNotes = notes.filter(note => selectedNoteIds.has(note.id));

  // Arama sonucu varsa onu, yoksa mevcut (zaten etikete göre filtrelenmiş) notları kullan
  const notesToDisplay = searchResults !== null ? searchResults : notes;

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
                id: 0, // Geçici ID, yeni not olduğunu belirtir
                title: '', // Başlangıç değeri olarak boş metin
                content: '', // Başlangıç değeri olarak boş metin
                user_id: user!.id,
                srs_due_date: new Date().toISOString(),
                srs_ease_factor: 2.5,
                srs_interval: 0,
              });
              setTimeout(() => noteCreatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
            }}
            onStartReview={startReviewMode} 
            selectedNoteIds={selectedNoteIds}
            onNoteSelectionChange={handleNoteSelectionChange}
          isQuizGeneratorVisible={isQuizGeneratorVisible}
          onToggleQuizGenerator={() => setIsQuizGeneratorVisible(!isQuizGeneratorVisible)}
          />
          <div className="flex-1 flex flex-col border-l border-gray-700">
            {viewMode === 'list' && (
              editingNote ? (
                <div ref={noteCreatorRef} className="p-6 overflow-y-auto h-full">
                  <NoteCreator user={user} onNoteAdd={handleAddNote} onNoteUpdate={(title, content, file) => {
                    handleUpdateNote(title, content, file);
                    const updatedNote = notes.find(n => n.id === editingNote?.id);
                    setEditingNote(null);
                    if(updatedNote) setActiveNote(updatedNote);
                  }} editingNote={editingNote} setEditingNote={setEditingNote} />
                </div>
              ) : (
                <ReadingPane activeNote={activeNote} notes={notes} onEdit={handleEditClick} onNoteLinkClick={handleSelectNote} onGoBack={goBack} onGoForward={goForward} canGoBack={historyIndex > 0} canGoForward={historyIndex < history.length - 1} />
              )
            )}
            {viewMode === 'graph' && <DynamicGraphView notes={notesToDisplay} onNodeClick={handleEditClick} />}
            {viewMode === 'flashcard' && <FlashcardView notes={notes} />}
            {viewMode === 'review' && <ReviewView reviewNotes={reviewNotes} onReview={handleReview} />}
            {isQuizGeneratorVisible && <AIQuizGenerator selectedNotes={selectedNotes} />}
          </div>
        </div>
      )}
    </>
  );
}