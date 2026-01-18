import { eq } from 'drizzle-orm'
import db from '../db/index.js'
import {usersTable} from '../db/schema.js'

async function update(req, res) {
    const user = req.user
    if(!user) {
        return res.statusCode(401).json({'error' : 'You are not logged in'})
    }

    const {name} = req.body

    await db.update(usersTable).set({ name }).where(eq(usersTable.id, user.id))

    return res.json({'status' : 'success'})
}

export default update