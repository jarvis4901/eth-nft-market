import { ethers, providers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Market from "../../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { nftaddress, nftmarketaddress } from "../../address.config";

export interface NFTInfo {
  price: string;
  tokenId: string;
  seller: string;
  owner: string;
  image: string;
  description: string;
  name: string;
}

// 可能回合NFTInfo 信息有部分不一样
export interface NFTMetaInfo {
  price: string;
  itemId: string;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
}

/**
 *
 * @returns 获取provider
 */
export async function getProvider(): Promise<ethers.providers.Web3Provider> {
  const web3modal = new Web3Modal();
  const conn = await web3modal.connect();
  return new ethers.providers.Web3Provider(conn);
}

export async function getMarketContract() {
  const provider = await getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(nftmarketaddress, Market.abi, signer);
}

export async function getNFTContract() {
  const provider = await getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(nftaddress, NFT.abi, signer);
}

/**
 * 创建一个NFT并发布到NFT市场上去
 * @param url NFT信息的地址
 * @param inputPrice 输入的价格
 * @param provider
 */
export async function createNFT(
  url: string,
  inputPrice: string
): Promise<boolean> {
  const nftContract = await getNFTContract();
  let transaction = await nftContract.createToken(url);
  const tx = await transaction.wait();
  const event = tx.events[0];
  const value = event.args[2];
  const tokenId = value.toNumber();
  const price = ethers.utils.parseUnits(inputPrice, "ether");

  // 之后把该NFT商品商家岛market
  const martketContract = await getMarketContract();
  const publishPirice = await martketContract.getListingPrice();
  transaction = await martketContract.createMarketItem(
    nftaddress,
    tokenId,
    price,
    {
      value: publishPirice,
    }
  );
  await transaction.wait();
  return true;
}

/**
 * 获取我拥有的NFT资产
 * @param provider
 */
export async function fetchMyNFTs() {
  const marketContract = await getMarketContract();
  const nftContract = await getNFTContract();
  let data = await marketContract.fetchMyNFTs();
  // 节省请求 取最近的10个
  data = data.reduce((p: any, v: any, index: number) => {
    if (index < 10) {
      p.push(v);
    }
    return p;
  }, []);
  data.reverse();
  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await nftContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      const nft: NFTInfo = {
        name: meta.data.name,
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        description: meta.data.description,
      };
      return nft;
    })
  );
  return items;
}

/**
 * 获取我发布的NFT资产
 * @param provider
 */
export async function fetchMyCreatedNFTs() {
  const marketContract = await getMarketContract();
  const tokenContract = await getNFTContract();

  let data = await marketContract.fetchItemsCreated();
  // 节省请求 取最近的10个
  data = data.reduce((p: any, v: any, index: number) => {
    if (index < 10) {
      p.push(v);
    }
    return p;
  }, []);
  data.reverse();
  const items = await Promise.all(
    data.map(async (i: any) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      const nft: NFTInfo = {
        name: meta.data.name,
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        description: meta.data.description,
      };
      return nft;
    })
  );
  return items;
}

/**
 * 获取所有的NFT
 * @param provider
 */
export async function fetchAllNFTs(provider?: ethers.providers.Web3Provider) {
  const marketContract = await getMarketContract();
  const tokenContract = await getNFTContract();

  let data = await marketContract.fetchMarketItems(); // read-only, can't use reverse等
  // 节省请求 取最近的10个
  data = data.reduce((p: any, v: any, index: number) => {
    if (index < 10) {
      p.push(v);
    }
    return p;
  }, []);
  data.reverse();
  const items = await Promise.all(
    data.map(async (i: any) => {
      try {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        // console.log(meta.data);
        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        const metaInfo: NFTMetaInfo = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return metaInfo;
      } catch (e) {
        console.log(e);
      }
    })
  );
  return items;
}

/**
 *
 * @param nft 购买NFT
 */
export async function buyNFT(nft: any): Promise<boolean> {
  try {
    const contract = await getMarketContract();
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.itemId,
      {
        value: price,
      }
    );
    await transaction.wait();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
