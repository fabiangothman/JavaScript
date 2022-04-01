import mailchimp from '@mailchimp/mailchimp_marketing';
import _get from 'lodash/get';
import { emailValidation } from '~baseComponents/SubscribeForm';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

async function addToAudience({ email }) {
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  // It verifies if the email is already registered.
  const isEmailRegistered = await mailchimp.searchMembers.search(email);
  if (isEmailRegistered?.exact_matches?.members?.length) {
    return null;
  }

  // It adds the email the to audencie using the first name as new and last name subscriber.
  return mailchimp.lists.addListMember(audienceId, {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: 'new',
      LNAME: 'subscriber',
    },
  });
}

function validateFields({ email }) {
  return new Promise((resolve, reject) => {
    // It validates the email basead on the YUP schema.
    if (emailValidation.isValidSync({ email })) {
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
      // const test = await mailchimp.ping.get();
      await addToAudience(params);
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(403).json({ message: `Error: ${e}` });
    }
  }
}
