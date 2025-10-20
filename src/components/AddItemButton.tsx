import { useState } from "react";
import AddItemForm from "./addItemForm";

function AddItemButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <button
        className="w-fit bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 active:scale-95 transition-transform"
        onClick={openDialog}
      >
        Add Item
      </button>
      <AddItemForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}

export default AddItemButton;
