const {Schema, model} = require("../connection");

// Github Library API = "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";

const Library = new Schema({
    name : {type : String, required: true}, 
    command: {type: String, required: true},
    description : { type: String, required: true},
    github_url : {type : String, required: true},
    tags : {type: [String], default: []},
    stars : {type: Number, default: 0},
    created_at: {type: Date, default: Date.now}

})

module.exports = model("library", Library);