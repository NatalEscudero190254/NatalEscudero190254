const express = require("express");
const router = express.Router();
const axios = require("axios");
// const Country = require("../models/Country");
const {Country, Activities } = require("../db");


router.post("/", async (req, res) => {
    const {
        name,
        difficulty,
        duration,
        season,
        countriesId
    } = req.body;

    if(!name || !difficulty || !duration || !season || !countriesId){
        res.status(400).json({
            error: "you have to pass all the parameters"
        })
    }
    try{
        const activityCreated = await Activities.create({
            name,
            difficulty,
            duration,
            season,
        })
    
        for (let i = 0; i < countriesId.length; i++) {
            await activityCreated.addCountries(countriesId[i].id);       
        }
        return res.status(200).json(activityCreated)      

    
  } catch (error) {
    return res.send(error);
  }

})


router.get("/", async (req, res) => {
    const activities = await Activities.findAll();

    if(activities.length){
        return res.status(200).send(activities)
    }

    return res.status(200).send([])


    
})


module.exports = router;