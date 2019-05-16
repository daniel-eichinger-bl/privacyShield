const sqlite3 = require('sqlite3').verbose();

/* Database Connection */
const db = new sqlite3.cached.Database('./data/database');

const addDevice = (device) => {
    const stmt = "INSERT INTO privacy_shield(mac, timestamp, ip, blocked) VALUES (?,?,?,?)";
    db.get(stmt, [device.mac, device.timestamp, device.ip, 0], (err, row) => {
        if (err) {
            console.log(err);
        }
    });
}

exports.updateBlockedDevice = (mac, blocked) => {
    blockedInt = blocked === true ? 1 : 0;

    const stmt = "UPDATE privacy_shield SET blocked=? WHERE mac=?";

    db.run(stmt, [blocked, mac], (err) => {
        if (err) {
            console.log(err);
        }
    });
}

const updateTimestampDevice = (device) => {
    const stmt = "UPDATE privacy_shield SET timestamp=? WHERE mac=?";

    db.run(stmt, [device.timestamp, device.mac], (err) => {
        if (err) {
            console.log(err);
        }
    });

}

exports.mergeDevices = async (scanedDevices) => {
    let dbDevices = await getDevicesFromDB();

    // 1. update timestamps of dbDevices that are connected
    dbDevices = dbDevices.map(d => {
        const result = scanedDevices.find(sD => sD.mac === d.mac);
        if (result) {
            d.timestamp = new Date().getTime();
            updateTimestampDevice(d);
        }
        return d;
    });


    // 2. see what connected devices are new
    const newDevices = scanedDevices.filter(d => {
        const result = dbDevices.find(dbD => dbD.mac === d.mac);
        return result === undefined;
    });

    // 3. add new devices to Database
    for (const d of newDevices) {
        addDevice(d);

        // construct dbDeviceObject and push to database
        const { mac, ip, timestamp } = d;
        device = { mac, ip, timestamp, blocked: 0 };
        dbDevices.push(device);
    }

    // 4. return new Devices and database Devices
    console.log("\nDatabase+New Devices:")
    console.log({ dbDevices })
    return dbDevices;
}

function getDevicesFromDB() {
    return new Promise((resolve, reject) => {

        const dbDevices = [];
        return db.each("SELECT * FROM privacy_shield", function (err, row) {
            dbDevices.push(row);

            if (err) {
                reject(err);
            }
        }, () => {
            resolve(dbDevices);
        });

    });
}