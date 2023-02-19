const express=require("express");
const {MovieModel}=require("../model/movie.model")

const movierouter=express.Router()

movierouter.get("/",async(req,res)=>{
    let abc=await MovieModel.find();
    res.send(abc)
})

movierouter.post("/post",async(req,res)=>{
    let movie=new MovieModel(req.body);
    await movie.save();
    res.send("Movie Posted")
})

module.exports={movierouter}
