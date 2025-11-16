import EllipsisVerticalIcon from "@/assets/icons/EllipsisVerticalIcon";
import useTodos from "@/hooks/useTodos";
import { useRef } from "react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface TodoCardDropdownOptionsProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  uuid: string;
}

const TodoCardDropdownOptions = ({
  isOpen,
  onToggle,
  onClose,
  uuid,
}: TodoCardDropdownOptionsProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { deleteItem } = useTodos();

  const onDelete = () => {
    deleteItem(uuid);
  };

  const options: DropdownOption[] = [{ value: "delete", label: "Delete" }];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const handleSelect = (option: DropdownOption) => {
    switch (option.value) {
      case "delete":
        onDelete?.();
        break;
    }
    onClose();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-700 focus:outline-none transition-colors"
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Icono de tres puntos verticales */}
        <EllipsisVerticalIcon className="text-gray-200" size={16} />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-neutral-950 ring-1 ring-neutral-100 ring-opacity-5 focus:outline-none z-50 animate-in fade-in duration-100 text-white">
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCardDropdownOptions;
