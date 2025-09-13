"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Note } from '../app/page';
import ForceGraph2D, { NodeObject } from 'react-force-graph-2d';
import jLouvain from 'jlouvain';

// Tip tanımı doğru, 'x' ve 'y' özelliklerini içeriyor.
interface GraphNode extends NodeObject {
  id: number;
  name: string;
  community: number;
}
interface GraphLink {
  source: GraphNode | number;
  target: GraphNode | number;
}

// Farklı topluluklar için renk paleti
const FgPalette = ["#f285b2", "#66d9ef", "#a6e22e", "#fd971f", "#ae81ff", "#e6db74", "#f92672"];

export default function GraphView({ notes, onNodeClick }: { notes: Note[], onNodeClick: (note: Note) => void }) {
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  const graphData = useMemo(() => {
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
        const linkedTitle = match[1].trim().toLowerCase();
        const targetNode = nodes.find(n => n.name.trim().toLowerCase() === linkedTitle);
        if (targetNode && targetNode.id !== note.id) {
          links.push({ source: note.id, target: targetNode.id });
        }
      });
    });

    // DÜZELTME: jLouvain kütüphanesi ID'leri string olarak bekliyor.
    const node_ids_str = nodes.map(n => n.id.toString());
    const edge_data_str = links.map(l => ({ 
        source: (l.source as number).toString(), 
        target: (l.target as number).toString(), 
        weight: 1.0 
    }));
    
    let communities: { [nodeId: string]: number } = {};
    
    if (node_ids_str.length > 0 && edge_data_str.length > 0) {
        const communityGenerator = jLouvain.jLouvain();
        communityGenerator.nodes(node_ids_str).edges(edge_data_str);
        communities = communityGenerator();
    }

    const finalNodes: GraphNode[] = nodes.map(n => ({
        ...n,
        // DÜZELTME: Sonuçlar string ID'lerle geldiği için string ile arama yapıyoruz.
        community: communities[n.id.toString()] ?? -1 
    }));

    return { nodes: finalNodes, links };
  }, [notes]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const handleNodeClick = useCallback((node: NodeObject) => {
    const clickedNote = notes.find(n => n.id === node.id);
    if (clickedNote) {
      onNodeClick(clickedNote);
    }
  }, [notes, onNodeClick]);

  return (
    <div className="flex-1 bg-gray-900 overflow-hidden relative">
      {isClient && (
        <ForceGraph2D
          graphData={graphData}
          nodeLabel="name"
          onNodeClick={handleNodeClick}
          onNodeHover={node => setHoveredNode(node as GraphNode | null)}
          linkColor={() => 'rgba(255, 255, 255, 0.2)'}
          
          nodeCanvasObject={(node, ctx, globalScale) => {
            const graphNode = node as GraphNode;
            const label = graphNode.name;
            const fontSize = 12 / globalScale;
            ctx.font = `bold ${fontSize}px Sans-Serif`;

            const isSingleNode = graphNode.community === -1;
            const communityColor = isSingleNode ? 'rgba(255, 255, 255, 0.6)' : FgPalette[graphNode.community % FgPalette.length];

            let finalColor = communityColor;
            let finalTextColor = 'rgba(255, 255, 255, 0.8)';
            
            if (hoveredNode) {
              if (graphNode.community !== hoveredNode.community) {
                finalColor = 'rgba(128, 128, 128, 0.45)';
                finalTextColor = 'rgba(128, 128, 128, 0.5)';
              }
            }

            if (node.x === undefined || node.y === undefined) return;

            ctx.beginPath();
            ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = finalColor;
            ctx.fill();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = finalTextColor;
            ctx.fillText(label, node.x, node.y + 10);
          }}
        />
      )}
    </div>
  );
}