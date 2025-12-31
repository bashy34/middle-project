const Task = require("../models/Task")

const getAllTasks = async (req,res) => {
    const tasks = await Task.find()
    if (!tasks)
        return res.send("not found")
    res.json(tasks)
}

const createNewTask = async (req,res) =>  {
    const {title,completed,tags} = req.body
    if (!title)
        return res.status(400).send("name is required")
    const task = await Task.create({title,completed,tags})
    if(!task)
        return res.send("error")
    res.json(task)
}

const getTaskById = async (req,res) => {
    const {taskId} = req.params
    const task = await Task.findById(taskId)
    if (!task)
        return res,send("not found")
    res.json(task)
}

const updateTask = async (req,res) => {
    const {id,title,completed,tags} = req.body
    if (!title || !id)
        return res.status(400).send("name and id  is required")
    const task = await Task.findById(id)
    if (!task)
        return res.status(400).send("not found")
    task.title=title
    task.completed=completed
    task.tags=tags
    const saved = await task.save()
    res.json(saved)

}
const updateTaskComplete = async (req,res) => {
    const {taskId} = req.params
    const task = await Task.findById(taskId)
    if (!task)
        return res.status(400).send("not found")
    task.completed=!task.completed
    const saved = await task.save()
    res.json(saved)

}

const deleteTask = async (req,res) => {
    const {id} = req.body
    const task = Task.findById(id)
    if (!task)
        return res.status(400).send("not found")
    const result = await task.deleteOne()
    const replay = `task '${result.title}' id '${result.title} deleted'`
    res.json(replay)
}

module.exports = {getAllTasks,createNewTask,updateTask,getTaskById,updateTaskComplete,deleteTask}