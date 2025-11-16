import NoteIcon from "@icons/NoteIcon";
import AddNote from "@/components/AddNote";
import TodoMasonryGrid from "@/components/TodoMasonryGrid";
import useTodos from "./hooks/useTodos";
import ClipboardTypeIcon from "./assets/icons/ClipboardTypeIcon";

function App() {
  const { nonPinnedItems, pinnedItems } = useTodos();

  return (
    <main className="w-full h-full min-h-dvh bg-neutral-950 text-white px-6 py-2 flex flex-col">
      {/* Header Section */}
      <div className="mx-auto flex flex-row w-full justify-between">
        <div className="flex flex-row items-center space-x-2">
          <NoteIcon className="w-8 h-8 text-green-500" />
          <h1 className="font-bold text-4xl">Tasks</h1>
        </div>
      </div>

      {/* Creation Section */}
      <AddNote />

      {/* Pinned Todos Section */}
      {pinnedItems?.length ? (
        <>
          <br />
          <h2 className="font-bold text-2xl mb-4">Pinned</h2>
          <TodoMasonryGrid viewMethod="pinned" />
          <br />
          <hr />
        </>
      ) : null}

      {/* All Todos Section */}
      {nonPinnedItems?.length ? (
        <>
          <br />
          <TodoMasonryGrid />
        </>
      ) : null}

      {/* Empty State */}
      {!nonPinnedItems?.length && !pinnedItems?.length ? (
        <div className="h-[50%] mt-[12vh] flex items-center justify-center text-center">
          <div className="h-fit w-fit">
            <ClipboardTypeIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-xl">Add tasks to get started!</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default App;
