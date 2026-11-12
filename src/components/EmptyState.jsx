
import {
  NotebookPen,
  Pin,
  Archive,
  Trash2
} from "lucide-react";

function EmptyState({ activeTab, onNewNote }) {

  const emptyMessages = {
    all: {
      icon: NotebookPen,
      title: "No notes yet",
      description: "Create your first note and keep your ideas organised."
    },
    pinned: {
      icon: Pin,
      title: "No pinned notes",
      description: "Pin important notes to find them quickly."
    },
    archived: {
      icon: Archive,
      title: "No archived notes",
      description: "Your archived notes will appear here."
    },
    trash: {
      icon: Trash2,
      title: "Trash is empty",
      description: "Deleted notes will appear here."
    }
  };

  const currentMessage = emptyMessages[activeTab] || emptyMessages.all;
  const Icon = currentMessage.icon;

  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center text-center">

      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
        <Icon size={36} className="text-yellow-400" />
      </div>

      <h2 className="mb-2 text-xl font-semibold text-white">
        {currentMessage.title}
      </h2>

      <p className="mb-6 max-w-sm text-sm text-gray-500">
        {currentMessage.description}
      </p>

      {activeTab === "all" && (
        <button
          onClick={onNewNote}
          className="rounded-lg bg-yellow-500 px-5 py-2.5 font-semibold text-black transition hover:bg-yellow-400"
        >
          + Create Your First Note
        </button>
      )}

    </div>
  );
}

export default EmptyState;
