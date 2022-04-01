import Head from 'next/head'
import React from 'react'

function buildTitle(head = {}) {
  const pageTitle = head?.title || undefined
  const titleSuffix = head?.titleSuffix || undefined

  const titleSegments = []
  if (pageTitle) {
    titleSegments.push(pageTitle.trim())
  }
  if (titleSuffix) {
    titleSegments.push(titleSuffix.trim())
  }

  if (titleSegments.length === 0) {
    return ''
  }

  return titleSegments.join(' ‒ ')
}

function buildDescription(head) {
  if (head?.metaDescription && head.metaDescription.trim().length > 0) {
    return head.metaDescription.trim()
  }

  return ''
}

function buildOpenGraphImage(head) {
  if (head?.metaImage && head.metaImage.fields.file) {
    return `https:${head.metaImage.fields.file.url}`
  }

  return null
}

const SEO = ({ head }) => {
  const title = buildTitle(head) || 'Ursa Major Technologies'
  const description = buildDescription(head)

  const ogImage = buildOpenGraphImage(head)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter.title" content={title} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter.description" content={description} />

        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="website" />
        <meta name="twitter.card" content="summary" />
        <meta name="pinterest" content="nopin" />

        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
    </>
  )
}

export default SEO
export { buildTitle }
