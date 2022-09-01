import mongoose from "mongoose";
mongoose.set('useCreateIndex', true);

const Connection = async (URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Database is successfully connected');
    } catch (error) {
        console.log('Error:', error.message);
    }
}

export default Connection;