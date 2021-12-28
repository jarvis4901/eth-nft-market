import axios from "axios";
import { apiKey, apiSecret } from "../../pinata.config";

/**
 * 通过pinata上传文件到IPFS
 * @param file
 * @returns
 */
export const pinFileToIPFS = async (file: File) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const data = new FormData();
  data.append("file", file);

  return await axios.post(url, data, {
    headers: {
      "Content-Type": `multipart/form-data;`,
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecret,
    },
  });
};

/**
 * 通过pinata上传json到IPFS
 * @param JSONBody
 * @returns
 */
export const pinJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return await axios.post(url, JSONBody, {
    headers: {
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecret,
    },
  });
};
