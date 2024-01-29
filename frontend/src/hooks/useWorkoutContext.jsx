import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const useWorkoutsContext = () =>{
    const context = useContext(WorkoutContext)

    if(!context){
        throw Error('useworkoutcontext must be used inside an woktoutcontextprovider')
    }
    return context
}