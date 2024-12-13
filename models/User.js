const { model, Schema } = require("../connection");

// Define the schema
const Users = new Schema({
    username: { type: String}, 
    email: { type: String }, 
    password: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

// Export the model
module.exports = model("user", Users);
