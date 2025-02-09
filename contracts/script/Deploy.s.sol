// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ESGIProgramNFT.sol";
import "../src/ESGIAnnualPerformanceNFT.sol";

contract DeployESGICertificates is Script {
    function run() external {
        // Récupérer la clé privée depuis l'environnement
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Démarrer le broadcast avec la clé privée
        vm.startBroadcast(deployerPrivateKey);

        // Déployer les contrats
        ESGIProgramNFT programNFT = new ESGIProgramNFT();
        ESGIAnnualPerformanceNFT performanceNFT = new ESGIAnnualPerformanceNFT();

        // Arrêter le broadcast
        vm.stopBroadcast();

        // Optionnel : Afficher les adresses des contrats déployés
        console.log("Program NFT deployed at:", address(programNFT));
        console.log("Performance NFT deployed at:", address(performanceNFT));
    }
}
