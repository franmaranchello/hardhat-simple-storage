import { Address } from "cluster";
import { isAddress } from "ethers/lib/utils";
import { ethers, run, network } from "hardhat";
import { SimpleStorage__factory } from "../typechain-types";

async function main() {
    const simpleStorageFactory = ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract...");
    const simpleStorage = await (await simpleStorageFactory).deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to ${simpleStorage.address}`);
    if (
        network.config.chainId == process.env.CHAIN_ID &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is: ${currentValue}`);
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value is ${updatedValue}`);
}

async function verify(contractAddress: string, args: any) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.Message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(e.Message);
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
