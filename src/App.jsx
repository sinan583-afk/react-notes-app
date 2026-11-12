
import { useState, useEffect } from "react";

import NoteForm from "./components/NoteForm";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteCard from "./components/NoteCard";
import EmptyState from "./components/EmptyState";

function App() {

  // Notes state and localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: 1,
        title: "Learning React",
        content: "Learning useState and props",
        category: "Study",
        date: "Today"
      },
      {
        id: 2,
        title: "Project Ideas",
        content: "Build more React projects",
        category: "Ideas",
        date: "Yesterday"
      },
      {
        id: 3,
        title: "Daily Goals",
        content: "Complete React practice",
        category: "Personal",
        date: "Today"
      }
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedNotes, setSelectedNotes] = useState([]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


useEffect(() => {

  function handleKeyDown(event) {

    // Cmd + K (Mac) or Ctrl + K (Windows)
    if (
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();

      setEditingNote(null);
      setShowForm(true);
    }

    // Escape key closes the form
    if (event.key === "Escape" && showForm) {
      setShowForm(false);
      setEditingNote(null);
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

}, [showForm]);


  // Select and unselect notes
  function handleSelectNote(id) {
    setSelectedNotes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((noteId) => noteId !== id);
      }

      return [...prev, id];
    });
  }

  // Bulk delete selected notes
  function handleBulkDelete() {
    const confirmDelete = window.confirm(
      `Move ${selectedNotes.length} selected notes to Trash?`
    );

    if (confirmDelete) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          selectedNotes.includes(note.id)
            ? { ...note, isDeleted: true }
            : note
        )
      );

      setSelectedNotes([]);
    }
  }

  // Save new note or update existing note
  function handleSaveNote(noteData) {
    if (editingNote) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === noteData.id ? noteData : note
        )
      );

      setEditingNote(null);
    } else {
      setNotes((previousNotes) => [noteData, ...previousNotes]);
    }

    setShowForm(false);
  }

  // Move note to Trash
  function handleDeleteNote(noteId) {
    const confirmDelete = window.confirm(
      "Move this note to Trash?"
    );

    if (confirmDelete) {
      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note.id === noteId
            ? { ...note, isDeleted: true }
            : note
        )
      );

      setSelectedNotes((previous) =>
        previous.filter((id) => id !== noteId)
      );
    }
  }

  // Restore note from Trash
  function handleRestoreNote(noteId) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId
          ? { ...note, isDeleted: false }
          : note
      )
    );
  }

  // Permanently delete note
  function handlePermanentDelete(noteId) {
    const confirmDelete = window.confirm(
      "Permanently delete this note?"
    );

    if (confirmDelete) {
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note.id !== noteId)
      );

      setSelectedNotes((previous) =>
        previous.filter((id) => id !== noteId)
      );
    }
  }

  // Pin and unpin note
  function handlePinNote(noteId) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId
          ? { ...note, isPinned: !note.isPinned }
          : note
      )
    );
  }

  // Archive and unarchive note
  function handleArchiveNote(noteId) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId
          ? { ...note, isArchived: !note.isArchived }
          : note
      )
    );
  }

  // Open note for editing
  function handleEditNote(note) {
    setEditingNote(note);
    setShowForm(true);
  }

  // Filter notes based on tab and search
  const filteredNotes = notes.filter((note) => {

    if (activeTab === "trash") {
      return note.isDeleted &&
        (
          (note.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.content || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.category || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (note.isDeleted) {
      return false;
    }

    const matchesSearch =
      (note.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.content || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.category || "").toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") {
      return !note.isArchived && matchesSearch;
    }

    if (activeTab === "pinned") {
      return !note.isArchived && note.isPinned && matchesSearch;
    }

    if (activeTab === "archived") {
      return note.isArchived && matchesSearch;
    }

    return false;
  });

  // Get note creation timestamp
function getCreatedTime(note) {
  const value = note.createdAt ?? note.id;

  const timestamp =
    typeof value === "number"
      ? value
      : new Date(value).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

// Sort notes
const sortedNotes = [...filteredNotes].sort((a, b) => {

  if (a.isPinned !== b.isPinned) {
    return Number(b.isPinned) - Number(a.isPinned);
  }

  if (sortBy === "newest") {
    return getCreatedTime(b) - getCreatedTime(a);
  }

  if (sortBy === "oldest") {
    return getCreatedTime(a) - getCreatedTime(b);
  }

  if (sortBy === "title-asc") {
    return (a.title || "").localeCompare(b.title || "");
  }

  if (sortBy === "title-desc") {
    return (b.title || "").localeCompare(a.title || "");
  }

  if (sortBy === "color-asc") {
    return (a.color || "").localeCompare(b.color || "");
  }

  return 0;
});

  return (
    <div className="min-h-screen bg-black">

      <Header
        onNewNote={() => {
          setEditingNote(null);
          setShowForm(true);
        }}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <div className="flex flex-col md:flex-row">

        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedNotes([]);
          }}
        />

        <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">

          <h2 className="mb-6 text-3xl font-bold text-yellow-400">
            My Notes
          </h2>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mb-6 rounded-lg border border-yellow-500/30 bg-[#151515] px-4 py-3 text-white outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="color-asc">Color A–Z</option>
          </select>

          {/* Grid and List View */}
          <div className="mb-6 flex gap-3">

            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg px-4 py-2 ${
                viewMode === "grid"
                  ? "bg-yellow-400 text-black"
                  : "bg-[#151515] text-white"
              }`}
            >
              Grid View
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`rounded-lg px-4 py-2 ${
                viewMode === "list"
                  ? "bg-yellow-400 text-black"
                  : "bg-[#151515] text-white"
              }`}
            >
              List View
            </button>

          </div>

          {/* Bulk Delete */}
          {selectedNotes.length > 0 && activeTab !== "trash" && (
            <button
              onClick={handleBulkDelete}
              className="mb-6 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-500"
            >
              Delete Selected ({selectedNotes.length})
            </button>
          )}

          {/* Note Form */}
          {showForm && (
            <NoteForm
              onClose={() => {
                setShowForm(false);
                setEditingNote(null);
              }}
              onSave={handleSaveNote}
              editingNote={editingNote}
              notes={notes}
            />
          )}

          {/* Notes Display */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-5"
            }
          >

            {sortedNotes.length > 0 ? (

              sortedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  content={note.content}
                  category={note.category}
                  color={note.color}
                  date={note.date}
                  isPinned={note.isPinned}
                  onPin={() => handlePinNote(note.id)}
                  isArchived={note.isArchived}
                  isDeleted={note.isDeleted}
                  onArchive={() => handleArchiveNote(note.id)}
                  onEdit={() => handleEditNote(note)}
                  onDelete={() => handleDeleteNote(note.id)}
                  onRestore={() => handleRestoreNote(note.id)}
                  onPermanentDelete={() => handlePermanentDelete(note.id)}
                  isSelected={selectedNotes.includes(note.id)}
                  onSelect={() => handleSelectNote(note.id)}
                />
              ))

            ) : (

              <div className={viewMode === "grid" ? "col-span-full" : "w-full"}>
                <EmptyState
                  activeTab={activeTab}
                  onNewNote={() => {
                    setEditingNote(null);
                    setShowForm(true);
                  }}
                />
              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default App;
