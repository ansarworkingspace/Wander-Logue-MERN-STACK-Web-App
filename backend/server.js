import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import cookieParser from "cookie-parser";
const port = process.env.PORT || 4000
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes)

app.get('/',(req,res)=>res.send('server is ready'));
app.use(notFound);
app.use(errorHandler);


app.listen(port,()=>console.log(`server start on port ${port}`));

