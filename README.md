# Installation
```bash
cd $HOME &&
pkg update &&
pkg upgrade &&
pkg install git nodejs nmap -y &&
rm -rf WifiScanDevices &&
git clone https://github.com/Kairu-bit/WifiScanDevices &&
cd WifiScanDevices &&
node index.js
```
