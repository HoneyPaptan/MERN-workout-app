 
import {  useEffect } from "react"

//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


//hooks
import { useWorkoutsContext } from "../hooks/useWorkoutContext";


function Home() {
  const {workouts, dispatch}= useWorkoutsContext()


  useEffect(()=>{
    const fetchWorkouts = async()=>{
      const response = await fetch("/api/workouts")
      const data = await response.json()

      if(response.ok){
        dispatch({type:'SET_WORKOUTS' , payload: data})
        
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {/* it will only run if we have any workout  */}
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />

        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home