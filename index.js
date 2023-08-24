import express from 'express';
import productRoutes from './routes/ProductRoutes.js';
import { DbConnection } from "./database/dbutils.js";
import userRouter from "./routes/UserRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import cors from 'cors';
import orderRouter from "./routes/OrderRoutes.js";
await DbConnection("mongodb://localhost:27017/shop");
const app = express(), port = 3001;
app.use(cors());
app.use('/products', productRoutes);
app.use('/', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
