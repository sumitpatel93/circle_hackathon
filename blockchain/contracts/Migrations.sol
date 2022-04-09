pragma solidity ^0.8.3;


contract DAOContract {

 address owner;

 struct userDetails {
     address userAddress;
     string userName;
     string userRegistrationTimestamp;
     uint256 userId;
     uint256 userCreditScore;
 }

 userDetails[] public users;

 mapping ( address => userDetails) public userDetailsMapping;
 mapping ( string => address ) public getAddressFromName;
 
 modifier onlyOwner(){
    require(msg.sender == owner);
    _;
}

function registerUser(address _userAddress, string memory _userName, string memory _userRegistrationTimestamp, uint256 _userId, uint256 _userCreditScore) public {
    userDetails memory x = userDetails(
        _userAddress,
        _userName,
        _userRegistrationTimestamp,
        _userId,
        _userCreditScore
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

// function requestFund(uint256 _userId, uint256 _requestedAmount )  public onlyOwner {
//     //find user
//     require( userDetails.userRegistrationTimestamp > 1*year );
//     require ( userDetails.userCreditScore >= 750 );
//     //transfer amount to the requested user address
//  }
}