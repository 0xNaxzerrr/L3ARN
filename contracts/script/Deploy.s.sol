// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ESGIProgramNFT.sol";
import "../src/ESGIAnnualPerformanceNFT.sol";

contract DeployESGICertificates is Script {
    function run() external {
        vm.startBroadcast();

        ESGIProgramNFT programNFT = new ESGIProgramNFT();
        ESGIAnnualPerformanceNFT performanceNFT = new ESGIAnnualPerformanceNFT();

        vm.stopBroadcast();
    }
}