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
    <div className="w-64 p-4 bg-gray-800 border-r border-gray-700 h-full">
      <h2 className="text-xl font-bold mb-4">Etiketler</h2>
      <ul className="space-y-2">
        <li>
          <button 
            onClick={() => onTagSelect(null)}
            className={`w-full text-left px-2 py-1 rounded ${!selectedTag ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            Tüm Notlar
          </button>
        </li>
        {tags.map(tag => (
          <li key={tag.id}>
            <button 
              onClick={() => onTagSelect(tag.name)}
              className={`w-full text-left px-2 py-1 rounded ${selectedTag === tag.name ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              # {tag.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}