import { useEffect, useRef, useState } from "react";
import useTodos from "../hooks/useTodos";

interface AddItemFormProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddItemForm({ isOpen, onClose }: AddItemFormProps) {
  const { addItem } = useTodos();
  const formRef = useRef<HTMLFormElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-resize textarea
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Automatically focus the title input when the dialog opens and reset states
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }

    // Reset states when modal opens
    if (isOpen) {
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Close the dialog when the Escape key is pressed
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const title = formData.get("title") as string;
      const content = formData.get("content") as string;

      // Validate non-empty title
      if (!title.trim()) {
        throw new Error("Title is required");
      }

      // Simulate async operation (you can replace this with actual async logic)
      await new Promise((resolve) => setTimeout(resolve, 300));

      addItem({
        title: title.trim(),
        content: content.trim(),
        completed: false,
      });

      // Clear the form and close modal on success
      if (formRef.current) {
        formRef.current.reset(); // Reset the form using the ref
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      open={isOpen}
      onClose={onClose}
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-lg shadow-xl backdrop:bg-black backdrop:bg-opacity-50 p-0 transition-all duration-200 ease-in-out ${
        isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <form
        ref={formRef}
        method="dialog"
        className="p-4 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold">Add New Item</h2>

        {error && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <input
          ref={titleInputRef}
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />

        <textarea
          ref={textareaRef}
          name="content"
          placeholder="Content"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[80px]"
          onChange={handleTextareaChange}
          disabled={isSubmitting}
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              "Add Item"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default AddItemForm;
