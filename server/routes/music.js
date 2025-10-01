import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import MusicController from '../controllers/music.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()
router.get('/', MusicController.getMusic)

router.get('/:eventId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/gifts.html'))
})

export default router
