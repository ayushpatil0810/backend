import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import {usersTable} from '../db/schema.js'
import  {randomBytes, createHmac, sign} from 'crypto'

async function signup(req, res) {
    const { name, email, password } = req.body

    const [existingUser] = await db
        .select({
            email: usersTable.email
        })
        .from(usersTable)
        .where(table => eq(table.email, email))

    if (existingUser) {
        return res
            .status(400)
            .json({error: `user with ${email} already exists!`})
    }


    //if users with the email dosent exists, creata a account
    
    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')

    const [user] = await db.insert(usersTable).values({
        name,
        email,
        password: hashedPassword,
        salt,

    })
    .returning({id: usersTable.id})
    return res.status(201).json({status: 'success', data: {userId: user.id}})
}

export default signup