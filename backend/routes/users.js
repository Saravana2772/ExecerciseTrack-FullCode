const express= require("express");

const router= express.Router();
const User= require("../models/users.models");

router.route("/").get((req,res)=> {
    User.find()
    .then(users => res.json(users))
    .catch(err => console.log("Error:" + err))
});

router.route("/add").post((req, res)=>{
    const username= req.body.username;
    const newuser= new User({username});
    newuser.save()
    .then(()=> {res.json("User is added to User model")})
    .catch(err => {console.log("Error in Adding User "+ err)})
});

module.exports= router;