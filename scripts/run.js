async function main() {

  // Main Contract functions  described
  const [owner, randoPerson] = await hre.ethers.getSigners();

  const greetings = await hre.ethers.getContractFactory("Greetings");

  const greetingsContract = await greetings.deploy();

  await greetingsContract.deployed();

  console.log("Contract deployed to:", greetingsContract.address);
  console.log("Contract deployed by:", owner.address);

  // Interacting with the Contract
  let waveCount;
  waveCount = await greetingsContract.getTotalWaves();
  console.log(waveCount.toNumber());

  let highfiveCount;
  highfiveCount = await greetingsContract.getHighfives();
  console.log(highfiveCount.toNumber());

  let waveTxn = await greetingsContract.wave("HELLO!");
  await waveTxn.wait();

  let waveAndHighFive = await greetingsContract.waveAndHighFive("Hello", "Angel");
  await waveAndHighFive.wait();

  waveTxn = await greetingsContract.connect(randoPerson).wave("HELLO 222!");
  await waveTxn.wait();

  highfiveCount = await greetingsContract.getHighfives();
  waveCount = await greetingsContract.getTotalWaves();
  console.log(highfiveCount);

  let allWaves = await greetingsContract.getSentWAVES();
  let allHighfives = await greetingsContract.getSentHIGHFIVES();
  console.log(allWaves);
  console.log(allHighfives);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
