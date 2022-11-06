import Head from 'next/head'
import { useState } from 'react'
import {
  Box,
  Stack,
  Flex,
  Well,
  Text,
  Button,
  Paragraph,
  SpinnerOG,
} from '@zoralabs/zord'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import { ipfsImage } from '@lib/helpers'
import { maxWidth, border } from 'styles/styles.css'
import { useSaleStatus } from 'hooks/useSaleStatus'

interface HomePageProps {
  collection: SubgraphERC721Drop;
  chainId?: number;
}

const HomePage: NextPage<HomePageProps> = ({ collection, chainId }) => {
  const ogImage = ipfsImage("ipfs://bafybeifomuzbda6vaa2zas5il5r3k2wvtnkuuhg3d2wij6iv572pttmiqa/Wura cover art (1).png")
  const { presaleExists, saleNotStarted, saleIsFinished } = useSaleStatus({ collection })
  const [showPresale, setShowPresale] = useState(saleNotStarted && !saleIsFinished)

  return (
    <>
      <Head>
        <title>{collection.name}</title>
        <meta name="title" content={`${collection.name}`} />
        <meta
          name="description"
          content={
            collection.editionMetadata?.description ||
            "Wura, A Narrative"
          }
        />
        <meta name="og:title" content={`${collection.name}`} />
        <meta
          name="og:url"
          content="https://planetsun.xyz"
        />
        <meta
          name="og:description"
          content={
            collection.editionMetadata?.description ||
            "Wura, A Narrative"
          }
        />
        <meta name="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${collection.name}`} />
        <meta
          name="twitter:url"
          content="https://planetsun.xyz"
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      <Stack mt="x3" gap="x3" style={{backgroundColor: "#ceb435"}}>
        <Box className={maxWidth} p="x4">
          <Text variant="menu-lg" mb="x8" align="center">
            <b>{collection.name}</b>
          </Text>
           
          <Text style={{whiteSpace: "pre-line"}}>{collection?.editionMetadata?.description}</Text>
          <Text >
            <u><a href="https://ipfs.io/ipfs/bafkreiecfewq7fmvk6zuoe7djotqcu2m74w3yu5bv5b3qvt76ifulgtb5u?1" target="__blank">view full music metadata</a></u>
          </Text>
          <Box mt="x8" mx="auto" style={{ maxWidth: 560 }}>

            <Well className={border} p="x6" style={{ borderBottom: 0 }}>
              <iframe height={750} width={500} src={ipfsImage(collection.editionMetadata.animationURI)} frameBorder="0"></iframe>
            </Well>
            <Well className={border} p="x6">
                <Box>
                  {collection != null ? (
                    <>
                      <MintDetails collection={collection} showPresale={false} />
                      <MintStatus collection={collection} />
                    </>
                  ) : (
                    <Paragraph align="center" mt="x8">
                      <SpinnerOG />
                    </Paragraph>
                  )}
                </Box>
            </Well>            
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default HomePage
