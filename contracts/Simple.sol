pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Simple is Initializable {
    uint256 constant AGE = 18;

    uint256 public value;

    function getAge() public view returns (uint256 age) {
        assembly {
            age := sload(AGE)
        }
    }

    function initialize(uint256 _value) public initializer {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function setValue(uint256 _value) public {
        value = _value;
    }
}
