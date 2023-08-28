import express from 'express';
import cors from 'cors';
import {DbConnection} from "./database/dbutils.js";
import productRoutes from './routes/ProductRoutes.js';
import userRouter from "./routes/UserRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";
import reviewRouter from "./routes/ReviewRoutes.js";

await DbConnection("mongodb://localhost:27017/DenisShop");

const app = express(), port = 3001;

app.use(cors());
app.use('/products', productRoutes);
app.use('/', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/reviews', reviewRouter);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
