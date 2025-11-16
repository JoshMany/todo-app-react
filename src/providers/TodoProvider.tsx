import type { ReactNode } from "react";
import useTodoList from "../hooks/useTodoList";
import { TodoContext } from "../contexts/TodoContext";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [
    todos,
    addItem,
    deleteItem,
    modifyItem,
    reorderItems,
    pinnedItems,
    pinItem,
    unpinItem,
    nonPinnedItems,
  ] = useTodoList();

  const value = {
    todos,
    addItem,
    deleteItem,
    modifyItem,
    reorderItems,
    pinnedItems,
    pinItem,
    unpinItem,
    nonPinnedItems,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
