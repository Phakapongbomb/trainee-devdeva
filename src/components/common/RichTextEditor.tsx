import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List } from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
    if (!editor) {
        return null;
    }

    const buttonClass = (isActive: boolean) =>
        `p-1.5 rounded-lg transition-all ${isActive ? 'bg-blue-600/10 text-blue-600' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`;

    return (
        <div className="flex items-center gap-1 p-2 bg-white border-b border-gray-100">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive('bold'))}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive('italic'))}
                title="Italic"
            >
                <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
                title="Bullet List"
            >
                <List className="w-4 h-4" />
            </button>
        </div>
    );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[120px] px-4 py-3 text-gray-900 prose-ul:list-disc prose-ol:list-decimal',
            },
        },
    });

    return (
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10 transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            {editor && editor.isEmpty && placeholder && (
                <div className="absolute top-[52px] left-4 text-gray-400 pointer-events-none text-sm italic">
                    {placeholder}
                </div>
            )}
        </div>
    );
};

export default RichTextEditor;
