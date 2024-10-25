"use client";

import { useRef } from "react";

interface RichTextEditorProps {
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Function to apply inline style like <b> using Selection API
  const applyInlineStyle = (tagName: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents(); // Extract selected content

    const wrapper = document.createElement(tagName);
    wrapper.appendChild(selectedText);

    range.insertNode(wrapper); // Insert the new styled node
    handleInput();
  };

  // Function to apply block style (like <p>, <h1>, lists)
  const applyBlockStyle = (tagName: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.extractContents(); // Extract selected content

    const blockWrapper = document.createElement(tagName);
    blockWrapper.appendChild(selectedText);

    range.deleteContents();
    range.insertNode(blockWrapper);

    handleInput();
  };

  // Handles input and sends HTML content to parent via onChange
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex space-x-2">
        <button
          className="rounded bg-gray-200 px-2 py-1"
          onClick={() => applyInlineStyle("b")}>
          Bold
        </button>
        <button
          className="rounded bg-gray-200 px-2 py-1"
          onClick={() => applyBlockStyle("p")}>
          P
        </button>
        <button
          className="rounded bg-gray-200 px-2 py-1"
          onClick={() => applyBlockStyle("h1")}>
          H1
        </button>
        <button
          className="rounded bg-gray-200 px-2 py-1"
          onClick={() => applyBlockStyle("h2")}>
          H2
        </button>
        <button
          className="rounded bg-gray-200 px-2 py-1"
          onClick={() => applyBlockStyle("ul")}>
          UL
        </button>
        <button
          className="rounded bg-gray-200 px-2 py-1"
          onClick={() => applyBlockStyle("ol")}>
          OL
        </button>
      </div>

      {/* Editable div */}
      <div
        className="min-h-[200px] w-full rounded border border-gray-300 bg-gray-50 p-4"
        contentEditable={true}
        onInput={handleInput}
        ref={editorRef}>
        <p>Start typing here...</p>
      </div>
    </div>
  );
};

export default RichTextEditor;
