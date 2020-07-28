var express = require('express');
var router = express.Router();
var Post = require('../../model/Post');
var checkAuth = require('../middleware/check-auth');
const { update } = require('../../model/Post');

router.get("/list", checkAuth, function(req,res){
    Post.find(function(err,rtn){
        if (err){
            res.status(500).json({
                message : "Internal sever error",
                error : err,
            });
        }else{
            res.status(200).json({
                post : rtn,
            });
        }
    });
});

router.post("/add",checkAuth,  function(req,res){
    var post = new Post();
    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
    post.save(function(err,rtn){
        if(err){
            res.status(500).json({
                message:"Internal sever error",
                error:err,
            });
        }else{
            res.status(201).json({
                message:"New post created",
                post:rtn,
            });
        }
    });
});

router.get("/detail/:id",checkAuth, function(req,res){
    Post.findById(req.params.id).populate("author").exec(function(err,rtn){
        if (err){
            res.status(500).json({
                message:"Internal sever error",
                error:err,
            });
        }else{
            res.status(200).json({
                post:rtn,
            });
        }
    });
});

router.patch("/update/:pid",function(req,res){
    // var update = {
    //     title:req.body.title,
    //     content:req.body.content,
    //     author:req.body.author,
    // }
    var updateOps = {};
    for (var ops of req.body){
        updateOps[ops.proName] = ops.value;
    }
    console.log(updateOps);
    Post.findByIdAndUpdate(req.params.pid, {$set:updateOps}, function(err,rtn){
        console.log(rtn,req.params.pid);
        if(err){
            res.status(500).json({
                message:"Internal sever error",
                error:err,
            });
        }else{
            res.status(200).json({
                message:"New post updated",
                post:rtn,
            });
        }
    });
});

router.delete("/delete/:id",function(req,res){
    Post.findByIdAndRemove(req.params.id, function(err,rtn){
        if(err){
            req.status(500).json({
                message:"Internal sever error",
                error:err,
            });
        }else{
            res.status(200).json({
                message:"Post delete successful",
            });
        }
    });
});
module.exports=router;