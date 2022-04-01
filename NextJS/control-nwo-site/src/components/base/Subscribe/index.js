import React, { useState } from 'react';
import cx from 'classnames';
import { RightArrow } from 'components/icons';
//  Styles
import styles from './Subscribe.module.scss';


const Subscribe = ({
  className,
  width = "20px",
  padding = "24px",
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value.trim();
    setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
  };
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <input
            style={{padding: padding}}
            placeholder="Email"
            className={styles.subscribeInput}
            type="email"
            value={email}
            disabled={sending}
            onChange={handleEmailChange}
          />
          <button
            style={{padding: padding}}
            type='submit'
            className={styles.button}
          >
            <RightArrow width={width} height="100%" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Subscribe;
