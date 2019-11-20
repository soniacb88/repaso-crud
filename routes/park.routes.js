const express = require('express')
const router = express.Router()
const Park = require("../models/park.model")
const mongoose = require("mongoose")
const middleware = require("../configs/middlewares.config")


// Aquí los endpoints
router.get("/new", (req, res, next) => {
    res.render("parks/new-park")
})

router.post("/new", (req, res, next) => {
    const newPark = new Park({
        name: req.body.name,
        description: req.body.description
    })
    newPark.save()
        .then((createdPark) => {
            res.json(createdPark)
        })
        .catch((err) => console.log(err))
})




module.exports = router