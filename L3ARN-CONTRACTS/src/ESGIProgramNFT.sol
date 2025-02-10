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
    /**
     * @dev Enum representing the different states a program can be in
     */
    enum Status {
        ACTIVE,
        SUCCESS,
        REVOKED
    }

    /**
     * @dev Structure containing status details of a program
     * @param status Current status of the program
     * @param certificateIssuedDate Timestamp when the certificate was last updated
     * @param comments Additional comments about the status
     */
    struct ProgramStatus {
        Status status;
        uint256 certificateIssuedDate;
        string comments;
    }

    /**
     * @dev Structure containing academic progress information
     * @param studentId Unique identifier for the student
     * @param tokenId Token identifier
     * @param year Academic year
     * @param nftId NFT identifier
     * @param ipfsCid IPFS content identifier
     */
    struct AcademicProgress {
        string studentId;
        string tokenId;
        string year;
        string nftId;
        string ipfsCid;
    }

    /**
     * @dev Structure containing complete program details
     * @param studentWallet Student's wallet address
     * @param programName Name of the academic program
     * @param startYear Program start year
     * @param endYear Program end year
     * @param academicProgresses Array of academic progress records
     * @param programStatus Current status details of the program
     * @param ipfsCID IPFS content identifier for program metadata
     * @param issuer Name of the issuing authority
     * @param signer Address of the signing authority
     */
    struct ProgramDetails {
        address studentWallet;
        string programName;
        uint256 startYear;
        uint256 endYear;
        AcademicProgress[] academicProgresses;
        ProgramStatus programStatus;
        string ipfsCID;
        string issuer;
        address signer;
    }

    /// @notice Mapping from token ID to program details
    mapping(uint256 => ProgramDetails) public programDetails;

    /// @notice Mapping from student address to their token IDs
    mapping(address => uint256[]) private studentNFTs;

    /// @dev Counter for token IDs
    uint256 private _nextTokenId;

    /**
     * @dev Constructor initializes the contract with name and symbol
     */
    constructor()
        ERC721("ESGI Program Certificate", "ESGIPROG")
        Ownable(msg.sender)
    {}

    /**
     * @notice Mints a new program NFT certificate
     * @dev Only the contract owner can mint new certificates
     * @param student Address of the student receiving the certificate
     * @param programName Name of the academic program
     * @param startYear Year when the program starts
     * @param endYear Year when the program ends
     * @param _academicProgresses Array of academic progress records
     * @param _ipfsCID IPFS content identifier
     * @param _issuer Name of the issuing authority
     * @param tokenURI URI for the token metadata
     * @return uint256 ID of the newly minted token
     */
    function mintProgramNFT(
        address student,
        string memory programName,
        uint256 startYear,
        uint256 endYear,
        AcademicProgress[] memory _academicProgresses,
        string memory _ipfsCID,
        string memory _issuer,
        string memory tokenURI,
        string memory _comments
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Initialize program status
        ProgramStatus memory initialStatus = ProgramStatus({
            status: Status.ACTIVE,
            certificateIssuedDate: block.timestamp,
            comments: _comments
        });

        programDetails[tokenId] = ProgramDetails({
            studentWallet: student,
            programName: programName,
            startYear: startYear,
            endYear: endYear,
            academicProgresses: _academicProgresses,
            programStatus: initialStatus,
            ipfsCID: _ipfsCID,
            issuer: _issuer,
            signer: msg.sender
        });

        // Add tokenId to student's NFT list
        studentNFTs[student].push(tokenId);

        return tokenId;
    }

    /**
     * @notice Updates the status of an existing program
     * @dev Only the contract owner can update the status
     * @param tokenId ID of the token to update
     * @param newStatus New status to set
     * @param comments Additional comments about the status update
     */
    function updateProgramStatus(
        uint256 tokenId,
        Status newStatus,
        string memory comments
    ) public onlyOwner {
        require(tokenId < _nextTokenId, "Token does not exist");
        ProgramStatus storage status = programDetails[tokenId].programStatus;
        status.status = newStatus;
        status.certificateIssuedDate = block.timestamp;
        status.comments = comments;
    }

    /**
     * @notice Retrieves all NFTs owned by a specific student
     * @param student Address of the student
     * @return tokens Array of token IDs owned by the student
     * @return details Array of program details for each token
     */
    function getStudentNFTs(
        address student
    )
        public
        view
        returns (uint256[] memory tokens, ProgramDetails[] memory details)
    {
        uint256[] memory tokenIds = studentNFTs[student];
        ProgramDetails[] memory programDetailsArray = new ProgramDetails[](
            tokenIds.length
        );

        for (uint256 i = 0; i < tokenIds.length; i++) {
            programDetailsArray[i] = programDetails[tokenIds[i]];
        }

        return (tokenIds, programDetailsArray);
    }

    /**
     * @notice Gets the number of NFTs owned by a student
     * @param student Address of the student
     * @return uint256 Number of NFTs owned by the student
     */
    function getStudentNFTCount(address student) public view returns (uint256) {
        return studentNFTs[student].length;
    }

    /**
     * @notice Retrieves the details of a specific program
     * @param tokenId ID of the token to query
     * @return ProgramDetails Details of the specified program
     */
    function getProgramDetails(
        uint256 tokenId
    ) public view returns (ProgramDetails memory) {
        require(tokenId < _nextTokenId, "Token does not exist");
        return programDetails[tokenId];
    }

    /**
     * @notice Checks if a token exists
     * @param tokenId ID of the token to check
     * @return bool True if the token exists, false otherwise
     */
    function doesTokenExist(uint256 tokenId) public view returns (bool) {
        return tokenId < _nextTokenId;
    }
}
