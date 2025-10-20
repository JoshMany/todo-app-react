import AddItemButton from "./components/AddItemButton";
import ListItemComponent from "./components/listItem";
import useTodos from "./hooks/useTodos";

function App() {
  const { todos } = useTodos();

  return (
    <main className="w-full h-screen bg-slate-950 text-white px-6 py-2">
      <div className="flex flex-row w-full justify-between">
        <h1 className="font-bold text-4xl">Tasks</h1>
        <AddItemButton />
      </div>

      <section>
        {todos.items.length === 0 ? (
          <p className="mt-6 text-gray-400">No tasks available.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {todos.items.map((todo, index) => (
              <ListItemComponent key={index} itemKey={index} item={todo} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
