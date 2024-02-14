const yargs = require("yargs");

const argv = yargs
    .option("site", {
        alias: "s",
        description: "Website to analyze",
        type: "string",
        demandOption: true
    })
    .option("ports", {
        alias: "p",
        description: "Ports to check",
        type: "string",
        demandOption: true
    })
    .argv;

const site = argv.site;
const ports = argv.ports.split(",").map(port => parseInt(port.trim(), 10));

module.exports = {
    site,
    ports
};
