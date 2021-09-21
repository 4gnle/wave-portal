async function main() {
  const greetings = await hre.ethers.getContractFactory("Greetings");

  const greetingsContract = await greetings.deploy({value: hre.ethers.utils.parseEther("0.1")});

  await greetingsContract.deployed();

  console.log("Contract deploying with:", greetingsContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
