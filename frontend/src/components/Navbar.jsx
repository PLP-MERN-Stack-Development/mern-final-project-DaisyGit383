import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path ? "underline font-bold" : "";

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        CBC Peer Tutoring
      </Link>
      <div className="space-x-4">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
        <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link to="/journal" className={linkClass("/journal")}>Journal</Link>
        <Link to="/resources" className={linkClass("/resources")}>Resources</Link>
        <Link to="/sessions" className={linkClass("/sessions")}>Sessions</Link>
        <Link to="/login" className={linkClass("/login")}>Login</Link>
        <Link to="/register" className={linkClass("/register")}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;