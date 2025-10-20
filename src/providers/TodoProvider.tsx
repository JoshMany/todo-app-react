import type { ReactNode } from "react";
import useTodoList from "../hooks/useTodoList";
import { TodoContext } from "../contexts/TodoContext";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, addItem, deleteItem, modifyItem] = useTodoList();

  const value = {
    todos,
    addItem,
    deleteItem,
    modifyItem,
  };

  return <TodoContext value={value}>{children}</TodoContext>;
}
