const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`${config.get("MONGODB_URI")}/LibraryManagementDB`)
.then(()=>{
    console.log("Connected to MongoDB...");
}).catch((err)=>{
    console.log("Error connecting to MongoDB...",err);
});

module.exports = mongoose.connection;