const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const uri = "mongodb://localhost:27017/cardsagainststupidity"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    pinnedQuizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
})

userSchema.plugin(uniqueValidator)

//check if user exists
userSchema.statics.checkAccount = function (username, password, callback){
    User.findOne({
        username,
        password
    }, (err, doc)=>{
        if(err){
            return false
        } else {
            return true
        }
    })
}


// create a user

userSchema.statics.createAccount = function (name, username, password, callback) {

    User.collection.insert({
        name,
        username,
        password,
        pinnedQuizzes: []
    })
}


// find a user if unique

// update user details

const User = mongoose.model("User", userSchema, 'users')


module.exports = {
    User
}