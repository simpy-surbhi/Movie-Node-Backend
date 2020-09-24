const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Router = express.Router();

const CommentUser = require('../../models/CommentUser');
const SeenMovie = require('../../models/SeenMovie');

// This is the route to have all the tws
Router.get('/', (req, res) => {
    CommentUser.find()
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

Router.post('/getSeenMovie', (req, res) => {
    const userid = req.body.userid;
    SeenMovie.find({userid:userid})
        .lean()
        .exec()
        .then(tws => {
            console.log(tws);
            res.status(200).json(tws);
        })
        .catch(err => {
            error = err;
            console.error(error);
    });
})



module.exports = Router;