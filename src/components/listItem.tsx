import useTodos from "../hooks/useTodos";
import type { ListItem } from "../types/list";
import TrashIcon from "../assets/TrashIcon";

interface Props {
  itemKey: number;
  item: ListItem;
}

function ListItemComponent({ itemKey, item }: Props) {
  const { deleteItem } = useTodos();

  return (
    <li className="flex flex-row justify-between bg-slate-800 p-4 rounded shadow hover:bg-slate-700 transition-colors">
      {item.title}
      <button
        className="ml-4 text-red-500 hover:text-red-400 active:scale-95 transition-transform"
        onClick={() => deleteItem(itemKey)}
      >
        <TrashIcon />
      </button>
    </li>
  );
}

export default ListItemComponent;
