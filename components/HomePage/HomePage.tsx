import {
  Box,
  Well,
  Paragraph,
  SpinnerOG,
} from '@zoralabs/zord'
import ERC721DropContractProvider from '@providers/ERC721DropProvider'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import SeoHead from '@components/SeoHead'
import { ipfsImage } from '@lib/helpers'
import { border } from 'styles/styles.css'

interface HomePageProps {
  collection: SubgraphERC721Drop;
  chainId?: number;
}

const HomePage: NextPage<HomePageProps> = ({ collection, chainId }) => {

  return (
    <>
      <SeoHead />
      <div className="font-body flex grid grid-cols-6 p-5 justify-center align-center" style={{backgroundColor: "#ceb435"}}> 
          <div className="order-1 flex col-span-6 md:col-span-3 justify-center">
            <img className="lg:max-w-lg" src="/images/syryn_records2.png" />
          </div>   
          <div className="order-2 flex flex-col justify-end text-md md:text-2xl col-span-6 md:col-span-3 gap-5 pb-5">
            <p>
              Syryn Records is a <span className="font-bold">youth-run record label</span> serving young women and gender-expansive artists.
            </p>
            <p>
              Women and non-binary professionals are underrepresented in the music industry - We want to change that! Our mission as Syryn Records is to <span className="italic font-bold">uplift</span> and <span className="italic font-bold">empower</span> youth interested in music industry professionals. We run yearly internships where our interns support and nurture a group of talented youth artists.
            </p>
          </div>
          <div className="order-3 col-span-3 flex justify-center items-center">
            <img className="lg:max-w-sm" src="/images/album_art2.png" />
          </div>
          <div className="order-4 flex flex-col justify-start text-md md:text-2xl col-span-3">
            <p className="pb-5">
              Each year, we create a <span className="font-bold">compilation record</span> that supports our artists and our program. This year&apos;s record features 11 talented female musicians, poets, songwriters, and producers.
            </p>
            <p>
              This year, we wanted to introduce our interns and artists to the incredible world of web3 and music NFTs! We are proud to introduce our genesis (aka first!) music NFT - an audio player featuring our compilation record, Syryn Records Vol. I!
            </p>
          </div>          
          <div className="order-6 grid justify-items-center	text-center lg:order-5 text-2xl col-span-6 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <p className="font-bold">
                Track Listing            
              </p>
              <p>
                Salome Agbaroji - Make a Million
              </p>
              <p>
                Geia - All Girls to the Front
              </p>
              <p>
                a. kai - city lights
              </p>
              <p>
                Bugz R Beautiful - Botfly Larvae
              </p>
              <p>
                Zadie Jean - october
              </p>
              <p>
                GeminiMusic - Let Me Go
              </p>
              <p>
                Victorie - Lovesick
              </p>
              <p>
                Gertrude - guilty
              </p>
              <p>
                Raiesa - Why Should I?
              </p>
              <p >
                Reiyn - Someday
              </p>
              <p>
                gruel - ephemeral sun
              </p>
            </div>
            <img className="lg:max-w-lg align-center" src="/images/syryn_records_logo2.png" />
            <img  src="/images/purchasing_track_list2.png" />

          </div>
          <div className="my-5 order-5 lg:order-6 flex flex-col justify-start text-xs md:text-lg col-span-6 lg:col-span-3">
            <ERC721DropContractProvider
                erc721DropAddress={collection.address}
                chainId={chainId}
              >
            <Well className="rounded-none border-black bg-white" p="x6" style={{ borderBottom: 0 }}>
              <iframe className='h-[500px] sm:h-[800px]' src={ipfsImage(collection.editionMetadata.animationURI)} frameBorder="0"></iframe>
            </Well>
            <Well className="rounded-none border-black bg-white" p="x6">
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
          <div className="order-7 col-span-6 pt-5 flex justify-center">
            <img className="sm:w-full md:w-1/2" src="/images/our_artists2.png" />
          </div>
          <div className="order-8 col-span-6 grid flex justify-around grid-cols-1 md:grid-cols-4">
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
