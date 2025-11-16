import { createContext } from "react";
import type { List, ListItem } from "../types/list";

interface TodoContextType {
  todos: List;
  addItem: (value: Pick<ListItem, "title" | "content" | "completed">) => void;
  deleteItem: (uuid: string) => void;
  modifyItem: (uuid: string, updatedValue: Partial<ListItem>) => void;
  reorderItems: (
    reorderMethod: "fromIndex" | "fromUUID",
    from: number | string,
    to: number | string
  ) => void;
  pinnedItems: ListItem[];
  pinItem: (uuid: string) => void;
  unpinItem: (uuid: string) => void;
  nonPinnedItems: ListItem[];
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);
