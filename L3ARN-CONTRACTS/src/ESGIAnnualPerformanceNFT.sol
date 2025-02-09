// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title ESGIAnnualPerformanceNFT
* @dev Contract for managing ESGI annual academic performance as NFTs
* @custom:security-contact security@esgi.fr
*/
contract ESGIAnnualPerformanceNFT is ERC721URIStorage, Ownable {
   /**
    * @dev Structure storing annual performance details
    */
   struct AnnualPerformance {
       uint256 programTokenId;  // ID of the associated program NFT
       uint256 year;           // Academic year of the performance
       string academicStatus;   // Current academic status (e.g., "Passed", "Failed")
   }

   /// @notice Mapping from token ID to annual performance details
   mapping(uint256 => AnnualPerformance) public performanceDetails;
   
   /// @dev Next token ID to be minted
   uint256 private _nextTokenId;

   /**
    * @dev Constructor initializes the contract with the name "ESGI Annual Performance"
    * and symbol "ESGIANNUAL"
    */
   constructor()
       ERC721("ESGI Annual Performance", "ESGIANNUAL")
       Ownable(msg.sender)
   {}

   /**
    * @dev Mints a new annual performance NFT
    * @param student Address of the student receiving the performance certificate
    * @param programTokenId ID of the associated program NFT
    * @param year Academic year of the performance
    * @param tokenURI URI for the token metadata
    * @param academicStatus Current academic status of the student
    * @return uint256 ID of the newly minted token
    * @notice Only the contract owner can mint new performance certificates
    */
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

   /**
    * @dev Updates the academic status of an existing performance NFT
    * @param tokenId ID of the token to update
    * @param newAcademicStatus New academic status to set
    * @notice Only the contract owner can update the status
    * @notice The token must exist to be updated
    */
   function updateAnnualPerformance(
       uint256 tokenId,
       string memory newAcademicStatus
   ) public onlyOwner {
       require(tokenId < _nextTokenId, "Token does not exist");
       performanceDetails[tokenId].academicStatus = newAcademicStatus;
   }

   /**
    * @dev Retrieves the details of an annual performance
    * @param tokenId ID of the token to query
    * @return AnnualPerformance struct containing performance information
    * @notice The token must exist to retrieve its details
    */
   function getAnnualPerformanceDetails(
       uint256 tokenId
   ) public view returns (AnnualPerformance memory) {
       require(tokenId < _nextTokenId, "Token does not exist");
       return performanceDetails[tokenId];
   }

   /**
    * @dev Checks if a token exists and has valid academic status
    * @param tokenId ID of the token to check
    * @return bool indicating whether the token exists and has a non-empty status
    * @notice A token exists if its ID is less than the next token ID and has a non-empty status
    */
   function doesTokenExist(uint256 tokenId) public view returns (bool) {
       return
           tokenId < _nextTokenId &&
           bytes(performanceDetails[tokenId].academicStatus).length > 0;
   }
}