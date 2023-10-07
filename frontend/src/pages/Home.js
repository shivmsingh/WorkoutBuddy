import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { BodyComponent } from "reactjs-human-body";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import Register from "./Register";
import Login from "./Login";

import Navbar from "../components/Navbar";

const Home = () => {
  const [error, setError] = useState(null);
  const { workouts, dispatch } = useWorkoutsContext();
  const [showRegister, setShowRegister] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [part, setPart] = useState("");
  const [gridData, setGridData] = useState(null);
  const [bodyModel, setBodyModel] = useState("male");

  const onChange = (parts) => console.log("Changed Parts:", parts);
  const onClick = (id) => {
    if (id === "head") {
      setPart("Head");
    } else if (id === "chest") {
      setPart("Chest");
    } else if (id === "leftShoulder" || id === "rightShoulder") {
      setPart("Shoulder");
    } else if (id === "leftArm" || id === "rightArm") {
      setPart("Arms");
    } else if (id === "leftHand" || id === "rightHand") {
      setPart("Hands");
    } else if (id === "stomach") {
      setPart("Stomach");
    } else if (id === "leftLeg" || id === "rightLeg") {
      setPart("Legs");
    } else if (id === "leftFoot" || id === "rightFoot") {
      setPart("Feet");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") === "null") {
      setIsLoggedIn(false);
      console.log("User is not logged in.");
    } else {
      setIsLoggedIn(true);
      console.log("User is  logged in.");
    }

    const fetchWorkouts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("https://workoutbuddy-t2yc.onrender.com/api/workouts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const json = await response.json();

        setGridData(
          Array.from({ length: Math.ceil(json.length / 3) }, (_, index) =>
            json.slice(index * 3, (index + 1) * 3)
          )
        );

        if (response.ok) {
          setError(null);
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        setError("Credentials expired, Please login!");
        setIsLoggedIn(false);
        localStorage.setItem("accessToken", null);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  if (isLoggedIn) {
    return (
      <div className="home">
        <div className="workouts">
          <Navbar isLoggedIn={isLoggedIn} />
          <article>
            <header>
              <div role="group">
                <button
                  className={bodyModel === "male" ? "primary" : "outline"}
                  onClick={() => setBodyModel("male")}
                >
                  Male
                </button>
                <button
                  className={bodyModel === "male" ? "outline" : "primary"}
                  onClick={() => setBodyModel("female")}
                >
                  Female
                </button>
              </div>
            </header>
            <BodyComponent
              bodyModel={bodyModel}
              onChange={onChange}
              onClick={onClick}
            />
            <button onClick={() => setPart("")}>Reset Bodypart</button>
          </article>
          {/* {workouts &&
            (part === "" ? (
              <div className="grid">
                {workouts.map((workout) => (
                  <WorkoutDetails workout={workout} key={workout._id} />
                ))}
              </div>
            ) : (
              workouts
                .filter((workout) => workout.part === part)
                .map((workout) => (
                  <WorkoutDetails workout={workout} key={workout._id} />
                ))
            ))} */}
          {gridData &&
            (part === ""
              ? gridData.map((gridItems, gridIndex) => (
                  <div key={gridIndex} className="grid">
                    {gridItems.map((item) => (
                      <WorkoutDetails workout={item} key={item._id} />
                    ))}
                  </div>
                ))
              : gridData.map((gridItems, gridIndex) => (
                  <div key={gridIndex} className="grid">
                    {gridItems
                      .filter((item) => item.part === part)
                      .map((filteredItem) => (
                        <WorkoutDetails
                          workout={filteredItem}
                          key={filteredItem._id}
                        />
                      ))}
                  </div>
                )))}
        </div>
      </div>
    );
  } else {
    return (
      <>
      <body>
        <main>
          <div className="container">
          <div class="grid">
            <div>
              <hgroup>
                <h1>Workout Buddie</h1>
                <ul>
                  <li>Keep a track of All your Workouts</li>
                  <li>The one stop solution for all your Workout needs</li>
                  <li>
                    Track your workouts by bodyparts through a human body body
                    model
                  </li>
                  <li> Login or Register to get started</li>
                </ul>
              </hgroup>
            </div>
            
            <div>
              <div role="group">
                <button
                  className={showRegister ? "primary" : "outline"}
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </button>
                <button
                  className={showRegister ? "outline" : "primary"}
                  onClick={() => setShowRegister(false)}
                >
                  Login
                </button>
              </div>
              {showRegister && <Register />}
              {!showRegister && <Login />}
            </div>
          </div>
          </div>
        </main>
        </body>
        <footer>
          Copyright {new Date().getFullYear()}; All rights reserved.
        </footer>
      </>
    );
  }
};

export default Home;
