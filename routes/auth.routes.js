const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const { isAuthenticated } = require("../middleware/jwt.middleware")
const { User } = require("../models/User.model")

router.post("/auth/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log({ username, password })
    const foundUser = await User.findOne({ username })
    if (foundUser) {
      console.log("User already exists")
      res.status(400).json({ error: "User already exists" })
      return
    }
      const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const createdUser = await User.create({ username, password: hashedPassword })
      console.log({createdUser})
      res.status(201).json(createdUser)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.post("/auth/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log({ username, password })
    const foundUser = await User.findOne({ username })

    if (!foundUser) {
      console.log("Credentials not found")
      res.status(401).json({ error: "Credentials not found" })
      return
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
      const payload = { username }
      console.log("good")

      const authToken = jsonwebtoken.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      })
      res.status(200).send({ authToken: authToken })
      return
    } else {
      console.log("Credentials wrong")
      res.status(401).json({ error: "Credentials not found" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.get("/auth/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload)
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router
