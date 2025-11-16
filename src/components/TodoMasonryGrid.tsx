import { useMemo, useState, useEffect } from "react";
import useTodos from "@/hooks/useTodos";
import TodoCard from "@/components/TodoCard";
import type { ListItem } from "@/types/list";

interface TodoMasonryGridProps {
  viewMethod?: "all" | "pinned";
}

function TodoMasonryGrid({ viewMethod = "all" }: TodoMasonryGridProps) {
  const { nonPinnedItems, pinnedItems, reorderItems } = useTodos();
  const [draggingItem, setDraggingItem] = useState<string>("");
  const [overItem, setOverItem] = useState<string>("");

  // Get items based on view method
  const itemsToDisplay = viewMethod === "pinned" ? pinnedItems : nonPinnedItems;

  // Reverse items to show most recent first
  const reversedItems = useMemo(
    () => [...itemsToDisplay].reverse(),
    [itemsToDisplay]
  );

  const [localItems, setLocalItems] = useState<ListItem[]>(reversedItems);

  // Sync items when they change externally
  useEffect(() => {
    setLocalItems(reversedItems);
  }, [reversedItems]);

  // Detects the number of columns based on breakpoints (sm:1, md:3, lg:5, xl:7)
  const [colCount, setColCount] = useState<number>(1);

  useEffect(() => {
    const computeColCount = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 7; // xl
      if (w >= 1024) return 5; // lg
      if (w >= 768) return 3; // md
      return 1; // base/sm
    };
    const update = () => setColCount(computeColCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Distributes items into `colCount` columns, each column starts at a different offset
  // (col 0: idx % colCount === 0, col 1: idx % colCount === 1, ...)
  const columnsData = useMemo(() => {
    const cols: ListItem[][] = Array.from({ length: colCount }, () => []);
    localItems.forEach((item, idx) => {
      const colIndex = idx % colCount;
      cols[colIndex].push(item);
    });
    return cols;
  }, [localItems, colCount]);

  // Handlers de DnD nativo (solo detección)
  const handleCardDragStart = (id: string) => {
    setDraggingItem(id);
  };

  const handleCardDragOver = (
    id: string,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (id !== draggingItem) {
      setOverItem(id);
    }
  };

  const handleCardDrop = (
    _targetId: string,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setOverItem("");
    setDraggingItem("");

    reorderItems("fromUUID", draggingItem, overItem);
  };

  const handleCardDragEnd = () => {
    setOverItem("");
    setDraggingItem("");
  };

  return (
    <div className={`px-4 w-full h-fit grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3`}>
      {columnsData.map((colItems, colIdx) => (
        <div className="flex flex-col gap-3" key={colIdx}>
          {colItems.map((todo) => (
            <TodoCard
              todo={todo}
              key={todo.uuid}
              isDragging={draggingItem === todo.uuid}
              isDropTarget={overItem === todo.uuid}
              onDragStart={(id) => handleCardDragStart(id)}
              onDragOver={(id, e) => handleCardDragOver(id, e)}
              onDrop={(id, e) => handleCardDrop(id, e)}
              onDragEnd={() => handleCardDragEnd()}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TodoMasonryGrid;
