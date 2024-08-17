const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const adminAuth = require('../middleware/adminAuth')
// controller function
const { getArts,
  getArt,
  createArt,
  deleteArt,
  updateArt
} 
= require('../controllers/artController')

const router = express.Router();

// get all Arts
router.get('/', requireAuth ,getArts)

//GET a single Art
router.get('/:id', requireAuth, getArt)

// create Art
router.post('/', requireAuth, adminAuth, createArt)

// DELETE a Art
router.delete('/:id', requireAuth, adminAuth, deleteArt)

// UPDATE a Art
router.patch('/:id', requireAuth, updateArt)


module.exports = router;