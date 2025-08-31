(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/NoteCreator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-helpers-nextjs/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const NoteCreator = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s((param, ref)=>{
    let { user, onNoteAdd, onNoteUpdate, editingNote, setEditingNote } = param;
    _s();
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSuggestingTags, setIsSuggestingTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestedTags, setSuggestedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSuggestingContent, setIsSuggestingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contentSuggestions, setContentSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClientComponentClient"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NoteCreator.useEffect": ()=>{
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
        }
    }["NoteCreator.useEffect"], [
        editingNote
    ]);
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setFileName(file.name);
        }
    };
    const handleSubmit = ()=>{
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
            const fileInput = document.getElementById('file-upload');
            if (fileInput) fileInput.value = "";
        } else {
            alert("Lütfen bir başlık girin.");
        }
    };
    const handleSuggestTags = async ()=>{
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
            var _content_match;
            const { data, error } = await supabase.functions.invoke('suggest-tags', {
                body: {
                    title,
                    content,
                    userId: user.id
                }
            });
            if (error) throw error;
            const existingTagsInContent = ((_content_match = content.match(/#\w+/g)) === null || _content_match === void 0 ? void 0 : _content_match.map((t)=>t.substring(1).toLowerCase())) || [];
            const newSuggestions = data.tags.filter((tag)=>!existingTagsInContent.includes(tag.toLowerCase()));
            setSuggestedTags(newSuggestions);
        } catch (error) {
            alert("Etiket önerisi alınırken hata: ".concat(error.message));
        } finally{
            setIsSuggestingTags(false);
        }
    };
    const handleSuggestContent = async ()=>{
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
                body: {
                    title,
                    content
                }
            });
            if (error) throw error;
            setContentSuggestions(data.suggestions);
        } catch (error) {
            alert("İçerik önerisi alınırken hata: ".concat(error.message));
        } finally{
            setIsSuggestingContent(false);
        }
    };
    const appendTag = (tag)=>{
        setContent((prevContent)=>"".concat(prevContent.trim(), " #").concat(tag, " "));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "mt-12 w-full max-w-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                className: "w-full p-4 mb-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Not Başlığı",
                value: title,
                onChange: (e)=>setTitle(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/components/NoteCreator.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                className: "w-full h-40 p-4 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Aklınızdan ne geçiyor? [[Bağlantı]] veya #etiket kullanabilirsiniz.",
                value: content,
                onChange: (e)=>setContent(e.target.value)
            }, void 0, false, {
                fileName: "[project]/src/components/NoteCreator.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "file-upload",
                        className: "cursor-pointer text-blue-400 hover:text-blue-500 p-2 rounded-md hover:bg-gray-700",
                        children: fileName ? "Seçilen: ".concat(fileName) : '🖼️ Bir Resim Ekle'
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "file-upload",
                        type: "file",
                        className: "hidden",
                        accept: "image/*",
                        onChange: handleFileChange
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSuggestContent,
                                disabled: isSuggestingContent,
                                className: "px-4 py-2 text-sm bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed",
                                children: isSuggestingContent ? 'Öneriliyor...' : '🧠 İçerik Öner'
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteCreator.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSuggestTags,
                                disabled: isSuggestingTags,
                                className: "px-4 py-2 text-sm bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed",
                                children: isSuggestingTags ? 'Öneriliyor...' : '✨ Etiket Öner'
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteCreator.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NoteCreator.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            suggestedTags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-2 bg-gray-800 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mb-2",
                        children: "Önerilen Etiketler (eklemek için tıkla):"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: suggestedTags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>appendTag(tag),
                                className: "px-2 py-1 text-xs bg-gray-600 rounded-full hover:bg-gray-500",
                                children: [
                                    "#",
                                    tag
                                ]
                            }, tag, true, {
                                fileName: "[project]/src/components/NoteCreator.tsx",
                                lineNumber: 172,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NoteCreator.tsx",
                lineNumber: 168,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            contentSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 p-3 bg-gray-800 rounded-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-400 mb-2",
                        children: "İçerik Önerileri:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc list-inside space-y-1 text-gray-300",
                        children: contentSuggestions.map((suggestion, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: suggestion
                            }, index, false, {
                                fileName: "[project]/src/components/NoteCreator.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NoteCreator.tsx",
                lineNumber: 181,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end items-center mt-4",
                children: [
                    editingNote && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEditingNote(null),
                        className: "px-6 py-2 text-gray-400 font-semibold rounded-lg hover:bg-gray-700",
                        children: "İptal"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: "ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        children: editingNote ? 'Notu Güncelle' : 'Notu Kaydet'
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteCreator.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NoteCreator.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NoteCreator.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
}, "hbnH540DYpojdKPKRIoX5lOoskE=")), "hbnH540DYpojdKPKRIoX5lOoskE=");
_c1 = NoteCreator;
NoteCreator.displayName = 'NoteCreator';
const __TURBOPACK__default__export__ = NoteCreator;
var _c, _c1;
__turbopack_context__.k.register(_c, "NoteCreator$forwardRef");
__turbopack_context__.k.register(_c1, "NoteCreator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/NoteList.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>NoteList
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function NoteList(param) {
    let { notes, onSelectNote, activeNoteId, viewMode, setViewMode, onNewNote, onStartReview, selectedNoteIds, onNoteSelectionChange, isQuizGeneratorVisible, onToggleQuizGenerator, searchTerm, onSearchChange } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-80 border-r border-gray-700 overflow-y-auto flex-shrink-0 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-gray-700 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNewNote,
                        className: "w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold mb-4",
                        children: "+ Yeni Not Ekle"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteList.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-1 bg-gray-800 rounded-lg grid grid-cols-3 gap-1 text-center text-xs mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode('list'),
                                className: "px-2 py-1 rounded-md ".concat(viewMode === 'list' ? 'bg-blue-600' : 'hover:bg-gray-700'),
                                children: "Liste"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteList.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode('graph'),
                                className: "px-2 py-1 rounded-md ".concat(viewMode === 'graph' ? 'bg-blue-600' : 'hover:bg-gray-700'),
                                children: "Harita"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteList.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode('flashcard'),
                                className: "px-2 py-1 rounded-md ".concat(viewMode === 'flashcard' ? 'bg-blue-600' : 'hover:bg-gray-700'),
                                children: "Kartlar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteList.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onStartReview,
                                className: "px-2 py-1 rounded-md ".concat(viewMode === 'review' ? 'bg-green-600' : 'hover:bg-gray-700'),
                                children: "Tekrar"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteList.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onToggleQuizGenerator,
                                className: "px-2 py-1 rounded-md col-span-2 ".concat(isQuizGeneratorVisible ? 'bg-purple-600' : 'hover:bg-gray-700'),
                                children: "🤖 AI Quiz"
                            }, void 0, false, {
                                fileName: "[project]/src/components/NoteList.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/NoteList.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Notlarda ara...",
                        value: searchTerm,
                        onChange: (e)=>onSearchChange(e.target.value),
                        className: "w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/NoteList.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/NoteList.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex-grow overflow-y-auto",
                children: notes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-sm",
                    children: "Görüntülenecek not yok."
                }, void 0, false, {
                    fileName: "[project]/src/components/NoteList.tsx",
                    lineNumber: 67,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    children: notes.map((note)=>{
                        const isSelected = selectedNoteIds.has(note.id);
                        const isActive = activeNoteId === note.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center p-3 rounded-lg mb-2 transition-colors cursor-pointer ".concat(isActive ? 'bg-gray-700' : isSelected ? 'bg-blue-900' : 'hover:bg-gray-800' // Normal not
                            ),
                            onClick: ()=>onSelectNote(note),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    className: "mr-3 h-4 w-4 rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-600",
                                    checked: isSelected,
                                    onChange: ()=>onNoteSelectionChange(note.id),
                                    onClick: (e)=>e.stopPropagation()
                                }, void 0, false, {
                                    fileName: "[project]/src/components/NoteList.tsx",
                                    lineNumber: 84,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-grow overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold truncate text-white",
                                            children: note.title || "Başlıksız Not"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NoteList.tsx",
                                            lineNumber: 92,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-400 truncate opacity-70 mt-1",
                                            children: note.content.replace(/!\[.*?\]\(.*?\)/g, '[Resim]').replace(/#\w+/g, '').replace(/\[\[.*?\]\]/g, '').replace(/\s+/g, ' ').trim() || 'İçerik yok'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/NoteList.tsx",
                                            lineNumber: 93,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/NoteList.tsx",
                                    lineNumber: 91,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, note.id, true, {
                            fileName: "[project]/src/components/NoteList.tsx",
                            lineNumber: 75,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/NoteList.tsx",
                    lineNumber: 69,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/NoteList.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/NoteList.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = NoteList;
var _c;
__turbopack_context__.k.register(_c, "NoteList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/AIQuizGenerator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>AIQuizGenerator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-helpers-nextjs/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AIQuizGenerator(param) {
    let { selectedNotes } = param;
    _s();
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClientComponentClient"])();
    const handleGenerateQuiz = async ()=>{
        if (selectedNotes.length === 0) {
            alert("Lütfen en az bir not seçin.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setQuestions([]);
        const noteContents = selectedNotes.map((note)=>"Başlık: ".concat(note.title, "\nİçerik: ").concat(note.content));
        try {
            const { data, error } = await supabase.functions.invoke('generate-questions', {
                body: {
                    noteContents,
                    difficulty: 'orta'
                }
            });
            if (error) throw error;
            setQuestions(data.questions);
        } catch (err) {
            setError("Sorular üretilirken bir hata oluştu: ".concat(err.message));
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 w-full max-w-4xl p-6 bg-gray-800 border border-gray-700 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: "Yapay Zeka Soru Üretici"
            }, void 0, false, {
                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400 mb-4",
                children: [
                    "Sorular üretmek için listeden bir veya daha fazla not seçin. (",
                    selectedNotes.length,
                    " not seçildi)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleGenerateQuiz,
                disabled: isLoading || selectedNotes.length === 0,
                className: "px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed",
                children: isLoading ? 'Sorular Üretiliyor...' : 'Soruları Üret'
            }, void 0, false, {
                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-red-400",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                lineNumber: 65,
                columnNumber: 17
            }, this),
            questions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-6",
                children: questions.map((q, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 bg-gray-700 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold mb-2",
                                children: [
                                    index + 1,
                                    ". ",
                                    q.soru
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1 list-inside",
                                children: Object.entries(q.secenekler).map((param)=>{
                                    let [key, value] = param;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            key,
                                            ") ",
                                            value
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/src/components/AIQuizGenerator.tsx",
                                        lineNumber: 74,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-green-400 font-bold",
                                children: [
                                    "Doğru Cevap: ",
                                    q.dogruCevap
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/components/AIQuizGenerator.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AIQuizGenerator.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIQuizGenerator.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(AIQuizGenerator, "1b/LabGOtVno39vPuHRy7B5+fcs=");
_c = AIQuizGenerator;
var _c;
__turbopack_context__.k.register(_c, "AIQuizGenerator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/FlashcardView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>FlashcardView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FlashcardView(param) {
    let { notes } = param;
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isFlipped, setIsFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (notes.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 w-full max-w-2xl text-center p-8 bg-gray-800 rounded-lg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400",
                children: "Flashcard oluşturmak için en az bir notunuz olmalı."
            }, void 0, false, {
                fileName: "[project]/src/components/FlashcardView.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/FlashcardView.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
    const currentNote = notes[currentIndex];
    const goToNext = ()=>{
        setIsFlipped(false);
        setCurrentIndex((prevIndex)=>(prevIndex + 1) % notes.length);
    };
    const goToPrev = ()=>{
        setIsFlipped(false);
        setCurrentIndex((prevIndex)=>(prevIndex - 1 + notes.length) % notes.length);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 w-full max-w-2xl flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flashcard-container w-full h-80 perspective-1000",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flashcard-inner w-full h-full relative transition-transform duration-700 preserve-3d ".concat(isFlipped ? 'rotate-y-180' : ''),
                    onClick: ()=>setIsFlipped(!isFlipped),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flashcard-front absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-center",
                                children: currentNote.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/FlashcardView.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/FlashcardView.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flashcard-back absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer rotate-y-180",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center whitespace-pre-wrap",
                                children: currentNote.content
                            }, void 0, false, {
                                fileName: "[project]/src/components/FlashcardView.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/FlashcardView.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/FlashcardView.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/FlashcardView.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex justify-between w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: goToPrev,
                        className: "px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700",
                        children: "Önceki"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FlashcardView.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 self-center",
                        children: [
                            currentIndex + 1,
                            " / ",
                            notes.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FlashcardView.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: goToNext,
                        className: "px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700",
                        children: "Sonraki"
                    }, void 0, false, {
                        fileName: "[project]/src/components/FlashcardView.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FlashcardView.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FlashcardView.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(FlashcardView, "09T0kIGwIlMVxtn2OuC5jDG6YJg=");
_c = FlashcardView;
var _c;
__turbopack_context__.k.register(_c, "FlashcardView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ReviewView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ReviewView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ReviewView(param) {
    let { reviewNotes, onReview } = param;
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isFlipped, setIsFlipped] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (reviewNotes.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 w-full max-w-2xl text-center p-8 bg-gray-800 rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-4",
                    children: "Tekrar Zamanı"
                }, void 0, false, {
                    fileName: "[project]/src/components/ReviewView.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-green-400",
                    children: "Tebrikler! Tekrar edilecek not kalmadı."
                }, void 0, false, {
                    fileName: "[project]/src/components/ReviewView.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ReviewView.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this);
    }
    const currentNote = reviewNotes[currentIndex];
    const handleRating = (rating)=>{
        onReview(currentNote.id, rating);
        setIsFlipped(false);
        // Eğer son kart değilse bir sonrakine geç
        if (currentIndex < reviewNotes.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
        // Son kart ise "bitti" mesajı için listeyi boşaltmış gibi davranabiliriz
        // (Bu, ana sayfadaki state tarafından yönetilecek)
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 w-full max-w-2xl flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold mb-4",
                children: [
                    "Tekrar Zamanı (",
                    reviewNotes.length,
                    " not)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReviewView.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flashcard-container w-full h-80 perspective-1000",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flashcard-inner w-full h-full relative transition-transform duration-700 preserve-3d ".concat(isFlipped ? 'rotate-y-180' : ''),
                    onClick: ()=>setIsFlipped(!isFlipped),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flashcard-front absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-center",
                                children: currentNote.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ReviewView.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ReviewView.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flashcard-back absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer rotate-y-180",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center whitespace-pre-wrap",
                                children: currentNote.content
                            }, void 0, false, {
                                fileName: "[project]/src/components/ReviewView.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ReviewView.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ReviewView.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ReviewView.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            isFlipped && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex justify-around w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleRating(1),
                        className: "px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 w-1/3",
                        children: "Zor"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewView.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleRating(3),
                        className: "px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 w-1/3",
                        children: "Normal"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewView.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleRating(5),
                        className: "px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 w-1/3",
                        children: "Kolay"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReviewView.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReviewView.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ReviewView.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(ReviewView, "09T0kIGwIlMVxtn2OuC5jDG6YJg=");
_c = ReviewView;
var _c;
__turbopack_context__.k.register(_c, "ReviewView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/TagSidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>TagSidebar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TagSidebar(param) {
    let { tags, selectedTag, onTagSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-64 p-4 bg-gray-800 border-r border-gray-700 h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-bold mb-4",
                children: "Etiketler"
            }, void 0, false, {
                fileName: "[project]/src/components/TagSidebar.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onTagSelect(null),
                            className: "w-full text-left px-2 py-1 rounded ".concat(!selectedTag ? 'bg-blue-600' : 'hover:bg-gray-700'),
                            children: "Tüm Notlar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/TagSidebar.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/TagSidebar.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onTagSelect(tag.name),
                                className: "w-full text-left px-2 py-1 rounded ".concat(selectedTag === tag.name ? 'bg-blue-600' : 'hover:bg-gray-700'),
                                children: [
                                    "# ",
                                    tag.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/TagSidebar.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this)
                        }, tag.id, false, {
                            fileName: "[project]/src/components/TagSidebar.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TagSidebar.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TagSidebar.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = TagSidebar;
var _c;
__turbopack_context__.k.register(_c, "TagSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/FocusView.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>FocusView
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
"use client";
;
;
;
function FocusView(param) {
    let { note, onClose } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex justify-center p-8 overflow-y-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-4xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600",
                    children: "← Geri"
                }, void 0, false, {
                    fileName: "[project]/src/components/FocusView.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-5xl font-bold mb-8 mt-12 text-center",
                    children: note.title
                }, void 0, false, {
                    fileName: "[project]/src/components/FocusView.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "prose prose-invert prose-xl max-w-none mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                        remarkPlugins: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
                        ],
                        children: note.content
                    }, void 0, false, {
                        fileName: "[project]/src/components/FocusView.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/FocusView.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FocusView.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FocusView.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = FocusView;
var _c;
__turbopack_context__.k.register(_c, "FocusView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ReadingPane.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>ReadingPane
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-helpers-nextjs/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const WikiLinkRenderer = (param)=>{
    let { content, notes, onNoteLinkClick } = param;
    if (!content) return null;
    const parts = content.split(/(\[\[.*?\]\])/g);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "whitespace-pre-wrap",
        children: parts.map((part, index)=>{
            if (part.startsWith('[[') && part.endsWith(']]')) {
                const noteTitle = part.substring(2, part.length - 2);
                const linkedNote = notes.find((n)=>n.title.toLowerCase() === noteTitle.toLowerCase());
                if (linkedNote) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#",
                        onClick: (e)=>{
                            e.preventDefault();
                            onNoteLinkClick(linkedNote);
                        },
                        className: "inline-block text-purple-400 font-semibold hover:underline bg-purple-900 bg-opacity-30 p-1 rounded mx-1",
                        children: noteTitle
                    }, index, false, {
                        fileName: "[project]/src/components/ReadingPane.tsx",
                        lineNumber: 34,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0));
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-500 italic p-1",
                    children: noteTitle
                }, index, false, {
                    fileName: "[project]/src/components/ReadingPane.tsx",
                    lineNumber: 44,
                    columnNumber: 18
                }, ("TURBOPACK compile-time value", void 0));
            }
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: part
            }, index, false, {
                fileName: "[project]/src/components/ReadingPane.tsx",
                lineNumber: 47,
                columnNumber: 16
            }, ("TURBOPACK compile-time value", void 0));
        })
    }, void 0, false, {
        fileName: "[project]/src/components/ReadingPane.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = WikiLinkRenderer;
function ReadingPane(param) {
    let { activeNote, notes, onEdit, onNoteLinkClick, onGoBack, onGoForward, canGoBack, canGoForward } = param;
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClientComponentClient"])();
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backlinks, setBacklinks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReadingPane.useEffect": ()=>{
            if (activeNote) {
                setIsLoading(true);
                setSuggestions([]);
                setTags([]);
                setBacklinks([]);
                const timer = setTimeout({
                    "ReadingPane.useEffect.timer": async ()=>{
                        try {
                            const [contentRes, tagsRes, backlinksRes] = await Promise.all([
                                supabase.functions.invoke('suggest-content', {
                                    body: {
                                        title: activeNote.title,
                                        content: activeNote.content
                                    }
                                }),
                                supabase.functions.invoke('suggest-tags', {
                                    body: {
                                        title: activeNote.title,
                                        content: activeNote.content,
                                        userId: activeNote.user_id
                                    }
                                }),
                                supabase.rpc('get_backlinks_for_note', {
                                    note_title: activeNote.title
                                })
                            ]);
                            if (contentRes.data) setSuggestions(contentRes.data.suggestions);
                            if (tagsRes.data && Array.isArray(tagsRes.data.tags)) setTags(tagsRes.data.tags.filter({
                                "ReadingPane.useEffect.timer": (tag)=>!activeNote.content.includes("#".concat(tag))
                            }["ReadingPane.useEffect.timer"]));
                            if (backlinksRes.data) setBacklinks(backlinksRes.data);
                        } catch (error) {
                            console.error("AI Assistant Error:", error);
                        } finally{
                            setIsLoading(false);
                        }
                    }
                }["ReadingPane.useEffect.timer"], 500);
                return ({
                    "ReadingPane.useEffect": ()=>clearTimeout(timer)
                })["ReadingPane.useEffect"];
            }
        }
    }["ReadingPane.useEffect"], [
        activeNote,
        supabase
    ]);
    if (!activeNote) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6 flex-1 flex items-center justify-center text-gray-500",
            children: "Okumak ve etkileşim kurmak için lütfen not listesinden bir not seçin."
        }, void 0, false, {
            fileName: "[project]/src/components/ReadingPane.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 flex-1 flex flex-col overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-grow",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onGoBack,
                                        disabled: !canGoBack,
                                        className: "p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-5 w-5",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ReadingPane.tsx",
                                                lineNumber: 98,
                                                columnNumber: 115
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ReadingPane.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onGoForward,
                                        disabled: !canGoForward,
                                        className: "p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-5 w-5",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ReadingPane.tsx",
                                                lineNumber: 101,
                                                columnNumber: 115
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ReadingPane.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl font-bold",
                                        children: activeNote.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ReadingPane.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onEdit(activeNote),
                                className: "px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold",
                                children: "Düzenle"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ReadingPane.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ReadingPane.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prose prose-invert prose-lg max-w-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WikiLinkRenderer, {
                            content: activeNote.content,
                            notes: notes,
                            onNoteLinkClick: onNoteLinkClick
                        }, void 0, false, {
                            fileName: "[project]/src/components/ReadingPane.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReadingPane.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReadingPane.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 mt-8 pt-6 border-t border-gray-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold mb-4",
                        children: "✨ AI Asistan"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReadingPane.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: "Öneriler yükleniyor..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ReadingPane.tsx",
                        lineNumber: 114,
                        columnNumber: 22
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-300 mb-2",
                                        children: "İçerik Önerileri"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    suggestions && suggestions.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc list-inside space-y-1 text-sm",
                                        children: suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: s
                                            }, i, false, {
                                                fileName: "[project]/src/components/ReadingPane.tsx",
                                                lineNumber: 118,
                                                columnNumber: 139
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 118,
                                        columnNumber: 56
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: "Uygun öneri bulunamadı."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 118,
                                        columnNumber: 169
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ReadingPane.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-300 mb-2",
                                        children: "Etiket Önerileri"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    tags && tags.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-1 text-xs bg-gray-700 rounded-full",
                                                children: [
                                                    "#",
                                                    tag
                                                ]
                                            }, tag, true, {
                                                fileName: "[project]/src/components/ReadingPane.tsx",
                                                lineNumber: 122,
                                                columnNumber: 97
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 122,
                                        columnNumber: 42
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: "Uygun öneri bulunamadı."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 122,
                                        columnNumber: 192
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ReadingPane.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-300 mb-2",
                                        children: "Geri Bağlantılar (Backlinks)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    backlinks && backlinks.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: backlinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onNoteLinkClick(notes.find((n)=>n.id === link.id)),
                                                className: "px-2 py-1 text-xs bg-gray-700 rounded-full hover:bg-gray-600",
                                                children: [
                                                    "[[",
                                                    link.title,
                                                    "]]"
                                                ]
                                            }, link.id, true, {
                                                fileName: "[project]/src/components/ReadingPane.tsx",
                                                lineNumber: 126,
                                                columnNumber: 113
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 126,
                                        columnNumber: 52
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500",
                                        children: "Bu nota link veren başka not bulunamadı."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ReadingPane.tsx",
                                        lineNumber: 126,
                                        columnNumber: 308
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ReadingPane.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ReadingPane.tsx",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ReadingPane.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ReadingPane.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(ReadingPane, "PRkoJ824RYeL1IOcHXN25AQe/Lg=");
_c1 = ReadingPane;
var _c, _c1;
__turbopack_context__.k.register(_c, "WikiLinkRenderer");
__turbopack_context__.k.register(_c1, "ReadingPane");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/auth-helpers-nextjs/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NoteCreator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NoteCreator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NoteList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/NoteList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIQuizGenerator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIQuizGenerator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlashcardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlashcardView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReviewView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ReviewView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TagSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TagSidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FocusView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FocusView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReadingPane$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ReadingPane.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
// GraphView'i sadece tarayıcıda çalışması için dinamik olarak yüklüyoruz
const DynamicGraphView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/src/components/GraphView.tsx [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/GraphView.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = DynamicGraphView;
function Home() {
    _s();
    // --- STATE MANAGEMENT ---
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingNote, setEditingNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedNoteIds, setSelectedNoteIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('list');
    const [reviewNotes, setReviewNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(''); // Arama kutusunun içeriğini tutar
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Arama sonuçlarını tutar
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedTag, setSelectedTag] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusedNote, setFocusedNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const noteCreatorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeNote, setActiveNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [isQuizGeneratorVisible, setIsQuizGeneratorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Aralıklı Tekrar (SRS) Algoritması
    const handleSelectNote = (note)=>{
        if ((activeNote === null || activeNote === void 0 ? void 0 : activeNote.id) === note.id) return;
        setViewMode('list'); // DÜZELTME: Herhangi bir moddayken nota tıklanınca liste moduna geç.
        setEditingNote(null);
        setActiveNote(note);
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(note.id);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };
    const goBack = ()=>{
        if (historyIndex > 0) {
            const prevNoteId = history[historyIndex - 1];
            const prevNote = notes.find((n)=>n.id === prevNoteId);
            if (prevNote) setActiveNote(prevNote);
            setHistoryIndex(historyIndex - 1);
        }
    };
    const goForward = ()=>{
        if (historyIndex < history.length - 1) {
            const nextNoteId = history[historyIndex + 1];
            const nextNote = notes.find((n)=>n.id === nextNoteId);
            if (nextNote) setActiveNote(nextNote);
            setHistoryIndex(historyIndex + 1);
        }
    };
    const handleEditClick = (note)=>{
        setEditingNote(note);
        setActiveNote(null);
        setTimeout(()=>{
            var _noteCreatorRef_current;
            return (_noteCreatorRef_current = noteCreatorRef.current) === null || _noteCreatorRef_current === void 0 ? void 0 : _noteCreatorRef_current.scrollIntoView({
                behavior: 'smooth'
            });
        }, 0);
    };
    const handleReview = async (noteId, rating)=>{
        const note = notes.find((n)=>n.id === noteId);
        if (!user || !note) return;
        let { srs_interval: interval, srs_ease_factor: easeFactor } = note;
        if (rating >= 3) {
            if (interval === 0) {
                interval = 1;
            } else if (interval === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval * easeFactor);
            }
        } else {
            interval = 1; // Tekrar aralığını sıfırla
        }
        // Kolaylık faktörünü güncelle
        easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
        if (easeFactor < 1.3) easeFactor = 1.3;
        // Bir sonraki tekrar tarihini hesapla (mevcut zamana gün ekleyerek)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + interval);
        // Veritabanını yeni değerlerle güncelle
        const { data, error } = await supabase.from('notes').update({
            srs_interval: interval,
            srs_ease_factor: easeFactor,
            srs_due_date: dueDate.toISOString()
        }).match({
            id: noteId
        }).select().single();
        if (error) {
            console.error("Error updating SRS data:", error);
        } else if (data) {
            // Local state'i de güncelle
            setNotes(notes.map((n)=>n.id === noteId ? data : n));
            // Tekrar edilen notu listeden çıkar
            setReviewNotes(reviewNotes.filter((n)=>n.id !== noteId));
        }
    };
    // Tekrar moduna geçerken, zamanı gelmiş notları filtrele
    // --- GEÇİCİ HATA AYIKLAMA KODU ---
    const startReviewMode = ()=>{
        console.clear(); // Her butona basıldığında konsolu temizle
        console.log("--- 🕵️‍♂️ TEKRAR MODU HATA AYIKLAMA BAŞLADI 🕵️‍♂️ ---");
        // 1. Filtrelemeden ÖNCE state'teki tüm notları görelim
        console.log("Toplam ".concat(notes.length, " adet not state içinde mevcut:"), JSON.parse(JSON.stringify(notes)));
        const now = new Date();
        // 2. Karşılaştırma için kullanılan "şimdi" zamanını görelim
        console.log("Karşılaştırma zamanı (Now): ".concat(now.toISOString()));
        console.log("--- Notlar tek tek kontrol ediliyor... ---");
        const dueNotes = notes.filter((note)=>{
            const dueDate = new Date(note.srs_due_date);
            const isDateValid = !isNaN(dueDate.getTime());
            const isDue = isDateValid && dueDate <= now;
            // 3. Her bir not için karar sürecini detaylıca yazdıralım
            console.log("[KONTROL] Not ID: ".concat(note.id, ', Başlık: "').concat(note.title, '"\n') + "  • DB Tarihi (srs_due_date): ".concat(note.srs_due_date, "\n") + "  • Yorumlanan Tarih: ".concat(isDateValid ? dueDate.toISOString() : 'GEÇERSİZ TARİH', "\n") + "  • Tekrar Zamanı Geldi mi? (dueDate <= now): ".concat(isDue, "\n") + "  • Tarih Geçerli mi?: ".concat(isDateValid, "\n") + "  ➡️ SONUÇ: Tekrar listesine EKLENECEK Mİ? 👉 ".concat(isDue || !isDateValid));
            // Önceki mantığımız: Tarih geçmişse VEYA tarih geçersizse ekle.
            return isDue || !isDateValid;
        });
        // 4. Filtreleme sonrası sonuçları görelim
        console.log("--- ✅ HATA AYIKLAMA TAMAMLANDI ✅ ---");
        console.log("Filtreleme sonucu ".concat(dueNotes.length, " adet tekrar edilecek not bulundu."));
        console.log("Bulunan notlar:", dueNotes);
        console.log("-------------------------------------------------");
        setReviewNotes(dueNotes);
        setViewMode('review');
    };
    // --- INITIALIZATION ---
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$auth$2d$helpers$2d$nextjs$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClientComponentClient"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const fetchData = {
                "Home.useEffect.fetchData": async ()=>{
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
                        const { data, error } = await supabase.rpc('get_notes_by_tag', {
                            tag_name: selectedTag
                        });
                        notesData = data;
                        notesError = error;
                    } else {
                        // Seçili bir etiket YOKSA, tüm notları çek
                        const { data, error } = await supabase.from('notes').select('*').order('created_at', {
                            ascending: false
                        });
                        notesData = data;
                        notesError = error;
                    }
                    if (notesError) {
                        console.error('Error fetching notes:', notesError);
                    } else if (notesData) {
                        setNotes(notesData);
                    }
                }
            }["Home.useEffect.fetchData"];
            fetchData();
        }
    }["Home.useEffect"], [
        supabase,
        router,
        selectedTag
    ]); // <-- DİKKAT: selectedTag'i bağımlılıklara ekledik.
    // SİLDİĞİN YERE BUNU EKLE
    // YENİ ARAMA MANTIĞI - SİLDİĞİN YERE BUNU EKLE
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (searchTerm.trim() === '') {
                setSearchResults(null);
            } else {
                const lowerCaseSearchTerm = searchTerm.toLowerCase();
                const results = notes.filter({
                    "Home.useEffect.results": (note)=>note.title.toLowerCase().includes(lowerCaseSearchTerm) || note.content.toLowerCase().includes(lowerCaseSearchTerm)
                }["Home.useEffect.results"]);
                setSearchResults(results);
            }
        }
    }["Home.useEffect"], [
        searchTerm,
        notes
    ]);
    // --- CORE NOTE OPERATIONS ---
    const handleAddNote = async (title, content, file)=>{
        if (!user) return;
        let finalContent = content;
        if (file) {
            const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.\-_]/g, '-');
            const filePath = "".concat(user.id, "/").concat(Date.now(), "-").concat(cleanFileName);
            const { data: uploadData, error: uploadError } = await supabase.storage.from('note_images').upload(filePath, file);
            if (uploadData) {
                const { data: urlData } = supabase.storage.from('note_images').getPublicUrl(uploadData.path);
                if (urlData.publicUrl) {
                    finalContent += "\n\n![".concat(cleanFileName, "](").concat(urlData.publicUrl, ")");
                }
            } else {
                console.error('Error uploading image:', uploadError);
                return;
            }
        }
        // DÜZELTME: Yeni not için başlangıç SRS değerlerini ekliyoruz.
        const { data, error } = await supabase.from('notes').insert([
            {
                title,
                content: finalContent,
                user_id: user.id,
                srs_due_date: new Date().toISOString(),
                srs_interval: 0,
                srs_ease_factor: 2.5 // Standart kolaylık faktörü
            }
        ]).select().single();
        if (data) {
            await processTags(data.id, finalContent);
            setNotes([
                data,
                ...notes
            ]);
        } else console.error('Error adding note:', error);
    };
    const handleUpdateNote = async (title, content, file)=>{
        if (!user || !editingNote) return;
        let finalContent = content;
        if (file) {
            const cleanFileName = file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9.\-_]/g, '-');
            const filePath = "".concat(user.id, "/").concat(Date.now(), "-").concat(cleanFileName);
            const { data: uploadData, error: uploadError } = await supabase.storage.from('note_images').upload(filePath, file);
            if (uploadData) {
                const { data: urlData } = supabase.storage.from('note_images').getPublicUrl(uploadData.path);
                if (urlData.publicUrl) {
                    finalContent += "\n\n![".concat(cleanFileName, "](").concat(urlData.publicUrl, ")");
                }
            } else {
                console.error('Error uploading image:', uploadError);
                return;
            }
        }
        const { data, error } = await supabase.from('notes').update({
            title,
            content: finalContent
        }).match({
            id: editingNote.id
        }).select().single();
        if (data) {
            await processTags(data.id, finalContent);
            setNotes(notes.map((note)=>note.id === editingNote.id ? data : note));
            setEditingNote(null);
        } else console.error('Error updating note:', error);
    };
    const processTags = async (noteId, content)=>{
        var _content_match;
        if (!user) return;
        const { error: deleteError } = await supabase.from('note_tags').delete().eq('note_id', noteId);
        if (deleteError) console.error('Error deleting old note-tag links:', deleteError);
        const tagsInContent = ((_content_match = content.match(/#\w+/g)) === null || _content_match === void 0 ? void 0 : _content_match.map((tag)=>tag.substring(1).toLowerCase())) || [];
        if (tagsInContent.length === 0) {
            // Etiket kalmadıysa tag listesini yenileyelim
            const { data: updatedTags } = await supabase.from('tags').select('id, name').order('name');
            if (updatedTags) setTags(updatedTags);
            return;
        }
        const uniqueTags = [
            ...new Set(tagsInContent)
        ];
        const { data: upsertedTags, error: tagsError } = await supabase.from('tags').upsert(uniqueTags.map((tag)=>({
                name: tag,
                user_id: user.id
            })), {
            onConflict: 'name, user_id'
        }).select('id, name');
        if (tagsError) {
            console.error('Error upserting tags:', tagsError);
            return;
        }
        if (upsertedTags) {
            const noteTagLinks = upsertedTags.map((tag)=>({
                    note_id: noteId,
                    tag_id: tag.id,
                    user_id: user.id
                }));
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
    const handleDeleteNote = async (noteId)=>{
        const { error } = await supabase.from('notes').delete().match({
            id: noteId
        });
        if (!error) setNotes(notes.filter((note)=>note.id !== noteId));
        else console.error('Error deleting note:', error);
    };
    const handleSignOut = async ()=>{
        await supabase.auth.signOut();
        router.push('/auth');
    };
    // --- UI HANDLERS ---
    const handleNoteSelectionChange = (noteId)=>{
        setSelectedNoteIds((prevSelected)=>{
            const newSelected = new Set(prevSelected);
            if (newSelected.has(noteId)) newSelected.delete(noteId);
            else newSelected.add(noteId);
            return newSelected;
        });
    };
    const selectedNotes = notes.filter((note)=>selectedNoteIds.has(note.id));
    // Arama sonucu varsa onu, yoksa mevcut (zaten etikete göre filtrelenmiş) notları kullan
    const notesToDisplay = searchResults !== null ? searchResults : notes;
    // --- RENDER ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: focusedNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FocusView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            note: focusedNote,
            onClose: ()=>setFocusedNote(null)
        }, void 0, false, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 355,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-screen bg-gray-900 text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TagSidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    tags: tags,
                    selectedTag: selectedTag,
                    onTagSelect: setSelectedTag
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 358,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NoteList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    notes: notesToDisplay,
                    onSelectNote: handleSelectNote,
                    activeNoteId: activeNote === null || activeNote === void 0 ? void 0 : activeNote.id,
                    viewMode: viewMode,
                    setViewMode: setViewMode,
                    searchTerm: searchTerm,
                    onSearchChange: setSearchTerm,
                    onNewNote: ()=>{
                        setActiveNote(null);
                        setViewMode('list');
                        setEditingNote({
                            id: 0,
                            title: '',
                            content: '',
                            user_id: user.id,
                            srs_due_date: new Date().toISOString(),
                            srs_ease_factor: 2.5,
                            srs_interval: 0
                        });
                        setTimeout(()=>{
                            var _noteCreatorRef_current;
                            return (_noteCreatorRef_current = noteCreatorRef.current) === null || _noteCreatorRef_current === void 0 ? void 0 : _noteCreatorRef_current.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }, 0);
                    },
                    onStartReview: startReviewMode,
                    selectedNoteIds: selectedNoteIds,
                    onNoteSelectionChange: handleNoteSelectionChange,
                    isQuizGeneratorVisible: isQuizGeneratorVisible,
                    onToggleQuizGenerator: ()=>setIsQuizGeneratorVisible(!isQuizGeneratorVisible)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 359,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col border-l border-gray-700",
                    children: [
                        viewMode === 'list' && (editingNote ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: noteCreatorRef,
                            className: "p-6 overflow-y-auto h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$NoteCreator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                user: user,
                                onNoteAdd: handleAddNote,
                                onNoteUpdate: (title, content, file)=>{
                                    handleUpdateNote(title, content, file);
                                    const updatedNote = notes.find((n)=>n.id === (editingNote === null || editingNote === void 0 ? void 0 : editingNote.id));
                                    setEditingNote(null);
                                    if (updatedNote) setActiveNote(updatedNote);
                                },
                                editingNote: editingNote,
                                setEditingNote: setEditingNote
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 391,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 390,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReadingPane$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            activeNote: activeNote,
                            notes: notes,
                            onEdit: handleEditClick,
                            onNoteLinkClick: handleSelectNote,
                            onGoBack: goBack,
                            onGoForward: goForward,
                            canGoBack: historyIndex > 0,
                            canGoForward: historyIndex < history.length - 1
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 399,
                            columnNumber: 17
                        }, this)),
                        viewMode === 'graph' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicGraphView, {
                            notes: notesToDisplay,
                            onNodeClick: handleEditClick
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 402,
                            columnNumber: 38
                        }, this),
                        viewMode === 'flashcard' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlashcardView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            notes: notes
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 403,
                            columnNumber: 42
                        }, this),
                        viewMode === 'review' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ReviewView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            reviewNotes: reviewNotes,
                            onReview: handleReview
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 404,
                            columnNumber: 39
                        }, this),
                        isQuizGeneratorVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIQuizGenerator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            selectedNotes: selectedNotes
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 405,
                            columnNumber: 40
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 387,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 357,
            columnNumber: 9
        }, this)
    }, void 0, false);
}
_s(Home, "pxTCWR3zEdMUlRe4govLXOLRCHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "DynamicGraphView");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_58aa020a._.js.map