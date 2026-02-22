import { Router } from 'express'
import pool from '../db/pool'

const router = Router()

router.post('/', async(req, res) => {
    const { species, notes, photo_url, latitude, longitude, user_id } = req.body

    const result = await pool.query(
        `INSERT INTO sightings (species, notes, photo_url, latitude, longitude, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [species, notes, photo_url, latitude, longitude, user_id]
    )
    
    res.json(result.rows[0])
})

router.get('/', async(req, res) => {
    const result = await pool.query(
        `SELECT * FROM sightings ORDER BY created_at DESC`
    )

    res.json(result.rows)
})

export default router