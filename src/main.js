const { getDomainInfo, getNetworkInfo, checkOpenPorts, getSubdomains, getSmtpInfo } = require("./utils/utils");

const domains = [
    "google.com"
];

const bootstrap = async () => {
    for (const hostname of domains) {
        try {
            const domainInfo = await getDomainInfo(hostname);
            const networkInfo = await getNetworkInfo(hostname);
            const subdomains = await getSubdomains(hostname);
            const smtpInfo = await getSmtpInfo(hostname);
            console.log(`Domain info: ${domainInfo}`);
            console.log(`Network info: ${networkInfo}`);
            console.log(`Subdomains: ${subdomains}`);
            console.log(`SMTP info: ${JSON.stringify(smtpInfo)}`);
            const portsToCheck = [80, 443];
            const portResults = await checkOpenPorts(hostname, portsToCheck);
            console.log(`Port status for ${hostname}:`);
            portResults.forEach((result) => {
                console.log(`Port ${result.port}: ${result.isOpen ? "Open" : "Closed"}`);
            });
        } catch (error) {
            console.error(`Error! ${hostname}: ${error}`);
        }
    }
};

bootstrap();