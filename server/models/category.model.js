const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String },
});

const Category = model("category", CategorySchema);

module.exports = Category;
