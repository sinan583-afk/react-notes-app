
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

import {
  Bold,
  Italic,
  List,
  ListOrdered
} from "lucide-react";

function RichTextEditor({ content, onChange }) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
    ],

    content: content || "<p></p>",
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content || "<p></p>");
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const toolbarButtons = [
    {
      label: "Bold",
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold")
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic")
    },
    {
      label: "Bullet List",
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList")
    },
    {
      label: "Numbered List",
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList")
    }
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101010] transition-colors focus-within:border-yellow-500/40">

      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-[#181818] p-3">

        <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Formatting
        </span>

        {toolbarButtons.map((button) => {
          const Icon = button.icon;

          return (
            <button
              key={button.label}
              type="button"
              onClick={button.action}
              title={button.label}
              aria-label={button.label}
              aria-pressed={button.active}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 ${
                button.active
                  ? "border-yellow-500/30 bg-yellow-500/15 text-yellow-400"
                  : "border-transparent text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
            </button>
          );
        })}

      </div>

      <div className="min-h-[180px] p-4">
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2">

        <span className="text-xs text-gray-600">
          Rich Text Editor
        </span>

        <span className="text-xs text-gray-600">
          Bold · Italic · Lists
        </span>

      </div>

    </div>
  );
}

export default RichTextEditor;
