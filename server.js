const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/status', {
    useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
    author: String,
    upvotes: Number,
    text: String
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/items', async(req, res) => {
    const item = new Item({
        author: req.body.author,
        text: req.body.text,
        upvotes: 0
    });
    try {
        await item.save();
        res.send(item);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/items', async(req, res) => {
    try {
        let items = await Item.find();
        res.send(items);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/submit', async(req, res) => {
    try {
        let items = req.body.items
        for (let i = 0; i < items.length; i++) {
            let item = await Item.findOne({ author: items[i].author, text: items[i].text });
            item.upvotes++;
            await item.save()
        }
        res.send(items);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/upvote', async(req, res) => {
    try {
        let item = await Item.findOne({ author: req.body.author, text: req.body.text });
        item.upvotes = item.upvotes + 1
        await item.save()
        res.send(item);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/downvote', async(req, res) => {
    try {
        let item = await Item.findOne({ author: req.body.author, text: req.body.text });
        item.upvotes = item.upvotes - 1
        await item.save()
        res.send(item);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3011, () => console.log('Server listening on port 3011!'));

module.exports = app;
