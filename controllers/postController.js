const Post =require("../models/postModels")


exports.getAllPosts = async(req,res,next)=>{

    try {
        const posts = await Post.find()

        console.log(posts);

        res.status(200).json({status:'sucess',data:{posts},results:posts.length})
    } catch (error) {
        res.status(400).json({status:'fail'})
    }

   
}


exports.getOnePost = async(req,res,next)=>{

    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json({status:'sucess',data:{post},results:post.length})
    } catch (error) {
        res.status(400).json({status:'fail'})
    }

   
}


exports.createPost = async(req,res,next)=>{

    try {
        console.log(req.body);
        const post = await Post.create(req.body)

        res.status(200).json({status:'sucess',data:{post},results:post.length})
    } catch (error) {
        res.status(400).json({status:'fail'})
    }

   
}


exports.updatePost = async(req,res,next)=>{

    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json({status:'sucess',data:{post},results:post.length})
    } catch (error) {
        res.status(400).json({status:'fail'})
    }

   
}

exports.deletePost = async(req,res,next)=>{

    try {
        console.log(req.params.id);
        const post = await Post.deleteOne({_id:req.params.id})

        res.status(200).json({status:'sucess'})
    } catch (error) {
        console.log(error);
        res.status(400).json({status:'fail'})
    }

   
}