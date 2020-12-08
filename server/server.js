import express from 'express'
import winston from 'winston'
import morgan from 'morgan'
import monk from 'monk'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import * as fs from 'fs'
import * as path from 'path'

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))

dotenv.config()

const database = monk(process.env.MONK_HOST)
const collection = database.get('repositories')

fs.readdir(path.resolve('./routes'), (err, files) => {
    if(err) throw err
    if(!files.length) throw new Error('No files found')

    files.forEach(file => require(`./routes/${file}`))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server has started here http://localhost:${PORT}`))

export {app, collection}
