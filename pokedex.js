const express = require('express');
const mongoIO = require('./io.js')
const mongoDB = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('static'))

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

function GetPokedexApi (req, res, next) {
    function sendDataCallback(err, docs) {
        if (docs) {
            res.json(docs);
        } else {
            console.log('ouch');
            console.log(err);
        }
    }

    mongoIO.readItem(sendDataCallback);
}

app.get('/api/pokedex', GetPokedexApi)

function PostPokedexAPI(req, res, next) {
    try {
        mongoIO.writeItem(req.body);
    } catch (error) {
        next(error);
    }
    res.redirect('/page2.html')
}

app.post('/api/pokedex', PostPokedexAPI);

function DeletePokedexAPI(req, res, next) {
    try {
        mongoIO.deleteItem({ _id: mongoDB.ObjectID(req.body._id), title: req.body.title });
        res.send({ _id: mongoDB.ObjectID(req.body._id) });
    } catch (error) {
        next(error);
    }
}

app.delete('/api/pokedex', DeletePokedexAPI);

app.listen(port, function() {console.log(`Pokedex is running on port ${port}!`)});