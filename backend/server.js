require("dotenv").config()
const express = require("express")

const app = express()
const workoutRoutes = require("./routes/workout")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")


// middlewares
app.use(express.json())
app.use((req,res,next) =>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts/', workoutRoutes)
app.use('/api/user/', userRoute)


//mongoose connection to db
mongoose.connect(process.env.MONG_URI)
    .then(()=> {
        // listen for requests
        app.listen(process.env.PORT, ()=>{
        console.log("connected to db and listening on post 4000")
})
    })
    .catch((error) =>{
        console.log(error);
    })

