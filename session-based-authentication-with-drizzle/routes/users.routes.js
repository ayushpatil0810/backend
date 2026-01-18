import express from "express"
import signup from "../controllers/signup.controller.js"
import login from "../controllers/login.controller.js"

import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import {usersTable, userSessions} from '../db/schema.js'

const router = express.Router()

router.patch('/', async(req, res) => {
    const user = req.user
    if(!user) {
        return res.statusCode(401).json({'error' : 'You are not logged in'})
    }

    const {name} = req.body

    await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id))

    return res.json({'status' : 'success'})
})

router.get('/', async (req, res) => {

    const user = req.user
    if(!user) {
        return res.statusCode(401).json({'error' : 'You are not logged in'})
    }

    //if we get the data
    return res.json({user})
    
})

router.post('/signup', signup) // 
router.post('/login', login)

export default router