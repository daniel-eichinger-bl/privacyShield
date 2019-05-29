# PrivacyShield
- Node, Express - Backend Server: `npm run server`
- React App in client directory
- Running both: `npm run dev`

## Restart DHCPCD client
`sudo systemctl restart dhcpcd`

## Raspberry specifics
- Raspberry - pi24
- privacyshieldwifi 

## IP-Adress Display
- Tutorial: https://projects.raspberrypi.org/en/projects/getting-started-with-the-sense-hat/2 

## Remote Development
- https://code.visualstudio.com/docs/remote/ssh

## Installation of sqlite3
Install sqlite3: https://github.com/converge/instapy-dashboard/issues/19

## Iptables, Blacklisting-Approach
- `sudo modeprobe br_netfilter` to enable iptables (netfilter) on bridge interface
- Setup Rule for MAC: `sudo iptables -A FORWARD -m mac --mac-source XX:XX:XX:XX:XX:XX -j DROP`
- Delete Rule for MAC: `sudo iptables -D FORWARD -m mac --mac-source XX:XX:XX:XX:XX:XX -j DROP`


