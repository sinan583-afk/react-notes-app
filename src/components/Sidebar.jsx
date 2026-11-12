
import {
  NotebookPen,
  Pin,
  Archive,
  Trash2,
  ChevronRight
} from "lucide-react";

function Sidebar({ activeTab, onTabChange }) {

  const menuItems = [
    {
      id: "all",
      label: "All Notes",
      icon: NotebookPen
    },
    {
      id: "pinned",
      label: "Pinned",
      icon: Pin
    },
    {
      id: "archived",
      label: "Archived",
      icon: Archive
    },
    {
      id: "trash",
      label: "Trash",
      icon: Trash2
    }
  ];

  return (
    <aside className="w-full border-b border-yellow-500/10 bg-[#0a0a0a] p-4 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">

      {/* Workspace Heading */}
      <h2 className="mb-5 px-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
        Workspace
      </h2>

      {/* Navigation */}
      <nav className="flex flex-wrap gap-2 md:flex-col">

        {menuItems.map((item) => {

          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.05)]"
                  : "border border-transparent text-gray-400 hover:border-yellow-500/10 hover:bg-[#171717] hover:text-white"
              }`}
            >

              <span className="flex items-center gap-3">

                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-500 group-hover:text-yellow-400"
                  }`}
                />

                {item.label}

              </span>

              {isActive && (
                <ChevronRight
                  size={17}
                  className="text-yellow-400"
                />
              )}

            </button>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;
