require('dotenv').config()
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var routes       = require('./config/routes');
var ObjectId    = require('mongodb').ObjectId


app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use(routes);

/***********DATABASE*************/
var db = require('./models');
const { response } = require('express');
const dbName = "RadBeatsDb";
const collectionName = "DrumCollection";

/*************SERVER***************/

//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server running 3000');
});

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
  // get all items
  dbCollection.find().toArray(function(err, result) {
      if (err) throw err;
        console.log(result);
  });

//END POINTS

// gets all beats
  app.get("/api/programs", (request, response) => {
        dbCollection.find().toArray((err, result) => { // callback of find
            if (err) throw err;
            response.json(result);
        });
  });
// gets beat to reload to drum machine
  app.get("/api/programs/:id", (request, response) => {
    const beatId = request.params.id.toString();
    dbCollection.findOne({ _id: new ObjectId(beatId)}, (error, result) => { // callback of findOne 
      if (error) throw error;
      response.json(result);
    })
  })

// saves beat to database
  app.post("/api/programs", (request, response) => {
    const beat = request.body;
    console.log('save beat -------------', beat)
    dbCollection.insertOne(beat, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => { // callback of find
            if (_error) throw _error;
            response.json(_result);
        });
    });
  });

// deletes beat from database
  app.get("/api/programs/delete/:id", (request, response) => {
    beatId = request.params.id.toString();
    dbCollection.deleteOne({_id: ObjectId(beatId)}, (error, deleted) => {
      if (error) throw error;
      response.json(deleted);
    })
  })

// update title
  app.put("/api/programs/update/:id", (request, response) => {
    beatId = request.params.id.toString();
    console.log(request)
    dbCollection.updateOne({_id: ObjectId(beatId)},{$set: {title: request.body.title}}, (error, updated) => {
      if (error) throw error;
      response.json(updated);
    })
  })


}, function(err) { // failureCallback
  throw (err);
});

module.exports = app;