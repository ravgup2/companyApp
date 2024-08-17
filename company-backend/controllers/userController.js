const User = require('../models/userModel')
const Art = require('../models/artModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password);
        if(user.isActive) {
            // Create a token
            const token = createToken(user._id)
            const arts = await Art.find({users: user._id});
            res.status(200).json({email, token, role: user.role, arts})
        } else {
            res.status(400).json({error: err.message})
        }
        
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password);

        // Create a token
        const token = createToken(user._id)
        console.log('token', token)
        res.status(200).json({email, token, role: user.role})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// get all users
const getUsers = async (req, res) => {
    console.log('getUsers req',req.user)
    const user_id = req.user._id
    const users = await User.find({ "_id": { $ne: user_id }}).sort({createdAt: -1})
  
    res.status(200).json(users)
}

// get single user
const getUser = async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  
  res.status(200).json(user)
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findOneAndDelete({_id: id})
  
    if (!user) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }
  
  // update a user
  const updateUser = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!user) {
      return res.status(400).json({error: 'No such user'})
    }
  
    res.status(200).json(user)
  }

module.exports = {
    loginUser,
    signupUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}