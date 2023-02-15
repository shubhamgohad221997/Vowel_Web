const { mongoose, Schema, model } = require("mongoose");
const ProductSchema = new Schema({
id: { type: String, required: false },
title: { type: String, required: true },
image: { type: String, required: true },
price: { type: String, required: true },

},{timestamps:true});
const Product = model("product", ProductSchema);
module.exports = Product;