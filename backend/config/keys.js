module.exports = {
    secretOrKey: "secret",
    contractAddress: "0x90823Df2D56E6f08eb173109f403243528c0b2f8",
    interface: [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_time",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "_userCreditScore",
            "type": "uint256"
          }
        ],
        "name": "timeDiffEvent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "getAddressFromName",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "userDetailsMapping",
        "outputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userRegistrationTimestamp",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userCreditScore",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "issuedDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "issuedAmount",
                "type": "uint256"
              },
              {
                "internalType": "enum DAOContract.loanStatus",
                "name": "LoanStatus",
                "type": "uint8"
              }
            ],
            "internalType": "struct DAOContract.userLoanDetails",
            "name": "userLoans",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "users",
        "outputs": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userRegistrationTimestamp",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "userId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "userCreditScore",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "issuedDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "issuedAmount",
                "type": "uint256"
              },
              {
                "internalType": "enum DAOContract.loanStatus",
                "name": "LoanStatus",
                "type": "uint8"
              }
            ],
            "internalType": "struct DAOContract.userLoanDetails",
            "name": "userLoans",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_userName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_userRegistrationTimestamp",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_userId",
            "type": "uint256"
          }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "fetchNumberOfUsers",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_userName",
            "type": "string"
          }
        ],
        "name": "fetchUserByName",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "userName",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "userRegistrationTimestamp",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "userId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userCreditScore",
                "type": "uint256"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "issuedDate",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "issuedAmount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "enum DAOContract.loanStatus",
                    "name": "LoanStatus",
                    "type": "uint8"
                  }
                ],
                "internalType": "struct DAOContract.userLoanDetails",
                "name": "userLoans",
                "type": "tuple"
              }
            ],
            "internalType": "struct DAOContract.userDetails",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_userName",
            "type": "string"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_userName",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "requestFund",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      }
    ]
  };