async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Contract deploying with:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Interacting with the Contract
  const Token = await hre.ethers.getContractFactory("WavePortal");
  const token = await Token.deploy();

  console.log("WavePortal address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
