const mongoose = require('mongoose')
let validator = require("validator"); 


// model step: 1
const productModel = new mongoose.Schema(
        {
            name: {
                type: String, 
                trim: true,
            },
            category: {
                type: String,
                trim: true,
                lowercase: true, 
                required:[true, "category is require"],
                enum:["shoes", "t-shat",'watch'],
            },
            year: {
                type: Number,
                trim: true, 
                required:[true, "year is require"], 
            },
            brand: {
                type: String, 
                trim: true,
                lowercase: true,  
            },
            size:{
                type:String, 
            },
            price:{
                type:Number,
                trim: true,
            }, 
            image: {
                type: String,
                validate:[validator.isURL, "Provided image URL is not valid."], 
            }, 
           productAddDate:Date, 
        },
        {
             timestamps: true, 
        }
    ); 
     
module.exports = mongoose.model('product', productModel)