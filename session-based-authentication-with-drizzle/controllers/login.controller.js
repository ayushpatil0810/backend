import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import {usersTable, userSessions} from '../db/schema.js'
import  {randomBytes, createHmac, sign} from 'crypto'

async function login(req, res) {
    const { name, email, password } = req.body

    const [existingUser] = await db
        .select({
            id: usersTable.id,
            email: usersTable.email,
            salt: usersTable.salt,
            password: usersTable.password
        })
        .from(usersTable)
        .where(table => eq(table.email, email))
    
    if(!existingUser) {
        return res.status(404).json({error: `user with email ${email} does not exists!`})
    }

    const salt = existingUser.salt
    const existingHash = existingUser.password

    const newHash = createHmac('sha256', salt).update(password).digest('hex')

    if (newHash != existingHash) {
        return res.status(400).json({'error': `Incorrect password`})
    }

    // Generate a session for user

    const [session] = await db.insert(userSessions).values({
        userId: existingUser.id
    }).returning({id: userSessions.id})

    return res.json({status: 'success', sessionId: session.id})
}

export default login