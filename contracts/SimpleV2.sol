pragma solidity ^0.8.0;

import "./Simple.sol";

contract SimpleV2 is Simple {

    function setAge(uint256 _age) public {
        assembly {
            sstore(AGE, _age)
        }
    }

    function addValue(uint256 _value) public {
        setValue(getValue() + _value);
    }

    function subValue(uint256 _value) public {
        setValue(getValue() - _value);
    }
}
