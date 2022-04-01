import mailchimp from '@mailchimp/mailchimp_marketing'
import { YupFormat } from 'baseComponents/ContactForm'
import _get from 'lodash/get'
import mg from 'mailgun-js'
import { ContentfulAPI } from 'utils/contentful'

const mailGun = mg({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
})

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = _get(req, 'body', {})
      await validateFields(params)
      await addToAudience(params)
      await sendEmail(params)
      res.status(200).json({ ok: true })
    } catch (e) {
      res.status(403).json({ message: `Error: ${e}` })
    }
  }
}

async function addToAudience({ email, lastName, firstName }) {
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID
  const isEmailRegistered = await mailchimp.searchMembers.search(email)
  if (isEmailRegistered?.exact_matches?.members?.length) {
    return
  }
  return await mailchimp.lists.addListMember(audienceId, {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  })
}

async function sendEmail({ email, lastName, firstName, message }) {
  const contactSettings = await ContentfulAPI.getEntries({ content_type: 'contactFormSettings' })
  const [fields] = contactSettings.items.map(({ fields }) => fields)

  return new Promise((resolve, reject) => {
    const template = `
    <h2>${fields.subject}</h2>
    <p><strong>Full name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email} </p>
    <p><strong>Message:</strong> <i>${message}</i></p>
    `
    const data = {
      from: fields.fromEMail,
      to: fields.destinationEMail,
      subject: fields.subject,
      html: template
    }

    mailGun.messages().send(data, (error, body) => {
      if (error) {
        return reject(error)
      }
      return resolve(body)
    })
  })
}

function validateFields({ firstName, lastName, email, message }) {
  return new Promise((resolve, reject) => {
    if (YupFormat.isValidSync({ firstName, lastName, email, message })) {
      return resolve()
    }

    return reject('Fields not valid')
  })
}
