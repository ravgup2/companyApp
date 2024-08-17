const Art = require('../models/artModel')
const mongoose = require('mongoose')

// get all Arts
const getArts = async (req, res) => {
//   const user_id = req.user._id
  const arts = await Art.find().sort({createdAt: -1})
  console.log(arts)

  res.status(200).json(arts)
}

// get a single Art
const getArt = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Art'})
  }

  const art = await Art.findById(id)

  if (!arts) {
    return res.status(404).json({error: 'No such Art'})
  }
  
  res.status(200).json(arts)
}


// create new Art
const createArt = async (req, res) => {
  const {name, durations} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!durations) {
    emptyFields.push('durations')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const art = await Art.create(req.body)
    res.status(200).json(art)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a Art
const deleteArt = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Art'})
  }

  const art = await Art.findOneAndDelete({_id: id})

  if (!art) {
    return res.status(400).json({error: 'No such Art'})
  }

  res.status(200).json(art)
}

// update a Art
const updateArt = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Art'})
  }

  const art = await Art.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!art) {
    return res.status(400).json({error: 'No such Art'})
  }

  res.status(200).json(art)
}


module.exports = {
  getArts,
  getArt,
  createArt,
  deleteArt,
  updateArt
}