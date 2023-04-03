// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//import { ethers } from "hardhat";

import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Simple = await ethers.getContractFactory("Simple");

  const simple = await upgrades.deployProxy(Simple,[10], { initializer: 'initialize'})

  await simple.deployed();

  console.log("SimpleProxy address:", simple.address);

  const admin = await upgrades.erc1967.getAdminAddress(simple.address);

  console.log("AdminAddress:",admin);

  const implementation = await upgrades.erc1967.getImplementationAddress(simple.address);

  console.log("ImplementationAddress:",implementation)

  const addressList = readAddressList();

  addressList['proxy'] = simple.address;
  addressList['admin'] = admin;
  addressList['implementation'] = implementation;
  storeAddressList(addressList);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
