import React, { forwardRef } from 'react'
import cx from 'classnames'

function addStyle (style, name, val, classNames) {
  if (val) {
    classNames.push(`${style}-${name}`)
  }

  return null
}

export default forwardRef(({ children, reverse, className, tagName, style,
                  aroundXs, aroundSm, aroundMd, aroundLg, aroundXl,
                  betweenXs, betweenSm, betweenMd, betweenLg, betweenXl,
                  middleXs, middleSm, middleMd, middleLg, middleXl,
                  startXs, startSm, startMd, startLg, startXl,
                  centerXs, centerSm, centerMd, centerLg, centerXl,
                }, ref) => {
  const classNames = []

  const Tag = tagName || 'div'

  addStyle('around', 'xs', aroundXs, classNames)
  addStyle('around', 'sm', aroundSm, classNames)
  addStyle('around', 'md', aroundMd, classNames)
  addStyle('around', 'lg', aroundLg, classNames)
  addStyle('around', 'xl', aroundXl, classNames)

  addStyle('between', 'xs', betweenXs, classNames)
  addStyle('between', 'sm', betweenSm, classNames)
  addStyle('between', 'md', betweenMd, classNames)
  addStyle('between', 'lg', betweenLg, classNames)
  addStyle('between', 'xl', betweenXl, classNames)

  addStyle('middle', 'xs', middleXs, classNames)
  addStyle('middle', 'sm', middleSm, classNames)
  addStyle('middle', 'md', middleMd, classNames)
  addStyle('middle', 'lg', middleLg, classNames)
  addStyle('middle', 'xl', middleXl, classNames)

  addStyle('center', 'xs', centerXs, classNames)
  addStyle('center', 'sm', centerSm, classNames)
  addStyle('center', 'md', centerMd, classNames)
  addStyle('center', 'lg', centerLg, classNames)
  addStyle('center', 'xl', centerXl, classNames)

  addStyle('start', 'xs', startXs, classNames)
  addStyle('start', 'sm', startSm, classNames)
  addStyle('start', 'md', startMd, classNames)
  addStyle('start', 'lg', startLg, classNames)
  addStyle('start', 'xl', startXl, classNames)

  const allClassNames = cx('row', className, { 'reverse': reverse}, classNames)

  return <Tag style={style} ref={ref} className={allClassNames}>{children}</Tag>
})
