pragma solidity ^0.8.3;


contract DAOContract {

 address owner;
 enum loanStatus { registered, requested, inprogress, paid, defaulted }

 struct userLoanDetails{
     uint256 issuedDate;
     uint256 issuedAmount;
     loanStatus LoanStatus;
 }

 struct userDetails {
     address userAddress;
     string userName;
     string userRegistrationTimestamp;
     uint256 userId;
     uint256 userCreditScore;
     userLoanDetails userLoans;
 }

 userDetails[] public users;

 mapping ( address => userDetails) public userDetailsMapping;
 mapping ( string => address ) public getAddressFromName;
 
 modifier onlyOwner(){
    require(msg.sender == owner);
    _;
}

function registerUser(address _userAddress, string memory _userName, string memory _userRegistrationTimestamp, uint256 _userId, uint256 _userCreditScore) public {
    userLoanDetails memory _info = userLoanDetails(0,0,loanStatus.registered);

    userDetails memory x = userDetails(
        _userAddress,
        _userName,
        _userRegistrationTimestamp,
        _userId,
        _userCreditScore,
        _info
    );

    users.push(x);
    userDetailsMapping[msg.sender] = x;
    getAddressFromName[_userName] = msg.sender;

}

function fetchNumberOfUsers() public view returns (uint256) {
   return users.length;
}

function fetchUserByName(string memory _userName)  public view returns (userDetails memory ){
    address contract_addr = getAddressFromName[_userName];
    return userDetailsMapping[contract_addr];
}

function deposit() payable public {}

function requestFund(string memory _userName , address payable _to ) public payable returns (bool) {
    //check if user exists
    address contract_addr = getAddressFromName[_userName];
    require ( userDetailsMapping[contract_addr].userCreditScore > 700);
    // add check for loan status, if its defaulted do not transfer amount
    _to.transfer(msg.value);
    // update status of loan to requested
    //userDetailsMapping[contract_addr].userLoans.LoanStatus = 1;
    return true;
 }
}