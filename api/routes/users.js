var express = require('express');
const User = require("../../model/User");
var router = express.Router();
var bcrypt = require('bcryptjs');
var checkAuth = require("../middleware/check-auth");

router.get("/list", checkAuth, function(req,res){
    User.find(function(err,rtn){
        if (err){
            res.status(500).json({
                message:"Internal Sever Error",
                error: err,
            });
        }else{
            res.status(200).json({
                user:rtn,
            });
        }
    });
});

router.post('/add', function(req,res ){
    User.findOne({email:req.body.email},function(err2,rtn2){
        if(err2){
            res.status(500).json({
                message:"Internal Sever Error",
                error : err2,
            });
        }
        if(rtn2 != null){
            res.status(500).json({
                message:"Duplicated Email",
            });
        }else{
             var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save(function(err,rtn){
                if (err){
                     res.status(500).json({
                     message:"Internal Sever Error",
                     error : err,
                     });
                 }else{
                    res.status(201).json({
                     message:"Created Successfuly",
                     user:rtn,
                 });
                }
            });
        }
    });  
});

router.get("/detail/:id",function(req,res){
    User.findById(req.params.id, function(err,rtn){
        if (err){
            res.status(500).json({
                message:"Internal Sever Error",
                error:err,
            });
        }else{
            if(rtn == null){
                res.status(204).json({
                    message:"No Content",
                });
            }else{
                res.status(200).json({
                    user:rtn,
                });
        }
        }
    });
});

router.patch("/:id",function(req,res){
    var update = {
        name : req.body.name,
        email : req.body.email,
        password :bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8), null),
      }
    User.findByIdAndUpdate(req.params.id, {$set:update} ,function(err,rtn){
        if(err){
            res.status(500).json({
                message:"Internal Sever Error",
                error:err,
            });
        }else{
            res.status(200).json({
                message:"User account created",
                user: rtn,
            });
        }
    });
});

router.delete("/delete/:id",function(req,res){
    User.findByIdAndRemove(req.params.id, function(err,rtn){
        if(err){
            req.status(500).json({
                message:"Internal sever error",
                error:err,
            });
        }else{
            res.status(200).json({
                message:"User delete successful",
            });
        }
    });
});
module.exports = router;