const whois = require("whois");
const dns = require("dns");
const net = require("net");

const getDomainInfo = async (domain) => {
    return new Promise((resolve, reject) => {
        try {
            whois.lookup(domain, (error, data) => {
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

const getDnsInfo = async (domain) => {
    return new Promise((resolve, reject) => {
        try {
            dns.lookup(domain, (error, data) => {
                if (data) {
                    resolve(data);
                } else {
                    throw new Error(error);
                }
            });
        } catch (error) {
            reject(new Error(error));
        }
    });
};

const checkOpenPorts = async (domain, ports) => {
    const results = [];

    for (const port of ports) {
        const client = new net.Socket();

        const connectPromise = new Promise((resolve) => {
            client.connect(port, domain, () => {
                resolve({ port, isOpen: true });
            });

            client.on('error', () => {
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
