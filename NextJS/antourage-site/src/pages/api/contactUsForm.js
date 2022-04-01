import { getAllEntries } from 'api';
import _get from 'lodash/get';
import mg from 'mailgun-js';
import { contactUsFormSchema } from '~baseComponents/Contact/formSchemas';

const mailGun = mg({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  host: process.env.MAILGUN_HOST || 'api.mailgun.net',
});

async function sendEmail({ email, name, message, policy }) {
  // Get the info from CMS
  const globalSettings = await getAllEntries({
    content_type: 'globalSettings',
  });
  const mailingSettings = _get(globalSettings, 'items[0].fields', {});

  const fromEmail = _get(mailingSettings, 'mailingFromAddress');
  const toEmail = _get(mailingSettings, 'mailingToAddress');
  const emailSubject = _get(mailingSettings, 'mailingSubjectTitle');

  return new Promise((resolve, reject) => {
    const template = `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email} </p>
      <p><strong>Message:</strong> <i>${message}</i></p>
      <p><strong>Policy accepted:</strong> <i>${policy}</i></p>
    `;
    const data = {
      from: fromEmail,
      to: toEmail,
      subject: emailSubject,
      html: template,
    };

    mailGun.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(body);
    });
  });
}

function validateFields({ name, email, message, policy }) {
  return new Promise((resolve, reject) => {
    if (
      contactUsFormSchema.isValidSync({
        name,
        email,
        message,
        policy,
      })
    ) {
      return resolve();
    }
    return reject();
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = _get(req, 'body', {});
      await validateFields(params);
      await sendEmail(params);
      res.status(200).json({ ok: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error while sending email', e);
      res
        .status(e.statusCode)
        .json({ error: 'Error while sending message. Please try again.' });
    }
  }
}
