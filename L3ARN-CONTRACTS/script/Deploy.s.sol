// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ESGIProgramNFT.sol";
import "../src/ESGIAnnualPerformanceNFT.sol";

contract DeployESGICertificates is Script {
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deploying contracts with address:", deployer);

        vm.startBroadcast(deployerPrivateKey);

        ESGIProgramNFT programNFT = new ESGIProgramNFT();
        ESGIAnnualPerformanceNFT performanceNFT = new ESGIAnnualPerformanceNFT();

        ESGIProgramNFT.AcademicProgress[] memory academicProgresses = new ESGIProgramNFT.AcademicProgress[](1);
        academicProgresses[0] = ESGIProgramNFT.AcademicProgress({
            studentId: "ESGI-001",
            tokenId: "1",
            year: "3rd Year",
            nftId: "109",
            ipfsCid: "ipfs://QmSampleInitialCid"
        });

        ESGIAnnualPerformanceNFT.Course[] memory courses = new ESGIAnnualPerformanceNFT.Course[](2);
        courses[0] = ESGIAnnualPerformanceNFT.Course({
            courseName: "Blockchain Development",
            grade: "TB",
            result: "18/20",
            comments: "Excellent participation"
        });
        courses[1] = ESGIAnnualPerformanceNFT.Course({
            courseName: "Smart Contract Security",
            grade: "B",
            result: "15/20",
            comments: "Good understanding of concepts"
        });

        // Mise à jour de l'appel à mintProgramNFT avec tous les paramètres requis
        uint256 programTokenId = programNFT.mintProgramNFT(
            deployer,             // student address
            "Master Blockchain",  // programName
            2024,                 // startYear
            2027,                 // endYear
            academicProgresses,   // academicProgresses array
            "ipfs://QmProgramInitialCid", // ipfsCID
            "ESGI",              // issuer
            "signer",            // signer
            "https://api.esgi.fr/program/1" // tokenURI
        );

        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            deployer,                  // student address
            programTokenId,            // programTokenId
            "3rd Year",               // year
            "ESGI-001",              // studentId
            "John Doe",              // studentName
            courses,                  // courses array
            block.timestamp,          // yearStartDate
            block.timestamp + 365 days, // yearEndDate
            ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS, // status
            "Initial deployment test NFT", // statusComments
            "ipfs://QmPerformanceInitialCid", // ipfsCID
            "ESGI",                   // issuer
            "https://api.esgi.fr/performance/1" // tokenURI
        );

        vm.stopBroadcast();

        console.log("=== Deployment Complete ===");
        console.log("Program NFT deployed at:", address(programNFT));
        console.log("Performance NFT deployed at:", address(performanceNFT));
        console.log("Initial Program NFT minted with ID:", programTokenId);
        console.log("Initial Performance NFT minted with ID:", performanceTokenId);
    }
}