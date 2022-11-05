import { ethers, utils } from 'ethers'
import { GetStaticProps } from 'next'
import { ipfsImage } from '@lib/helpers'
import abi from '@lib/SYRYN-abi.json'
import metadataRendererAbi from '@lib/MetadataRenderer-abi.json'
import getDefaultProvider from '@lib/getDefaultProvider'
import { allChains } from 'wagmi'
import HomePage from '@components/HomePage/HomePage'

const MintPage = ({collection, chainId}) => <HomePage collection={collection} chainId={chainId} />
export default MintPage;

export const getServerSideProps: GetStaticProps = async (context) => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  console.log("contractAddress", contractAddress)
  console.log("chainId", chainId)
  if (!utils.isAddress(contractAddress.toString())) {
    return {
      notFound: true,
    }
  }

  // Create Ethers Contract
  const chain = allChains.find(
    (chain) => chain.id.toString() === chainId
  )
  const provider = getDefaultProvider(chain.network, chainId);
  const contract = new ethers.Contract(contractAddress.toString(), abi, provider);
  // console.log("contract", contract)
  
  // Get metadata renderer
  try {
    const uri = await contract.uri(1);
    console.log("uri", uri)
  
    const metadataURI = ipfsImage(uri)
    const axios = require('axios').default;
    const {data: metadata} = await axios.get(metadataURI)
    console.log("metadata", metadata)
    const price = await contract.cost();
    console.log("PRICe", price)

    const maxSalePurchasePerAddress = await contract.maxMintAmount()
    const totalSupply = await contract.totalSupply(1)
    console.log("totalSupply", totalSupply)
    const maxSupply = await contract.maxSupply(1)
    console.log("maxSupply", maxSupply)

    const erc721Drop = {
      id: "string",
      created: {
        id: "string",
        block: "string",
        timestamp: "string",
      },
      creator: "string",
      address: contractAddress,
      name: metadata.name,
      symbol: "string",
      contractConfig: {
        metadataRenderer: "string",
        editionSize: "string",
        royaltyBPS: "number",
        fundsRecipient: "string",
      },
      salesConfig: {
        publicSalePrice: price.toString(),
        maxSalePurchasePerAddress: maxSalePurchasePerAddress.toString(),
        publicSaleStart: "0",
        publicSaleEnd: "9223372036854775807",
        presaleStart: "0",
        presaleEnd: "0",
        presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      salesConfigHistory: [{
        publicSalePrice: "string",
        maxSalePurchasePerAddress: "string",
        publicSaleStart: "string",
        publicSaleEnd: "string",
        presaleStart: "string",
        presaleEnd: "string",
        presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"
      }],
      editionMetadata: {
        id: "string",
        description: metadata.description,
        imageURI: metadata.image,
        contractURI: "string",
        animationURI: metadata.animation_url || "",
        mimeType: metadata.mimeType || "",
      },
      sales: [{
        id: "string",
        pricePerToken: "string",
        priceTotal: "string",
        count: "string",
        purchaser: "string",
        firstPurchasedTokenId: 0,
        txn: {
          id: "string",
          block: "string",
          timestamp: "string"
        }
      }],
      transfers: [{
        id: "string",
        tokenId: "string",
        to: "string",
        from: "string",
        txn: {
          id: "string",
          block: "string",
          timestamp: "string"
        }
      }],
      totalMinted: totalSupply.toString(),
      maxSupply: maxSupply.toString(),
      txn: {
        id: "string",
        block: "string",
        timestamp: "string"
      }
    }
  
    return {
      props: { collection: erc721Drop, chainId: chain.id },
    }
  } catch(error) {
    console.error(error)
    return {
      props: { collection: {}, chainId: chain.id}
    }
  } 
  
}
