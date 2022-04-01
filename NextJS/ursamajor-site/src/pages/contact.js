import { IconBear } from 'baseComponents/Icons'
import React from 'react'

import ContactForm from '../components/base/ContactForm'
import { Col, Row } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'

function ContactPage({ page }) {
  const { settings = {}, seo, contact } = page
  return (
    <MainLayout styleType="darkGrey" head={seo} settings={settings}>
      <Row className="contactRow">
        <Col className="contactCol no-pad" xs={12}>
          <ContactForm
            title={contact.headline}
            subtitle={contact.text}
            noTopBorder={true}
            slug="contact"
          />
          <div className="contactBearContainer">
            <IconBear fill="#fff" />
          </div>
        </Col>
      </Row>
    </MainLayout>
  )
}

export default ContactPage

export async function getStaticProps() {
  try {
    const privacyResult = await ContentfulAPI.getEntry('4ffnzUns0O8zhQ6iujeUZ1')
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await privacyResult.fields
    const settings = await globalResult.items
      .map((p) => {
        return p.fields
      })
      .shift()
    return {
      props: {
        page: {
          settings: { ...settings, ...page?.individualPageFooter?.fields } || null,
          seo: page.seo?.fields || null,
          headline: page.headline,
          text: page.text || null,
          contact: { ...page.contactSection.fields }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
