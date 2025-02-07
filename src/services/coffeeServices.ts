import { ICoffee } from "../types/ICoffee";

const API_URL = "http://localhost:5001";

// Отримати всі кави
export const fetchCoffees = async (): Promise<ICoffee[]> => {
  try {
    const response = await fetch(`${API_URL}/get-coffees`);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Received data is not an array!");
    }

    return data;
  } catch (error) {
    console.error("Error fetching coffees:", error);
    return [];
  }
};

// Додати нову каву
export const addCoffee = async (coffee: ICoffee): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/add-coffee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coffee),
    });

    return response.ok;
  } catch (error) {
    console.error("Error adding coffee:", error);
    return false;
  }
};

export const updateCoffee = async (coffee: ICoffee) => {
  try {
    console.log(`Updating coffee with ID: ${coffee.id}`, coffee);

    const response = await fetch(`${API_URL}/update-coffee/${coffee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...coffee,
        price: Number(coffee.price),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update coffee. Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating coffee:", error);
    return false;
  }
};
