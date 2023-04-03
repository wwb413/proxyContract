// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//import { ethers } from "hardhat";

import { ethers,upgrades } from "hardhat"
import { readAddressList, storeAddressList } from "./helper";

const addressList = readAddressList();
const proxyAddress = addressList['proxy'];

async function main() {
  console.log("proxy address:",proxyAddress);
  const SimpleV2 = await ethers.getContractFactory("SimpleV2");
  const simpleV2 = await upgrades.upgradeProxy(proxyAddress, SimpleV2);

  const implementation = await upgrades.erc1967.getImplementationAddress(simpleV2.address);

  const admin = await upgrades.erc1967.getAdminAddress(simpleV2.address);

  console.log(simpleV2.address,"address(should be the same)")
  console.log(admin," AdminAddress");
  console.log(implementation," ImplementationAddress")

  addressList['proxyV2'] = simpleV2.address;
  addressList['adminV2'] = admin;
  addressList['implementationV2'] = implementation;
  storeAddressList(addressList);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
