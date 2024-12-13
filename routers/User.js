const User = require("../models/User");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
require('dotenv').config();

router.get("/getall", (req, res)=> {
    User.find()
    .then((result) => {
        
        res.status(200).json(result);
        const detail = result.map((user) => ({ username: user.username, email: user.email, password:user.password}));
        console.log(detail);
    })
    .catch((error) => {
        console.log(error);
    })
})

router.post("/add", async (req, res) => {
    const {username, email, password} =req.body;
    const user = await User.findOne({username});
    const useremail = await User.findOne({email});
    if(user && useremail){
        res.status(400).json("please add another username and email");
    }
    console.log(req.body);
    new User(req.body).save()
    .then((result) => {
        console.log("Your Data :", result);
        res.status(200).json(result);
    })
    .catch((error) => {
        console.log("Error : ", error);
        res.status(404).json(error);
        console.log(error);
    })
})

router.get("/:username", async (req, res) => {
    await User.findOne({username:req.params.username})
    .then((result) => {
        if(!result){
            res.status(404).json("User not found");
        }
        else{
        return res.status(200).json(result);
        return console.log(result.username);
        }
    })
    .catch((error) => {
        res.status(500).json(error);
    })
})

router.get("/database/search", async (req, res)=> {
    const {query}= req.query;
    try{
    const users = await User.find({
        $or: [
            { username: { $regex: query, $options: "i" } }

        ]

    });
    res.status(200).json(users);
    const mongo= users.map((solo) => (solo.username))
    // console.log(mongo);
    }



    catch(error){
        res.status(404).json(error);
        console.log(error);
    }
});



router.get("/:id", (req, res) => {
    User.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
})

router.post("/login", (req, res, next)=> {
    const {email, password} = req.body;
    try{
    const user = User.findOne({email});
    if(!user){
        res.status(404).json("You have Entered Password and Email Wrong");
    }
    const token = jwt.sign( {userid : user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    res.status(200).json({ message: "Login successful", name: user.username, email: user.email, city: user.city, userId: user._id, token });
    console.log( token);
    next();

}
    catch(error){
        res.status(404).json(error)
    }
    
});

module.exports = router;