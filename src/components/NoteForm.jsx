
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

import {
  NotebookPen,
  Type,
  Tag,
  Palette,
  X,
  Save
} from "lucide-react";

function NoteForm({ onClose, onSave, editingNote, notes }) {

  const [title, setTitle] = useState(editingNote?.title || "");

  const [content, setContent] = useState(
    editingNote?.content || ""
  );

  const [category, setCategory] = useState(
    editingNote?.category || ""
  );

  const [color, setColor] = useState(
    editingNote?.color || "#151515"
  );


  const [isSaving, setIsSaving] = useState(false);

  const colors = [
    "#151515",
    "#27200D",
    "#14283D",
    "#183329",
    "#38213D"
  ];

  function handleSubmit(e) {
    e.preventDefault();

    const plainText = content
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    if (plainText === "") {
      alert("Please enter note content");
      return;
    }

    const isDuplicate = notes.some((note) => {
      return (
        note.title.toLowerCase() === title.trim().toLowerCase() &&
        note.content.toLowerCase() === content.trim().toLowerCase() &&
        note.id !== editingNote?.id
      );
    });

    if (isDuplicate) {
      alert("This note already exists!");
      return;
    }

    const noteData = {
      id: editingNote ? editingNote.id : Date.now(),

      title: title.trim(),

      content: content.trim(),

      category: category.trim() || "General",

      isPinned: editingNote
        ? editingNote.isPinned || false
        : false,

      isArchived: editingNote
        ? editingNote.isArchived || false
        : false,

      isDeleted: editingNote
        ? editingNote.isDeleted || false
        : false,

      color: color,

      date: editingNote?.date || new Date().toLocaleDateString(),

      createdAt: editingNote?.createdAt || new Date().toISOString(),

      updatedAt: new Date().toISOString()
    };

    setIsSaving(true);

setTimeout(() => {
  onSave(noteData);
}, 300);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mb-8 w-full overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-[#1b1b1b] to-[#101010] p-5 shadow-2xl shadow-black/40 sm:p-7"
    >

      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* Form Header */}
      <div className="mb-7 flex items-center justify-between gap-3">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10">

            <NotebookPen
              size={22}
              className="text-yellow-400"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              {editingNote ? "Edit Note" : "Create New Note"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Capture your thoughts and ideas
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
        >
          <X size={19} />
        </button>

      </div>

      {/* Title */}
      <div className="mb-5">

        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Type size={16} className="text-yellow-400" />
          Note Title
          <span className="text-xs text-gray-500">(Optional)</span>
        </label>

        <input
          type="text"
          placeholder="Give your note a title..."
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-yellow-500/20 focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/10"
        />

        <p className="mt-2 text-right text-xs text-gray-600">
          {title.length}/100
        </p>

      </div>

      {/* Rich Text Editor */}
      <div className="mb-5">

        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
          <NotebookPen size={16} className="text-yellow-400" />
          Note Content
        </label>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 transition focus-within:border-yellow-500/50">
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>

      </div>

      {/* Category */}
      <div className="mb-6">

        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Tag size={16} className="text-yellow-400" />
          Category
        </label>

        <input
          type="text"
          placeholder="e.g. Study, Work, Personal..."
          maxLength={30}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 hover:border-yellow-500/20 focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/10"
        />

      </div>

      {/* Color Picker */}
      <div className="mb-7">

        <p className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-300">
          <Palette size={16} className="text-yellow-400" />
          Choose Note Color
        </p>

        <div className="flex flex-wrap items-center gap-4">

          {colors.map((item) => (

            <button
              key={item}
              type="button"
              onClick={() => setColor(item)}
              style={{ backgroundColor: item }}
              className={`relative h-10 w-10 rounded-full border-2 transition-all duration-200 hover:scale-110 sm:h-11 sm:w-11 ${
                color === item
                  ? "border-yellow-400 scale-110 shadow-[0_0_12px_rgba(234,179,8,0.35)]"
                  : "border-white/20 hover:border-white/60"
              }`}
              title={`Select ${item}`}
              aria-label={`Select color ${item}`}
              aria-pressed={color === item}
            />

          ))}

        </div>

      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white sm:w-auto"
        >
          Cancel
        </button>

        <button
  type="submit"
  disabled={isSaving}
  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
>
  <Save size={17} />

  {isSaving
    ? "Saving..."
    : editingNote
      ? "Update Note"
      : "Save Note"}
</button>

      </div>

    </form>
  );
}

export default NoteForm;
