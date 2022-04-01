import QuotesSection from 'components/culture/QuotesSection'
import TeamSection from 'components/culture/TeamSection'
import ValuesSection from 'components/culture/ValuesSection'
import WorkSection from 'components/culture/WorkSection'
import React from 'react'

import Hero from '../components/culture/Hero'
import { Grid } from '../components/grid'
import MainLayout from '../components/layouts/MainLayout'
import { ContentfulAPI } from '../utils/contentful'
import { getAttachmentParams, getImageParams } from '../utils/contentfulHelpers'

function CulturePage({ page }) {
  // console.log(`CulturePage page: `, page);
  // return null;

  const { settings, seo, hero, work, quotes, values, team } = page

  return (
    <MainLayout settings={settings} head={seo}>
      <Grid fluid>
        {hero && <Hero {...hero} />}
        {work && <WorkSection {...work} />}
        {quotes && <QuotesSection quotes={quotes} />}
        {values && <ValuesSection {...values} />}
        {team && <TeamSection {...team} />}
      </Grid>
    </MainLayout>
  )
}

export default CulturePage

export async function getStaticProps() {
  try {
    const cultureResult = await ContentfulAPI.getEntries({
      content_type: 'pageCulture',
      include: 5
    })
    const globalResult = await ContentfulAPI.getEntries({ content_type: 'globalSettings' })
    const page = await cultureResult.items
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
          seo: page.seo?.fields || null,
          hero: {
            ...page.hero.fields,
            backgroundMobileImage: getAttachmentParams(page.hero.fields.backgroundMobileImage),
            background: getAttachmentParams(page.hero.fields.background)
          },
          work: {
            ...page.work?.fields,
            title: page.work?.fields.title,
            firstSentence: page.work?.fields.firstSentence,
            secondSentence: page.work?.fields.secondSentence,
            workerCategories: page.work?.fields.workerCategories.map(({ fields }) => ({
              image: getImageParams(fields?.image),
              title: fields.title,
              listOfMembers: fields.listOfMembers ? fields.listOfMembers : []
            }))
          },
          quotes: page.quotes.map(({ fields }) => ({
            ...fields,
            sentence: fields?.sentence,
            name: fields?.name,
            role: fields?.role,
            location: fields?.location,
            image: getImageParams(fields?.image)
          })),
          values: {
            valuesTitle: page?.valuesTitle,
            valuesText: page?.valuesText,
            valuesImage: getImageParams(page?.valuesImage),
            values: page?.values.map(({ fields }) => ({
              name: fields.name,
              logo: getImageParams(fields?.logo),
              detailsList: fields?.detailsList
            }))
          },
          team: {
            ...page.team?.fields,
            disciplines: page.team?.fields.disciplines,
            showMax: page.team?.fields.showMax,
            teamMembers: page.team?.fields.teamMembers,
            teamMembersList: page.team?.fields.teamMembersList.map(({ fields }) => ({
              name: fields.name,
              role: fields.role,
              image: getImageParams(fields?.image)
            })),
            teams: page.team?.fields.teams,
            text: page.team?.fields.text,
            title: page.team?.fields.title
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}
