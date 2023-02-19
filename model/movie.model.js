const mongoose=require("mongoose");

const movieSchema=mongoose.Schema({
    name:String,
    year:Number,
    rating:Number,
    userid:String
})

const MovieModel=mongoose.model("movie",movieSchema);

module.exports={MovieModel}