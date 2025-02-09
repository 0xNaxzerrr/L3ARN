// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ESGIProgramNFT.sol";
import "../src/ESGIAnnualPerformanceNFT.sol";

contract ESGICertificatesTest is Test {
    ESGIProgramNFT public programNFT;
    ESGIAnnualPerformanceNFT public performanceNFT;

    address public owner;
    address public student;
    address public anotherStudent;

    function setUp() public {
        owner = address(this);
        student = address(0x1234);
        anotherStudent = address(0x5678);

        programNFT = new ESGIProgramNFT();
        performanceNFT = new ESGIAnnualPerformanceNFT();
    }

    // Program NFT Tests
    function testProgramNFTMinting() public {
        // Mint a new program NFT
        uint256 tokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Verify token details
        assertEq(
            programNFT.ownerOf(tokenId),
            student,
            "Token owner should be the student"
        );

        ESGIProgramNFT.ProgramDetails memory details = programNFT
            .getProgramDetails(tokenId);
        assertEq(
            details.programName,
            "Blockchain Master",
            "Program name should match"
        );
        assertEq(details.startYear, 2022, "Start year should match");
        assertEq(details.endYear, 2025, "End year should match");
        assertEq(details.status, "ACTIVE", "Initial status should be ACTIVE");
    }

    function testProgramNFTStatusUpdate() public {
        uint256 tokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        programNFT.updateProgramStatus(tokenId, "COMPLETED");

        ESGIProgramNFT.ProgramDetails memory details = programNFT
            .getProgramDetails(tokenId);
        assertEq(details.status, "COMPLETED", "Status should be updated");
    }

    function testProgramNFTMintingFailures() public {
        // Try to mint as a non-owner
        vm.prank(student);
        vm.expectRevert(
            abi.encodeWithSelector(
                bytes4(keccak256("OwnableUnauthorizedAccount(address)")),
                student
            )
        );
        programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Try to get details of non-existent token
        vm.expectRevert("Token does not exist");
        programNFT.getProgramDetails(999);
    }

    function testProgramNFTTokenExistence() public {
        uint256 tokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        assertTrue(programNFT.doesTokenExist(tokenId), "Token should exist");
        assertFalse(
            programNFT.doesTokenExist(999),
            "Non-existent token should return false"
        );
    }

    // Annual Performance NFT Tests
    function testAnnualPerformanceNFTMinting() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Mint an annual performance NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            "https://example.com/performance-metadata",
            "SUCCESS"
        );

        // Verify token details
        assertEq(
            performanceNFT.ownerOf(performanceTokenId),
            student,
            "Token owner should be the student"
        );

        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory performanceDetails = performanceNFT
                .getAnnualPerformanceDetails(performanceTokenId);

        assertEq(
            performanceDetails.programTokenId,
            programTokenId,
            "Program token ID should match"
        );
        assertEq(performanceDetails.year, 3, "Year should match");
        assertEq(
            performanceDetails.academicStatus,
            "SUCCESS",
            "Academic status should match"
        );
    }

    function testAnnualPerformanceNFTStatusUpdate() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Mint an annual performance NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            "https://example.com/performance-metadata",
            "SUCCESS"
        );

        // Update academic status
        performanceNFT.updateAnnualPerformance(performanceTokenId, "COMPLETED");

        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory performanceDetails = performanceNFT
                .getAnnualPerformanceDetails(performanceTokenId);

        assertEq(
            performanceDetails.academicStatus,
            "COMPLETED",
            "Academic status should be updated"
        );
    }

    function testAnnualPerformanceNFTMintingFailures() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Try to mint as a non-owner
        vm.prank(student);
        vm.expectRevert(
            abi.encodeWithSelector(
                bytes4(keccak256("OwnableUnauthorizedAccount(address)")),
                student
            )
        );
        performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            "https://example.com/performance-metadata",
            "SUCCESS"
        );

        // Try to get details of non-existent token
        vm.expectRevert("Token does not exist");
        performanceNFT.getAnnualPerformanceDetails(999);
    }

    function testAnnualPerformanceNFTTokenExistence() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Mint an annual performance NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            "https://example.com/performance-metadata",
            "SUCCESS"
        );

        assertTrue(
            performanceNFT.doesTokenExist(performanceTokenId),
            "Token should exist"
        );
        assertFalse(
            performanceNFT.doesTokenExist(999),
            "Non-existent token should return false"
        );
    }

    // Cross-Contract Interaction Test
    function testCrossContractNFTLinking() public {
        // Mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Mint an annual performance NFT linked to the program NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            "https://example.com/performance-metadata",
            "SUCCESS"
        );

        // Verify the link between program and performance NFTs
        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory performanceDetails = performanceNFT
                .getAnnualPerformanceDetails(performanceTokenId);

        assertEq(
            performanceDetails.programTokenId,
            programTokenId,
            "Performance NFT should link to correct program NFT"
        );
    }

    // Ajoutez ces méthodes dans votre fichier de test existant

    function testEdgeCasesForProgramNFT() public {
        // Test avec des valeurs limites
        uint256 tokenId = programNFT.mintProgramNFT(
            student,
            "Extreme Blockchain",
            0,
            type(uint256).max,
            "https://example.com/extreme-metadata"
        );

        // Vérifier les détails avec des valeurs extrêmes
        ESGIProgramNFT.ProgramDetails memory details = programNFT
            .getProgramDetails(tokenId);
        assertEq(details.startYear, 0, "Start year should handle zero");
        assertEq(
            details.endYear,
            type(uint256).max,
            "End year should handle max uint256"
        );
    }

    function testEdgeCasesForAnnualPerformanceNFT() public {
        // Mint un NFT de programme
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Extreme Blockchain",
            0,
            type(uint256).max,
            "https://example.com/program-metadata"
        );

        // Mint un NFT de performance avec des valeurs limites
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            type(uint256).max,
            "https://example.com/extreme-performance-metadata",
            "EXTREME_SUCCESS"
        );

        // Vérifier les détails avec des valeurs extrêmes
        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory details = performanceNFT.getAnnualPerformanceDetails(
                performanceTokenId
            );

        assertEq(
            details.year,
            type(uint256).max,
            "Year should handle max uint256"
        );
        assertEq(
            details.programTokenId,
            programTokenId,
            "Program token ID should match"
        );
    }

    function testUpdateStatusWithEmptyString() public {
        // Mint un NFT de programme
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Mettre à jour avec une chaîne vide
        programNFT.updateProgramStatus(programTokenId, "");

        // Vérifier que le statut est mis à jour correctement
        ESGIProgramNFT.ProgramDetails memory details = programNFT
            .getProgramDetails(programTokenId);
        assertEq(details.status, "", "Status should allow empty string");
    }

    function testMultipleNFTCreationAndLinking() public {
        // Créer plusieurs NFTs de programme
        uint256 programTokenId1 = programNFT.mintProgramNFT(
            student,
            "Blockchain Master 1",
            2022,
            2024,
            "https://example.com/program1-metadata"
        );

        uint256 programTokenId2 = programNFT.mintProgramNFT(
            anotherStudent,
            "Blockchain Master 2",
            2023,
            2025,
            "https://example.com/program2-metadata"
        );

        // Créer des NFTs de performance pour chaque programme
        uint256 performanceTokenId1 = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId1,
            3,
            "https://example.com/performance1-metadata",
            "SUCCESS"
        );

        uint256 performanceTokenId2 = performanceNFT.mintAnnualPerformanceNFT(
            anotherStudent,
            programTokenId2,
            2,
            "https://example.com/performance2-metadata",
            "IN_PROGRESS"
        );

        // Vérifier les liens et les détails
        assertEq(
            performanceNFT
                .getAnnualPerformanceDetails(performanceTokenId1)
                .programTokenId,
            programTokenId1
        );
        assertEq(
            performanceNFT
                .getAnnualPerformanceDetails(performanceTokenId2)
                .programTokenId,
            programTokenId2
        );
    }
    function testAnnualPerformanceUpdateStatusWithEmptyString() public {
        // Mint un NFT de programme
        uint256 programTokenId = programNFT.mintProgramNFT(
            student,
            "Blockchain Master",
            2022,
            2025,
            "https://example.com/program-metadata"
        );

        // Mint un NFT de performance annuelle
        uint256 tokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            "https://example.com/performance-metadata",
            "SUCCESS"
        );

        // Mettre à jour avec une chaîne vide
        performanceNFT.updateAnnualPerformance(tokenId, "");

        // Récupérer les détails
        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory details = performanceNFT.getAnnualPerformanceDetails(
                tokenId
            );

        // Vérifier que le statut est vide
        assertEq(
            details.academicStatus,
            "",
            "Academic status should allow empty string"
        );
    }
}
