const sqlite3 = require('sqlite3').verbose();

// TODO
exports.setupDatabse = () => {
    /* Database Connection */
    const db = new sqlite3.cached.Database('../data/database', err => {
        if (err === null) {
            console.log("\nDatabase Connection successfull")
        } else {
            console.error("\nError - Database Connection")
        }
    });

    /* Check if database table exits and creates it */
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='privacy_traffic'", (err, row) => {
        if (!row) {
            console.log("--> PrivacyTraffic Database created!")
            db.run("CREATE TABLE privacy_traffic (mac TEXT PRIMARY KEY, timestamp INTEGER, ip TEXT, blocked INTEGER DEFAULT 0, name TEXT)", err => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            console.log("--> PrivacyTraffic Database found!")
        }
    });

}