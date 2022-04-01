import React, { useState } from 'react';
import cx from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Grid, Row, Col } from 'grid';
import FormInput from 'baseComponents/FormInput';
import ButtonCircle from 'baseComponents/ButtonCircle';
//  Styles
import styles from './ContactForm2.module.scss';

const ContactForm2= ({
  className,
  ...props
}) => {
  const [submitState, setSubmitState] = useState({
    wasSubmited: false,
    feedback: 'Thank you for sending your request. We will be in touch shortly.',
    style: 'success',
  });

  const listOptions = [
    { value: 'facebook', text: 'Facebook', },
    { value: 'twitter', text: 'Twitter', },
    { value: 'linkedin', text: 'LinkedIn', },
  ];
  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {

    try {
      setSubmitting(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/demoRequest`, values);
      setSubmitting(false);

      setSubmitState((prev) => ({
        ...prev,
        feedback:
          'Thank you for your submission, we will get back to you shortly.',
        wasSubmited: true,
        style: 'success',
      }));
      resetForm();
      
      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 3000);
    } catch (e) {
      setSubmitting(false);
      setSubmitState((prev) => ({
        ...prev,
        wasSubmited: true,
        feedback: (e?.response?.data?.error) ? e.response.data.error : 'There was an error, try again later.',
        style: 'error',
      }));

      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 5000);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      about: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Lastname is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('email is required'),
      phone: Yup.string().required('Phone is required'),
      company: Yup.string().required('Company is required'),
      position: Yup.string().required('Position is required'),
      about: Yup.string().required('Select list item is required!'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid className={styles.noPad}>
          <Row>
            <Col className={styles.col} xs={12} lg={6}>
              <FormInput
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                placeholder='First Name'
                required
              />
            </Col>
            <Col className={styles.col} xs={12} lg={6}>
              <FormInput
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                placeholder='Last Name'
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className={styles.col} xs={12} lg={6}>
              <FormInput
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='email'
                placeholder='Email'
                required
              />
            </Col>
            <Col className={styles.col} xs={12} lg={6}>
              <FormInput
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                placeholder='Phone Number'
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className={styles.col} xs={12} lg={6}>
              <FormInput
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                placeholder='Company'
                required
              />
            </Col>
            <Col className={styles.col} xs={12} lg={6}>
              <FormInput
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='text'
                placeholder='Position'
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className={styles.col} xs={12}>
              <FormInput
                name="about"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='select'
                placeholder='How did your find about us'
                options={listOptions}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className={styles.col} xs={12}>
              <FormInput
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type='textarea'
                placeholder='Message'
                height="18.8rem"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col className={styles.col} xs={12}>
              {submitState.wasSubmited && (
                <div
                  className={cx(
                    styles.feedback,
                    styles[submitState.style],
                  )}
                >
                  <span>{submitState.feedback}</span>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col
              className={styles.col}
              xsOffset={7}
              xs={5}
              smOffset={9}
              sm={3}
              lgOffset={9}
              lg={3}
              xlOffset={10}
              xl={2}
            >
              <ButtonCircle
                type="submit"
                text={formik.isSubmitting ? 'Submitting...' : 'Submit'}
                color='blue'
                disabled={formik.isSubmitting}
              />
            </Col>
          </Row>
        </Grid>
      </form>
    </div>
  );
}

export default ContactForm2;
