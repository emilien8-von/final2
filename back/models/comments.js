const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        min: 0, 
        max: 5,
        default: 0 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true 
    },
    game: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Jeux', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);