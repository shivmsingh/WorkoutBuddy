import { useNavigate } from "react-router-dom";
import AddWorkoutModal from "./AddWorkoutModal";
import { useState } from "react";

const Navbar = ({ isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("accessToken", null);
    navigate(0);
  };

  if (isLoggedIn) {
    return (
      <>
        <header>
          <nav>
            <ul>
              <li>
                <strong>Workout Buddie 💪</strong>
              </li>
            </ul>
            <ul>
              <li>
                <button className="primary" onClick={() => setShowModal(true)}>
                  Add Workout
                </button>
              </li>
              <AddWorkoutModal showModal={showModal} setShowModal={setShowModal} />
              <li>
                <button className="secondary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
  }
};

export default Navbar;
