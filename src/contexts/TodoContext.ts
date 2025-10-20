import { createContext } from "react";
import type { List, ListItem } from "../types/list";

interface TodoContextType {
  todos: List;
  addItem: (value: Pick<ListItem, "title" | "content" | "completed">) => void;
  deleteItem: (index: number) => void;
  modifyItem: (index: number, updatedValue: Partial<ListItem>) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
