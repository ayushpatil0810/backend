require('dotenv/config')
const { db } = require('./db')
const { userTable, usersTable } = require('./drizzle/schema.js')

async function getAllUsers() {
    const users = await db.select().from(usersTable)
    console.log('Users:', users)
    return users
}

async function createUser({id, name, email}) {
    await db.insert(usersTable).values({
        id,
        name,
        email
    })
}

// createUser({id: 1, name: "Ayush", email: "test@example.com"})
// createUser({id: 2, name: "Another User", email: "email@example.com"})

getAllUsers()
