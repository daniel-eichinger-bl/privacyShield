const pcap = require('pcap');
const tlsClientHello = require('is-tls-client-hello');
const sni = require('sni');














const pcap_session = pcap.createSession('br0', "ip proto \\tcp");

const parseMac = (e) => {
    const byte = e.toString(16);
    return byte.length === 1 ? `0${byte}` : byte;
}

pcap_session.on('packet', function (raw_packet) {
    try {
    const packet = pcap.decode.packet(raw_packet);

    const ts = packet.pcap_header.tv_sec;
    const eth = packet.payload;
    const ip = eth.payload;

    if (!ip) {
        return;
    }

    const tcp = ip.payload;

    if (ip.protocolName === 'Unknown' || typeof ip.payload === 'undefined') {
        return;
    }

    const shost = eth.shost.addr.map(parseMac).join(':').toUpperCase();
    const dhost = eth.dhost.addr.map(parseMac).join(':').toUpperCase();

    const src = ip.saddr.addr.join('.')
    const dst = ip.daddr.addr.join('.')

    if (!tcp.data) {
        return;
    }


    if (tcp.sport === 8443 || tcp.sport === 443 || tcp.dport === 443 || tcp.dport === 8443) { 
        if (tlsClientHello(tcp.data)) {
            const url = sni(tcp.data);
            const obj = {ts: ts, shost: shost , dhost: dhost, saddr: src, daddr: dst, sport: tcp.sport, dport: tcp.dport, type: 'https', payload: url}
            console.log({obj});
            return;
        }
    }



    const r = tcp.data.toString('utf-8')
    if (r.indexOf('Content-Length') === -1 &&
        r.indexOf('Host') === -1 &&
        r.indexOf('Content-Type') === -1) {
        return false
    }

    const obj = { ts: ts, shost: shost, dhost: dhost, saddr: src, daddr: dst, sport: tcp.sport, dport: tcp.dport, type: 'http', payload: r };
    console.log({obj});
    } catch (err) {
        console.error(err);
    }
});
