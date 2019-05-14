const util = require('util');
const exec = util.promisify(require('child_process').exec);
const arpscan = require('arpscan/promise');


exports.getDevices = async (req, res) => {
    const { stdout, stderr } = await exec('iw dev wlan0 station dump');
    const connectedDevices = stdout;
    
    console.log(connectedDevices);

    const ipsMacsMapping = await runArpScan();
    
    if(ipsMacsMapping.length > 0 && connectedDevices) {
        res.status(200).json({connectedDevices,ipsMacsMapping});
    } else {
        res.status(500).json({status: "Internal Error, Arp Scan failed"});
    }

}

/* 
    returns if successfull Array of: 
    {
        "ip": "10.70.107.20",
        "mac": "74:E6:E2:DE:15:73",
        "vendor": "(Unknown)",
        "timestamp": 1557810541224
    }
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