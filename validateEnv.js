// these are the templated RPC URL strings for our .env, these need to be changed or else no environment will be reached
const DEFAULT_SEPOLIA_RPC_URL = "YOUR_SEPOLIA_RPC_URL_HERE";
const DEFAULT_HOLESKY_RPC_URL = "YOUR_HOLESKY_RPC_URL_HERE";
const DEFAULT_MAINNET_RPC_URL = "YOUR_MAINNET_RPC_URL_HERE";

const isDefaultOrNull = (value, defaultValue) => !value || value === defaultValue;

const validateRpcUrls = (RPCUrls) => {
    // check against null and default values for each RPC URL .env string, if either are true consider it invalid
    const missingUrls = Object.entries(RPCUrls).filter(([key, url]) => {
        switch (key) {
            case 'SEPOLIA':
                return isDefaultOrNull(url, DEFAULT_SEPOLIA_RPC_URL);
            case 'HOLESKY':
                return isDefaultOrNull(url, DEFAULT_HOLESKY_RPC_URL);
            case 'MAINNET':
                return isDefaultOrNull(url, DEFAULT_MAINNET_RPC_URL);
            default:
                return false;
        }
    });
    
    // add each invalid RPC URL string to an array for easy error messages
    if (missingUrls.length > 0) {
        missingUrls.forEach(([network, url]) => {
            console.error(`Missing or default value for ${network}: ${url}`);
        });

        // if any of the RPC URL string were invalid, return false to tell the app it shouldn't proceed with making RPC calls
        return false;
    }

    // if all RPC URL strings were valid, we're returning true to tell the app to proceed with making the appropriate RPC calls
    return true;
};

module.exports = { validateRpcUrls };
