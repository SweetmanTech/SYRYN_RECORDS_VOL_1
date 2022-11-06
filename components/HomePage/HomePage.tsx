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
import { ConnectWallet } from '@components/ConnectWallet'
import ERC721DropContractProvider from '@providers/ERC721DropProvider'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import { PresaleStatus } from '@components/PresaleStatus'
import { ipfsImage } from '@lib/helpers'
import { header, maxWidth, border, heroImage } from 'styles/styles.css'
import { useSaleStatus } from 'hooks/useSaleStatus'
import Image from 'next/image'

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
      <div className="flex grid grid-cols-6 p-5 justify-center align-center" style={{backgroundColor: "#ceb435"}}> 
          <div className="flex col-span-3 justify-center">
            <img className="sm:w-full md:w-1/2" src="/images/syryn_records.png" />
          </div>   
          <div className="flex flex-col justify-center text-xs md:text-lg col-span-3 gap-5 pb-5">
            <p>
              Syryn Records is a <span className="font-bold">youth-run record label</span> serving young women and gender-expansive artists.
            </p>
            <p>
              Women and non-binary professionals are underrepresented in the music industry - We want to change that! Our mission as Syryn Records is to <span className="italic font-bold">uplift</span> and <span className="italic font-bold">empower</span> youth interested in music industry professionals. We run yearly internships where our interns support and nurture a group of talented youth artists.
            </p>
          </div>
          <div className="col-span-3 flex justify-center items-center">
            <img className="sm:w-full md:w-1/2" src="/images/album_art.png" />
          </div>
          <div className="flex flex-col justify-center text-xs md:text-lg col-span-3">
            <p className="pb-5">
              Each year, we create a <span className="font-bold">compilation record</span> that supports our artists and our program. This year&apos;s record features 11 talented female musicians, poets, songwriters, and producers.
            </p>
            <p>
              This year, we wanted to introduce our interns and artists to the incredible world of web3 and music NFTs! We are proud to introduce our genesis (aka first!) music NFT - an audio player featuring our compilation record, Syryn Records Vol. I!
            </p>
          </div>          
          <div className="col-span-6 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <p className="font-bold">
                Track Listing            
              </p>
              <p className="text-xs">
                Salome Agbaroji - Make a Million
              </p>
              <p className="text-xs">
                Geia - All Girls to the Front
              </p>
              <p className="text-xs">
                a. kai - city lights
              </p>
              <p className="text-xs">
                Bugz R Beautiful - Botfly Larvae
              </p>
              <p className="text-xs">
                Zadie Jean - october
              </p>
              <p className="text-xs">
                GeminiMusic - Let Me Go
              </p>
              <p className="text-xs">
                Victorie - Lovesick
              </p>
              <p className="text-xs">
                Gertrude - guilty
              </p>
              <p className="text-xs">
                Raiesa - Why Should I?
              </p>
              <p className="text-xs">
                Reiyn - Someday
              </p>
              <p className="text-xs">
                gruel - ephemeral sun
              </p>
            </div>
            <img className="sm:w-full md:w-1/2" src="/images/syryn_records_logo.png" />
            <img className="sm:w-full md:w-1/2" src="/images/purchasing_track_list.png" />

          </div>
          <div className="flex flex-col justify-center text-xs md:text-lg col-span-6 lg:col-span-3">
            <ERC721DropContractProvider
                erc721DropAddress={collection.address}
                chainId={chainId}
              >
            <Well className={border} p="x6" style={{ borderBottom: 0 }}>
              <iframe height={800} src={ipfsImage(collection.editionMetadata.animationURI)} frameBorder="0"></iframe>
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
            </ERC721DropContractProvider>
          </div>
          <div className="col-span-6 flex justify-center">
            <img className="sm:w-full md:w-1/2" src="/images/our_artists.png" />
          </div>
          <div className="col-span-6 grid flex justify-around grid-cols-1 md:grid-cols-4">
            <img src="/images/salome.png" />
            <img src="/images/geia.png" />
            <img src="/images/a_kai.png" />
            <img src="/images/bugz_r_beautiful.png" />
            <img src="/images/zadie.png" />
            <img src="/images/gemini.png" />
            <img src="/images/victorie.png" />
            <img src="/images/gertrude.png" />
            <img src="/images/raiesa.png" />
            <img src="/images/reiyn.png" />
            <img src="/images/gruel.png" />
          </div>
      </div>
    </>
  )
}

export default HomePage
