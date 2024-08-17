const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const adminAuth = require('../middleware/adminAuth')
// controller function
const { getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} 
= require('../controllers/taskController')

const router = express.Router();

// get all tasks
router.get('/', requireAuth ,getTasks)

//GET a single task
router.get('/:id', requireAuth, getTask)

// create task
router.post('/', requireAuth, adminAuth, createTask)

// DELETE a task
router.delete('/:id', requireAuth, adminAuth, deleteTask)

// UPDATE a task
router.patch('/:id', requireAuth, updateTask)


module.exports = router;