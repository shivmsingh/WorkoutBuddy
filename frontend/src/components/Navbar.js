import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container">
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/allworkouts" className="nav-link">
            All Workouts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
