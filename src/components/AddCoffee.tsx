import { useState, useEffect } from "react";
import { ICoffee } from "../types/ICoffee";

const AddCoffee = () => {
  const [coffee, setCoffee] = useState<ICoffee>({
    name: "",
    price: 0,
    imageUrl: "",
    description: "",
    category: "hot",
  });

  const [coffees, setCoffees] = useState<ICoffee[]>([]);

  useEffect(() => {
    fetchCoffees();
  }, []);

  const fetchCoffees = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-coffees");

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Отримані дані:", data);

      if (!Array.isArray(data)) {
        throw new Error("Отримані дані не є масивом!");
      }

      setCoffees(data);
    } catch (error) {
      console.error("Помилка при отриманні кави:", error);
      setCoffees([]); 
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Переконливо перетворюємо `price` в число
    setCoffee((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Перевіряємо, чи є `imageUrl` коректним URL
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + 
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + 
        "localhost|" + 
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + 
        "\\[?[a-fA-F\\d:]+\\]?)" + 
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + 
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + 
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );

    if (!urlPattern.test(coffee.imageUrl)) {
      alert("Некоректне посилання на зображення!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/add-coffee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...coffee,
          price: Number(coffee.price), // 🔥 Перетворюємо price в число перед відправкою
        }),
      });

      if (response.ok) {
        alert("Каву додано успішно!");
        setCoffee({
          name: "",
          price: 0,
          imageUrl: "",
          description: "",
          category: "hot",
        });
        fetchCoffees(); 
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4">Додати каву</h2>

        <input
          type="text"
          name="name"
          value={coffee.name}
          onChange={handleChange}
          placeholder="Назва кави"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={coffee.price}
          onChange={handleChange}
          placeholder="Ціна"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={coffee.imageUrl}
          onChange={handleChange}
          placeholder="Посилання на зображення"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <textarea
          name="description"
          value={coffee.description}
          onChange={handleChange}
          placeholder="Опис кави"
          className="w-full p-2 mb-3 border rounded"
        ></textarea>

        <select
          name="category"
          value={coffee.category}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded bg-white"
        >
          <option value="hot">Гаряча</option>
          <option value="cold">Холодна</option>
          <option value="others">Інша</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Додати каву
        </button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Список кави</h2>

        {Array.isArray(coffees) && coffees.length > 0 ? (
          coffees.map((c) => (
            <div
              key={c.id}
              className="p-4 bg-gray-100 mb-3 rounded-lg flex items-center gap-4"
            >
              {/* Додаємо зображення кави */}
              <img
                src={c.imageUrl}
                alt={c.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* Текстова інформація */}
              <div>
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p>Ціна: {Number(c.price)} грн</p> {/* 🔥 Відображаємо як число */}
                <p>Категорія: {c.category}</p>
                <p>{c.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Кави поки немає...</p>
        )}
      </div>
    </div>
  );
};

export default AddCoffee;