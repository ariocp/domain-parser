const whois = require('whois')
const dns = require('dns')
const net = require("net")

class PortResult {
    
    constructor(domain, result) {
        this.domain = domain
        this.result = result
    }
}

async function getDnsInfo(domain) {
    return new Promise((resolve, reject) => {
        dns.resolve(domain, (err, addresses) => {
            if (err) {
                reject(err)
            } else {
                resolve(addresses)
            }
        })
    })
}

async function getDomainInfo(domain) {
    return new Promise((resolve, reject) => {
        whois.lookup(domain, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

class PortCheker {

    constructor(maxTimeout = 2000) {
        this.maxTimeout = maxTimeout
    }
    
    async PortScanner(port, host) {

        return new Promise((resolve, reject) => {

            const socket = new net.Socket();

            socket.connect(port, host);

            socket.setTimeout(this.maxTimeout, () => {

                socket.destroy()
                resolve("closed: timeout")
                
            })

            socket.on("connect", () => {

                socket.destroy()
                resolve("opened: connected")

            })

            socket.on("timeout", () => {

                socket.destroy()
                resolve("closed: timeout")
                
            })

            socket.on("error", () => {

                socket.destroy()
                resolve("closed: error")
                
            })

        })

    }

}

const ports = [
    80,
    21,
    3000,
    4000,
    7070,
    43,
    20,
    22,
    23,
    110,
    119,
    143,
    443
]

module.exports = {
    PortResult,
    getDnsInfo,
    getDomainInfo,
    PortCheker,
    ports
}