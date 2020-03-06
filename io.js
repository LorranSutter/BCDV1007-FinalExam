/* Reading and writing data:
https://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/
*/

const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./url');
const db = "Pokedex";
const collectionName = "Pokemon";

function writeItem(data) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        // This will create a collection with the collectionName if one doesn't exist. In
        // general, mongo will create a collection if you reference one that
        // doesn't yet exist. Likewise, if you ask for the quantity of a
        // model that doesn't exist, it will just say 0.
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db(db).collection(collectionName);
        if (Array.isArray(data)) {
          collection.insertMany(data);
        } else {
          collection.insertOne(data);
        }
        client.close();
    })
}

function readItem(callback) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db(db).collection(collectionName);
        return collection.find({}).toArray(callback);
  })
}

function deleteItem(item) {
  const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
  client.connect(function(err) {
    const collection = client.db(db).collection(collectionName);
    collection.deleteOne(item, function(err, r){
      if (err) {
        throw new Error(err)
      } else {
        console.log(`IO delete finished, using: ${item._id}`);
      }
    })
  })
}

exports.writeItem = writeItem
exports.readItem = readItem
exports.deleteItem = deleteItem
