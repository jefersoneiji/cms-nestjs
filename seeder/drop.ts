import mongoose from "mongoose";

async function drop() {
    const mongo_url = process.env.NODE_ENV === 'development' ? 'localhost' : 'mongo';
    const connection = await mongoose.connect(`mongodb://${mongo_url}:27017/cms`);
    await connection.connection.dropDatabase();
    await mongoose.connection.close();
}
drop();