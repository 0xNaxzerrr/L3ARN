// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ESGICertificate
 * @author Naxzerrr
 * @notice This contract manages academic certificates as NFTs for ESGI students
 * @dev Implements ERC721 with URI storage and role-based access control
 */
contract ESGICertificate is ERC721, ERC721URIStorage, AccessControl {
    /// @notice Role identifier for addresses authorized to mint certificates
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /// @notice Counter for token IDs
    uint256 private _nextTokenId;

    /**
     * @notice Structure containing all certificate data
     * @param studentName Full name of the student
     * @param studentId Unique identifier of the student
     * @param courseName Name of the course or degree
     * @param graduationYear Year of graduation
     * @param grade Academic grade or distinction
     * @param isValid Current validity status of the certificate
     * @param timestamp Time when the certificate was issued
     */
    struct CertificateData {
        string studentName;
        uint256 studentId;
        string courseName;
        uint256 graduationYear;
        string grade;
        bool isValid;
        uint256 timestamp;
    }

    /// @notice Mapping from token ID to certificate data
    mapping(uint256 => CertificateData) public certificates;

    /// @notice Mapping from student ID to their certificate token IDs
    mapping(uint256 => uint256[]) public studentCertificates;

    /**
     * @notice Emitted when a new certificate is issued
     * @param tokenId The ID of the newly minted certificate
     * @param studentId The ID of the student receiving the certificate
     * @param courseName The name of the completed course
     * @param timestamp When the certificate was issued
     */
    event CertificateIssued(
        uint256 indexed tokenId,
        uint256 indexed studentId,
        string courseName,
        uint256 timestamp
    );

    /**
     * @notice Emitted when a certificate is revoked
     * @param tokenId The ID of the revoked certificate
     * @param timestamp When the certificate was revoked
     * @param reason Why the certificate was revoked
     */
    event CertificateRevoked(
        uint256 indexed tokenId,
        uint256 timestamp,
        string reason
    );

    /**
     * @notice Initializes the contract with basic ERC721 metadata
     * @dev Sets up the initial roles, granting both admin and minter roles to the deployer
     */
    constructor() ERC721("ESGI Academic Certificate", "ESGICERT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @notice Issues a new academic certificate as an NFT
     * @dev Only addresses with MINTER_ROLE can call this function
     * @param to Address receiving the certificate NFT
     * @param studentName Name of the student
     * @param studentId Unique identifier of the student
     * @param courseName Name of the completed course
     * @param grade Academic grade achieved
     * @param uri IPFS URI containing additional certificate metadata
     * @return uint256 The ID of the newly minted certificate
     */
    function issueCertificate(
        address to,
        string memory studentName,
        uint256 studentId,
        string memory courseName,
        string memory grade,
        string memory uri
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        certificates[tokenId] = CertificateData({
            studentName: studentName,
            studentId: studentId,
            courseName: courseName,
            graduationYear: block.timestamp / 365 days + 1970,
            grade: grade,
            isValid: true,
            timestamp: block.timestamp
        });

        studentCertificates[studentId].push(tokenId);

        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit CertificateIssued(tokenId, studentId, courseName, block.timestamp);

        return tokenId;
    }

    /**
     * @notice Revokes a certificate's validity
     * @dev Only addresses with DEFAULT_ADMIN_ROLE can revoke certificates
     * @param tokenId The ID of the certificate to revoke
     * @param reason The reason for revoking the certificate
     */
    function revokeCertificate(
        uint256 tokenId,
        string memory reason
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_exists(tokenId), "Certificate does not exist");
        require(certificates[tokenId].isValid, "Certificate already revoked");

        certificates[tokenId].isValid = false;
        emit CertificateRevoked(tokenId, block.timestamp, reason);
    }

    /**
     * @notice Retrieves all certificate IDs for a given student
     * @param studentId The student's unique identifier
     * @return uint256[] Array of certificate token IDs belonging to the student
     */
    function getStudentCertificates(
        uint256 studentId
    ) public view returns (uint256[] memory) {
        return studentCertificates[studentId];
    }

    /**
     * @notice Retrieves the full data of a specific certificate
     * @param tokenId The ID of the certificate to query
     * @return CertificateData The complete certificate data structure
     */
    function getCertificateData(
        uint256 tokenId
    ) public view returns (CertificateData memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }

    /**
     * @dev Required override for ERC721URIStorage
     */
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * @dev Required override for ERC721URIStorage
     */
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Required override for ERC721 and AccessControl
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
