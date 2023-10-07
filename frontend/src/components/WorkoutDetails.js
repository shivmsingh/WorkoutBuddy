import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useNavigate } from "react-router-dom";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const handleClick = async () => {
    try {
      console.log(accessToken);
      const response = await fetch(
        "https://workoutbuddy-t2yc.onrender.com/api/workouts/" + workout._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const json = await response.json();
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    } catch (error) {
      navigate(0);
      // localStorage.setItem("accessToken",null)
    }
  };

  return (
    <>
      <article>
        <header>
          <div class="grid">
            <h3>Title: {workout.title}</h3>

            <button class="contrast" onClick={handleClick}>
              ❌
            </button>
          </div>
        </header>
        <main>
          <h4>Load (kg): {workout.load}</h4>
          <h4>Number of reps: {workout.reps}</h4>
          <h4>Body Part: {workout.part}</h4>
        </main>
        <footer>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </footer>
      </article>
    </>
  );
};

export default WorkoutDetails;
