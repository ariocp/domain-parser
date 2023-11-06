const { getDomainInfo, getDnsInfo, checkOpenPorts } = require("./utils");

const domains = [
    "google.com"
];

const bootstrap = async () => {
    for (const hostname of domains) {
        try {
            const domainInfo = await getDomainInfo(hostname);
            const dnsInfo = await getDnsInfo(hostname);
            console.log(`Domain info: ${domainInfo}`);
            console.log(`DNS info: ${dnsInfo}`);
            const portsToCheck = [80, 443];
            const portResults = await checkOpenPorts(hostname, portsToCheck);
            console.log(`Port status for ${hostname}:`);
            portResults.forEach((result) => {
                console.log(`Port ${result.port}: ${result.isOpen ? "Open" : "Closed"}`);
            });
        } catch (error) {
            console.error(`Error processing ${hostname}: ${error}`);
        }
    }
};

bootstrap();