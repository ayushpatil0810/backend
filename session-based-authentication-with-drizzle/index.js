import express from "express"
import router from "./routes/users.routes.js"


import { eq } from 'drizzle-orm'
import db from './db/index.js'
import {usersTable, userSessions} from './db/schema.js'

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.use(async (req, res, next) => {
    const sessionId = req.headers['session-id']

    // if sessionId is missing
    if(!sessionId) {
        return next()
    }

    // if sessionId is present
    const [data] = await db.select({
        sessionId: userSessions.id,
        id: usersTable.id,
        userId: userSessions.userId,
        name: usersTable.name,
        email: usersTable.email
    })
    .from(userSessions)
    .rightJoin(usersTable, eq(userSessions.userId, usersTable.id))
    .where(eq(userSessions.id, sessionId))

    // if there is no data or the sessionId was wrong so it couldnt get the data from the database
    if(!data) {
        return next()
    }

    req.user = data
    next()
})

app.get('/', (req, res) => {
    return res.json({status: 'Server is up and running'})
})

app.use('/user', router)

app.listen(PORT, () => console.log(`Server running at ${PORT}`))