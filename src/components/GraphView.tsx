"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Note } from '../app/page';
import ForceGraph2D from 'react-force-graph-2d';

// Bileşen tarafından kullanılan veri yapıları (arayüzler)
interface GraphViewProps {
  notes: Note[];
  onNodeClick: (note: Note) => void;
}
interface GraphNode {
  id: number;
  name: string;
}
interface GraphLink {
  source: GraphNode | number;
  target: GraphNode | number;
}
interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export default function GraphView({ notes, onNodeClick }: GraphViewProps) {
  // Fareyle üzerine gelinen notu hafızada tutmak için state
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  // Not listesi değiştiğinde, grafik verisini yeniden hesaplamak için useMemo kullanıyoruz.
  // Bu, gereksiz hesaplamaları önleyerek performansı artırır.
  const graphData: GraphData = useMemo(() => {
    if (!notes) return { nodes: [], links: [] };

    const nodes = notes.map(note => ({
      id: note.id,
      name: note.title,
    }));

    const links: GraphLink[] = [];
    const regex = /\[\[(.*?)\]\]/g;

    notes.forEach(note => {
      const matches = [...note.content.matchAll(regex)];
      matches.forEach(match => {
        const linkedTitle = match[1].toLowerCase();
        const targetNode = nodes.find(n => n.name.toLowerCase() === linkedTitle);
        // Hedef not varsa ve hedef not kendisi değilse link oluştur
        if (targetNode && targetNode.id !== note.id) {
          links.push({
            source: note.id,
            target: targetNode.id,
          });
        }
      });
    });

    return { nodes, links };
  }, [notes]);

  // Üzerine gelinen nota bağlı olan komşuları ve linkleri bulmak için useMemo kullanıyoruz.
  const { highlightedNodes, highlightedLinks } = useMemo(() => {
    if (hoveredNode) {
      const nodeSet = new Set<number>([hoveredNode.id]);
      const linkSet = new Set<GraphLink>();

      graphData.links.forEach(link => {
        // Kütüphane link.source/target'ı nesneye çevirebilir.
        // Bu yüzden her ihtimale karşı ID'leri kontrol ediyoruz.
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        if (sourceId === hoveredNode.id || targetId === hoveredNode.id) {
          linkSet.add(link);
          nodeSet.add(sourceId);
          nodeSet.add(targetId);
        }
      });

      return { highlightedNodes: nodeSet, highlightedLinks: linkSet };
    }
    return { highlightedNodes: new Set(), highlightedLinks: new Set() };
  }, [hoveredNode, graphData]);

  // Bu bileşen sadece tarayıcıda çalıştığı için, sunucu tarafında render edilmesini engelliyoruz.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Tıklama fonksiyonunu useCallback ile optimize ediyoruz.
  const handleNodeClick = useCallback((node: any) => {
    const clickedNote = notes.find(n => n.id === node.id);
    if (clickedNote) {
      onNodeClick(clickedNote);
    }
  }, [notes, onNodeClick]);

  return (
    <div className="mt-8 w-full max-w-7xl h-[600px] bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      {isClient && (
        <ForceGraph2D
          graphData={graphData}
          nodeLabel="name"
          onNodeClick={handleNodeClick}
          onNodeHover={node => setHoveredNode(node as GraphNode | null)}
          
          // Bağlantıların (çizgilerin) stilini belirliyoruz
          linkColor={(link: any) => highlightedLinks.has(link) ? 'rgba(192, 132, 252, 1)' : 'rgba(255, 255, 255, 0.2)'}
          linkWidth={(link: any) => highlightedLinks.has(link) ? 2 : 1}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}

          // Notların (noktaların) nasıl çizileceğini belirliyoruz
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `bold ${fontSize}px Sans-Serif`;
            const isHighlighted = highlightedNodes.has(node.id);

            // Yazının stilini belirliyoruz
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isHighlighted ? 'rgba(233, 213, 255, 1)' : 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(label, node.x, node.y + 10);

            // Noktanın kendisini çiziyoruz
            ctx.beginPath();
            ctx.arc(node.x, node.y, isHighlighted ? 6 : 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = isHighlighted ? 'rgba(192, 132, 252, 1)' : 'rgba(255, 255, 255, 0.6)';
            ctx.fill();
          }}
        />
      )}
    </div>
  );
}