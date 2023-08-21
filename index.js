import express from 'express';
import productRoutes from './routes/ProductRoutes.js';
import { DbConnection } from "./database/dbutils.js";
import userRouter from "./routes/UserRoutes.js";
await DbConnection("mongodb://localhost:27017/shop");
const app = express(), port = 3001;
app.use('/', productRoutes);
app.use('/', userRouter);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
