async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Contract deploying with:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Interacting with the Contract
  const Token = await hre.ethers.getContractFactory("Greetings");
  const token = await Token.deploy();

  console.log("Greetings Contract address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
