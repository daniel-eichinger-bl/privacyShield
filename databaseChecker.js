const sqlite3 = require('sqlite3').verbose();


exports.checkDatabases = () => {
    /* Database Connection */
    const db = new sqlite3.cached.Database('./data/database', err => {
        if (err === null) {
            console.log("\nDatabase Connection successfull")
        } else {
            console.error("\nError - Database Connection")
        }
    });

    /* Check if privacyShield database table exits and creates it */
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='privacy_shield'", (err, row) => {
        if (!row) {
            console.log("--> PrivacyShield Database created!")
            db.run("CREATE TABLE privacy_shield (mac TEXT PRIMARY KEY, timestamp INTEGER, ip TEXT, blocked INTEGER DEFAULT 0, name TEXT)", err => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            console.log("--> PrivacyShield Database found!")
        }
    });


    /* Check if privacyTraffic database table exits */
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='privacy_traffic'", (err, row) => {
        if (!row) {
            console.error("--> PrivacyTraffic Database missing!")
            db.close();
            process.exit();
        } else {
            console.log("--> PrivacyTraffic Database found!")
        }
    });

}