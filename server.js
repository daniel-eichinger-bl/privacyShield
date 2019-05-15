const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const devicesApi = require('./routes/devicesApi');
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.json());


/* Database Connection */
const db = new sqlite3.cached.Database('./data/database', err => {
    if(err === null) {
        console.log("\nDatabase Connection successfull")
    } else {
        console.error("\nError - Database Connection")
    }
});

/* Check if database table exits and creates it */ 
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='privacy_shield'", (err, row) => {
    if(!row) {
        console.log("--> PrivacyShield Database created!")
        db.run("CREATE TABLE privacy_shield (mac TEXT PRIMARY KEY, timestamp INTEGER, ip TEXT, blocked INTEGER DEFAULT 0)", err => {
            if(err) {
                console.error(err);
            }
        });
    } else {
        console.log("--> PrivacyShield Database found!")
    }
});


/*
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});*/


// Set-Up Routes
app.use('/api/devices', devicesApi);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

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