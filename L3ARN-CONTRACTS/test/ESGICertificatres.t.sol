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

    // Setup test data structures
    ESGIProgramNFT.AcademicProgress[] academicProgresses;
    ESGIAnnualPerformanceNFT.Course[] courses;

    function setUp() public {
        owner = address(this);
        student = address(0x1234);
        anotherStudent = address(0x5678);

        programNFT = new ESGIProgramNFT();
        performanceNFT = new ESGIAnnualPerformanceNFT();

        // Setup sample academic progresses
        ESGIProgramNFT.AcademicProgress memory progress = ESGIProgramNFT
            .AcademicProgress({
                studentId: "ESGI-001",
                tokenId: "1",
                year: "3rd Year",
                nftId: "109",
                ipfsCid: "ipfs://QmSampleCid"
            });
        academicProgresses.push(progress);

        // Setup sample courses
        ESGIAnnualPerformanceNFT.Course memory course = ESGIAnnualPerformanceNFT
            .Course({
                courseName: "Blockchain Development",
                grade: "TB",
                result: "18/20",
                comments: "Excellent work"
            });
        courses.push(course);
    }

    // Program NFT Tests
    function testProgramNFTMinting() public {
        uint256 tokenId = programNFT.mintProgramNFT(
            student,
            "Master Blockchain",
            2022,
            2025,
            academicProgresses,
            "ipfs://QmProgramCid",
            "ESGI",
            "tokenURI",
            "comments"
        );

        assertEq(
            programNFT.ownerOf(tokenId),
            student,
            "Token owner should be student"
        );

        ESGIProgramNFT.ProgramDetails memory details = programNFT
            .getProgramDetails(tokenId);
        assertEq(details.programName, "Master Blockchain");
        assertEq(details.startYear, 2022);
        assertEq(details.endYear, 2025);
        assertEq(details.studentWallet, student);
        assertEq(
            uint(details.programStatus.status),
            uint(ESGIProgramNFT.Status.ACTIVE)
        );
    }

    function testProgramNFTStatusUpdate() public {
        uint256 tokenId = programNFT.mintProgramNFT(
            student,
            "Master Blockchain",
            2022,
            2025,
            academicProgresses,
            "ipfs://QmProgramCid",
            "ESGI",
            "tokenURI",
            "comments"
        );

        programNFT.updateProgramStatus(
            tokenId,
            ESGIProgramNFT.Status.SUCCESS,
            "Graduated with honors"
        );

        ESGIProgramNFT.ProgramDetails memory details = programNFT
            .getProgramDetails(tokenId);
        assertEq(
            uint(details.programStatus.status),
            uint(ESGIProgramNFT.Status.SUCCESS)
        );
        assertEq(details.programStatus.comments, "Graduated with honors");
    }

    // Annual Performance NFT Tests
    function testPerformanceNFTMinting() public {
        uint256 tokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            1, // programTokenId
            "3rd Year",
            "ESGI-001",
            "John Doe",
            courses,
            block.timestamp, // yearStartDate
            block.timestamp + 365 days, // yearEndDate
            ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS,
            "Outstanding performance",
            "ipfs://QmPerformanceCid",
            "ESGI",
            "tokenURI"
        );

        assertEq(performanceNFT.ownerOf(tokenId), student);

        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory details = performanceNFT.getAnnualPerformanceDetails(
                tokenId
            );

        assertEq(details.studentId, "ESGI-001");
        assertEq(details.year, "3rd Year");
        assertEq(
            uint(details.academicStatus.status),
            uint(ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS)
        );
    }

    function testGetStudentNFTs() public {
        // Mint multiple NFTs for the same student
        uint256 tokenId1 = performanceNFT.mintAnnualPerformanceNFT(
            student,
            1,
            "3rd Year",
            "ESGI-001",
            "John Doe",
            courses,
            block.timestamp,
            block.timestamp + 365 days,
            ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS,
            "First semester",
            "ipfs://Qm1",
            "ESGI",
            "tokenURI1"
        );

        uint256 tokenId2 = performanceNFT.mintAnnualPerformanceNFT(
            student,
            1,
            "3rd Year",
            "ESGI-001",
            "John Doe",
            courses,
            block.timestamp,
            block.timestamp + 365 days,
            ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS,
            "Second semester",
            "ipfs://Qm2",
            "ESGI",
            "tokenURI2"
        );

        (
            uint256[] memory tokens,
            ESGIAnnualPerformanceNFT.AnnualPerformance[] memory details
        ) = performanceNFT.getStudentNFTs(student);

        assertEq(tokens.length, 2);
        assertEq(tokens[0], tokenId1);
        assertEq(tokens[1], tokenId2);
    }

    function testFailureScenarios() public {
        // Test minting as non-owner
        vm.prank(student);
        vm.expectRevert("Ownable: caller is not the owner");
        programNFT.mintProgramNFT(
            student,
            "Master Blockchain",
            2022,
            2025,
            academicProgresses,
            "ipfs://QmProgramCid",
            "ESGI",
            "tokenURI",
            "comments"
        );

        // Test accessing non-existent token
        vm.expectRevert("Token does not exist");
        programNFT.getProgramDetails(999);

        // Test updating non-existent token status
        vm.expectRevert("Token does not exist");
        programNFT.updateProgramStatus(999, ESGIProgramNFT.Status.SUCCESS, "");
    }

    function testCourseDetails() public {
        uint256 tokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            1,
            "3rd Year",
            "ESGI-001",
            "John Doe",
            courses,
            block.timestamp,
            block.timestamp + 365 days,
            ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS,
            "Test comments",
            "ipfs://QmTest",
            "ESGI",
            "tokenURI"
        );

        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory details = performanceNFT.getAnnualPerformanceDetails(
                tokenId
            );

        assertEq(details.courses[0].courseName, "Blockchain Development");
        assertEq(details.courses[0].grade, "TB");
        assertEq(details.courses[0].result, "18/20");
        assertEq(details.courses[0].comments, "Excellent work");
    }

    function testUpdateAcademicStatus() public {
        uint256 tokenId = performanceNFT.mintAnnualPerformanceNFT(
            student,
            1,
            "3rd Year",
            "ESGI-001",
            "John Doe",
            courses,
            block.timestamp,
            block.timestamp + 365 days,
            ESGIAnnualPerformanceNFT.AcademicStatus.SUCCESS,
            "Initial status",
            "ipfs://QmTest",
            "ESGI",
            "tokenURI"
        );

        performanceNFT.updateAcademicStatus(
            tokenId,
            ESGIAnnualPerformanceNFT.AcademicStatus.REVOKED,
            "Status updated due to academic misconduct"
        );

        ESGIAnnualPerformanceNFT.AnnualPerformance
            memory details = performanceNFT.getAnnualPerformanceDetails(
                tokenId
            );

        assertEq(
            uint(details.academicStatus.status),
            uint(ESGIAnnualPerformanceNFT.AcademicStatus.REVOKED)
        );
        assertEq(
            details.academicStatus.comments,
            "Status updated due to academic misconduct"
        );
    }
}
