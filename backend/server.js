const fs = require('fs');
const csvParser = require('csv-parse');

const app = require('express')();

// We could use socket.io for real-time data feed
// if I had more time and there was actual live data service
app.get('/departures', function (req, res) {
    fs.createReadStream(__dirname + '/database/Departures.csv')
        .pipe(csvParser({}, function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        }));
});

app.listen(3001, function () {
    console.log('Express is running at http://localhost:3001')
});