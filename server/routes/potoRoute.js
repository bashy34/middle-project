const express = require('express')
const router = express.Router()
const articleControllers = require("../controllers/potoController")

router.get("/",articleControllers.getAllPoto)
router.get("/limit",articleControllers.getLimitPoto)
router.post("/",articleControllers.createNewPoto)
router.get("/:potoId",articleControllers.getPotoById)
router.put("/",articleControllers.updatePoto)
router.delete("/",articleControllers.deletePoto)

module.exports = router