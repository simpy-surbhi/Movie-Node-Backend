const mongoose = require('mongoose');

const connectDB = {};
var conn = false;
var url = "mongodb://root:root@cluster0-shard-00-00.3kixn.mongodb.net:27017,cluster0-shard-00-01.3kixn.mongodb.net:27017,cluster0-shard-00-02.3kixn.mongodb.net:27017/project0?ssl=true&replicaSet=atlas-c3j4kj-shard-0&authSource=admin&retryWrites=true&w=majority";

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