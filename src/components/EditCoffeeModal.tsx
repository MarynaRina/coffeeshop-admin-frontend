import { useState } from "react";
import { ICoffee } from "../types/ICoffee";

interface EditCoffeeModalProps {
  coffee: ICoffee;
  onSave: (updatedCoffee: ICoffee) => Promise<void>;
  onClose: () => void;
}

const EditCoffeeModal: React.FC<EditCoffeeModalProps> = ({
  coffee,
  onSave,
  onClose,
}) => {
  const [editedCoffee, setEditedCoffee] = useState<ICoffee>(coffee);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedCoffee((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log("Updating coffee:", editedCoffee);
      console.log(`Updating coffee with ID: ${editedCoffee.id}`);

      const response = await fetch(
        `http://localhost:5001/update-coffee/${editedCoffee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedCoffee),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Coffee updated successfully!");
      onSave(editedCoffee);
      onClose();
    } catch (error) {
      console.error("Error updating coffee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-coffee-500 mb-4">Edit Coffee</h2>

        <input
          type="text"
          name="name"
          value={editedCoffee.name}
          onChange={handleChange}
          className="w-full p-3 rounded-full border border-accent mb-3 focus:outline-none focus:ring-2 focus:ring-coffee-500"
        />

        <input
          type="number"
          name="price"
          value={editedCoffee.price}
          onChange={handleChange}
          className="w-full p-3 rounded-full border border-accent mb-3 focus:outline-none focus:ring-2 focus:ring-coffee-500"
        />

        <input
          type="text"
          name="imageUrl"
          value={editedCoffee.imageUrl}
          onChange={handleChange}
          className="w-full p-3 rounded-full border border-accent mb-3 focus:outline-none focus:ring-2 focus:ring-coffee-500"
        />

        <textarea
          name="description"
          value={editedCoffee.description}
          onChange={handleChange}
          placeholder="Enter coffee description"
          className="w-full p-3 rounded-lg border border-accent mb-3 focus:outline-none focus:ring-2 focus:ring-coffee-500"
        ></textarea>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className={`w-1/2 p-3 rounded-full font-bold transition-all duration-300 transform mr-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-coffee-500 text-white hover:bg-coffee-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onClose}
            className="w-1/2 p-3 rounded-full font-bold transition-all duration-300 transform bg-gray-100 text-coffee-500 hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoffeeModal;
