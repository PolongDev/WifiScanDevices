/*let ifconfig2 = `
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.10  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::12ab:34cd:56ef:7890  prefixlen 64  scopeid 0x20<link>
        ether 12:34:56:78:90:ab  txqueuelen 1000  (Ethernet)
        RX packets 10000  bytes 2000000 (1.9 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5000  bytes 1000000 (953.7 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`*/

// XXX: THIS IS MY METHOD FOR GETTING THE WLAN IPv4 Address 
// XXX: DON'T JUDGE ME, LOL. @PolongDev

import { execSync } from "child_process";

export function GetWlanIPv4(){
  let ifconfig;
  try {
    ifconfig = execSync("ifconfig", { stdio: ['pipe', 'pipe', 'ignore'], encoding: "utf8" });
  }
  catch (error) {
    return false;
  }
  //ifconfig = ifconfig2;
  const wlanIndex = ifconfig.indexOf("wlan0");
  if (wlanIndex !== -1){
    ifconfig = ifconfig.slice(wlanIndex, undefined);
    for (const nl of ifconfig.split("\n")){
      if (nl.includes("inet")){
        const IPv4 = nl.match(/192.168.\d+.\d+/);
        if (IPv4){
          return IPv4[0];
        }
        else{
          return "Unable to Find WLAN IPv4";
        }
      }
    }
  }
  else{
    return "Unable to Find WLAN";
  }
}
