const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Comment = require('../../models/Comment');
const SeenMovie = require('../../models/SeenMovie');

// This is the route to have all the tws
Router.get('/', (req, res) => {
    Comment.find()
        .lean()
        .exec()
        .then(tws => {
            res.status(200).json(tws);
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
})

// this is the route to have one specific tw
// Router.get('/:twId', (req, res) => {
//     twId = req.params.twId;

//     Tw.find({
//         _id: twId
//     })
//         .lean()
//         .exec()
//         .then(tw => {
//             res.status(200).json(tw);
//         })
//         .catch(err => {
//             error = err;
//             console.error(error);
//         });
// })


//this is the route to create a tw
Router.post('/create', (req, res) => {
    console.log(req.body)
    if (Object.keys(req.body).length !== 0) {
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
            res.status(200).send(comment);
        })
        .catch(err => {
            res.status(500).json({error: err});    
        })
    } else {
        res.status(500).json({error: "Send body data also"});    
    }
})

//this is the route to create a tw
Router.post('/addscenemovie', (req, res) => {
    console.log(req.body)
    if (Object.keys(req.body).length !== 0) {
        const seenmovie = new SeenMovie({
            id: new mongoose.Types.ObjectId(),
            userid: req.body.userid,
            movieid: req.body.movieid
        })
        seenmovie.save()
        .then(seenmovie => {
            res.status(200).send(seenmovie);
        })
        .catch(err => {
            res.status(500).json({error: err});    
        })
    } else {
        res.status(500).json({error: "Send body data also"});    
    }
})

// this is the route to delete a tw
// Router.delete('/:twId', (req, res) => {
//     twId = req.params.twId;

//     Tw.remove({
//         _id: twId
//     })
//         .exec()
//         .then(result => {
//             res.status(200).json({ 'message': 'This has been deleted !' });
//         })
//         .catch(err => {
//             error = err;
//             console.error(error);
//         });
// })

// // this is the route to update a tw
// Router.patch('/:twId', (req, res) => {
//     twId = req.params.twId;
//     message = req.body.message;

//     if (req.body.message && req.body.message != "") {
//         Tw.update({ _id: twId }, {
//                 $set: {
//                     message: req.body.message,
//                 }
//             })
//             .exec()
//             .then(tw => {
//                 res.status(200).json(tw);
//             })
//             .catch(err => {
//                 res.status(500).json({ error: err });
//             });
//     } else {
//         res.status(500).json({ error: 'updated' });
//     }
// })

module.exports = Router;