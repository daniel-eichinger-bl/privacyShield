const sqlite3 = require('sqlite3').verbose();

/* Database Connection */
const db = new sqlite3.cached.Database('./data/database');

exports.getTrafficByMac = (mac) => {
    return new Promise((resolve, reject) => {
        const traffic = [];
        return db.each(`SELECT * FROM privacy_traffic WHERE macSrc="${mac}"`, function (err, row) {
            traffic.push(row);

            if (err) {
                reject(err);
            }
        }, () => {
            resolve(traffic);
        });
    });
}