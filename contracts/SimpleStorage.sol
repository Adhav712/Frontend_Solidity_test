// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;

  event getstoredData(
      uint storedData
    );

  function set(uint _storedData) public {
    storedData = _storedData;
    emit getstoredData(_storedData);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
