require('dotenv').config()
const moment= require('moment');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const twsApiRouter = require('./routes/api/tws');

const connectDB = require('./middelwares/db');
connectDB.connect();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use('/api/tws', twsApiRouter);

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

server = io.listen(3001)

server.on('connection', function(socket){
	let sender = socket.handshake.query.movieId;
	console.log('a user connected with id - '+ sender);
      
	socket.on('addcomment', function(msg,callback){
        callback({"status":500,"err":"Send body data also"})
        return
        if (Object.keys(msg).length !== 0) {
            const comment = new Comment({
                id: new mongoose.Types.ObjectId(),
                rating: req.body.rating,
                title: req.body.title,
                comment: req.body.comment,
                userid: req.body.userid,
                movieid: req.body.movieid
            })
            comment.save()
            .then(comment => {
                callback({"status":200,"comment":comment})
            })
            .catch(err => {
                callback({"status":500,"err":err})
            })
        } else {
            callback({"status":500,"err":"Send body data also"})
        }  
    })

    socket.on('disconnect', function(){
        let sender = socket.handshake.query.idMovie
		console.log('user disconnected'+ sender)
	})
})

app.get('/',function(req,res){
    res.send('It works ! vishal kalola')
});

app.use((req,res,next)=>{
    const error =new Error('Not Found !');
    error.status = 404;
    next(error);
})

