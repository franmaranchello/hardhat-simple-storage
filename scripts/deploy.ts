import { Address } from "cluster";
import { ethers } from "hardhat";

async function main() {
    const simpleStorageFactory = ethers.getContractFactory("SimpleStorage");
    console.log("Deploying contract...");
    const simpleStorage = await (await simpleStorageFactory).deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to ${simpleStorage.address}`);
}

async function verify(contractAddress: Address, args: any) {}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
