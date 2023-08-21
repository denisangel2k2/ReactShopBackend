import mongoose from "mongoose";

export async function DbConnection(url:string){
    try{
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    }
    catch(error) {
        console.error(error);
    }
}

