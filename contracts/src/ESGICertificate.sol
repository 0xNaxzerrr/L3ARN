// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title ESGI Academic Certificate NFT
/// @notice Ce contrat gère les certificats académiques sous forme de NFTs
contract ESGICertificate is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIds;

    struct CertificateData {
        string studentName; // Nom de l'étudiant
        uint256 studentId; // ID unique de l'étudiant
        string courseName; // Nom du cours/diplôme
        uint256 graduationYear; // Année d'obtention
        string grade; // Note ou mention
        bool isValid; // Statut de validité
        uint256 timestamp; // Horodatage de création
    }

    // Mapping from token ID to certificate data
    mapping(uint256 => CertificateData) public certificates;

    // Mapping from student ID to array of their certificate IDs
    mapping(uint256 => uint256[]) public studentCertificates;

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

    constructor() ERC721("ESGI Academic Certificate", "ESGICERT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function issueCertificate(
        address to,
        string memory studentName,
        uint256 studentId,
        string memory courseName,
        string memory grade,
        string memory uri
    ) public onlyRole(MINTER_ROLE) returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        certificates[newTokenId] = CertificateData({
            studentName: studentName,
            studentId: studentId,
            courseName: courseName,
            graduationYear: block.timestamp / 365 days + 1970,
            grade: grade,
            isValid: true,
            timestamp: block.timestamp
        });

        studentCertificates[studentId].push(newTokenId);

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, uri);

        emit CertificateIssued(
            newTokenId,
            studentId,
            courseName,
            block.timestamp
        );

        return newTokenId;
    }

    function revokeCertificate(
        uint256 tokenId,
        string memory reason
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_exists(tokenId), "Certificate does not exist");
        require(certificates[tokenId].isValid, "Certificate already revoked");

        certificates[tokenId].isValid = false;
        emit CertificateRevoked(tokenId, block.timestamp, reason);
    }

    function getStudentCertificates(
        uint256 studentId
    ) public view returns (uint256[] memory) {
        return studentCertificates[studentId];
    }

    function getCertificateData(
        uint256 tokenId
    ) public view returns (CertificateData memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }

    // Override required functions
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
