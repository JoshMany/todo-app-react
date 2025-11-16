import type { ListItem } from "@/types/list";
import { MenuItem, Menu } from "./DropdownMenu";
import useTodos from "@/hooks/useTodos";
import type { DragEvent } from "react";
import PinIcon from "@/assets/icons/PinIcon";
import UnpinIcon from "@/assets/icons/UnpinIcon";

interface TodoCardProps {
  todo: ListItem;
  isDragging?: boolean;
  isDropTarget?: boolean;
  draggable?: boolean;
  onDragStart?: (id: string, e: DragEvent<HTMLDivElement>) => void;
  onDragOver?: (id: string, e: DragEvent<HTMLDivElement>) => void;
  onDrop?: (id: string, e: DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (id: string, e: DragEvent<HTMLDivElement>) => void;
}

function TodoCard({
  todo,
  isDragging = false,
  isDropTarget = false,
  draggable = true,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TodoCardProps) {
  const { deleteItem, pinItem, unpinItem } = useTodos();

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => {
        try {
          e.dataTransfer.setData("text/plain", todo.uuid);
        } catch {
          console.warn(
            "Ignoring dataTransfer error in unsupported environments"
          );
        }
        onDragStart?.(todo.uuid, e);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver?.(todo.uuid, e);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop?.(todo.uuid, e);
      }}
      onDragEnd={(e) => {
        onDragEnd?.(todo.uuid, e);
      }}
      className={`relative transition-all duration-300 bg-neutral-950 box-border w-full h-fit rounded-lg shadow-lg ease-in-out border-2 group inline-flex flex-col justify-between ${
        isDragging
          ? "opacity-60 scale-[1.02] border-green-500 shadow-2xl cursor-grabbing"
          : "border-green-700 hover:shadow-xl hover:border-green-500 cursor-grab"
      } ${isDropTarget ? "ring-2 ring-green-500 ring-offset-0" : ""}`}
    >
      {/* Pin Item */}
      <button
        onClick={() =>
          todo.pinned ? unpinItem(todo.uuid) : pinItem(todo.uuid)
        }
        className="absolute invisible group-hover:visible -top-2.5 -right-2.5 bg-green-700 p-1 rounded-full"
      >
        {todo.pinned ? <UnpinIcon size={22} /> : <PinIcon size={22} />}
      </button>

      <div className="m-4 mb-1 flex-1">
        {/* Header */}
        {todo.title && (
          <h3 className="font-bold text-lg mb-2 text-white">{todo.title}</h3>
        )}

        {/* Content (Dynamic Height) */}
        {todo.content && (
          <p className="text-gray-300 text-sm mb-3 line-clamp-[12] wrap-break-word">
            {todo.content}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="invisible group-hover:visible flex w-full h-fit p-1 relative z-50">
        <div className="flex w-full justify-end">
          <Menu>
            <MenuItem label="Delete" onClick={() => deleteItem(todo.uuid)} />
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
