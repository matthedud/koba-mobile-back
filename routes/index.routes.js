const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const { User } = require("../models/User.model")
const { Salarie } = require("../models/Salarie.model")
const axios = require("axios")
const { Pointage } = require("../models/Pointage.model")
const { Photo } = require("../models/Photo.model")
const { Intervention } = require("../models/Intervention.model")
const { cloudinary } = require("../utils/cloudinary.js")

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
    const planningRes = []
    for (const planningEl of planning.data.planning) {
      const salarieTab = planningEl.salarieID.map((item) => item.salarieID)
      const salarieList = await Salarie.find({ _id: { $in: salarieTab } })
      planningRes.push({
        ...planningEl,
        salarie: salarieList,
      })
    }
    res.status(200).json(planningRes)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/chantiers/:chantierID", isAuthenticated, async (req, res, next) => {
  const { chantierID } = req.params
  try {
    const chantier = await axios.get(API_URL + "/chantier/" + chantierID)
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

router.get("/pointage/:pointageID", isAuthenticated, async (req, res, next) => {
  try {
    const { pointageID } = req.params
    const pointage = await Pointage.findById(pointageID)
    let tachesChantierReq = []
    let salaries = []
    let salarieTemp
    for (let i = 0; i < pointage.intervention.length; i++) {
      tachesChantierReq.push(
        await axios.get(
          `${API_URL}/tacheChantier-detail/${pointage.chantierID}/${pointage.intervention[i].tacheChantierID}`
        )
      )
      for (let j = 0; j < pointage.intervention[i].mainDoeuvre.length; j++) {
        salarieTemp = await Salarie.findById(pointage.intervention[i].mainDoeuvre[j].salarieID)
        salarieTemp = salarieTemp.contact.prenom + " " + salarieTemp.contact.nom
        if (!salaries.includes(salarieTemp)) {
          salaries.push(salarieTemp)
        }
      }
    }
    tachesChantierReq = tachesChantierReq.map((item) => item.data)

    res.status(200).json({ taches: tachesChantierReq, salaries: salaries })
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

router.patch("/pointage/:pointgeID", isAuthenticated, async (req, res, next) => {
  const { pointageID } = req.params
  const pointage = req.body
  try {
    const intervention = pointage.intervention.map((interv) => {
      const mainDoeuvre = interv.salarie.map((el) => ({ ...el, salarieID: el._id }))
      return { ...interv, mainDoeuvre, tacheChantierID: interv.tacheChantier._id }
    })
    const updatedPointage = await Pointage.findByIdAndUpdate(pointageID, {
      ...pointage,
      chantierID: pointage.chantier._id,
      intervention,
    })
    res.status(200).json({ updatedPointage })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post("/upload", isAuthenticated, async (req, res, next) => {
  const { image, chantier, poste, commentaire } = req.body
  try {
    if (image && chantier) {
      for (const imageEl of image) {
        const uploadResponse = await cloudinary.uploader.upload(imageEl, {
          upload_preset: "photoChantier",
        })
        await Photo.create({ imageUrl: uploadResponse.secure_url, chantier, poste, commentaire })
      }
    }
    res.status(500).json("no good")
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
router.get("/photos-chantier/:chantierID", isAuthenticated, async (req, res, next) => {
  const { chantierID } = req.params
  try {
    const images = await Photo.find({ chantier: chantierID })
    res.status(200).json(images)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
module.exports = router


router.delete("/photos-chantier/:photoID", isAuthenticated, async (req, res, next) => {
  const { photoID } = req.params
  try {
    await Photo.findByIdAndDelete(photoID)
    res.status(200).json(photoID)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})
module.exports = router