import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          USAGAG
        </Link>
      </div>
    </nav>
  );
};