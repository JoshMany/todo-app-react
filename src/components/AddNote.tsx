import { useCallback, useEffect, useRef, useState } from "react";
import CheckIcon from "@icons/CheckIcon";
import useTodos from "@/hooks/useTodos";
import BaseLineIcon from "@/assets/icons/BaseLineIcon";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { EditorState } from "lexical";
import { $getRoot } from "lexical";

// Plugin para limpiar el editor al guardar
function ClearEditorPlugin({
  shouldClear,
  onCleared,
}: {
  shouldClear: boolean;
  onCleared: () => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (shouldClear) {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
      });
      onCleared();
    }
  }, [shouldClear, editor, onCleared]);

  return null;
}

function AddNote() {
  const [isEditing, setIsEditing] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [shouldClearEditor, setShouldClearEditor] = useState(false);
  const { addItem } = useTodos();
  const componentContainerRef = useRef<HTMLElement>(null);
  const mainNoteTitleRef = useRef<HTMLInputElement>(null);
  const editorContentRef = useRef<string>("");

  // Function to handle focus on any part of the component
  const handleFocus = () => {
    setIsEditing(true);
  };

  // Function to save note
  const saveNote = useCallback(() => {
    const title = mainNoteTitleRef.current?.value.trim() || "";
    const content = editorContentRef.current.trim();

    // Solo guardar si hay título o contenido
    if (title !== "" || content !== "") {
      addItem({
        title,
        content,
        completed: false,
      });

      // Limpiar los campos después de guardar
      if (mainNoteTitleRef.current) {
        mainNoteTitleRef.current.value = "";
      }
      editorContentRef.current = "";
      setShouldClearEditor(true);
    }
  }, [addItem]);

  // Function to handle clicks outside the component
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        componentContainerRef.current &&
        !componentContainerRef.current.contains(event.target as Node)
      ) {
        // Guardar la nota antes de salir del modo edición
        saveNote();
        setIsEditing(false);
        setShowToolbar(false);
      }
    },
    [saveNote]
  );

  // Function to extract plain text from editor state
  const handleEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      editorContentRef.current = textContent;
    });
  };

  const initialLexicalConfig = {
    namespace: "note-editor",
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      LinkNode,
      AutoLinkNode,
    ],
    theme: {
      code: "editor-code",
      heading: {
        h1: "editor-heading-h1",
        h2: "editor-heading-h2",
        h3: "editor-heading-h3",
        h4: "editor-heading-h4",
        h5: "editor-heading-h5",
      },
      image: "editor-image",
      link: "editor-link",
      list: {
        listitem: "editor-listitem",
        nested: {
          listitem: "editor-nested-listitem",
        },
        ol: "editor-list-ol",
        ul: "editor-list-ul",
      },
      paragraph: "editor-paragraph",
      placeholder: "editor-placeholder",
      quote: "editor-quote",
      text: {
        bold: "editor-text-bold",
        code: "editor-text-code",
        hashtag: "editor-text-hashtag",
        italic: "editor-text-italic",
        overflowed: "editor-text-overflowed",
        strikethrough: "editor-text-strikethrough",
        underline: "editor-text-underline",
        underlineStrikethrough: "editor-text-underlineStrikethrough",
      },
    },
    onError: (error: Error) => {
      throw error;
    },
  };

  // Effect to add/remove the click outside event listener
  useEffect(() => {
    if (isEditing) {
      // Add listener when entering editing mode
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup: remove listener when unmounting or exiting editing
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isEditing, handleClickOutside]);

  return (
    <section
      className={`border border-green-500 w-full md:max-w-2/3 lg:max-w-1/2 xl:max-w-1/3 mx-auto flex flex-col items-center mt-6 ${
        isEditing ? "pt-3" : ""
      }`}
      ref={componentContainerRef}
      onFocus={handleFocus}
    >
      <LexicalComposer initialConfig={initialLexicalConfig}>
        <ToolbarPlugin isVisible={showToolbar} />
        <ClearEditorPlugin
          shouldClear={shouldClearEditor}
          onCleared={() => setShouldClearEditor(false)}
        />
        {isEditing && (
          <div className="w-full flex flex-row mb-3 pl-6">
            <input
              type="text"
              className="w-full bg-transparent outline-none placeholder-gray-500 text-xl"
              placeholder="Title"
              ref={mainNoteTitleRef}
              key={"main-note-title"}
              id="main-note-title"
            />
          </div>
        )}

        <div className="w-full flex flex-row justify-between items-center pl-6">
          <div
            className={`w-full bg-transparent outline-none placeholder-gray-500 resize-none overflow-auto ${
              isEditing ? "align-top" : "leading-10"
            }`}
          >
            <div className="relative">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="w-full bg-transparent outline-none placeholder-gray-500 resize-none overflow-auto min-h-10"
                    aria-placeholder={"Create new note..."}
                    placeholder={
                      <div className="absolute top-0 left-0 text-gray-500 pointer-events-none">
                        Create new note...
                      </div>
                    }
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <OnChangePlugin onChange={handleEditorChange} />
              <HistoryPlugin />
              <ListPlugin />
              <LinkPlugin />
            </div>
          </div>

          {!isEditing && (
            <button className="text-green-500 hover:bg-green-500 hover:text-green-950 active:bg-green-950 active:scale-95 transition-all duration-150 ease-in-out p-2 flex items-center">
              <CheckIcon />
            </button>
          )}
        </div>
        {isEditing && (
          <div className="w-full h-fit justify-between flex pt-4 mb-2 px-3">
            <button
              className="p-1 hover:bg-green-800/10 text-white text-base rounded active:scale-95 transition-transform"
              onClick={() => setShowToolbar(!showToolbar)}
              aria-label="Toggle formatting toolbar"
            >
              <BaseLineIcon />
            </button>
            <button
              className="px-4 py-1 hover:bg-green-800/10 text-white text-base rounded active:scale-95 transition-transform"
              onClick={() => {
                saveNote();
                setIsEditing(false);
                setShowToolbar(false);
              }}
            >
              Close
            </button>
          </div>
        )}
      </LexicalComposer>
    </section>
  );
}

export default AddNote;
