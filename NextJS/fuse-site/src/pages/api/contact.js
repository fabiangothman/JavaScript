import { getAllEntries } from 'api';
import _get from 'lodash/get';
import mg from 'mailgun-js';

import { contactFormSchema } from '~baseComponents/ContactUs';

const mailGun = mg({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

async function sendEmail({ email, firstName, lastName, message }) {
  const defaultSettings = await getAllEntries({
    content_type: 'defaultSettings',
  });

  const settings = _get(defaultSettings, 'items[0].fields', {});

  const fromEmail = _get(settings, 'contactFormFromAddress');
  const toEmail = _get(settings, 'contactFormToAddress');
  const emailSubject = _get(settings, 'contactFormSubject');

  return new Promise((resolve, reject) => {
    const template = `
    <h2>${emailSubject}</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email} </p>
    <p><strong>Message:</strong> <i>${message}</i></p>
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

function validateFields({ firstName, lastName, email, message }) {
  return new Promise((resolve, reject) => {
    if (
      contactFormSchema.isValidSync({ firstName, lastName, email, message })
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
      res.status(403).json({ message: `Error: ${e}` });
    }
  }
}
