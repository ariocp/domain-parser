const {ports, PortCheker, PortResult, getDnsInfo, getDomainInfo } = require("./utils")

const cheker = new PortCheker(4000);

const domains = [
    'vk.com'
]

const bootstrap = async () => {
    domains.forEach(async (domain) => {
        const domaintInfo = await getDomainInfo(domain);
        const dns = await getDnsInfo(domain);

        const host = dns[0]

        console.log(`Host: ${host}`)
        console.log(`Domain Info:`)
        console.log(domaintInfo)

        ports.forEach(async (port) => {
            const result = await cheker.PortScanner(port, dns[0])
            const _res = new PortResult(`host: ${host}, port: ${port}`, `result: ${result}`);
            console.table(_res)
        })

    })
}

bootstrap();
