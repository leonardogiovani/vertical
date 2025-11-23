import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote } from 'lucide-react'
import clsx from 'clsx'

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null

    const buttons = [
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive('heading', { level: 1 }) },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
        { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive('orderedList') },
        { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
    ]

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-2 flex gap-2 overflow-x-auto bg-white dark:bg-zinc-900 sticky top-0 z-10">
            {buttons.map((btn, index) => (
                <button
                    key={index}
                    onClick={btn.action}
                    className={clsx(
                        "p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                        btn.isActive ? "text-primary bg-green-50 dark:bg-green-900/20" : "text-zinc-600 dark:text-zinc-400"
                    )}
                >
                    <btn.icon size={18} />
                </button>
            ))}
        </div>
    )
}

export default function ArticleEditor() {
    const editor = useEditor({
        extensions: [StarterKit],
        content: `
      <h1>Hello World</h1>
      <p>Start writing your article here...</p>
    `,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-8 py-6',
            },
        },
    })

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-950 overflow-hidden">
            <MenuBar editor={editor} />
            <div className="flex-1 overflow-y-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
