import { useState } from "react";
import { ICoffee } from "../types/ICoffee";
import { addCoffee } from "../services/coffeeServices";

const AddCoffee = () => {
  const [coffee, setCoffee] = useState<ICoffee>({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
    category: "hot",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCoffee((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await addCoffee(coffee);

    if (success) {
      alert("Coffee added successfully!");
      setCoffee({
        name: "",
        price: 0,
        imageUrl: "",
        description: "",
        category: "hot",
      });
    } else {
      alert("Failed to add coffee.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-light p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-secondary mb-4 text-center text-coffee-400">
        Add New Coffee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={coffee.name}
          onChange={handleChange}
          placeholder="Coffee name"
          className="w-full p-3 rounded-full border border-accent focus:outline-none focus:ring-1 focus:ring-secondary"
          required
        />

        <input
          type="number"
          name="price"
          value={coffee.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 rounded-full border border-accent focus:outline-none focus:ring-1 focus:ring-secondary"
          required
        />

        <input
          type="text"
          name="imageUrl"
          value={coffee.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 rounded-full border border-accent focus:outline-none focus:ring-1 focus:ring-secondary"
          required
        />

        <textarea
          name="description"
          value={coffee.description}
          onChange={handleChange}
          placeholder="Coffee description"
          className="w-full p-3 rounded-lg border border-accent focus:outline-none focus:ring-1 focus:ring-secondary"
        ></textarea>

        <select
          name="category"
          value={coffee.category}
          onChange={handleChange}
          className="w-full p-3 rounded-full border border-accent bg-white focus:outline-none focus:ring-1 focus:ring-secondary"
        >
          <option value="hot">Hot</option>
          <option value="cold">Cold</option>
          <option value="others">Other</option>
        </select>

        <button
          type="submit"
          className="w-full bg-coffee-500 text-amber-950 cursor-pointer p-3 rounded-full font-bold hover:bg-primary transition"
        >
          Add Coffee
        </button>
      </form>
    </div>
  );
};

export default AddCoffee;
