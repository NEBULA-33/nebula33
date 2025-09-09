"use client";

import React from 'react';

interface Tag {
  id: number;
  name: string;
}

interface TagSidebarProps {
  tags: Tag[];
  selectedTag: string | null;
  onTagSelect: (tagName: string | null) => void;
}

export default function TagSidebar({ tags, selectedTag, onTagSelect }: TagSidebarProps) {
  return (
    // Ana kapsayıcıyı dikey, esnek bir kutu yapıyoruz ve yüksekliğini tam ekran yapıyoruz.
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-full flex flex-col">

      {/* 1. SABİT ÜST BÖLÜM */}
      <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Etiketler</h2>
        <button 
          onClick={() => onTagSelect(null)}
          className={`w-full text-left px-2 py-1 rounded ${!selectedTag ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
        >
          Tüm Notlar
        </button>
      </div>

      {/* 2. KAYDIRILABİLİR ETİKET LİSTESİ BÖLÜMÜ */}
      <div className="overflow-y-auto p-4">
        <ul className="space-y-2">
          {tags.map(tag => (
            <li key={tag.id}>
              <button 
                onClick={() => onTagSelect(tag.name)}
                className={`w-full text-left px-2 py-1 rounded ${selectedTag === tag.name ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
              >
                # {tag.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}