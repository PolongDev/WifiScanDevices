import { exec } from "child_process";
import { isIPv4 } from "net";
import { GetWlanIPv4 } from "./getWlanIPv4.js";
import ora from "ora";

const yellow = "\u001b[1;33m";
const green = "\u001b[1;32m";
const red = "\u001b[1;31m";
const white = "\u001b[1;37m";
const blue = "\u001b[1;34m";
const info = `${blue}[+]${white} `;
const error = `${red}[!]${white} `;

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

const loading = ora({
  prefixText: info + green + "Scanning",
  spinner: "binary",
  interval: 90,
  color: "yellow"
});

async function animate(text, ms = 15){
  text = text.toString();
  for (const char of text){
    await delay(ms);
    process["stdout"]["write"](char);
  }
  console.log();
}

async function main(){
  let IPv4 = GetWlanIPv4();
  if (isIPv4(IPv4)){
    IPv4 = IPv4.concat("/24");
    await ScanWifiDev(IPv4);
  }
  else{
    await animate(error + IPv4)
    process.exit(1);
  }
}

async function ScanWifiDev(IPv4){
  loading.start();
  exec(`nmap -sn ${IPv4}`, (err, output, _1) => {
    if (err){
      loading.stop();
      console.log(error + err.message);
      process.exit();
    }
    const devices = output.match(/Nmap scan report for .*?\n/g) || [];
    loading.stop();
    if (devices.length === 0){
      console.log(info + `No Devices Found`);
    }
    devices.forEach(async (dev, index) => {
      await delay((index + 1) * 1500);
      dev = dev.concat(" ");
      const IPv4Devices = dev.slice(21, -1);
      await animate(info + `${yellow}Device ${index + 1}: ${green + IPv4Devices}`);
    });
  });
}

main();
