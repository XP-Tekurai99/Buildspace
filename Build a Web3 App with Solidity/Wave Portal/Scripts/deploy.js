const main = async () =>
{
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();


console.log("Contract Deployer Address: ", deployer.address);
console.log("Account Balance: ", accountBalance.toString());

const dreamContractFactory = await hre.ethers.getContractFactory("DreamPortal");
const dreamContract = await dreamContractFactory.deploy();
await dreamContract.deployed();

console.log("DreamPortal Address: ", dreamContract.address);
};

const runMain = async () =>
{
    try
    {
        await main();
        process.exit(0);
    }
    catch (error)
    {
        console.log(error);
        process.exit(1);
    }
};

runMain();
