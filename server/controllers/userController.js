const User = require("../models/User")

const getAllUser = async (req,res) => {
    const user = await User.find().sort({_id:-1})
    if (!user)
        return res.send("not found")
    res.json(user)

}
const getLimitUsers = async (req,res) => {
    const user = await User.find().sort({_id:-1}).limit(5)
    if (!user)
        return res.send("not found")
    res.json(user)
}

const createNewUser = async (req,res) =>  {
    const {name, userName, email, address ,phone} = req.body
    if (!name || !userName)
        return res.status(400).send("name and userName are required")
    const user = await User.create({name, userName, email, address ,phone})
    if(!user)
        return res.send("error")
    res.json(user)
}

const getUserById = async (req,res) => {
    const {userId} = req.params
    const user = await User.findById(userId)
    if (!user)
        return res,send("not found")
    res.json(user)
}

const updateUser = async (req,res) => {
    const {id,name, userName, email, address ,phone} = req.body
    if (!id || !name || !userName )
        return res.status(400).send("name, id and userName  are required")
    const user = await User.findById(id)
    if (!user)
        return res.status(400).send("not found")
    user.name=name
    user.userName=userName
    user.email=email
    user.address=address
    user.phone=phone
    const saved = await user.save()
    res.json(saved)

}


const deleteUser = async (req,res) => {
    const {id} = req.body
    const user = User.findById(id)
    if (!user)
        return res.status(400).send("not found")
    const result = await user.deleteOne()
    const replay = `user '${result.name}' deleted'`
    res.json(replay)
}

module.exports = {getAllUser,createNewUser,getUserById,updateUser,deleteUser,getLimitUsers}