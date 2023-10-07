import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useNavigate } from "react-router";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [part, setPart] = useState("Chest");
  const [error, setError] = useState(null);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const workout = { title, load, reps, part };

    try {
      const response = await fetch("https://workoutbuddy-t2yc.onrender.com/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
       
      }
      if (response.ok) {
       
        setError(null);
        setTitle("");
        setLoad("");
        setReps("");
        dispatch({ type: "CREATE_WORKOUT", payload: json });
        navigate(0)
      }
    } catch (error) {
      setError("Credentials expired, Please login!");
      localStorage.setItem("accessToken", null);
      navigate(0)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Excercise Title
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          Load (in kg)
          <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            required
          />
        </label>
        <label>
          Number of Reps
          <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            required
          />
        </label>
        <label>
          Body part
          <select value={part} onChange={(e) => setPart(e.target.value)}>
            <option value="Head">Head</option>
            <option value="Arms">Arms</option>
            <option value="Hands">Hands</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Chest">Chest</option>
            <option value="Stomach">Stomach</option>
            <option value="Legs">Legs</option>
            <option value="Feet">Feet</option>
          </select>
        </label>
      </fieldset>

      <input type="submit" value="Add Workout" />

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
