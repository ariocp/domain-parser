const { DomainAnalyzer } = require("./utils/utils");
const { site, ports } = require("./args");

const domains = [site];

const bootstrap = async () => {
    for (const hostname of domains) {
        try {
            const analyzer = new DomainAnalyzer(hostname);
            const domainInfo = await analyzer.getDomainInfo();
            const networkInfo = await analyzer.getNetworkInfo();
            const subdomains = await analyzer.getSubdomains();
            const smtpInfo = await analyzer.getSmtpInfo();
            console.log(`Domain info: ${domainInfo}`);
            console.log(`Network info: ${networkInfo}`);
            console.log(`Subdomains: ${subdomains}`);
            console.log(`SMTP info: ${JSON.stringify(smtpInfo)}`);
            const portResults = await analyzer.checkOpenPorts(ports);
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

module.exports = {
    DomainAnalyzer
};
