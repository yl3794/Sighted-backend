import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './db/pool'
import sightingsRouter from './routes/sightings'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
    origin: 'http://localhost:3001' 
}))
app.use(express.json())
app.use('/sightings', sightingsRouter)


app.get('/health', (req, res) => {
    res.json({ status: 'ok'})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

