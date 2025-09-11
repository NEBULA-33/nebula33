"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Note } from '../app/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// TypeScript hatasını gidermek için img props'larına temel tipleri ekleyelim
interface CustomImageProps {
    src?: string;
    alt?: string;
    images: { src: string }[];
    setImageIndex: (index: number) => void;
    setLightboxOpen: (open: boolean) => void;
}

const CustomImage = ({ src, alt, images, setImageIndex, setLightboxOpen }: CustomImageProps) => {
  if (!src) return null;
  const handleClick = () => {
    const index = images.findIndex((img: { src: string }) => img.src === src);
    if (index !== -1) {
      setImageIndex(index);
      setLightboxOpen(true);
    }
  };
  return <img src={src} alt={alt} onClick={handleClick} className="cursor-pointer max-w-full h-auto rounded-lg" />;
};

// TypeScript hatasını gidermek için link props'larına temel tipleri ekleyelim
interface CustomLinkProps {
    href?: string;
    children?: React.ReactNode;
    notes: Note[];
    onNoteLinkClick: (note: Note) => void;
}

const CustomLink = ({ href, children, notes, onNoteLinkClick }: CustomLinkProps) => {
    if (href && href.startsWith('/wikilink/')) {
        const noteTitle = href.substring('/wikilink/'.length);
        const decodedTitle = decodeURIComponent(noteTitle);
        
        // FİNAL ÇÖZÜM: Karşılaştırma yapmadan önce her iki metnin de başındaki/sonundaki boşlukları temizle (.trim())
        const linkedNote = notes.find((n: Note) => n.title.trim().toLowerCase() === decodedTitle.trim().toLowerCase());

        if (linkedNote) {
            return (
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNoteLinkClick(linkedNote); }}
                    // Stil Düzeltmesi: Kırmızı test stili kaldırıldı, istediğiniz mor stil geri getirildi.
                    className="inline-block text-purple-400 font-semibold hover:underline bg-purple-900 bg-opacity-30 p-1 rounded mx-1"
                >
                    {children}
                </a>
            );
        }
        return <span className="text-gray-500 italic p-1">{children}</span>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
};


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

export default function ReadingPane({ activeNote, notes, onEdit, onNoteLinkClick, onGoBack, onGoForward, canGoBack, canGoForward }: ReadingPaneProps) {
  const supabase = createClientComponentClient();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [backlinks, setBacklinks] = useState<{ id: number; title: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const allImagesInNote = useMemo(() => {
    if (!activeNote?.content) return [];
    const regex = /!\[.*?\]\((.*?)\)/g;
    const matches = [...activeNote.content.matchAll(regex)];
    return matches.map(match => ({ src: match[1] }));
  }, [activeNote]);
  
  const processedContent = useMemo(() => {
    if (!activeNote?.content) return "";
    return activeNote.content.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
        return `[${p1}](/wikilink/${encodeURIComponent(p1)})`;
    });
  }, [activeNote]);

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
        <div className="prose prose-invert prose-lg max-w-none whitespace-pre-wrap">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: (props) => (
                        <CustomImage {...props} images={allImagesInNote} setImageIndex={setImageIndex} setLightboxOpen={setLightboxOpen} />
                    ),
                    a: (props) => (
                        <CustomLink {...props} notes={notes} onNoteLinkClick={onNoteLinkClick} />
                    ),
                }}
            >
                {processedContent}
            </ReactMarkdown>
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

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={allImagesInNote}
        index={imageIndex}
      />
    </div>
  );
}