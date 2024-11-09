const mongoose = require('mongoose');

const Classes = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    start_date: {
         type: Date, required: true 
    },
    end_date: {
         type: Date, required: true 
    }
});
module.exports=mongoose.model('Classes',Classes);