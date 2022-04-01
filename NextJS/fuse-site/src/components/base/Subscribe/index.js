/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import jsonp from 'jsonp';
import emailValidator from 'email-validator';
import PropTypes from 'prop-types';

import styles from './Subscribe.module.scss';
import { WhiteArrowIcon } from '~baseComponents/Icons';

const Subscribe = ({ mailchimp }) => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [validating, setValidating] = useState(false);
  const [inputId, setInputId] = useState();
  const [mailchimpVariables, setMailchimpVariables] = useState({
    mailchimpSubscribeVariable: '',
    mailchimpIdVariable: '',
    mailchimpUVariable: '',
  });
  const successTimeout = useRef();
  const inputRef = useRef();

  useEffect(() => {
    setMailchimpVariables(mailchimp);
  }, [mailchimp]);

  let counter = 100;

  useEffect(() => {
    counter += 1;
    setInputId(counter);
    return () => {
      if (successTimeout.current) {
        clearTimeout(successTimeout.current);
        successTimeout.current = null;
      }
    };
  }, [counter]);

  const jsonpEndpoint = mailchimpVariables.mailchimpSubscribeVariable.replace(
    /\/post/g,
    '/post-json',
  );

  const send = () => {
    const url = `${jsonpEndpoint}?u=${
      mailchimpVariables.mailchimpUVariable
    }&id=${mailchimpVariables.mailchimpIdVariable}&EMAIL=${encodeURIComponent(
      email,
    )}`;
    return new Promise((resolve, reject) => {
      jsonp(url, { param: 'c', timeout: 3500 }, (err, data) => {
        if (err) reject(err);
        if (data) resolve(data);
      });
    });
  };

  const validate = (value) => {
    if (!value) {
      setError('Email address is required.');
      setValidating(true);
      return false;
    }
    if (!emailValidator.validate(value)) {
      setError('This is not a valid email address.');
      setValidating(true);
      return false;
    }
    setError('');
    return true;
  };

  const handleEmailChange = (event) => {
    const value = event.target.value.trim();
    setEmail(value);
    if (validating) {
      validate(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = validate(email);
    if (!valid) {
      inputRef.current.focus();
      return;
    }

    setSending(true);
    try {
      const resp = await send();
      setEmail('');
      if (resp.result === 'error') {
        setSuccess('This email was already subscribed.');
      } else {
        setSuccess('Thank you for subscribing.');
      }
      successTimeout.current = setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (err) {
      setError('Error. Please try again.');
      inputRef.current.focus();
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            id={`mailchimp-input-${inputId}`}
            ref={inputRef}
            placeholder="Email"
            className={cx(styles.subscribeInput, {
              [styles.subscribeInputWithError]: !!error,
            })}
            type="text"
            value={email}
            disabled={sending}
            onChange={handleEmailChange}
          />
          <span onClick={handleSubmit}>
            <WhiteArrowIcon />
          </span>
        </div>
      </form>
      <div className={cx(styles.message, styles.messageError)}>{error}</div>
      <div className={cx(styles.message, styles.messageSuccess)}>{success}</div>
    </>
  );
};

Subscribe.propTypes = {
  mailchimp: PropTypes.shape({
    mailchimpSubscribeVariable: PropTypes.string,
    mailchimpUVariable: PropTypes.string,
    mailchimpIdVariable: PropTypes.string,
  }).isRequired,
};

export default Subscribe;
