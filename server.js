const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const devicesApi = require('./routes/devicesApi');
const databaseChecker = require('./databaseChecker');

app.use(bodyParser.json());


// Check databases
databaseChecker.checkDatabases();


// Set-Up Routes
app.use('/api/devices', devicesApi);


const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


/* Closing Server Cleanup */
function cleanup() {
    console.log("--> Server closing");
    db.close(err => {
        if(err) {
            console.error(err);
        }
    });
    process.exit();
}

process.on('SIGINT', cleanup);