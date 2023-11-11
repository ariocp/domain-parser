const whois = require("whois");
const dns = require("dns");
const net = require("net");

async function getDomainInfo(hostname) {
    return new Promise((resolve, reject) => {
        whois.lookup(hostname, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

async function getNetworkInfo(hostname) {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

async function getSubdomains(hostname) {
    return new Promise((resolve, reject) => {
        dns.resolveNs(hostname, (error, addresses) => {
            if (error) {
                reject(error);
            } else {
                resolve(addresses);
            }
        });
    });
}

async function getSmtpInfo(hostname) {
    return new Promise((resolve, reject) => {
        dns.resolveMx(hostname, (error, addresses) => {
            if (error) {
                reject(error);
            } else {
                resolve(addresses);
            }
        });
    });
}

async function checkOpenPorts(hostname, ports) {
    const results = [];
    for (const port of ports) {
        const client = new net.Socket();
        const connectPromise = new Promise((resolve) => {
            client.connect(port, hostname, () => {
                resolve({ port, isOpen: true });
            });
            client.on("Error!", () => {
                resolve({ port, isOpen: false });
            });
        });
        const result = await connectPromise;
        results.push(result);
    }
    return results;
}

module.exports = {
    getDomainInfo,
    getNetworkInfo,
    checkOpenPorts,
    getSubdomains,
    getSmtpInfo
}