const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const middlewares = require("../configs/middlewares.config")
const Coaster = require("../models/coaster.model")
const Park = require("../models/park.model")
// Aquí los endpoints
router.get("/new", (req, res, next) => {
    Park.find()
        .then(parkFound => {
            res.render("coasters/new-coaster", { parkFound })
        })
})

router.post("/new", (req, res, next) => {
    const newCoaster = new Coaster({
        name: req.body.name,
        description: req.body.description,
        length: req.body.length,
        inversions: req.body.inversions,
        park: req.body.park

    })
    newCoaster.save()
        .then((createdCoaster) => {
            res.json(createdCoaster)
        })
        .catch((err) => console.log(err))
})

router.get("/", (req, res, next) => {
    Coaster.find()
        .then(coasterFound => {
            res.render("coasters/coasters-index", { coasterFound })
        })
})



router.get("/:id", (req, res, next) => {
    Coaster.findById(req.params.id)
        .then(coasterFoundByID => {
            Park.findById(coasterFoundByID.park)
                .then(foundParkById => {
                    res.render("coasters/coaster-details", { coasterFoundByID, foundParkById })
                })

        })

})

router.get("/delete/:id", (req, res, next) => {

    Coaster.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/coasters");

        }).catch((err) => console.log(err))
})

router.get("/edit/:id", (req, res, next) => {
    Coaster.findById(req.params.id)
        .then(coasterFoundByID => {
            Park.find()
                .then(foundParkById => {
                    res.render("coasters/edit-coaster", { coasterFoundByID, foundParkById })
                })
        })
})




module.exports = router