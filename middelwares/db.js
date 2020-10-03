const mongoose = require('mongoose');

const connectDB = {};
var conn = false;
var url = "mongodb://root:root@cluster0-shard-00-00.gs8ei.mongodb.net:27017,cluster0-shard-00-01.gs8ei.mongodb.net:27017,cluster0-shard-00-02.gs8ei.mongodb.net:27017/project0?ssl=true&replicaSet=atlas-13uq4e-shard-0&authSource=admin&retryWrites=true&w=majority";

connectDB.connect = async () => {
    try {
        conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        debugger;
        console.log(error);
        process.exit(1);
    }
}

connectDB.close = () => {
    mongoose.connection.close();
}

module.exports = connectDB;