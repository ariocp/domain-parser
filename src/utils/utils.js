const whois = require("whois");
const dns = require("dns");
const net = require("net");

class DomainAnalyzer {
    constructor(hostname) {
        this.hostname = hostname;
    }

    async getDomainInfo() {
        return new Promise((resolve, reject) => {
            whois.lookup(this.hostname, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async getNetworkInfo() {
        return new Promise((resolve, reject) => {
            dns.lookup(this.hostname, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async getSubdomains() {
        return new Promise((resolve, reject) => {
            dns.resolveNs(this.hostname, (error, addresses) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(addresses);
                }
            });
        });
    }

    async getSmtpInfo() {
        return new Promise((resolve, reject) => {
            dns.resolveMx(this.hostname, (error, addresses) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(addresses);
                }
            });
        });
    }

    async checkOpenPorts(ports) {
        const results = [];
        for (const port of ports) {
            const client = new net.Socket();
            const connectPromise = new Promise((resolve) => {
                client.connect(port, this.hostname, () => {
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
    }
}

module.exports = {
    DomainAnalyzer
};