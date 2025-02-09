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
        // Méthode explicite pour vérifier l'existence
        require(
            tokenId < _nextTokenId &&
                bytes(programDetails[tokenId].programName).length > 0,
            "Token does not exist"
        );
        programDetails[tokenId].status = newStatus;
    }

    function getProgramDetails(
        uint256 tokenId
    ) public view returns (ProgramDetails memory) {
        // Méthode explicite pour vérifier l'existence
        require(
            tokenId < _nextTokenId &&
                bytes(programDetails[tokenId].programName).length > 0,
            "Token does not exist"
        );
        return programDetails[tokenId];
    }

    // Méthode pour vérifier l'existence d'un token
    function doesTokenExist(uint256 tokenId) public view returns (bool) {
        return
            tokenId < _nextTokenId &&
            bytes(programDetails[tokenId].programName).length > 0;
    }
}
