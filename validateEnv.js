const DEFAULT_RINKEBY_RPC_URL = "YOUR_RINKEBY_RPC_URL_HERE";
const DEFAULT_ROPSTEN_RPC_URL = "YOUR_ROPSTEN_RPC_URL_HERE";
const DEFAULT_MAINNET_RPC_URL = "YOUR_MAINNET_RPC_URL_HERE";
const DEFAULT_ETHEREUM_ADDRESS = "ETHEREUM_ADDRESS_TO_QUERY";

const isDefaultOrNull = (value, defaultValue) => !value || value === defaultValue;

const validateRpcUrls = (RPCUrls) => {
    const missingUrls = Object.entries(RPCUrls).filter(([key, url]) => {
        switch (key) {
            case 'RINKEBY':
                return isDefaultOrNull(url, DEFAULT_RINKEBY_RPC_URL);
            case 'ROPSTEN':
                return isDefaultOrNull(url, DEFAULT_ROPSTEN_RPC_URL);
            case 'MAINNET':
                return isDefaultOrNull(url, DEFAULT_MAINNET_RPC_URL);
            default:
                return false;
        }
    });
    
    if (missingUrls.length > 0) {
        missingUrls.forEach(([network, url]) => {
            console.error(`Missing or default value for ${network}: ${url}`);
        });
        return false;
    }

    return true;
};

const validateEthereumAddress = (address) => {
    if (isDefaultOrNull(address, DEFAULT_ETHEREUM_ADDRESS)) {
        console.error(`Missing or default value for ETHEREUM_ADDRESS: ${address}`);
        return false;
    }

    return true;
};

module.exports = { validateRpcUrls, validateEthereumAddress };
