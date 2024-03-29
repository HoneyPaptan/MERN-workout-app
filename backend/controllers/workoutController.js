const Workout = require("../models/workoutModel")

const mongoose = require("mongoose")
// get all workout

const getWorkouts = async (req,res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout  = async(req,res) =>{
    const {id} = req.params // the id that is coming from the path is stored in params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout found"})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({error: "No such workout found"})
    }
    else{
        return res.status(200).json(workout)
    }
}

//create new workout
const createWorkout = async (req,res) =>{
    const {title,reps, load} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "please fill in all the fields", emptyFields})
    }
    // saving doc to db
    try{
        const workout =  await Workout.create({title, reps, load})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})

    }
}


//delete a workout
const deleteWorkout = async (req,res) =>{
    const {id} = req.params // the id that is coming from the path is stored in params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout found"})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: "Workout not found so no deletion is performed"})
    }
    else{
        return res.status(200).json(workout)
    }
}


// update a workout
const updateWorkout = async(req,res) =>{
    const {id} = req.params // the id that is coming from the path is stored in params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout found"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: "No such workout"})
    }
    else{
        return res.status(200).json(workout)
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout,
    createWorkout
}