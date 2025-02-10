// src/services/ipfsService.ts
import axios from 'axios';

export const ipfsService = {
  async uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('IPFS Upload Error:', error);
      throw error;
    }
  },

  // Vous pouvez ajouter d'autres méthodes liées à IPFS
  async getFileUrl(ipfsHash: string) {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  }
};