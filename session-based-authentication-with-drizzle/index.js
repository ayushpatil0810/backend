import express from "express"
import router from "./routes/users.routes.js"

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({status: 'Server is up and running'})
})

app.use('/user', router)

app.listen(PORT, () => console.log(`Server running at ${PORT}`))