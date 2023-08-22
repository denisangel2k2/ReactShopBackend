import express from 'express';
import productRoutes from './routes/ProductRoutes.js';
import {DbConnection} from "./database/dbutils.js";
import userRouter from "./routes/UserRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import cors from 'cors';

await DbConnection("mongodb://localhost:27017/shop");

const app=express(), port=2999;
app.use('/products',productRoutes);
app.use('/',userRouter);
app.use('/cart',cartRouter);

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
