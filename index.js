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
const CommentUser = require('./models/CommentUser');
const SeenMovie = require('./models/SeenMovie');
const Ratings = require('./models/Ratings');

const connectDB = require('./middelwares/db');
const { find } = require('./models/CommentUser');
const { send } = require('process');
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
    
    if(sender){
       getRating(sender)
       getComments(sender)
    }
      
	socket.on('addcomment', function(msg,callback){
        if (Object.keys(msg).length !== 0) {
            const comment = new CommentUser({
                id: new mongoose.Types.ObjectId(),
                title: msg.title,
                comment: msg.comment,
                userid: msg.userid,
                movieid: msg.movieid
            })
            comment.save()
            .then(comment => {
                io.emit("getComment"+comment.movieid, comment)
                callback({"status":200,"msg":"getComment"+comment.movieid})
            })
            .catch(err => {
                callback({"status":500,"err":err})
            })
        } else {
            callback({"status":500,"err":"Send body data also"})
        }  
    })


    socket.on('SeenMovie', function(msg,callback){
        if (Object.keys(msg).length !== 0) {
            const seen = new SeenMovie({
                id: new mongoose.Types.ObjectId(),
                userid: msg.userid,
                movieid: msg.movieid
            })
            seen.save()
            .then(seen => {
                callback({"status":200,"msg":"Added Records"})
            })
            .catch(err => {
                callback({"status":500,"err":err})
            })
        } else {
            callback({"status":500,"err":"Send body data also"})
        }  
    })

    socket.on('addratings', function(msg,callback){
        if (Object.keys(msg).length !== 0) {

            Ratings.find({
                userid: msg.userid,
                movieid:msg.movieid
            }).lean().exec().then(tw => {
                callback({"status":500,"err":"already gave ratings"})
            })
            .catch(err => { 
                error = err;
                console.error(error);
                callback({"status":500,"err":"already gave ratings"})
            });

            const ratings = new Ratings({
                id: new mongoose.Types.ObjectId(),
                rating:msg.rating,
                userid: msg.userid,
                movieid: msg.movieid
            })
            ratings.save()
            .then(rating => {
                callback({"status":200,"ratings":"4","totalcount":"12020","five":"150","four":"120","three":"2432","two":"433443","one":"213123"})
            })
            .catch(err => {
                callback({"status":500,"err":err})
            })
        } else {
            callback({"status":500,"err":"Send body data also"})
        }  
    })

    async function getComments(movieid){
        if (movieid) {
            const comments = await CommentUser.find({movieid:movieid})
            console.log("comments total"+comments.length)
            io.emit("getComment"+movieid, comments)
        }
    }

    async function getRating(movieid){
        if (movieid) {
            
            const fivecount = await Ratings.find({ rating:"5", movieid:movieid});
            console.log(fivecount.length)
            const fourcount = await Ratings.find({ rating:"4", movieid:movieid});
            const threecount = await Ratings.find({ rating:"3", movieid:movieid});
            const twocount = await Ratings.find({ rating:"2", movieid:movieid});
            const onecount = await Ratings.find({ rating:"1", movieid:movieid});
            const totalcount = await Ratings.find({ movieid:movieid});

            average = ((5*fivecount.length) + (4*fourcount.length) + (3*threecount.length) + (2*twocount.length) + (1*onecount.length))/(fivecount.length+fourcount.length+threecount.length+twocount.length+onecount.length)
            average = Number((average).toFixed(1));
            io.emit("getRatings"+movieid, {"status":200,"ratings":average,"totalcount":totalcount.length,"five":fivecount.length,"four":fourcount.length,"three":threecount.length,"two":twocount.length,"one":onecount.length})
        }
    }

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

