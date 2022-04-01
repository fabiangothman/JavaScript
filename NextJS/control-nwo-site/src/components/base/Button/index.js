import React, { forwardRef } from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'
import dot from 'assets/images/icons/dot.svg'
import arrowRight from 'assets/images/icons/arrow-right.svg'
import chevronLeft from 'assets/images/icons/chevron-left.svg'
import chevronRight from 'assets/images/icons/chevron-right.svg'

const Button = forwardRef(({ tag = 'a', color = 'black', rounded = false, outlined = false, icon, className, children, ...rest }, ref) => {
  let iconImage = null
  let reversed = false
  let circled = false
  switch (icon) {
    case 'dot':
      iconImage = dot
      break;
    case 'arrow-right':
      iconImage = arrowRight
      reversed = true
      break;
    case 'chevron-left':
      iconImage = chevronLeft
      circled = true
      break;
    case 'chevron-right':
      iconImage = chevronRight
      circled = true
      break;
    default:
      break;
  }

  let colorClass = null
  switch (color) {
    case 'black':
    default:
      colorClass = styles.colorBlack
      break;
    case 'blue':
      colorClass = styles.colorBlue
      break;
  }

  const elementClass = cx(
    styles.button,
    colorClass,
    className,
    {[styles.outlined]: outlined},
    {[styles.rounded]: rounded},
    {[styles.reversed]: reversed},
    {[styles.circled]: circled})

  const Tag = tag
  
  return (
    <Tag className={elementClass} {...rest} ref={ref}>
      <span className={styles.labelWrapper}>
        {iconImage && <img className={styles.icon} alt="" src={iconImage} />}
        <span className={styles.innerWrapper}>
          {children}
        </span>
      </span>
    </Tag>
  )
})

export default Button
