const mongoose =require('mongoose');

const TwSchema = new mongoose.Schema({
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

module.exports = mongoose.model('SeenMovie', TwSchema);