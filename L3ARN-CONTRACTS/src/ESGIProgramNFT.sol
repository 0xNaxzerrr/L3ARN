// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ESGIProgramNFT is ERC721URIStorage, Ownable {
    struct ProgramDetails {
        string programName;
        uint256 startYear;
        uint256 endYear;
        string status;
    }

    mapping(uint256 => ProgramDetails) public programDetails;
    uint256 private _nextTokenId;

    constructor()
        ERC721("ESGI Program Certificate", "ESGIPROG")
        Ownable(msg.sender)
    {}

    function mintProgramNFT(
        address student,
        string memory programName,
        uint256 startYear,
        uint256 endYear,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);

        programDetails[tokenId] = ProgramDetails({
            programName: programName,
            startYear: startYear,
            endYear: endYear,
            status: "ACTIVE"
        });

        return tokenId;
    }

    function updateProgramStatus(
        uint256 tokenId,
        string memory newStatus
    ) public onlyOwner {
        // Vérifier l'existence du token
        require(tokenId < _nextTokenId, "Token does not exist");

        // Permettre la mise à jour avec une chaîne vide
        programDetails[tokenId].status = newStatus;
    }

    function getProgramDetails(
        uint256 tokenId
    ) public view returns (ProgramDetails memory) {
        // Vérifier l'existence du token
        require(tokenId < _nextTokenId, "Token does not exist");

        // Retourner les détails du token
        return programDetails[tokenId];
    }

    function doesTokenExist(uint256 tokenId) public view returns (bool) {
        // Vérifier simplement si le token ID est valide
        return tokenId < _nextTokenId;
    }
}
