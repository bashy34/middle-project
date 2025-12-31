const express = require('express')
const router = express.Router()
const articleControllers = require("../controllers/userController")

router.get("/",articleControllers.getAllUser)
router.post("/",articleControllers.createNewUser)
router.get("/:userId",articleControllers.getUserById)
router.put("/",articleControllers.updateUser)
router.delete("/",articleControllers.deleteUser)

module.exports = router