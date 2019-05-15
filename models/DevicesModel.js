const sqlite3 = require('sqlite3').verbose();

/* Database Connection */
const db = new sqlite3.cached.Database('./data/database');


// mac TEXT PRIMARY KEY, timestamp TEXT, ip TEXT, blocked INTEGER DEFAULT 0
const addDevice = (device) => {
    const stmt = "INSERT INTO privacy_shield(mac, timestamp, ip, blocked) VALUES (?,?,?,?)";
    db.get(stmt, [device.mac, device.timestamp, device.ip, 0], (err, row) => {
        if (err) {
            console.log(err);
        }
    });
}

exports.getDevices = async (scanedDevices) => {
    let dbDevices = await getDevicesFromDB();

    // update timestamps of dbDevices, TODO update this in database also
    dbDevices = dbDevices.map(d => {
        const result = scanedDevices.find(sD => sD.mac === d.mac);
        if(result) {
            d.timestamp = new Date().getTime();
        } 
        return d;
    });



    // get new Devices
    const newDevices = scanedDevices.filter(d => {
        const result = dbDevices.find(dbD => dbD.mac === d.mac);
        return result === undefined;
    });

    // add new Devices to Database
    for(const d of newDevices) {
        addDevice(d);
        
        // construct dbDeviceObject
        const {mac, ip, timestamp} = d;
        device = {mac, ip, timestamp, blocked: 0};
        dbDevices.push(device);
    }

    console.log("\nDatabase+New Devices:")
    console.log({dbDevices})
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

 /*
    db.get("SELECT * FROM privacy_shield", (err, row) => {
        const devices = []
        if(err === null) {
            if(!row) {
                for(const device of scanedDevices) {
                    addDevice(device);
                }
            } else {
                console.log({row});
            }
        } else {
            return []
        }
    })*/

    /*db.get("SELECT * FROM privacy_shield WHERE mac=$mac",{$mac: device.mac}, (err, row) => {
           console.error(err);
           console.log(row);
       });*/