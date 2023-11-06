const whois = require("whois");
const dns = require("dns");
const net = require("net");

const getDomainInfo = async (hostname) => {
    return new Promise((resolve, reject) => {
        whois.lookup(hostname, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

const getDnsInfo = async (hostname) => {
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};

const checkOpenPorts = async (hostname, ports) => {
    const results = [];
    for (const port of ports) {
        const client = new net.Socket();
        const connectPromise = new Promise((resolve) => {
            client.connect(port, hostname, () => {
                resolve({ port, isOpen: true });
            });
            client.on("error", () => {
                resolve({ port, isOpen: false });
            });
        });
        const result = await connectPromise;
        results.push(result);
    }

    return results;
};

module.exports = {
    getDomainInfo,
    getDnsInfo,
    checkOpenPorts
};