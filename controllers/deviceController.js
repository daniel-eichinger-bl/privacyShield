const util = require('util');
const exec = util.promisify(require('child_process').exec);
const arpscan = require('arpscan/promise');


/* 
 returns { "devices": [ { "ip": "10.70.107.38", "mac": "6C:40:08:9E:EB:8E", "vendor": "(Unknown)", "timestamp": 1557812866910 }, { "ip": "10.70.107.234", "mac": "04:D6:AA:C2:4B:FF", "vendor": "(Unknown)", "timestamp": 1557812866910 } ] }
*/
exports.getDevices = async (req, res) => {
    const { stdout, stderr } = await exec('iw dev wlan0 station dump');

    if (stdout) {
        const macs = parseStationOutput(stdout);
        const ipsMacsMapping = await runArpScan();

        if (ipsMacsMapping.length > 0 && macs.size > 0) {
            const devices = findIpForMacs(macs, ipsMacsMapping);

            res.status(200).json({ devices });
        } else {
            res.status(500).json({ status: "Internal Error, Arp Scan failed" });
        }
    } else {
        res.status(500).json({ status: "Internal Error, no connected devices!" });
    }
}


function findIpForMacs(macs, ipsMacsMappings) {
    let connectedDevices = [];
    for(const ipMacMapping of ipsMacsMappings) {
        if(macs.has(ipMacMapping.mac.toLowerCase())) {
            console.log(ipMacMapping);
            connectedDevices.push(ipMacMapping);
        }
    } 
    return connectedDevices;
}

/*
    gets connected macs from access point  
*/
function parseStationOutput(output) {
    let macs = new Set();
    const lines = output.split('\n');
    for (const line of lines) {
        if (line.includes("Station")) {
            var mac = line.replace('Station ', '')
            mac = mac.replace(' (on wlan0)', '')
            macs.add(mac)
        }
    }
    return macs;
}


/* 
    returns {"ip": "10.70.107.20","mac": "74:E6:E2:DE:15:73","vendor": "(Unknown)","timestamp": 1557810541224}
*/
function runArpScan() {
    return arpscan({ sudo: true, args: ["--localnet"], interface: "br0" })
        .then(onResult => {
            return onResult;
        })
        .catch(onError => {
            console.log({ onError })
            return [];
        });
}