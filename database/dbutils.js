import mongoose from "mongoose";

/**
 * Connect to MongoDB
 * @param url - connection string
 * @returns {Promise<void>} - returns a connect promise
 * @constructor
 */
export async function DbConnection(url) {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error(error);
    }
}
