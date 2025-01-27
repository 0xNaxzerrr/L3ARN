// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ESGICertificate.sol";

contract ESGICertificateTest is Test {
    ESGICertificate public certificate;
    address public admin;
    address public minter;
    address public student;
    
    // Events pour les tests
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

    function setUp() public {
        // Configuration des adresses de test
        admin = address(this);
        minter = makeAddr("minter");
        student = makeAddr("student");

        // Déploiement du contrat
        certificate = new ESGICertificate();
        
        // Attribution du rôle MINTER au minter
        certificate.grantRole(certificate.MINTER_ROLE(), minter);
    }

    /// Test de la configuration initiale
    function test_InitialSetup() public {
        assertTrue(certificate.hasRole(certificate.DEFAULT_ADMIN_ROLE(), admin));
        assertTrue(certificate.hasRole(certificate.MINTER_ROLE(), minter));
        assertEq(certificate.name(), "ESGI Academic Certificate");
        assertEq(certificate.symbol(), "ESGICERT");
    }

    /// Test d'émission de certificat
    function test_IssueCertificate() public {
        // Préparation des données
        string memory studentName = "John Doe";
        uint256 studentId = 12345;
        string memory courseName = "Blockchain Development";
        string memory grade = "A";
        string memory uri = "ipfs://QmTest";

        // Émission du certificat en tant que minter
        vm.prank(minter);
        
        // Test de l'émission et vérification de l'événement
        vm.expectEmit(true, true, false, true);
        emit CertificateIssued(1, studentId, courseName, block.timestamp);
        
        uint256 tokenId = certificate.issueCertificate(
            student,
            studentName,
            studentId,
            courseName,
            grade,
            uri
        );

        // Vérifications
        assertEq(tokenId, 1);
        assertEq(certificate.ownerOf(tokenId), student);
        
        // Vérification des données du certificat
        ESGICertificate.CertificateData memory certData = certificate.getCertificateData(tokenId);
        assertEq(certData.studentName, studentName);
        assertEq(certData.studentId, studentId);
        assertEq(certData.courseName, courseName);
        assertEq(certData.grade, grade);
        assertTrue(certData.isValid);
    }

    /// Test de la révocation de certificat
    function test_RevokeCertificate() public {
        // Émission d'un certificat
        vm.prank(minter);
        uint256 tokenId = certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Blockchain Development",
            "A",
            "ipfs://QmTest"
        );

        // Révocation du certificat
        string memory reason = "Academic misconduct";
        vm.expectEmit(true, false, false, true);
        emit CertificateRevoked(tokenId, block.timestamp, reason);
        
        certificate.revokeCertificate(tokenId, reason);

        // Vérification de la révocation
        ESGICertificate.CertificateData memory certData = certificate.getCertificateData(tokenId);
        assertFalse(certData.isValid);
    }

    /// Test de récupération des certificats d'un étudiant
    function test_GetStudentCertificates() public {
        uint256 studentId = 12345;

        // Émission de plusieurs certificats pour le même étudiant
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

        // Récupération et vérification des certificats
        uint256[] memory studentCerts = certificate.getStudentCertificates(studentId);
        assertEq(studentCerts.length, 2);
        assertEq(studentCerts[0], tokenId1);
        assertEq(studentCerts[1], tokenId2);
    }

    /// Test des contrôles d'accès
    function testFail_UnauthorizedIssueCertificate() public {
        // Tentative d'émission sans le rôle MINTER
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

    function testFail_UnauthorizedRevokeCertificate() public {
        // Émission d'un certificat
        vm.prank(minter);
        uint256 tokenId = certificate.issueCertificate(
            student,
            "John Doe",
            12345,
            "Course",
            "A",
            "ipfs://QmTest"
        );

        // Tentative de révocation sans le rôle ADMIN
        vm.prank(student);
        certificate.revokeCertificate(tokenId, "Unauthorized attempt");
    }

    /// Test de révocation d'un certificat inexistant
    function testFail_RevokeNonexistentCertificate() public {
        certificate.revokeCertificate(999, "Certificate does not exist");
    }

    /// Test de révocation d'un certificat déjà révoqué
    function testFail_RevokeAlreadyRevokedCertificate() public {
        // Émission et révocation d'un certificat
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
        // Tentative de seconde révocation
        certificate.revokeCertificate(tokenId, "Second revocation");
    }
}