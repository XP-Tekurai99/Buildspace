// testing smart contracts requires compilation, deployement, and execution
// scripts make it easy and fast to iterate smart contracts

const main = async () =>
{
    const [owner, user] = await hre.ethers.getSigners(); // gets the owner address and a random address
    const dreamContractFactory = await hre.ethers.getContractFactory("DreamPortal"); // compiles WavePortal and generates necessary files in the artifiacts directory
    const dreamContract = await dreamContractFactory.deploy(); // hardhat makes a local ethereum network for WavePortal that is destroyed upon script completion
    await dreamContract.deployed(); // the constructor will wait to run until WavePortal is deployed to the local blockchain
    
    console.log("Contract deployed to: ", dreamContract.address); // gives the address of the deployed contract
    console.log("Contract deployed by:", owner.address); // outputs the owner address
    
    let dreamCount;
    dreamCount = await dreamContract.getTotalDreams(); // gets the total number of waves
    console.log(dreamCount.toNumber());

    let dreamTxn = await dreamContract.dream("I would like to be a witcher hunting a beast in Skellige.");
    await dreamTxn.wait();

    dreamCount = await dreamContract.getTotalDreams(); // checks if waveCount has changed

    const [_, sender] = await hre.ethers.getSigners();
    dreamTxn = await dreamContract.connect(sender).dream("Another experience I'd like to have is walking around Diamond City from Fallout 4.");
    await dreamTxn.wait(); // waits for the transaction to be mined

    let allDreams = await dreamContract.getAllDreams();
    console.log(allDreams);
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
