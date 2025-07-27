import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorHandler.js";
import productRoute from './routes/product.route.js'


dotenv.config();
connectDb();

const port = process.env.PORT || 5000
const app = express();

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/product', productRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})
