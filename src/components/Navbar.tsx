import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-coffee-400 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">CoffeeShop Admin</h1>

        <div className="space-x-6 hidden md:flex">
          <Link to="/add-coffee" className="hover:text-accent transition font-medium">Add Coffee</Link>
          <Link to="/coffee-list" className="hover:text-accent transition font-medium">Coffee List</Link>
        </div>

        <div className="md:hidden">
          <button className="text-coffee-400 focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;