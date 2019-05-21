# PrivacyShield
- Node, Express - Backend Server: `npm run server`
- React App in client directory
- Running both: `npm run dev`


## Node Libaries we may use
- https://github.com/node-pcap/node_pcap
 

- Raspberry: pi24
- privacyshieldwifi 


## IP-Adress Display ✅
- Tutorial: https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/2 

## Remote Development
- https://code.visualstudio.com/docs/remote/ssh


# Remove Mongodb
https://askubuntu.com/questions/147135/how-can-i-uninstall-mongodb-and-reinstall-the-latest-version
Install sqlite3: https://github.com/converge/instapy-dashboard/issues/19


# Iptables, Blacklisting-Approach
- `sudo modeprobe br_netfilter` to enable iptables (netfilter) on bridge interface
-  Setup Rule for MAC: `sudo iptables -A FORWARD -m mac --mac-source XX:XX:XX:XX:XX:XX -j DROP`
- Delete Rule for MAC: `sudo iptables -D FORWARD -m mac --mac-source XX:XX:XX:XX:XX:XX -j DROP`



Delete Rule:
iptables -D 



Show list of connected devices
iw dev wlan0 station dump

Arp-Scan
sudo arp-scan -I br0 --localnet

e;g finds my mac 6c:40:08:9e:eb:8e and my ip

Restart DHCPCD client
sudo systemctl restart dhcpcd

Start-Up Pi
Best to start it up and then connect ethernet


Iptable-Example
sudo iptables -D FORWARD -m mac --mac-source 04:d6:aa:c2:4b:ff -j DROP
sudo iptables -D FORWARD -m mac --mac-source 04:d6:aa:c2:4b:ff -j DROP

Add sudo modprobe br_netfilter to enable iptables on bridge interface


Pcap Operation not permitted Issue
sudo setcap 'cap_net_raw,cap_net_admin+eip' $(readlink -f $(which node))


