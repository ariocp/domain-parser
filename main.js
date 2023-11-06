const { getDomainInfo, getDnsInfo, checkOpenPorts } = require("./utils");

const domains = [
    "google.com"
];

const bootstrap = async () => {
    domains.forEach(async (domain) => {
        const domainInfo = await getDomainInfo(domain);
        const dnsInfo = await getDnsInfo(domain);

        console.log(domainInfo);
        console.log(dnsInfo);

        const portsToCheck = [80, 443];

        const portResults = await checkOpenPorts(domain, portsToCheck);
        console.log(`Port status for ${domain}:`);
        portResults.forEach((result) => {
            console.log(`Port ${result.port}: ${result.isOpen ? "Open" : "Closed"}`);
        });
    });
};

bootstrap();