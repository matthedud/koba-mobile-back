const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const { User } = require("../models/User.model")
const { Salarie } = require("../models/Salarie.model")
const axios = require("axios")
const { Pointage } = require("../models/Pointage.model")
const { Intervention } = require("../models/Intervention.model")

const API_URL = process.env.API_URL || "http://localhost:4000/mobile"

router.get("/chantiers", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.payload.username })
    const chantier = await axios.get(API_URL + "/chantiers/" + user._id)
    res.status(200).json(chantier.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/planning-salarie/:date", isAuthenticated, async (req, res, next) => {
  try {
    const { date } = req.params
    const user = await User.findOne({ username: req.payload.username })
    const planning = await axios.get(`${API_URL}/planning-salarie/${user.salarie}/${date}`)
    res.status(200).json(planning.data)
    console.log(planning.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/chantiers/:chantierID", isAuthenticated, async (req, res, next) => {
  const { chantierID } = req.params
  try {
    const chantier = await axios.get(API_URL + "/chantier/" + chantierID)
    console.log("chantier", chantier)
    res.status(200).json(chantier.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/chantiers-salarier/:salarierID", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.payload.username })
    const chantier = await axios.get(API_URL + "/chantiers/" + user._id)
    res.status(200).json(chantier.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/salaries", isAuthenticated, async (req, res, next) => {
  try {
    const salarie = await Salarie.find()
    res.status(200).json(salarie)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/tachesPrevu/:chantierID/:date", isAuthenticated, async (req, res, next) => {
  try {
    const { chantierID, date } = req.params
    const taches = await axios.get(`${API_URL}/tachesPrevu/${chantierID}/${date}`)
    res.status(200).json(taches.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/tacheChantier/:chantierID", isAuthenticated, async (req, res, next) => {
  try {
    const { chantierID } = req.params
    const taches = await axios.get(`${API_URL}/tacheChantier/${chantierID}`)
    res.status(200).json(taches.data)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
router.get("/pointage", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.payload.username })
    const pointage = await Pointage.find({ "intevention.mainDoeuvre.salarieID": user.salarie })
    res.status(200).json(pointage)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post("/pointage", isAuthenticated, async (req, res, next) => {
  const pointage = req.body
  try {
    const intervention = pointage.intervention.map((interv) => {
      const mainDoeuvre = interv.salarie.map((el) => ({ ...el, salarieID: el._id }))
      return { ...interv, mainDoeuvre, tacheChantierID: interv.tacheChantier._id }
    })
    const newPointage = await Pointage.create({
      ...pointage,
      chantierID: pointage.chantier._id,
      intervention,
    })
    res.status(200).json({ newPointage })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

module.exports = router
