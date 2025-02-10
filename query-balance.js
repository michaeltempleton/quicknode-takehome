require("dotenv").config();

const { Web3 } = require("web3");
const { validateRpcUrls, validateEthereumAddress } = require("./validateEnv");

const RPCUrls = {
    RINKEBY: process.env.RPC_RINKEBY_URL,
    ROPSTEN: process.env.RPC_ROPSTEN_URL,
    MAINNET: process.env.RPC_MAINNET_URL
};

const ETHEREUM_ADDRESS = process.env.ETHEREUM_ADDRESS;

const getLatestBalance = async (address, network) => {
 const web3 = new Web3(RPCUrls[network]);

 try {
    const balanceWei = await web3.eth.getBalance(address);
    const balanceEther = web3.utils.fromWei(balanceWei, "ether");
    console.log(`Balance of address ${address} on ${network}: ${balanceEther} ETH`);
 } catch (err) {
    console.error(`Error querying ${network}: ${err.message}`);
 }
}

(async () => {
    const areRpcUrlsValid = validateRpcUrls(RPCUrls);
    const isAddressValid = validateEthereumAddress(ETHEREUM_ADDRESS);

    if (!areRpcUrlsValid || !isAddressValid) {
        return console.error("One or more environment variables are invalid. Exiting...");
    }

    for (const network of Object.keys(RPCUrls)) {
        await getLatestBalance(ETHEREUM_ADDRESS, network);
    }
})();