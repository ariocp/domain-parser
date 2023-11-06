const whois = require("whois");
const dns = require("dns");
const net = require("net");

const getDomainInfo = async (hostname) => {
    return new Promise((resolve, reject) => {
        try {
            whois.lookup(hostname, (error, data) => {
                if (data) {
                    resolve(data);
                } else {
                    throw new Error(error);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDnsInfo = async (hostname) => {
    return new Promise((resolve, reject) => {
        try {
            dns.lookup(hostname, (error, data) => {
                if (data) {
                    resolve(data);
                } else {
                    throw new Error(error);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

const checkOpenPorts = async (hostname, ports) => {
    const results = [];

    for (const port of ports) {
        const client = new net.Socket();

        const connectPromise = new Promise((resolve, reject) => {
            try {
                client.connect(port, hostname, () => {
                    resolve({ port, isOpen: true });
                });

                client.on('error', () => {
                    resolve({ port, isOpen: false });
                });
            } catch (error) {
                reject(error);
            }
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