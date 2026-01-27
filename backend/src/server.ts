import express from 'express'
import TaskRouter from './TaskRouter'
import { connectDB } from './config/db'
import { corsOptions } from './config/cors'
import cors from 'cors';

const app = express()
connectDB()
app.use(cors(corsOptions));

app.use(express.json())

app.use('/api/task', TaskRouter)

export default app

