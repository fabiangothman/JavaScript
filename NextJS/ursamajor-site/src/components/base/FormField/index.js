import cx from 'classnames'
import React from 'react'

import styles from './FormField.module.scss'

const FormField = ({
  className,
  // labelClassName,
  inputClassName,
  label,
  error,
  type,
  disabled,
  onChange,
  id,
  ...rest
}) => {
  const wrapperStyle = cx(styles.formField, className)
  const inputStyle = cx(styles.input, inputClassName, { [styles.error]: error })
  const fieldId = id || null
  const htmlId = `form-field-input-${fieldId}`

  return (
    <div className={wrapperStyle}>
      {/* {label && (
        <label htmlFor={htmlId} className={cx(styles.label, labelClassName)}>
          {label}
        </label>
      )} */}
      {type === 'textarea' ? (
        <textarea
          placeholder={label}
          id={htmlId}
          rows={7}
          onChange={onChange}
          className={cx(inputStyle, styles.textarea)}
          {...rest}
        />
      ) : (
        <input
          id={htmlId}
          onChange={onChange}
          disabled={disabled}
          className={inputStyle}
          placeholder={label}
          {...rest}
        />
      )}
      <div className={cx(styles.validation)}>{error}</div>
    </div>
  )
}

export default FormField
