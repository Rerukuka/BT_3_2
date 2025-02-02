const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const AIU_VIT_NUR_BAK = await hre.ethers.getContractFactory("AIU_VIT_NUR_BAK");
  const token = await AIU_VIT_NUR_BAK.deploy(deployer.address);

  await token.waitForDeployment();

  console.log("Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});