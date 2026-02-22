import { Request, Response, NextFunction } from 'express'
import admin from 'firebase-admin'

const serviceAccount = require(process.env.FIREBASE_KEY_PATH as string)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split('Bearer ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token)
    ;(req as any).user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}