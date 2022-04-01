import ContactForm from 'baseComponents/ContactForm'
import React from 'react'

import CareerDetail from '../../components/careers/CareerDetail'
import MainLayout from '../../components/layouts/MainLayout'
import { ContentfulAPI } from '../../utils/contentful'
import { fetchPosting, fetchPostings } from '../../utils/lever'

function CareerDetailPage({ page }) {
  const { settings = {}, posting, seo, contact } = page
  return (
    <MainLayout head={seo} styleType="darkGrey" settings={settings}>
      <>
        <CareerDetail posting={posting} />
        <ContactForm
          className="standard-pad-right"
          title={contact.headline}
          subtitle={contact.text}
          slug="contact"
          noDefaultHeadline={true}
        />
      </>
    </MainLayout>
  )
}

export default CareerDetailPage

export async function getStaticPaths() {
  try {
    const postingData = await fetchPostings()
    const paths = postingData.map((item) => {
      return {
        params: { id: item.id }
      }
    })
    return {
      paths,
      fallback: false
    }
  } catch (e) {
    console.log(e)
  }
}

export async function getStaticProps(props) {
  const { params } = props
  try {
    const postingResult = await fetchPosting(params.id)
    const careersResult = await ContentfulAPI.getEntries({
      content_type: 'careersPage',
      include: 5
    })
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await careersResult.items
      .map((p) => {
        return p.fields
      })
      .shift()
    const settings = await globalResult.items
      .map((p) => {
        return p.fields
      })
      .shift()
    return {
      props: {
        page: {
          settings: { ...settings, ...page?.individualPageFooter?.fields } || null,
          seo: {
            title: `${postingResult.text} | Ursa Major Technologies`,
            metaDescription: postingResult.descriptionPlain
          },
          posting: postingResult,
          contact: { ...page.contactSection.fields }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
