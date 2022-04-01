import cx from 'classnames';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';

import styles from './ContactUs.module.scss';
import { Col, Row } from '~grid';
import CustomInput from '~baseComponents/CustomInput';
import ButtonWithRedBars from '~baseComponents/ButtonWithRedBars';
import ContactUsBarsRight from '~baseComponents/Icons/ContactUsBarsRight';
import ContactUsBarsLeft from '~baseComponents/Icons/ContactUsBarsLeft';

export const contactFormSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  message: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const ContactUs = () => {
  const [submitState, setSubmitState] = useState({
    wasSubmited: false,
    feedback: 'Your message has been submitted.',
  });

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await axios.post('/api/contact', values);
      setSubmitting(false);
      setSubmitState((prev) => ({
        ...prev,
        feedback: 'Your message has been submitted.',
        wasSubmited: true,
      }));
      resetForm();
      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 2000);
    } catch (e) {
      setSubmitting(false);
      setSubmitState((prev) => ({
        ...prev,
        wasSubmited: true,
        feedback: 'There was an error.',
      }));
      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    validationSchema: contactFormSchema,
    onSubmit: onSubmitHandler,
  });
  return (
    <section id="contact-us" className={styles.wrapper}>
      <div className="container">
        <Row className="no-pad">
          <Col xs={12} lg={8} lgOffset={2} className={styles.formColumn}>
            <div className={styles.contact}>
              <div className={styles.contactMeta}>
                <p className={styles.subtitle}>CONTACT US</p>
                <h4 className={styles.title}>
                  Let’s talk about what’s next for you.
                </h4>
              </div>
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                  <Row className="no-pad">
                    <Col xs={12} lg={6}>
                      <CustomInput
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                        id="firstName"
                        name="firstName"
                        customStyle={cx(styles.input, {
                          [styles.inputWithError]:
                            formik.touched.firstName && formik.errors.firstName,
                        })}
                        type="text"
                        placeholder="First Name"
                      />
                    </Col>
                    <Col xs={12} lg={6}>
                      <CustomInput
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                        id="lastName"
                        name="lastName"
                        customStyle={cx(styles.input, {
                          [styles.inputWithError]:
                            formik.touched.lastName && formik.errors.lastName,
                        })}
                        type="text"
                        placeholder="Last Name"
                      />
                    </Col>
                  </Row>
                  <Row className="no-pad">
                    <Col xs={12} lg={12}>
                      <CustomInput
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        customStyle={cx(styles.input, {
                          [styles.inputWithError]:
                            formik.touched.email && formik.errors.email,
                        })}
                        type="text"
                        placeholder="Email"
                      />
                    </Col>
                  </Row>
                  <Row className="no-pad">
                    <Col xs={12} lg={12}>
                      <CustomInput
                        isTextarea
                        name="message"
                        id="message"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        onBlur={formik.handleBlur}
                        customStyle={cx(styles.textarea, {
                          [styles.inputWithError]:
                            formik.touched.message && formik.errors.message,
                        })}
                        type="text"
                        placeholder="Message"
                      />
                    </Col>
                  </Row>
                  <Row className={cx(styles.submitWrapper, 'no-pad end-sm')}>
                    <ButtonWithRedBars
                      disabled={!formik.isValid || formik.isSubmitting}
                      type="submit"
                      text={formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    />
                  </Row>
                </div>
                {submitState.wasSubmited && (
                  <p className={styles.feedback}>{submitState.feedback}</p>
                )}
              </form>
            </div>
            <ContactUsBarsLeft className={styles.barsLeft} />
            <ContactUsBarsRight className={styles.barsRight} />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ContactUs;
