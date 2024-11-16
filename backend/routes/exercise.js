const express= require("express");

const router= express.Router();
const { Router } = require("express");
let Exercise= require("../models/exercise.models");

router.route("/").get((req, res) =>{
    Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => console.log("Error in fetching Exercise: "+ err))
});

router.route("/:id").get((req,res)=> {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => console.log("error in Getting for this id: "+ err));
})

router.route("/add").post((req, res) =>{
    const username= req.body.username;
    const description= req.body.description;
    const duration= Number(req.body.duration);
    const date= Date.parse(req.body.date);

    const newExercise= new Exercise({username, description, duration, date});
    newExercise.save()
    .then(() => {res.json("New Exercise is been added")})
    .catch((err) => {"Error in adding Exercise: "+ err})
});

router.route("/:id").delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=> res.json("Exercise deleted.."))
    .catch((err)=>  res.status(400).json("Error: "+ err))
})

router.route("/update/:id").post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exe =>{
        exe.username= req.body.username;
        exe.description= req.body.description;
        exe.duration= Number(req.body.duration);
        exe.date= Date.parse(req.body.date);

        exe.save()
        .then(() => res.json("Exercise Updated.."))
        .catch((err) => res.status(400).json("Error "+ err))
    })
    .catch(err => res.status(400).json("Error "+ err))
})

module.exports= router;