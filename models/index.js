const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb://MarkKleinfelder:DrumPW@drumproject-shard-00-00.0iq1i.mongodb.net:27017,drumproject-shard-00-01.0iq1i.mongodb.net:27017,drumproject-shard-00-02.0iq1i.mongodb.net:27017/radbeats?ssl=true&replicaSet=atlas-ko0ip2-shard-0&authSource=admin&retryWrites=true&w=majority"


function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}
module.exports = {
    initialize
};