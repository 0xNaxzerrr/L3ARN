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
     * @dev Enum representing possible academic statuses
     */
    enum AcademicStatus {
        SUCCESS,
        FAILED,
        REVOKED
    }

    /**
     * @dev Structure representing a course and its evaluation
     */
    struct Course {
        string courseName;
        string grade;
        string result;
        string comments;
    }

    /**
     * @dev Structure containing the academic status details
     */
    struct StatusDetails {
        AcademicStatus status;
        string comments;
    }

    /**
     * @dev Structure storing complete annual performance details
     */
    struct AnnualPerformance {
        uint256 programTokenId; // ID of the associated program NFT
        string year; // Academic year (e.g., "3rd Year")
        string studentId; // Student's unique identifier
        string studentName; // Student's full name
        Course[] courses; // Array of course performances
        uint256 yearStartDate; // Start date of academic year (timestamp)
        uint256 yearEndDate; // End date of academic year (timestamp)
        StatusDetails academicStatus; // Current academic status with comments
        string ipfsCID; // IPFS CID for metadata
        string issuer; // Institution name
        address signer; // Signer's address
    }

    /// @notice Mapping from token ID to annual performance details
    mapping(uint256 => AnnualPerformance) public performanceDetails;

    /// @notice Mapping from student address to their token IDs
    mapping(address => uint256[]) private studentNFTs;

    /// @dev Next token ID to be minted
    uint256 private _nextTokenId;

    constructor()
        ERC721("ESGI Annual Performance", "ESGIANNUAL")
        Ownable(msg.sender)
    {}

    /**
     * @dev Mints a new annual performance NFT
     * @param student Address of the student
     * @param programTokenId Associated program NFT ID
     * @param year Academic year
     * @param studentId Student's ID
     * @param studentName Student's name
     * @param courses Array of course performances
     * @param yearStartDate Start date timestamp
     * @param yearEndDate End date timestamp
     * @param status Initial academic status
     * @param statusComments Academic status comments
     * @param ipfsCID IPFS CID for metadata
     * @param issuer Institution name
     * @param tokenURI Token URI for metadata
     */
    function mintAnnualPerformanceNFT(
        address student,
        uint256 programTokenId,
        string memory year,
        string memory studentId,
        string memory studentName,
        Course[] memory courses,
        uint256 yearStartDate,
        uint256 yearEndDate,
        AcademicStatus status,
        string memory statusComments,
        string memory ipfsCID,
        string memory issuer,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);

        StatusDetails memory academicStatus = StatusDetails({
            status: status,
            comments: statusComments
        });

        performanceDetails[tokenId] = AnnualPerformance({
            programTokenId: programTokenId,
            year: year,
            studentId: studentId,
            studentName: studentName,
            courses: courses,
            yearStartDate: yearStartDate,
            yearEndDate: yearEndDate,
            academicStatus: academicStatus,
            ipfsCID: ipfsCID,
            issuer: issuer,
            signer: msg.sender
        });

        studentNFTs[student].push(tokenId);

        return tokenId;
    }

    /**
     * @dev Updates the academic status of an existing performance NFT
     * @param tokenId Token ID to update
     * @param newStatus New academic status
     * @param comments New status comments
     */
    function updateAcademicStatus(
        uint256 tokenId,
        AcademicStatus newStatus,
        string memory comments
    ) public onlyOwner {
        require(tokenId < _nextTokenId, "Token does not exist");
        performanceDetails[tokenId].academicStatus.status = newStatus;
        performanceDetails[tokenId].academicStatus.comments = comments;
    }

    /**
     * @dev Gets all NFTs owned by a student
     * @param student Student's address
     * @return tokens Array of token IDs
     * @return details Array of performance details
     */
    function getStudentNFTs(
        address student
    )
        public
        view
        returns (uint256[] memory tokens, AnnualPerformance[] memory details)
    {
        uint256[] memory tokenIds = studentNFTs[student];
        AnnualPerformance[] memory performanceArray = new AnnualPerformance[](
            tokenIds.length
        );

        for (uint256 i = 0; i < tokenIds.length; i++) {
            performanceArray[i] = performanceDetails[tokenIds[i]];
        }

        return (tokenIds, performanceArray);
    }

    /**
     * @dev Gets performance details for a specific token
     */
    function getAnnualPerformanceDetails(
        uint256 tokenId
    ) public view returns (AnnualPerformance memory) {
        require(tokenId < _nextTokenId, "Token does not exist");
        return performanceDetails[tokenId];
    }

    /**
     * @dev Gets the number of NFTs owned by a student
     */
    function getStudentNFTCount(address student) public view returns (uint256) {
        return studentNFTs[student].length;
    }

    /**
     * @dev Checks if a token exists
     */
    function doesTokenExist(uint256 tokenId) public view returns (bool) {
        return tokenId < _nextTokenId;
    }
}
