const mongoose =require('mongoose');

const RatingsSchema = new mongoose.Schema({

rating:{
    type: Int,
    required: true
},
userid:{
    type: String,
    required:true
},
movieid:{
    type: String,
    required:true
},
createdon:{
    type: Date,
    default: Date.now
},
updatedon:{
    type: Date,
    default: Date.now
}},{
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('Ratings', RatingsSchema);