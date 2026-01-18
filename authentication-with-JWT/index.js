import express from "express"
import router from "./routes/users.routes.js"
import jwt from 'jsonwebtoken'

import { eq } from 'drizzle-orm'
import db from './db/index.js'
import {usersTable, userSessions} from './db/schema.js'

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.use(async (req, res, next) => {
    try {
        // get the token header
    const tokenHeader = req.headers['authorization']
    // Header authorization: Bearer <TOKEN>

    // if tokenHeader is missing
    if(!tokenHeader) {
        return next()
    }

    if(!tokenHeader.startsWith('Bearer')) {
        return res
        .status(400)
        .json({error: 'authorization header must be start with bearer'})
    }

    const token = tokenHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // add a property 'user' in request
    req.user = decoded
    next()
    } catch (error) {
        next()
    }
})

app.get('/', (req, res) => {
    return res.json({status: 'Server is up and running'})
})

app.use('/user', router)

app.listen(PORT, () => console.log(`Server running at ${PORT}`))