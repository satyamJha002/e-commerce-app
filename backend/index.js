import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorHandler.js";
import productRoute from './routes/product.route.js';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser'


dotenv.config();
connectDb();

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/product', productRoute);
app.use('/api/auth', authRoute)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})
