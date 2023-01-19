const productModels = require("../models/product.models");
const { generateToken } = require("../utils/token");
let bcrypt = require("bcryptjs");
const { request } = require("express");




// create products
const createProduct = async (req, res) => {
  try {
    const newProduct = req.body

    const product = await productModels.create(newProduct)

    return res.status(200).json({
      product,
      status: "success",
      message: 'Product uploading successfully'
    });
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

// All products get 
const getAllProduct = async (req, res) => {

  try {
    const product = await productModels.find({})

    return res.status(201).send({
      status: "success",
      product: product,
      message: "Request Successful"
    })
  } catch (error) {
    return res.status(401).json({ massages: "Internal Server Error" })
  }
}


// product filtering by product category & year also request accept by query

const filterProduct = async (req, res) => {

  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let category = req.query.category || "All";
    let years = req.query.years 

    const categoryOptions = ["shoes", "t-shat", 'watch'];

    category === "All"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));

    let product = productModels.find({ name: { $regex: search, $options: "i" } })

    if (years == 0) { 
      product = product
        .where("category")
        .in([...category])
        .skip(page * limit)
        .limit(limit) 
    } else { 
        product = product
        .where("category")
        .in([...category])
        .skip(page * limit)
        .limit(limit)
        .where({ year: years }); 

    }

    product = await product

    const total = await productModels.countDocuments({
      category: { $in: [...category] },
      name: { $regex: search, $options: "i" },
      year: { $eq: years },
    });

    const response = {
      status: "success",
      total,
      page: page + 1,
      limit,
      category: categoryOptions,
      product,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massages: "Internal Server Error" });
  }
}



// Delete  product
const deleteProduct = async (req, res) => {
  const id = req.params.id
  const query = { _id: id } 
  const result = await productModels.deleteOne(query)
  res.send({status: "success",result});
}



module.exports = { createProduct, filterProduct, getAllProduct, deleteProduct }