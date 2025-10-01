import { pool } from "./database.js";
import dotenv from "./dotenv.js"; 

import musicData from "../data/gifts.js";

const createMusicTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS music_table;

        CREATE TABLE IF NOT EXISTS music_table (
            id SERIAL PRIMARY KEY,
            eventName VARCHAR(155) NOT NULL,
            artists VARCHAR(155) NOT NULL,
            date VARCHAR(10) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            venue VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            image TEXT NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 gifts table created successfully')
    }
    catch (err) {
    console.error('⚠️ error creating gifts table', err)
    }
};

const seedMusicTable = async () => {
  await createMusicTable();

  musicData.forEach((music) => {
    const insertQuery = `
      INSERT INTO music_table (eventName, artists, date, venue, genre, price, image)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      music.eventName,
      music.artists,
      music.date,
      music.venue,
      music.genre,
      music.price,
      music.image
    ];

    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.error('⚠️ error inserting gift', err)
            return
        }
        console.log(`✅ ${music.eventName} added successfully`)
    });
  })
};

seedMusicTable();