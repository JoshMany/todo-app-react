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
 * @augments useState
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

  const addItem = (
    value: Pick<ListItem, "title" | "content" | "completed">
  ) => {
    const structuredValue = {
      ...value,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newList = {
      ...storedValue,
      items: [...storedValue.items, structuredValue],
    };
    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  const deleteItem = (index: number) => {
    const newList = {
      ...storedValue,
      items: storedValue.items.filter((_, i) => i !== index),
    };
    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  const modifyItem = (index: number, updatedValue: Partial<ListItem>) => {
    const newList = {
      ...storedValue,
      items: storedValue.items.map((item, i) =>
        i === index ? { ...item, ...updatedValue } : item
      ),
    };
    setStoredValue(newList);
    window.localStorage.setItem("todos", JSON.stringify(newList));
  };

  return [storedValue, addItem, deleteItem, modifyItem] as const;
}

export default useTodoList;
