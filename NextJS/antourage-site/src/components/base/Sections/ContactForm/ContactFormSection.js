import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Stain1, Stain2 } from 'components/icons';
import { Col, Grid, Row } from '~grid';
import * as styles from './ContactFormSection.module.scss';
import Button from '~baseComponents/Button';
import { contactUsFormSchema } from '~baseComponents/Contact/formSchemas';

export default function ContactFormSection({
  formId,
  className,
  baseColors,
  blobsColor,
  title,
  policy,
  ...props
}) {
  // console.log(`ContactFormSection props: `, props);
  // return null;
  const [submitState, setSubmitState] = useState({
    wasSubmited: false,
    feedback: 'Thank you for your submission, we will get back to you shortly.',
    style: 'success',
  });

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await axios.post('/api/contactUsForm', values);
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
        // feedback: 'There was an error, try again later.',
        feedback: e.response.data.error,
        style: 'error',
      }));
      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 5000);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
      policy: false,
    },
    validationSchema: contactUsFormSchema,
    onSubmit: onSubmitHandler,
  });

  return (
    <div id={formId} className={cx(styles.component, className)} {...props}>
      <Stain1
        className={cx(styles.topStain, styles[blobsColor.toUpperCase()])}
      />
      <Stain2
        className={cx(styles.bottomStain, styles[blobsColor.toUpperCase()])}
      />
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className={styles.title}>
                <p>{title}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={3} lg={6}>
              <div className={styles.formContainer}>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                  <div className={styles.inputCont}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      name="name"
                      type="text"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className={styles.inputCont}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className={styles.inputCont}>
                    <textarea
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      name="message"
                      placeholder="Message"
                      required
                    />
                  </div>
                  <div className={styles.policyCont}>
                    <label htmlFor="policy">
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.policy}
                        id="policy"
                        name="policy"
                        type="checkbox"
                        required
                      />
                      <span>{policy}</span>
                    </label>
                  </div>
                  <div className={styles.buttonCont}>
                    {submitState.wasSubmited && (
                      <p
                        className={cx(
                          styles.feedback,
                          styles[submitState.style],
                        )}
                      >
                        {submitState.feedback}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className={styles.button}
                      baseColors={baseColors}
                    >
                      {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

ContactFormSection.defaultProps = {
  formId: 'formId',
  className: '',
  baseColors: '',
  blobsColor: '',
};

export const ContactFormType = PropTypes.shape({
  formId: PropTypes.string,
  className: PropTypes.string,
  baseColors: PropTypes.string,
  blobsColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  policy: PropTypes.string.isRequired,
});
ContactFormSection.propTypes = ContactFormType.isRequired;
