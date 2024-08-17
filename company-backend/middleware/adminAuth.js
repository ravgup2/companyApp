const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const adminAuth = async (req, res, next) => {
    try {
        console.log('Admin auth',req.role);
        if(req.role.includes('admin')) {
            next()
        } else {
            return res.status(401).json({ error: 'Not Authorized' })
        } 
    }
    catch (error) {
        console.log(error)
        res.status(401).json({error: 'Not Authorized for this request'})
    }
}

module.exports = adminAuth