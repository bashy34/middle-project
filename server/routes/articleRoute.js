const express = require('express')
const router = express.Router()
const articleControllers = require("../controllers/articleController")

router.get("/",articleControllers.getAllArticle)
router.get("/limit",articleControllers.getLimitArticle)
router.post("/",articleControllers.createNewArticle)
router.get("/:articleId",articleControllers.getArticleById)
router.put("/",articleControllers.updateArticle)
router.delete("/",articleControllers.deleteArticle)

module.exports = router