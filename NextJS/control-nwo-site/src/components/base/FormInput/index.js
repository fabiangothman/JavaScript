import React, { useState } from 'react';
import cx from 'classnames';
//  Styles
import styles from './FormInput.module.scss';


const FormInput = ({
  className,
  name = "",
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  options = null,
  height = "auto",
  value = null,
  onChange = null,
  onBlur = null,
  ...props
}) => {
  const [elemValue, setElemValue] = useState('');

  const handleInputChange = (event) => {
    setElemValue(event.target.value.trim());
  };
  
  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <div className={styles.inputWrapper}>
        {(type === "select") ? (
          <select
            name={name}
            className={styles.input}
            disabled={disabled}
            value={value ? value : elemValue}
            onChange={onChange ? onChange : handleInputChange}
            onBlur={onBlur ? onBlur : null}
            required={required}
          >
            <option value="" disabled>{placeholder}</option>
            {options && options.map((option, index) => (
              <option key={index} value={option.value}>{option.text}</option>
            ))}
          </select>
        ) : (type === "textarea") ? (
          <textarea
            name={name}
            placeholder={placeholder}
            className={styles.input}
            disabled={disabled}
            value={value ? value : elemValue}
            onChange={onChange ? onChange : handleInputChange}
            onBlur={onBlur ? onBlur : null}
            required={required}
            style={{height: height}}
          />
        ) : (
          <input
            name={name}
            placeholder={placeholder}
            className={styles.input}
            type={type}
            disabled={disabled}
            value={value ? value : elemValue}
            onChange={onChange ? onChange : handleInputChange}
            onBlur={onBlur ? onBlur : null}
            required={required}
          />
        )}
        
      </div>
    </div>
  );
}

export default FormInput;
