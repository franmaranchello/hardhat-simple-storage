import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY!;

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
    },
};

export default config;
