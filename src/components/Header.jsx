
import {
  NotebookPen,
  Search,
  Plus
} from "lucide-react";

function Header({ onNewNote, searchTerm, onSearch }) {

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0a]/95 px-4 py-4 backdrop-blur-xl sm:px-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10">

            <NotebookPen
              size={23}
              strokeWidth={1.8}
              className="text-yellow-400"
            />

          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Notes<span className="text-yellow-400">App</span>
            </h1>

            <p className="text-xs tracking-wide text-gray-500">
              YOUR PERSONAL WORKSPACE
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="relative w-full md:max-w-md">

          <Search
            size={19}
            strokeWidth={1.8}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search your notes..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#151515] py-3 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 hover:border-yellow-500/30 focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/10"
          />

        </div>

        {/* New Note Button */}
        <button
          onClick={onNewNote}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-yellow-500/20 active:translate-y-0 md:w-auto"
        >

          <Plus size={19} strokeWidth={2.5} />

          New Note

        </button>

      </div>

    </header>
  );
}

export default Header;
