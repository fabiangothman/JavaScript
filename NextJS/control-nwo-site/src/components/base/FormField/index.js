import React from 'react'
import cx from 'classnames'
import { useComponentId } from 'hooks/useComponentId'
import styles from './FormField.module.scss'

const FormField = ({ className, labelClassName, inputClassName, label, touched, error ,type,  ...rest }) => {
  const wrapperStyle = cx(styles.wrapper, className)
  const inputStyle = cx(styles.input, inputClassName)
  const fieldId = useComponentId()
  const htmlId = `form-field-input-${fieldId}`
 
  return (
    <div className={wrapperStyle}>
      {type === 'textarea' ?
        <textarea id={htmlId} className={inputStyle} {...rest} />
        :
        <input id={htmlId} className={inputStyle} {...rest} />
      }
    </div>
  )
}

export default FormField
