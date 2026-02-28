import { Router } from 'express'
import pool from '../db/pool'
import { verifyToken } from '../middleware/auth'

const router = Router()

router.post('/', verifyToken, async(req, res) => {
    const { species, notes, photo_url, latitude, longitude } = req.body
    const firebaseUid = (req as any).user.uid

    const userResult = await pool.query(
        `SELECT id FROM users WHERE firebase_uid = $1`,
        [firebaseUid]
    )

    const userId = userResult.rows[0].id

    const result = await pool.query(
        `INSERT INTO sightings (species, notes, photo_url, latitude, longitude, user_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [species, notes, photo_url, latitude, longitude, userId]
    )
    
    res.json(result.rows[0])
})

router.get('/', verifyToken, async(req, res) => {
    const result = await pool.query(
        `SELECT * FROM sightings ORDER BY created_at DESC`
    )

    res.json(result.rows)
})

export default router