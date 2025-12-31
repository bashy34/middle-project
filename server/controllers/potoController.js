const Poto = require("../models/Poto")

const getAllPoto = async (req,res) => {
    const poto = await Poto.find()
    if (!poto)
        return res.send("not found")
    res.json(poto)
}

const createNewPoto = async (req,res) =>  {
    const {title,imageUrl} = req.body
    if (!title)
        return res.status(400).send("title is required")
    const poto = await Poto.create({title,imageUrl})
    if(!poto)
        return res.send("error")
    res.json(poto)
}

const getPotoById = async (req,res) => {
    const {potoId} = req.params
    const poto = await Poto.findById(potoId)
    if (!poto)
        return res,send("not found")
    res.json(poto)
}

const updatePoto = async (req,res) => {
    const {id,title,imageUrl} = req.body
    if (!title || !imageUrl )
        return res.status(400).send("name  and imageUrl  are required")
    const poto = await Poto.findById(id)
    if (!poto)
        return res.status(400).send("not found")
    poto.title=title
    poto.imageUrl=imageUrl
    const saved = await poto.save()
    res.json(saved)

}


const deletePoto = async (req,res) => {
    const {id} = req.body
    const poto = Poto.findById(id)
    if (!poto)
        return res.status(400).send("not found")
    const result = await poto.deleteOne()
    const replay = `poto '${result.title}' deleted'`
    res.json(replay)
}

module.exports = {getAllPoto,createNewPoto,getPotoById,updatePoto,deletePoto}