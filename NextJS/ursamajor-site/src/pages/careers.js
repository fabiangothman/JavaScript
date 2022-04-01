import ContactForm from 'baseComponents/ContactForm'
import React from 'react'

import CareersSection1 from '../components/careers/CareersSection1'
import CareersSection2 from '../components/careers/CareersSection2'
import Hero from '../components/careers/Hero'
import { Grid } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'
import { getAttachmentParams, getImageParams } from '../utils/contentfulHelpers'
import { fetchPostings } from '../utils/lever'

function CareersPage({ page }) {
  const { settings, seo, hero, section1, section2, postingData, contact } = page

  return (
    <MainLayout styleType="darkGrey" settings={settings} head={seo}>
      <Grid fluid>
        {hero && <Hero {...hero} />}
        {section1 && postingData && <CareersSection1 {...section1} postingData={postingData} />}
        {section2 && <CareersSection2 {...section2} />}
        <ContactForm
          className="standard-pad-right"
          title={contact.headline}
          subtitle={contact.text}
          slug="contact"
          noDefaultHeadline={true}
        />
      </Grid>
    </MainLayout>
  )
}

export default CareersPage

export async function getStaticProps() {
  try {
    const postingData = await fetchPostings()
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
          postingData,
          settings: { ...settings, ...page?.individualPageFooter?.fields } || null,
          seo: page.seo?.fields || null,
          hero: {
            ...page.hero.fields,
            backgroundMobileImage: getAttachmentParams(page.hero.fields.backgroundMobileImage),
            background: getAttachmentParams(page.hero.fields.background)
          },
          section1: {
            boldHeadline: page.postingSectionDarkHeadline,
            headline: page.postingSectionHeadline,
            description: page.postingSectionDescription,
            images: {
              image1: getImageParams(page.locationImage1),
              image2: getImageParams(page.locationImage2),
              employeesImages: page.postingSectionEmployeesImages.map((image) =>
                getImageParams(image)
              ),
              engineerImage: getImageParams(page.postingSectionEngineerImage),
              caption: page.locationDescription
            }
          },
          section2: {
            headline: page.benefitsHeadline,
            image: getImageParams(page.benefitsImage),
            description: page.benefitsDescription,
            benefits: page.benefits,
            employeesImages: page.benefitsEmployeesImages.map((image) => getImageParams(image)),
            dogImage: getImageParams(page.benefitsDogImage)
          },
          contact: { ...page.contactSection.fields }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
