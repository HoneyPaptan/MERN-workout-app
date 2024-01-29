const express = require("express")

const router = express.Router()
const {createWorkout, getWorkout, getWorkouts,updateWorkout, deleteWorkout} = require("../controllers/workoutController")
// GET route
router.get("/", getWorkouts)
// POST route
router.post("/", createWorkout)
// DELETE route
router.delete("/:id", deleteWorkout)
// Get a singlepost route
router.get("/:id", getWorkout)
// UPDATE a workout route
router.patch("/:id", updateWorkout)



module.exports = router