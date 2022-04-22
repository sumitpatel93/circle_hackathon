const DAOContract = artifacts.require("DAOContract");

module.exports = function (deployer) {
  deployer.deploy(DAOContract);
};
