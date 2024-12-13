const express = require("express");
const Library = require("../models/Library");
const VerifyToken = require("../middleware/VerifyToken");

const router = express.Router();

router.get("/getall", (req, res) => {

    Library.find()
    .then((result) => {
        res.status(200).json(result);
        const names = result.map((solo) => ({name: solo.name, email: solo.description, password:solo.command}));
        console.log(names);
        
    })
    .catch((error) => {
        res.status(500).json( error);
    })
})
 
router.post("/add", async (req, res)=> {
    const {name, description, github_url, tags, command, stars, } = req.body;
    await Library(req.body).save()
    .then((result) => {
        res.status(200).json(result);
        console.log("Your Library Successfully Uploaded ", result);
    }) 
    .catch((error) => {
        res.status(404).json(error);
    })
})

router.delete("/delete/:id", async (req, res) => {
    await Library.findById(req.params._id)
    .then((result) => {
        res.status(200).json("Library Successfully Deleted !");
        console.log(result, "Successfully Deleted Your Library");
    })
    .catch((error) => {
        res.status(501).json(error);

    })
})

router.get("/detail/:id", async (req, res) => {
    await Library.findById(req.params.id)
    .then((result) => {
        if(!result){
            res.status(404).json("Library not found");
        }
        res.status(200).json(result);
        console.log(result);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
})



router.get("/search", async (req, res) => { 
    const { query } = req.query; // Get the search query from the frontend 
    try { // Find matching libraries using a case-insensitive search 
    const libraries = await Library.find({ 
        $or: [
             { name: { $regex: query, $options: "i" } }, 
            { tags: { $regex: query, $options: "i" } },
            {command: {$regex: query, $options: "i"}}
            ] }); 
            res.status(200).json(libraries); 
        } catch (error) { console.log("Search Error:", error);
                 res.status(500).json({ error: "Something went wrong while searching" });
                 } });


module.exports = router;