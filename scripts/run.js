async function main() {

  // Main Contract functions  described
  const [owner, randoPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  const waveContract = await waveContractFactory.deploy();

  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // Interacting with the Contract
  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let highfiveCount;
  highfiveCount = await waveContract.getHighfives();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  let waveAndHighFive = await waveContract.waveAndHighFive();
  await waveAndHighFive.wait();

  waveTxn = await waveContract.connect(randoPerson).wave();
  await waveTxn.wait();

  highfiveCount = await waveContract.getHighfives();
  waveCount = await waveContract.getTotalWaves();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
