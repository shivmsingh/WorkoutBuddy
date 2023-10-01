import { useEffect,useState } from "react"
import {useParams} from "react-router-dom"

// components
import WorkoutDetails from "../components/WorkoutDetails"


const PartPage = () => {
  const {part} = useParams();
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`https://workoutbuddy-t2yc.onrender.com/api/workouts/part/${part}`)
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        setWorkouts(json)
      }
    }

    fetchWorkouts()
  }, [part])

  return (
    <div className="home">
      <div className="workouts">
      <h1>{part} Workouts</h1>
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
    </div>
  )
}

export default PartPage
