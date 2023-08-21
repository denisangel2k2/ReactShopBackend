import mongoose from "mongoose";
export async function DbConnection(url) {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error(error);
    }
}
