const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  isUrgent: Boolean,
  coordinates: [
    {
      type: Number
    }
  ],
  image: String
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo