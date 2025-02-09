// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ESGIProgramNFT.sol";
import "../src/ESGIAnnualPerformanceNFT.sol";

contract ESGICertificatesTest is Test {
    ESGIProgramNFT public programNFT;
    ESGIAnnualPerformanceNFT public performanceNFT;
    
    // Addresses for testing
    address public owner;
    address public student;
    address public anotherStudent;

    // Test data
    string public constant PROGRAM_NAME = "Master Blockchain Engineering";
    uint256 public constant START_YEAR = 2022;
    uint256 public constant END_YEAR = 2025;
    string public constant PROGRAM_METADATA_URI = "https://example.com/program-metadata";
    string public constant PERFORMANCE_METADATA_URI = "https://example.com/performance-metadata";

    function setUp() public {
        // Set up test environment before each test
        owner = address(this);
        student = address(0x1234);
        anotherStudent = address(0x5678);

        // Deploy contracts
        programNFT = new ESGIProgramNFT();
        performanceNFT = new ESGIAnnualPerformanceNFT();
    }

    // Program NFT Tests
    function testMintProgramNFT() public {
        // Mint a new program NFT
        uint256 tokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Verify token ownership
        assertEq(programNFT.ownerOf(tokenId), student, "Token owner should be the student");
        
        // Verify program details
        ESGIProgramNFT.ProgramDetails memory details = programNFT.getProgramDetails(tokenId);
        assertEq(details.programName, PROGRAM_NAME, "Program name should match");
        assertEq(details.startYear, START_YEAR, "Start year should match");
        assertEq(details.endYear, END_YEAR, "End year should match");
        assertEq(details.status, "ACTIVE", "Initial status should be ACTIVE");
    }

    function testUpdateProgramStatus() public {
        // Mint a program NFT
        uint256 tokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Update program status
        programNFT.updateProgramStatus(tokenId, "COMPLETED");

        // Verify status update
        ESGIProgramNFT.ProgramDetails memory details = programNFT.getProgramDetails(tokenId);
        assertEq(details.status, "COMPLETED", "Status should be updated");
    }

    function testCannotMintProgramNFTAsNonOwner() public {
        // Try to mint as a non-owner (student)
        vm.prank(student);
        
        vm.expectRevert(abi.encodeWithSelector(
            bytes4(keccak256("OwnableUnauthorizedAccount(address)")), 
            student
        ));
        programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );
    }

    function testCannotUpdateProgramStatusAsNonOwner() public {
        // First, mint a program NFT by the owner
        uint256 tokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Try to update status as a non-owner
        vm.prank(student);
        
        vm.expectRevert(abi.encodeWithSelector(
            bytes4(keccak256("OwnableUnauthorizedAccount(address)")), 
            student
        ));
        programNFT.updateProgramStatus(tokenId, "COMPLETED");
    }

    // Annual Performance NFT Tests
    function testMintAnnualPerformanceNFT() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Mint an annual performance NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,  // 3rd year
            PERFORMANCE_METADATA_URI,
            "SUCCESS"
        );

        // Verify token ownership
        assertEq(performanceNFT.ownerOf(performanceTokenId), student, "Token owner should be the student");
        
        // Verify performance details
        ESGIAnnualPerformanceNFT.AnnualPerformance memory performanceDetails = 
            performanceNFT.getAnnualPerformanceDetails(performanceTokenId);
        
        assertEq(performanceDetails.programTokenId, programTokenId, "Program token ID should match");
        assertEq(performanceDetails.year, 3, "Year should match");
        assertEq(performanceDetails.academicStatus, "SUCCESS", "Academic status should match");
    }

    function testUpdateAnnualPerformance() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Mint an annual performance NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,  // 3rd year
            PERFORMANCE_METADATA_URI,
            "SUCCESS"
        );

        // Update academic status
        performanceNFT.updateAnnualPerformance(performanceTokenId, "COMPLETED");

        // Verify status update
        ESGIAnnualPerformanceNFT.AnnualPerformance memory performanceDetails = 
            performanceNFT.getAnnualPerformanceDetails(performanceTokenId);
        
        assertEq(performanceDetails.academicStatus, "COMPLETED", "Academic status should be updated");
    }

    function testCannotMintAnnualPerformanceNFTAsNonOwner() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Try to mint as a non-owner
        vm.prank(student);
        
        vm.expectRevert(abi.encodeWithSelector(
            bytes4(keccak256("OwnableUnauthorizedAccount(address)")), 
            student
        ));
        performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            PERFORMANCE_METADATA_URI,
            "SUCCESS"
        );
    }

    function testCannotUpdateAnnualPerformanceAsNonOwner() public {
        // First, mint a program NFT
        uint256 programTokenId = programNFT.mintProgramNFT(
            student, 
            PROGRAM_NAME, 
            START_YEAR, 
            END_YEAR, 
            PROGRAM_METADATA_URI
        );

        // Mint an annual performance NFT
        uint256 performanceTokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            programTokenId,
            3,
            PERFORMANCE_METADATA_URI,
            "SUCCESS"
        );

        // Try to update as a non-owner
        vm.prank(student);
        
        vm.expectRevert(abi.encodeWithSelector(
            bytes4(keccak256("OwnableUnauthorizedAccount(address)")), 
            student
        ));
        performanceNFT.updateAnnualPerformance(performanceTokenId, "COMPLETED");
    }

    function testCannotUpdateNonExistentTokens() public {
        // Try to update non-existent program NFT
        vm.expectRevert("Token does not exist");
        programNFT.updateProgramStatus(999, "COMPLETED");

        // Try to update non-existent performance NFT
        vm.expectRevert("Token does not exist");
        performanceNFT.updateAnnualPerformance(999, "COMPLETED");
    }
}