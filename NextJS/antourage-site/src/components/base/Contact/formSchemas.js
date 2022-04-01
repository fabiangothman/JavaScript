import * as Yup from 'yup';

export const contactUsFormSchema = Yup.object({
  name: Yup.string().required('name is required'),
  message: Yup.string().required('message is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('email is required'),
  policy: Yup.boolean().required('policy is required'),
});

export const videoFormSchema = Yup.object({
  name: Yup.string().required('name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('email is required'),
  socialPlatform: Yup.string().required('social platform is required'),
  socialHandle: Yup.string().required('social handle is required'),
  videoLink: Yup.string().required('video link is required'),
  policy: Yup.boolean().required('policy is required'),
});
