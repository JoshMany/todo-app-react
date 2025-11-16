import { useState } from "react";
import type { List, ListItem } from "../types/list";

/**
 * Custom React hook for managing a todo list with localStorage persistence.
 *
 * @description This hook provides functionality to manage a todo list that persists
 * data in the browser's localStorage. It handles CRUD operations (Create, Read, Update, Delete)
 * for todo items and automatically syncs changes with localStorage. This hook should be used only within a TodoProvider.
 *
 * @returns A tuple containing:
 * - `storedValue`: The current todo list state containing items and timestamps
 * - `addItem`: Function to add a new todo item to the list
 * - `deleteItem`: Function to remove a todo item by index
 * - `modifyItem`: Function to update an existing todo item by index
 *
 * @example
 * ```tsx
 * const [todoList, addItem, deleteItem, modifyItem] = useTodoList();
 *
 * // Add a new todo item
 * addItem({
 *   title: "Buy groceries",
 *   content: "Milk, bread, eggs",
 *   completed: false
 * });
 *
 * // Delete an item by index
 * deleteItem(0);
 *
 * // Update an item's completion status
 * modifyItem(0, { completed: true });
 * ```
 *
 * @throws Will log an error to console if localStorage operations fail
 *
 * @since 1.0.0
 *
 * @author José Manuel Muñoz García
 *
 * @alias useTodoList
 *
 * @access public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage MDN localStorage documentation}
 *
 * @augments useState<List>
 */
function useTodoList() {
  const [storedValue, setStoredValue] = useState<List>(() => {
    try {
      const list = window.localStorage.getItem("todos");
      return list
        ? JSON.parse(list)
        : { items: [], createdAt: new Date(), updatedAt: new Date() };
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return { items: [], createdAt: new Date(), updatedAt: new Date() };
    }
  });

  const pinnedItems = storedValue.items.filter((item) => item.pinned);
  const nonPinnedItems = storedValue.items.filter((item) => !item.pinned);

  const addItem = (
    value: Pick<ListItem, "title" | "content" | "completed">
  ) => {
    const structuredValue = {
      ...value,
      uuid: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      pinned: false,
    };
    const newList = {
      ...storedValue,
      items: [...storedValue.items, structuredValue],
    };
    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  const deleteItem = (uuid: string) => {
    const newList = {
      ...storedValue,
      items: storedValue.items.filter((item) => item.uuid !== uuid),
    };
    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  const modifyItem = (uuid: string, updatedValue: Partial<ListItem>) => {
    const newList = {
      ...storedValue,
      items: storedValue.items.map((item) =>
        item.uuid === uuid ? { ...item, ...updatedValue } : item
      ),
    };
    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  const reorderItems = (
    reorderMethod: "fromIndex" | "fromUUID",
    from: number | string,
    to: number | string
  ) => {
    const newItems = [...storedValue.items];
    const fromIndex =
      typeof from === "number"
        ? from
        : newItems.findIndex((item) => item.uuid === from);
    const toIndex =
      typeof to === "number"
        ? to
        : newItems.findIndex((item) => item.uuid === to);
    if (fromIndex === -1 || toIndex === -1) return;

    if (reorderMethod === "fromIndex") {
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
    } else {
      const [removed] = newItems.splice(fromIndex, 1);
      newItems.splice(toIndex, 0, removed);
    }

    const newList = {
      ...storedValue,
      items: newItems,
      updatedAt: new Date(),
    };

    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  const pinItem = (uuid: string) => {
    modifyItem(uuid, { pinned: true });
  };

  const unpinItem = (uuid: string) => {
    modifyItem(uuid, { pinned: false });
  };

  return [
    storedValue,
    addItem,
    deleteItem,
    modifyItem,
    reorderItems,
    pinnedItems,
    pinItem,
    unpinItem,
    nonPinnedItems,
  ] as const;
}

export default useTodoList;
