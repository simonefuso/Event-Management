const ContrattoA = artifacts.require("ContrattoA");
const ContrattoB = artifacts.require("ContrattoB");

module.exports = async function(deployer) {
    // Deploy ContrattoA
  await deployer.deploy(ContrattoA)
  const contrattoA = await ContrattoA.deployed()
    // Deploy ContrattoB    
   await deployer.deploy(ContrattoB, contrattoA.address)
  const contrattoB = await ContrattoB.deployed() 
};