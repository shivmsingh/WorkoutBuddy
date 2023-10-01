import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { Link } from "react-router-dom";
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('https://workoutbuddy-t2yc.onrender.com/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (json.status === 200) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p><strong>Body Part: </strong> </p>
      <div
          className="tag"
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            backgroundColor: 'rgba(220, 20, 60, 0.5)', // Semi-transparent red
            borderRadius: '5px',
            transition: 'background-color 0.3s', // Smooth transition for the hover effect
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'rgb(220, 20, 60)')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'rgba(220, 20, 60, 0.5)')}
        >
           <Link to={`/part/${workout.part}`}  
           style={{
              textDecoration: 'none',
              color: 'inherit', // Use the color from the parent
              
            }}>
          {workout.part}
          </Link>
        </div>
       
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
