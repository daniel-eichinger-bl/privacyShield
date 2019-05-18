const sqlite3 = require('sqlite3').verbose();

/* Database Connection */
const db = new sqlite3.cached.Database('../data/database', err => {
    if (err === null) {
        console.log("\nDatabase Connection successfull")
    } else {
        console.error("\nError - Database Connection")
    }
});

exports.setupDatabse = () => {
    /* Check if database table exits and creates it */
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='privacy_traffic'", (err, row) => {
        if (!row) {
            console.log("--> PrivacyTraffic Database created!")
            db.run("CREATE TABLE privacy_traffic (macSrc TEXT, macDest TEXT, timestamp INTEGER, type TEXT, host TEXT)", err => {
                if (err) {
                    console.error(err);
                }
            });
        } else {
            console.log("--> PrivacyTraffic Database found!")
        }
    });

}

exports.addToDb = (packet) => {
    const { macSrc, macDest, timestamp, type, host } = packet;

    const stmt = "INSERT INTO privacy_traffic(macSrc, macDest, timestamp, type, host) VALUES (?,?,?,?,?)";
    db.get(stmt, [macSrc, macDest, timestamp, type, host], (err, row) => {
        if (err) {
            console.log(err);
        }
    });

}