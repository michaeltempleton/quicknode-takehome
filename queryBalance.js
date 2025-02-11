require("dotenv").config();
const { Web3 } = require("web3");
const { validateRpcUrls } = require("./validateEnv");

// list all of the RPC URLs from .env in an easily iterable way
const RPCUrls = {
    SEPOLIA: process.env.RPC_SEPOLIA_URL,
    HOLESKY: process.env.RPC_HOLESKY_URL,
    MAINNET: process.env.RPC_MAINNET_URL
};

// make the ENS name .env variable easily accessible
const ensName = process.env.ENS_NAME;

const getLatestBalanceAndDetails = async (network) => {
    const web3 = new Web3(RPCUrls[network]); // quickly pass in the RPC URL for a given network to access functions

    try {
        const ownerAddress = await web3.eth.ens.getAddress(ensName); // 1d. resolve the ensName
        console.log("ownerAddress", ownerAddress)
        if (!ownerAddress || ownerAddress === "0x0000000000000000000000000000000000000000") {
            return console.error("Invalid ENS Owner Address");
        }

        // run the appropriate methods for getting: latest block number, latest balance, and latest transaction count for the address on the given network
        const latestBlockNumber = await web3.eth.getBlockNumber(); // 1a
        const balanceWei = await web3.eth.getBalance(ownerAddress, latestBlockNumber); // 1b
        const balanceEther = web3.utils.fromWei(balanceWei, "ether"); // 1b
        const transactionCount = await web3.eth.getTransactionCount(ownerAddress) // 1c
        console.log(`Latest block number: ${latestBlockNumber}`);
        console.log(`Balance of address ${ownerAddress} on ${network}: ${balanceEther} ETH`);
        console.log(`Transaction Count: ${transactionCount}`);
    } catch (err) {
        console.error(`Error querying ${network}: ${err.message}`);
    }
}

(async () => {
    // run validation to ensure the RPC URLs are not null or still the .env defaults
    const areRpcUrlsValid = validateRpcUrls(RPCUrls);

    if (!areRpcUrlsValid) {
        return console.error("One or more environment variables are invalid. Exiting...");
    }

    // iterate over the previously defined RPCUrls and dynamically pass them into the modular function
    for (const network of Object.keys(RPCUrls)) {
        await getLatestBalanceAndDetails(network);
    }
})();