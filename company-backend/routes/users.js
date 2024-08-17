const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const adminAuth = require('../middleware/adminAuth')
// controller function
const {signupUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
} 
= require('../controllers/userController')

const router = express.Router();

// get all users
router.get('/', requireAuth, adminAuth ,getUsers)

// user login
router.post('/login', loginUser)

// user signup
router.post('/signup', signupUser)


//GET a single user
router.get('/:id', requireAuth, adminAuth, getUser)

// DELETE a user
router.delete('/:id', requireAuth, adminAuth, deleteUser)

// UPDATE a user
router.patch('/:id', requireAuth, adminAuth, updateUser)


module.exports = router;