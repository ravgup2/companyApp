const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
  duration: Number
}, { timestamps: true })

module.exports = mongoose.model('Art', artSchema)