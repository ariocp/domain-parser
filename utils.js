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

const getNetworkInfo = async (hostname) => {
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

const getSubdomains = async (hostname) => {
    return new Promise((resolve, reject) => {
        dns.resolveNs(hostname, (error, addresses) => {
            if (error) {
                reject(error);
            } else {
                resolve(addresses);
            }
        });
    });
};

const getSmtpInfo = async (hostname) => {
    return new Promise((resolve, reject) => {
        dns.resolveMx(hostname, (error, addresses) => {
            if (error) {
                reject(error);
            } else {
                const mailServers = addresses.map((server) => server.exchange);
                resolve(mailServers);
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
    getNetworkInfo,
    checkOpenPorts,
    getSubdomains,
    getSmtpInfo
};