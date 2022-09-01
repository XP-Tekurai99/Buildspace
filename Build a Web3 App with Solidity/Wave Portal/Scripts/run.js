// testing smart contracts requires compilation, deployement, and execution
// scripts make it easy and fast to iterate smart contracts

const main = async () =>
{
    const [owner, randomUser] = await hre.ethers.getSigners(); // gets the owner address and a random address
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal"); // compiles WavePortal and generates necessary files in the artifiacts directory
    const waveContract = await waveContractFactory.deploy(); // hardhat makes a local ethereum network for WavePortal that is destroyed upon script completion
    await waveContract.deployed(); // the constructor will wait to run until WavePortal is deployed to the local blockchain
    
    console.log("Contract deployed to: ", waveContract.address); // gives the address of the deployed contract
    console.log("Contract deployed by:", owner.address); // outputs the owner address
    
    let waveCount;
    waveCount = await waveContract.getTotalWaves(); // gets the total number of waves

    let waveSent = await waveContract.wave();
    await waveSent.wait();

    waveCount = await waveContract.getTotalWaves(); // checks if waveCount has changed
};

const runMain = async () =>
{
    try
    {
        await main();
        process.exit(0); // exit Node process without error
    }
    catch (error)
    {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
};

runMain();
