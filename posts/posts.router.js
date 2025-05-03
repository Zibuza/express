const { Router } = require("express");
const postsModel = require("../models/post.model");

const postRouter = Router();

postRouter.get("/", async (req, res) => {
    try {
        const posts = await postsModel
            .find()
            .sort({ _id: -1 })
            .populate({ path: "author", select: "fullName email" }); 
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts", error });
    }
});

postRouter.post("/", async (req, res) => {
    const { content, author } = req.body;
    try {
        const newPost = await postsModel.create({ content, author });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: "Failed to create post", error });
    }
});

postRouter.delete("/:id", async(req,res) =>{
    if(!isValidObjectId(id)){
        return res.status(400).json({message: "id is invalid"})
    }

    const post = await postsModel.findById(id)

    if(post.author.toString() !== req.userId){
        return res.status(401).json({message: "ypu don't gave permision"})
    }

    await postModel.findByIdAndDelte(id)
    res.status(200).json({message: "post deleted successfully"})
})

module.exports = postRouter;
