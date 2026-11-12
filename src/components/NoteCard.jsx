
import DOMPurify from "dompurify";

import {
  Pin,
  Archive,
  Pencil,
  Trash2,
  RotateCcw,
  Trash,
  CalendarDays
} from "lucide-react";

function NoteCard({
  title,
  content,
  category,
  date,
  onEdit,
  onDelete,
  onPin,
  isPinned,
  onArchive,
  isArchived,
  color,
  onRestore,
  onPermanentDelete,
  isDeleted,
  isSelected,
  onSelect
}) {

  return (
    <article
      style={{ backgroundColor: color || "#151515" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40 hover:shadow-xl hover:shadow-yellow-500/5"
    >

      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-start gap-3">

          {!isDeleted && (
            <input
              type="checkbox"
              checked={isSelected || false}
              onChange={onSelect}
              aria-label={`Select ${title}`}
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-yellow-400"
            />
          )}

          <div className="min-w-0">

            <h3 className="break-words text-lg font-bold tracking-tight text-yellow-400">
              {title || "Untitled Note"}
            </h3>

            {category && (
              <span className="mt-2 inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-300">
                {category}
              </span>
            )}

          </div>

        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} />
          <span>{date}</span>
        </div>

      </div>

      {/* Note Content */}
      <div
        className="note-content min-w-0 flex-1 break-words text-sm leading-7 text-gray-300"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content)
        }}
      />

      {/* Footer Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">

        {isDeleted ? (
          <>
            <button
              onClick={onRestore}
              className="flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400 transition hover:bg-green-500/20"
            >
              <RotateCcw size={15} />
              Restore
            </button>

            <button
              onClick={onPermanentDelete}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
            >
              <Trash size={15} />
              Delete Permanently
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onPin}
              title={isPinned ? "Unpin note" : "Pin note"}
              aria-label={isPinned ? "Unpin note" : "Pin note"}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                isPinned
                  ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                  : "border-white/10 text-gray-400 hover:border-yellow-500/30 hover:text-yellow-400"
              }`}
            >
              <Pin size={15} />
              {isPinned ? "Unpin" : "Pin"}
            </button>

            <button
              onClick={onArchive}
              title={isArchived ? "Unarchive note" : "Archive note"}
              aria-label={isArchived ? "Unarchive note" : "Archive note"}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-yellow-500/30 hover:text-yellow-400"
            >
              <Archive size={15} />
              {isArchived ? "Unarchive" : "Archive"}
            </button>

            <button
              onClick={onEdit}
              title="Edit note"
              aria-label="Edit note"
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-blue-500/30 hover:text-blue-400"
            >
              <Pencil size={15} />
              Edit
            </button>

            <button
              onClick={onDelete}
              title="Move to trash"
              aria-label="Move note to trash"
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-red-500/30 hover:text-red-400"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </>
        )}

      </div>

    </article>
  );
}

export default NoteCard;
