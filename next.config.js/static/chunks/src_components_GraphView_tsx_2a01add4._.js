(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/GraphView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>GraphView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$force$2d$graph$2d$2d$2f$dist$2f$react$2d$force$2d$graph$2d$2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-force-graph-2d/dist/react-force-graph-2d.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function GraphView(param) {
    let { notes, onNodeClick } = param;
    _s();
    // Fareyle üzerine gelinen notu hafızada tutmak için state
    const [hoveredNode, setHoveredNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Not listesi değiştiğinde, grafik verisini yeniden hesaplamak için useMemo kullanıyoruz.
    // Bu, gereksiz hesaplamaları önleyerek performansı artırır.
    const graphData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphView.useMemo[graphData]": ()=>{
            if (!notes) return {
                nodes: [],
                links: []
            };
            const nodes = notes.map({
                "GraphView.useMemo[graphData].nodes": (note)=>({
                        id: note.id,
                        name: note.title
                    })
            }["GraphView.useMemo[graphData].nodes"]);
            const links = [];
            const regex = /\[\[(.*?)\]\]/g;
            notes.forEach({
                "GraphView.useMemo[graphData]": (note)=>{
                    const matches = [
                        ...note.content.matchAll(regex)
                    ];
                    matches.forEach({
                        "GraphView.useMemo[graphData]": (match)=>{
                            const linkedTitle = match[1].toLowerCase();
                            const targetNode = nodes.find({
                                "GraphView.useMemo[graphData].targetNode": (n)=>n.name.toLowerCase() === linkedTitle
                            }["GraphView.useMemo[graphData].targetNode"]);
                            // Hedef not varsa ve hedef not kendisi değilse link oluştur
                            if (targetNode && targetNode.id !== note.id) {
                                links.push({
                                    source: note.id,
                                    target: targetNode.id
                                });
                            }
                        }
                    }["GraphView.useMemo[graphData]"]);
                }
            }["GraphView.useMemo[graphData]"]);
            return {
                nodes,
                links
            };
        }
    }["GraphView.useMemo[graphData]"], [
        notes
    ]);
    // Üzerine gelinen nota bağlı olan komşuları ve linkleri bulmak için useMemo kullanıyoruz.
    const { highlightedNodes, highlightedLinks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GraphView.useMemo": ()=>{
            if (hoveredNode) {
                const nodeSet = new Set([
                    hoveredNode.id
                ]);
                const linkSet = new Set();
                graphData.links.forEach({
                    "GraphView.useMemo": (link)=>{
                        // Kütüphane link.source/target'ı nesneye çevirebilir.
                        // Bu yüzden her ihtimale karşı ID'leri kontrol ediyoruz.
                        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                        if (sourceId === hoveredNode.id || targetId === hoveredNode.id) {
                            linkSet.add(link);
                            nodeSet.add(sourceId);
                            nodeSet.add(targetId);
                        }
                    }
                }["GraphView.useMemo"]);
                return {
                    highlightedNodes: nodeSet,
                    highlightedLinks: linkSet
                };
            }
            return {
                highlightedNodes: new Set(),
                highlightedLinks: new Set()
            };
        }
    }["GraphView.useMemo"], [
        hoveredNode,
        graphData
    ]);
    // Bu bileşen sadece tarayıcıda çalıştığı için, sunucu tarafında render edilmesini engelliyoruz.
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphView.useEffect": ()=>{
            setIsClient(true);
        }
    }["GraphView.useEffect"], []);
    // Tıklama fonksiyonunu useCallback ile optimize ediyoruz.
    const handleNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphView.useCallback[handleNodeClick]": (node)=>{
            const clickedNote = notes.find({
                "GraphView.useCallback[handleNodeClick].clickedNote": (n)=>n.id === node.id
            }["GraphView.useCallback[handleNodeClick].clickedNote"]);
            if (clickedNote) {
                onNodeClick(clickedNote);
            }
        }
    }["GraphView.useCallback[handleNodeClick]"], [
        notes,
        onNodeClick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 w-full max-w-7xl h-[600px] bg-gray-800 border border-gray-700 rounded-lg overflow-hidden",
        children: isClient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$force$2d$graph$2d$2d$2f$dist$2f$react$2d$force$2d$graph$2d$2d$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            graphData: graphData,
            nodeLabel: "name",
            onNodeClick: handleNodeClick,
            onNodeHover: (node)=>setHoveredNode(node),
            // Bağlantıların (çizgilerin) stilini belirliyoruz
            linkColor: (link)=>highlightedLinks.has(link) ? 'rgba(192, 132, 252, 1)' : 'rgba(255, 255, 255, 0.2)',
            linkWidth: (link)=>highlightedLinks.has(link) ? 2 : 1,
            linkDirectionalArrowLength: 3.5,
            linkDirectionalArrowRelPos: 1,
            // Notların (noktaların) nasıl çizileceğini belirliyoruz
            nodeCanvasObject: (node, ctx, globalScale)=>{
                const label = node.name;
                const fontSize = 12 / globalScale;
                ctx.font = "bold ".concat(fontSize, "px Sans-Serif");
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
            }
        }, void 0, false, {
            fileName: "[project]/src/components/GraphView.tsx",
            lineNumber: 101,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/GraphView.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
_s(GraphView, "FLXL6kMybnzHR/KRomx44fRk3Wk=");
_c = GraphView;
var _c;
__turbopack_context__.k.register(_c, "GraphView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/GraphView.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/GraphView.tsx [app-client] (ecmascript)"));
}),
}]);

//# sourceMappingURL=src_components_GraphView_tsx_2a01add4._.js.map