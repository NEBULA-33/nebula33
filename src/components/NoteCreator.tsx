"use client";

import React, { useState, useEffect, forwardRef } from 'react';
import { Note } from '../app/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
// DÜZELTME: Hatalı 'CommandState' ve 'ICommand' import'ları kaldırıldı.
import MDEditor, { commands } from '@uiw/react-md-editor';
import { 
  Bold, Italic, Strikethrough, Code, Heading2, 
  Link, Image as ImageIcon, List, ListOrdered, Quote, Table, 
  Eye, Minimize, Maximize2 
} from 'lucide-react'; 

// Veritabanından gelecek taslakların tip tanımı
interface NoteTemplate {
  id: number;
  name: string;
  content: string;
}

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
  
  const [userTemplates, setUserTemplates] = useState<NoteTemplate[]>([]);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setImageFile(null); setFileName(""); setSuggestedTags([]); setContentSuggestions([]);
    } else {
      setTitle(""); setContent("");
    }
  }, [editingNote]);

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!user) return;
      setIsLoadingTemplates(true);
      const { data, error } = await supabase
        .from('note_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) {
        console.error("Error fetching templates:", error);
      } else {
        setUserTemplates(data as NoteTemplate[]);
      }
      setIsLoadingTemplates(false);
    };
    fetchTemplates();
  }, [user, supabase]);

  const handleSaveTemplate = async () => {
    if (!user || !newTemplateName.trim() || !content.trim()) {
      alert("Lütfen taslak için bir isim ve içerik girin.");
      return;
    }
    const { data, error } = await supabase
      .from('note_templates')
      .insert({ name: newTemplateName, content: content, user_id: user.id })
      .select().single();

    if (error) {
      alert(`Taslak kaydedilirken hata oluştu: ${error.message}`);
    } else if (data) {
      setUserTemplates([...userTemplates, data]);
      setNewTemplateName("");
      alert(`"${data.name}" adıyla yeni taslak kaydedildi!`);
    }
  };

  const handleDeleteTemplate = async (templateId: number) => {
    if (!user || !confirm("Bu taslağı silmek istediğinizden emin misiniz?")) return;
    const { error } = await supabase.from('note_templates').delete().match({ id: templateId, user_id: user.id });
    if (error) {
      alert(`Taslak silinirken hata oluştu: ${error.message}`);
    } else {
      setUserTemplates(userTemplates.filter(t => t.id !== templateId));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files[0]) { const file = e.target.files[0]; setImageFile(file); setFileName(file.name); } };
  const handleSubmit = () => { if (title.trim()) { if (editingNote && editingNote.id !== 0) { onNoteUpdate(title, content, imageFile); } else { onNoteAdd(title, content, imageFile); } setTitle(""); setContent(""); setImageFile(null); setFileName(""); setSuggestedTags([]); setContentSuggestions([]); const fileInput = document.getElementById('file-upload') as HTMLInputElement; if (fileInput) fileInput.value = ""; } else { alert("Lütfen bir başlık girin."); } };
  const handleSuggestTags = async () => { if (!user) return; if (!content.trim() && !title.trim()) return; setIsSuggestingTags(true); try { const { data, error } = await supabase.functions.invoke('suggest-tags', { body: { title, content, userId: user.id } }); if (error) throw error; const existingTagsInContent = content.match(/#\w+/g)?.map(t => t.substring(1).toLowerCase()) || []; const newSuggestions = data.tags.filter((tag: string) => !existingTagsInContent.includes(tag.toLowerCase())); setSuggestedTags(newSuggestions); } catch (error: any) { alert(`Hata: ${error.message}`); } finally { setIsSuggestingTags(false); } };
  const handleSuggestContent = async () => { if (!user) return; if (!content.trim() && !title.trim()) return; setIsSuggestingContent(true); try { const { data, error } = await supabase.functions.invoke('suggest-content', { body: { title, content } }); if (error) throw error; setContentSuggestions(data.suggestions); } catch (error: any) { alert(`Hata: ${error.message}`); } finally { setIsSuggestingContent(false); } };
  const appendTag = (tag: string) => { setContent(prevContent => `${prevContent.trim()} #${tag} `); };

  return (
    <div ref={ref} className="mt-12 w-full max-w-3xl mx-auto">
      <div className="bg-[#2b3952] rounded-xl shadow-2xl p-6 border border-[#4A5568]">
  <input
    type="text"
    className="w-full bg-transparent text-2xl font-bold text-gray-200 placeholder-[#6F7A93] focus:outline-none mb-4 pb-2 border-b border-[#4A5568]"
    placeholder="Not Başlığı..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
        
       <div data-color-mode="dark">
    <MDEditor
        value={content}
        onChange={(val) => setContent(val || "")}
        height={350}
        preview="edit"
               commands={[
    { ...commands.bold, icon: <Bold size={16}/> },
    { ...commands.italic, icon: <Italic size={16}/> },
    { ...commands.strikethrough, icon: <Strikethrough size={16}/> },
    commands.divider,
    { ...commands.title2, icon: <Heading2 size={16}/> },
    { ...commands.code, icon: <Code size={16}/> },
    { ...commands.quote, icon: <Quote size={16}/> },
    commands.divider,
    { ...commands.link, icon: <Link size={16}/> },
    { ...commands.image, icon: <ImageIcon size={16}/> },
    { ...commands.table, icon: <Table size={16}/> },
    commands.divider,
    { ...commands.unorderedListCommand, icon: <List size={16}/> },
    { ...commands.orderedListCommand, icon: <ListOrdered size={16}/> },
    commands.divider,
    { ...commands.codeLive, icon: <Eye size={16} /> },
    commands.fullscreen, // <-- DÜZELTİLMİŞ HALİ
]}
                // DÜZELTME: Geçersiz 'toolbarBackground' prop'u kaldırıldı.
                className="!bg-[#0f1b2e] !border-gray-700" 
                style={{
        '--w-e-toolbar-background': '#09142bff', // Araç çubuğu arka planı
        '--w-e-toolbar-color': '#A6B0C3',       // Butonların normal rengi
        '--w-e-toolbar-hover-color': '#FFFFFF'    // Fare üzerine gelinceki rengi
    }}
            />
        </div>
        
        <div className="text-xs text-[#abbddb] mt-2 pl-2">
    💡 Kısayollar: <kbd className="px-1.5 py-0.5 bg-[#0f1b2e] border border-[#6F7A93] rounded-md">Ctrl+B</kbd> Kalın, <kbd className="px-1.5 py-0.5 bg-[#4A5568] border border-[#6F7A93] rounded-md">Ctrl+I</kbd> İtalik
</div>
      </div>
      
      {/* --- Diğer özellikler bu bölümden itibaren devam ediyor... --- */}
      <div className="mt-6 space-y-6">
        {/* Taslaklar Bölümü */}
        <div className="p-4 bg-[#081b3d] border border-[#4A5568] rounded-lg space-y-3">
            <div>
                <p className="text-sm text-gray-400 mb-2">Kayıtlı Taslaklar:</p>
                {isLoadingTemplates ? <p className="text-xs text-gray-500">Yükleniyor...</p> :
                <div className="flex flex-wrap gap-2">
                    {userTemplates.map(template => (
                        <div key={template.id} className="group relative flex items-center">
                            <button 
                                onClick={() => { if (content && !confirm('Mevcut içeriğin üzerine yazılacak. Emin misiniz?')) return; setContent(template.content); }}
                                className="px-3 py-1 text-xs bg-gray-600 rounded-md hover:bg-gray-500 transition-colors"
                            >
                                {template.name}
                            </button>
                            <button onClick={() => handleDeleteTemplate(template.id)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                                X
                            </button>
                        </div>
                    ))}
                    {userTemplates.length === 0 && <p className="text-xs text-gray-500">Henüz kayıtlı taslak yok.</p>}
                </div>
                }
            </div>
            <div className="pt-3 border-t border-gray-700">
               <p className="text-sm text-gray-400 mb-2">Mevcut İçeriği Taslak Olarak Kaydet:</p>
               <div className="flex items-center gap-2">
                  <input 
                      type="text"
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      placeholder="Yeni taslak adı..."
                      className="flex-grow px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button 
                      onClick={handleSaveTemplate}
                      disabled={!content.trim() || !newTemplateName.trim()}
                      className="px-3 py-1 text-xs bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                      Kaydet
                  </button>
               </div>
            </div>
        </div>
        
        {/* Resim Ekleme ve AI Önerileri */}
        <div className="p-4 bg-[#212121] border border-gray-800 rounded-lg">
          <div className="flex justify-between items-center">
            <label htmlFor="file-upload" className="cursor-pointer text-blue-400 hover:text-blue-500 p-2 rounded-md hover:bg-gray-700 text-sm">
              {fileName ? `✓ Seçilen: ${fileName}` : '🖼️ Bir Resim Ekle'}
            </label>
            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            <div className="flex space-x-2">
              <button onClick={handleSuggestContent} disabled={isSuggestingContent} className="px-4 py-2 text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed">{isSuggestingContent ? 'Öneriliyor...' : '🧠 İçerik Öner'}</button>
              <button onClick={handleSuggestTags} disabled={isSuggestingTags} className="px-4 py-2 text-sm bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed">{isSuggestingTags ? 'Öneriliyor...' : '✨ Etiket Öner'}</button>
            </div>
          </div>
          {suggestedTags.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Önerilen Etiketler (eklemek için tıkla):</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map(tag => (<button key={tag} onClick={() => appendTag(tag)} className="px-2 py-1 text-xs bg-gray-600 rounded-full hover:bg-gray-500">#{tag}</button>))}
              </div>
            </div>
          )}
          {contentSuggestions.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">İçerik Önerileri:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                {contentSuggestions.map((suggestion, index) => (<li key={index}>{suggestion}</li>))}
              </ul>
            </div>
          )}
        </div>

        {/* Kaydetme Butonları */}
        <div className="flex justify-end items-center">
          {editingNote && (<button onClick={() => setEditingNote(null)} className="px-6 py-2 text-gray-400 font-semibold rounded-lg hover:bg-gray-700">İptal</button>)}
          <button onClick={handleSubmit} className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">{editingNote ? 'Notu Güncelle' : 'Notu Kaydet'}</button>
        </div>
      </div>
    </div>
  );
});

NoteCreator.displayName = 'NoteCreator';
export default NoteCreator;