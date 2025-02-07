import { useEffect, useState } from "react";
import { ICoffee } from "../types/ICoffee";
import { fetchCoffees, updateCoffee } from "../services/coffeeServices";
import EditCoffeeModal from "./EditCoffeeModal";
import modify_icon from "../assets/icons/modify_icon.svg";

const CoffeeList = () => {
  const [coffees, setCoffees] = useState<ICoffee[]>([]);
  const [editCoffee, setEditCoffee] = useState<ICoffee | null>(null);

  useEffect(() => {
    loadCoffees();
  }, []);

  const loadCoffees = async () => {
    const data = await fetchCoffees();
    setCoffees(data);
  };

  const handleEdit = (coffee: ICoffee) => {
    setEditCoffee(coffee);
  };

  const handleSave = async (updatedCoffee: ICoffee) => {
    const success = await updateCoffee(updatedCoffee);
    if (success) {
      loadCoffees();
      setEditCoffee(null);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {coffees.map((c) => (
    <div
      key={c.id}
      className="p-4 bg-light shadow-md rounded-lg flex flex-col items-center relative"
    >
      <button
        className="absolute top-2 right-2 text-secondary hover:text-primary transition"
        onClick={() => handleEdit(c)}
      >
        <img src={modify_icon} alt="Edit" className="w-5 h-5" />
      </button>

      <img
        src={c.imageUrl}
        alt={c.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <h3 className="text-lg font-bold mt-2">{c.name}</h3>

      <p className="text-secondary font-semibold">${Number(c.price)}</p>

      <p className="text-sm text-gray-600 mt-2 text-center w-full px-2">
        {c.description}
      </p>
    </div>
  ))}

      {editCoffee && (
        <EditCoffeeModal
          coffee={editCoffee}
          onSave={handleSave}
          onClose={() => setEditCoffee(null)}
        />
      )}
    </div>
  );
};

export default CoffeeList;
