import express, { Request, Response } from 'express'
import RouterUsers from './routes/user'
import RouterProducts from './routes/product'

const app = express()

app.use(express.json())
app.use('/test', (req: Request, res: Response) => res.status(200).json({ message: 'Working!' }))
app.use(RouterUsers)
app.use(RouterProducts)
export { app }