import { ipfsImage } from '@lib/helpers'
import Head from 'next/head'

const SeoHead = () => {
  const title = 'Syryn Records Vol. I'
  const description =
    'Syryn Records is a youth-run record label serving young women and gender-expansive artists.'
  const image =
    'https://nftstorage.link/ipfs/bafybeiewx6ecp3gz3r6fczzvw5poa652bkwz3qtolpdsncg3quhhesu5rq'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={image} />
      <meta name="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:image" content={image} />
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />
      <meta name="og:url" content="https://syrynrecords.xyz" />
    </Head>
  )
}

export default SeoHead
