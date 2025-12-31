const Article = require("../models/Article")

const getAllArticle = async (req,res) => {
    const article = await Article.find()
    if (!article)
        return res.send("not found")
    res.json(article)
}

const createNewArticle = async (req,res) =>  {
    const {title,body} = req.body
    if (!title)
        return res.status(400).send("title is required")
    const article = await Article.create({title,body})
    if(!article)
        return res.send("error")
    res.json(article)
}

const getArticleById = async (req,res) => {
    const {articleId} = req.params
    const article = await Article.findById(articleId)
    if (!article)
        return res,send("not found")
    res.json(article)
}

const updateArticle = async (req,res) => {
    const {id,title,body} = req.body
    if (!title || !id )
        return res.status(400).send("name  and title  are required")
    const article = await Article.findById(id)
    if (!article)
        return res.status(400).send("not found")
    article.title=title
    article.body=body
    const saved = await article.save()
    res.json(saved)

}


const deleteArticle = async (req,res) => {
    const {id} = req.body
    const article = Article.findById(id)
    if (!article)
        return res.status(400).send("not found")
    const result = await article.deleteOne()
    const replay = `article '${result.title}' deleted'`
    res.json(replay)
}

module.exports = {getAllArticle,createNewArticle,getArticleById,updateArticle,deleteArticle}