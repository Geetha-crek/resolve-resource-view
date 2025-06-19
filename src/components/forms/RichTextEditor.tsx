
import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-slate-300 rounded-md">
      <style dangerouslySetInnerHTML={{
        __html: `
          div[contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #6b7280;
            pointer-events: none;
          }
        `
      }} />
      <div className="flex gap-2 p-2 border-b border-slate-200 bg-slate-50">
        <button
          type="button"
          onClick={() => formatText('bold')}
          className="px-2 py-1 text-sm font-bold hover:bg-slate-200 rounded"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => formatText('italic')}
          className="px-2 py-1 text-sm italic hover:bg-slate-200 rounded"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => formatText('underline')}
          className="px-2 py-1 text-sm underline hover:bg-slate-200 rounded"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => formatText('insertUnorderedList')}
          className="px-2 py-1 text-sm hover:bg-slate-200 rounded"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => formatText('insertOrderedList')}
          className="px-2 py-1 text-sm hover:bg-slate-200 rounded"
        >
          1. List
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[120px] p-3 focus:outline-none"
        data-placeholder={placeholder}
        style={{
          whiteSpace: 'pre-wrap'
        }}
      />
    </div>
  );
};
