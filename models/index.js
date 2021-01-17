var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI|| 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/project4v2");



//

module.exports.Program = require("./programs.js");