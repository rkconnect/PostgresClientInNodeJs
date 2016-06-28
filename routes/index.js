var express = require('express');
var router = express.Router();
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));
var pg = require('pg');
var url = require('url');


/* GET home page. */
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
});

/*
 Get API 
 URL: ~/api/v1/tablename
 Output: All the table rows in JSON format
 */
router.get('/api/v1/table1', function (req, res) {
    var output = [];

    //New instance of client
    var client = new pg.Client(connectionString);

    //Connecting Client
    client.connect();

    //SQL Query goes here
    var query = client.query("SELECT * FROM table1");

    //Saving SQL result in the output array row-wise
    query.on('row', function (row) {
        output.push(row);
    });

    //At End Event
    query.on('end', function () {
        client.end();
        return res.json(output);
    })

});

module.exports = router;
