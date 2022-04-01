import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import cx from 'classnames';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { LeftArrowBolder } from 'components/icons';
import Button from '~baseComponents/Button';
import * as styles from './SubscribeForm.module.scss';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

export const emailValidation = Yup.object({
  email: Yup.string()
    .email('Please provide a valid email address')
    .required('Please provide a valid email address'),
});

export default function SubscribeForm({ className, message }) {
  const [subscribeState, setSubscribeState] = useState({
    isSubmiting: false,
    message: '',
  });
  const handleSubmit = async (values, { resetForm }) => {
    setSubscribeState((prev) => ({
      ...prev,
      message: '',
      isSubmiting: true,
    }));

    try {
      await axios.post('/api/subscribe', values);
      setSubscribeState((prev) => ({
        ...prev,
        message: 'Thank you. You have been subscribed to our newsletter.',
        isSubmiting: false,
      }));
      resetForm();
    } catch (err) {
      setSubscribeState((prev) => ({
        ...prev,
        message: 'Sorry, there was a problem, try to subscribe later.',
        isSubmiting: false,
      }));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailValidation,
    onSubmit: handleSubmit,
  });

  return (
    <div className={cx(styles.box, 'subscribe-form', className)}>
      {!!message && (
        <RichText
          pStyle={styles.description}
          headingStyle={styles.description}
          content={message}
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <input
          placeholder="E-mail Address"
          className={styles.input}
          type="text"
          name="email"
          onChange={(e) => {
            setSubscribeState((prev) => ({
              ...prev,
              message: '',
            }));
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <div className={styles.footer}>
          <p className={styles.label}>Subscribe</p>
          <Button
            type="submit"
            disabled={subscribeState?.isSubmiting || !!formik?.errors?.email}
            aria-label="Subscribe"
            className={styles.button}
          >
            <LeftArrowBolder />
          </Button>
        </div>
      </form>
    </div>
  );
}

SubscribeForm.defaultProps = {
  className: '',
  message: null,
};

SubscribeForm.propTypes = {
  message: RichTextTypes,
  className: PropTypes.string,
};
