// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ESGIAnnualPerformanceNFT is ERC721URIStorage, Ownable {
    struct AnnualPerformance {
        uint256 programTokenId;
        uint256 year;
        string academicStatus;
    }

    mapping(uint256 => AnnualPerformance) public performanceDetails;
    uint256 private _nextTokenId;

    constructor()
        ERC721("ESGI Annual Performance", "ESGIANNUAL")
        Ownable(msg.sender)
    {}

    function mintAnnualPerformanceNFT(
        address student,
        uint256 programTokenId,
        uint256 year,
        string memory tokenURI,
        string memory academicStatus
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);

        performanceDetails[tokenId] = AnnualPerformance({
            programTokenId: programTokenId,
            year: year,
            academicStatus: academicStatus
        });

        return tokenId;
    }

    function updateAnnualPerformance(
        uint256 tokenId,
        string memory newAcademicStatus
    ) public onlyOwner {
        // Vérifier l'existence du token
        require(tokenId < _nextTokenId, "Token does not exist");

        // Permettre la mise à jour avec une chaîne vide
        performanceDetails[tokenId].academicStatus = newAcademicStatus;
    }

    function getAnnualPerformanceDetails(
        uint256 tokenId
    ) public view returns (AnnualPerformance memory) {
        // Vérifier l'existence du token
        require(tokenId < _nextTokenId, "Token does not exist");

        // Retourner les détails du token
        return performanceDetails[tokenId];
    }

    // Méthode pour vérifier l'existence d'un token
    function doesTokenExist(uint256 tokenId) public view returns (bool) {
        return
            tokenId < _nextTokenId &&
            bytes(performanceDetails[tokenId].academicStatus).length > 0;
    }
}
