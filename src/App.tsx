import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddCoffee from "./components/AddCoffee";
import CoffeeList from "./components/CoffeeList";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<AddCoffee />} />
          <Route path="/add-coffee" element={<AddCoffee />} />
          <Route path="/coffee-list" element={<CoffeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
