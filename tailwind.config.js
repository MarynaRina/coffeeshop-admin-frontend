/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#C8A27A", // Основний бежевий
          secondary: "#8B5E3B", // Темний коричневий
          light: "#F3EDE3", // Світлий фон
          accent: "#E4D5C7", // Додатковий кремовий
        },
        fontFamily: {
          sans: ["Poppins", "sans-serif"], // Використовуємо стильний шрифт
        },
      },
    },
    plugins: [],
  };