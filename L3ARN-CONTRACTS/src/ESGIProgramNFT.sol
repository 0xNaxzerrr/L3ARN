// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ESGIProgramNFT
 * @dev Contract for managing ESGI academic program certificates as NFTs
 * @custom:security-contact security@esgi.fr
 */
contract ESGIProgramNFT is ERC721URIStorage, Ownable {
    struct ProgramDetails {
        string programName;    // Name of the academic program
        uint256 startYear;     // Year when the program starts
        uint256 endYear;       // Year when the program ends
        string status;         // Current status of the program (e.g., "ACTIVE", "COMPLETED")
    }

    /// @notice Mapping from token ID to program details
    mapping(uint256 => ProgramDetails) public programDetails;
    
    /// @dev Next token ID to be minted
    uint256 private _nextTokenId;

    /**
     * @dev Constructor initializes the contract with the name "ESGI Program Certificate"
     * and symbol "ESGIPROG"
     */
    constructor()
        ERC721("ESGI Program Certificate", "ESGIPROG")
        Ownable(msg.sender)
    {}

    /**
     * @dev Mints a new program NFT
     * @param student Address of the student receiving the certificate
     * @param programName Name of the academic program
     * @param startYear Year when the program starts
     * @param endYear Year when the program ends
     * @param tokenURI URI for the token metadata
     * @return uint256 ID of the newly minted token
     * @notice Only the contract owner can mint new certificates
     */
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

    /**
     * @dev Updates the status of an existing program
     * @param tokenId ID of the token to update
     * @param newStatus New status to set for the program
     * @notice Only the contract owner can update the status
     * @notice The token must exist to be updated
     */
    function updateProgramStatus(
        uint256 tokenId,
        string memory newStatus
    ) public onlyOwner {
        require(tokenId < _nextTokenId, "Token does not exist");
        programDetails[tokenId].status = newStatus;
    }

    /**
     * @dev Retrieves the details of a program
     * @param tokenId ID of the token to query
     * @return ProgramDetails struct containing program information
     * @notice The token must exist to retrieve its details
     */
    function getProgramDetails(
        uint256 tokenId
    ) public view returns (ProgramDetails memory) {
        require(tokenId < _nextTokenId, "Token does not exist");
        return programDetails[tokenId];
    }

    /**
     * @dev Checks if a token exists
     * @param tokenId ID of the token to check
     * @return bool indicating whether the token exists
     * @notice A token exists if its ID is less than the next token ID to be minted
     */
    function doesTokenExist(uint256 tokenId) public view returns (bool) {
        return tokenId < _nextTokenId;
    }
}