import { pool } from '../config/database.js'

const getMusic = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM music_table ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (err) {
        res.status(409).json( { error: error.message } )
    }
} 

export default {
  getMusic
}