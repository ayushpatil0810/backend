import express from "express"
import signup from "../controllers/signup.controller.js"

const router = express.Router()

router.get('/', (req, res) => {
    // TODO: Implement get current logged in user
    res.status(501).json({ message: 'Not implemented' })
}) // returns current loggedin user
router.post('/signup', signup) // 
router.post('/login', (req, res) => {
    // TODO: Implement login
    res.status(501).json({ message: 'Not implemented' })
})

export default router