import express from "express"
import signup from "../controllers/signup.controller.js"
import login from "../controllers/login.controller.js"
import update from "../controllers/update.controller.js"



const router = express.Router()

router.get('/', async (req, res) => {
    const user = req.user
    if(!user) {
        return res.status(401).json({'error' : 'You are not logged in'})
    }  
    //if we get the data
    return res.json({user})  
})
router.patch('/', update)
router.post('/signup', signup) // 
router.post('/login', login)

export default router