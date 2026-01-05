const express = require('express')
const router = express.Router()
const taskControllers = require("../controllers/taskController")

router.get("/",taskControllers.getAllTasks)
router.get("/limit",taskControllers.getLimitTasks)
router.post("/",taskControllers.createNewTask)
router.get("/:taskId",taskControllers.getTaskById)
router.put("/",taskControllers.updateTask)
router.put("/:taskId",taskControllers.updateTaskComplete)
router.delete("/",taskControllers.deleteTask)

module.exports = router