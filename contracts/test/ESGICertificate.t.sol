// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ESGICertificate.sol";

/**
 * @title ESGICertificateTest
 * @notice Test contract for the ESGICertificate NFT implementation
 */
contract ESGICertificateTest is Test {
    ESGICertificate public certificate;
    address public admin;
    address public minter;
    address public student;

    // Events used for testing event emissions
    event CertificateIssued(
        uint256 indexed tokenId,
        uint256 indexed studentId,
        string courseName,
        uint256 timestamp
    );

    event CertificateRevoked(
        uint256 indexed tokenId,
        uint256 timestamp,
        string reason
    );

    /// @notice Set up the test environment before each test
    function setUp() public {
        // Set up test addresses
        admin = address(this);
        minter = makeAddr("minter");
        student = makeAddr("student");

        // Deploy the certificate contract
        certificate = new ESGICertificate();

        // Grant MINTER_ROLE to the minter address
        certificate.grantRole(certificate.MINTER_ROLE(), minter);
    }

    /// @notice Test initial contract setup and configurations
    function test_InitialSetup() public view {
        assertTrue(
            certificate.hasRole(certificate.DEFAULT_ADMIN_ROLE(), admin)
        );
        assertTrue(certificate.hasRole(certificate.MINTER_ROLE(), minter));
        assertEq(certificate.name(), "ESGI Academic Certificate");
        assertEq(certificate.symbol(), "ESGICERT");
    }

    /// @notice Test certificate issuance functionality
    function test_IssueCertificate() public {
        // Prepare test data
        string memory studentName = "John Doe";
        uint256 studentId = 12345;
        string memory courseName = "Blockchain Development";
        string memory grade = "A";
        string memory uri = "ipfs://QmTest";

        // Issue certificate as minter
        vm.prank(minter);

        // Test event emission and verification
        vm.expectEmit(true, true, false, true);
        emit CertificateIssued(0, studentId, courseName, block.timestamp);

        uint256 tokenId = certificate.issueCertificate(
            student,
            studentName,
            studentId,
            courseName,
            grade,
            uri
        );

        // Verify token ownership and ID
        assertEq(tokenId, 0);
        assertEq(certificate.ownerOf(tokenId), student);

        // Verify certificate data
        ESGICertificate.CertificateData memory certData = certificate
            .getCertificateData(tokenId);
        assertEq(certData.studentName, studentName);
        assertEq(certData.studentId, studentId);
        assertEq(certData.courseName, courseName);
        assertEq(certData.grade, grade);
        assertTrue(certData.isValid);
    }

    /// @notice Test certificate revocation functionality
    function test_RevokeCertificate() public {
        // First issue a certificate
        vm.prank(minter);
        uint256 tokenId = certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Blockchain Development",
            "A",
            "ipfs://QmTest"
        );

        // Test revocation
        string memory reason = "Academic misconduct";
        vm.expectEmit(true, false, false, true);
        emit CertificateRevoked(tokenId, block.timestamp, reason);

        certificate.revokeCertificate(tokenId, reason);

        // Verify revocation status
        ESGICertificate.CertificateData memory certData = certificate
            .getCertificateData(tokenId);
        assertFalse(certData.isValid);
    }

    /// @notice Test retrieval of student certificates
    function test_GetStudentCertificates() public {
        uint256 studentId = 12345;

        // Issue multiple certificates for the same student
        vm.startPrank(minter);
        uint256 tokenId1 = certificate.issueCertificate(
            student,
            "John Doe",
            studentId,
            "Course 1",
            "A",
            "ipfs://QmTest1"
        );
        uint256 tokenId2 = certificate.issueCertificate(
            student,
            "John Doe",
            studentId,
            "Course 2",
            "B",
            "ipfs://QmTest2"
        );
        vm.stopPrank();

        // Verify student certificates
        uint256[] memory studentCerts = certificate.getStudentCertificates(
            studentId
        );
        assertEq(studentCerts.length, 2);
        assertEq(studentCerts[0], tokenId1);
        assertEq(studentCerts[1], tokenId2);
    }

    /// @notice Test unauthorized certificate issuance
    function testFail_UnauthorizedIssueCertificate() public {
        // Attempt to issue certificate without MINTER_ROLE
        vm.prank(student);
        certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Course",
            "A",
            "ipfs://QmTest"
        );
    }

    /// @notice Test unauthorized certificate revocation
    function testFail_UnauthorizedRevokeCertificate() public {
        // Issue a certificate
        vm.prank(minter);
        uint256 tokenId = certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Course",
            "A",
            "ipfs://QmTest"
        );

        // Attempt to revoke without ADMIN_ROLE
        vm.prank(student);
        certificate.revokeCertificate(tokenId, "Unauthorized attempt");
    }

    /// @notice Test revocation of non-existent certificate
    function testFail_RevokeNonexistentCertificate() public {
        certificate.revokeCertificate(999, "Certificate does not exist");
    }

    /// @notice Test double revocation of certificate
    function testFail_RevokeAlreadyRevokedCertificate() public {
        // Issue and revoke a certificate
        vm.prank(minter);
        uint256 tokenId = certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Course",
            "A",
            "ipfs://QmTest"
        );

        certificate.revokeCertificate(tokenId, "First revocation");
        // Attempt second revocation
        certificate.revokeCertificate(tokenId, "Second revocation");
    }

    /// @notice Test tokenURI functionality
    function test_TokenURI() public {
        string memory uri = "ipfs://QmTest";

        // Issue a certificate
        vm.prank(minter);
        uint256 tokenId = certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Course",
            "A",
            uri
        );

        // Verify URI
        assertEq(certificate.tokenURI(tokenId), uri);
    }

    /// @notice Test retrieval of non-existent certificate data
    function testFail_GetCertificateDataNonexistent() public view {
        certificate.getCertificateData(999);
    }

    /// @notice Test interface support verification
    function test_SupportsInterface() public view {
        // Verify ERC721 interface support
        bytes4 erc721InterfaceId = 0x80ac58cd;
        assertTrue(certificate.supportsInterface(erc721InterfaceId));

        // Verify ERC721Metadata interface support
        bytes4 erc721MetadataInterfaceId = 0x5b5e139f;
        assertTrue(certificate.supportsInterface(erc721MetadataInterfaceId));

        // Verify AccessControl interface support
        bytes4 accessControlInterfaceId = 0x7965db0b;
        assertTrue(certificate.supportsInterface(accessControlInterfaceId));

        // Verify rejection of invalid interface
        assertFalse(certificate.supportsInterface(0xffffffff));
    }
}