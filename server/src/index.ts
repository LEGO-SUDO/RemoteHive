import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose, { ConnectOptions } from "mongoose"
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()
const port = 5001 || process.env.PORT



app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)


const connect = () =>  mongoose
      .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to the DB!'
        );
      })
      .catch((err) => {
        console.log(
          `Cannot connect to DB refer error message: `,
          err
        );
      });

app.listen(port, () => {
  connect()
  console.log(`App is listening on PORT: ${port}!`)
})



