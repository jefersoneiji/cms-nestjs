import mongoose from "mongoose";

async function drop() {
    const connection = await mongoose.connect('mongodb://localhost:27017/cms');
    await connection.connection.dropDatabase();
    await mongoose.connection.close();
}
drop();