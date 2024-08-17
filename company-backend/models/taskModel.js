const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  art_id: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: false
  },
  endTime: {
    type: Date,
    required: false
  },

}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)