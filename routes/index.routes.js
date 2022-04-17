const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const { User } = require("../models/User.model")
const {Salarie} = require("../models/Salarie.model")
const axios = require("axios")

const API_URL = "http://localhost:80/mobile"

router.get("/chantiers", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.payload.username })
    const chantier = await axios.get(API_URL + "/chantiers/" + user._id)
    res.status(200).json(chantier.data)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/chantiers-salarier/:salarierID", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.payload.username })
    const chantier = await axios.get(API_URL + "/chantiers/" + user._id)
    res.status(200).json(chantier.data)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get("/salaries", isAuthenticated, async (req, res, next) => {
  try {
    const salarie = await Salarie.find()
    res.status(200).json(salarie)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
