import React from 'react'

function addSize (name, val, classNames) {
  if (val) {
    if (val === true) {
      classNames.push(`col-${name}`)
    } else {
      classNames.push(`col-${name}-${val}`)
    }
  }
}

function addOffset (name, val, classNames) {
  if (val) {
    classNames.push(`col-${name}-offset-${val}`)
  }
}

function addFirst (name, val, classNames) {
  if (val) {
    classNames.push(`first-${name}`)
  }
}

function addLast (name, val, classNames) {
  if (val) {
    classNames.push(`last-${name}`)
  }
}

const Col = ({
                  tagName,
                  xs, sm, md, lg, xl,
                  xsOffset, smOffset, mdOffset, lgOffset, xlOffset,
                  xsFirst, smFirst, mdFirst, lgFirst, xlFirst,
                  xsLast, smLast, mdLast, lgLast, xlLast,
                  className, children }) => {
  const classNames = []

  const Tag = tagName || 'div'

  if (className) {
    classNames.push(className)
  }

  addSize('xs', xs, classNames)
  addSize('sm', sm, classNames)
  addSize('md', md, classNames)
  addSize('lg', lg, classNames)
  addSize('xl', xl, classNames)
  addOffset('xs', xsOffset, classNames)
  addOffset('sm', smOffset, classNames)
  addOffset('md', mdOffset, classNames)
  addOffset('lg', lgOffset, classNames)
  addOffset('xl', xlOffset, classNames)
  addFirst('xs', xsFirst, classNames)
  addFirst('sm', smFirst, classNames)
  addFirst('md', mdFirst, classNames)
  addFirst('lg', lgFirst, classNames)
  addFirst('xl', xlFirst, classNames)
  addLast('xs', xsLast, classNames)
  addLast('sm', smLast, classNames)
  addLast('md', mdLast, classNames)
  addLast('lg', lgLast, classNames)
  addLast('xl', xlLast, classNames)

  return <Tag className={classNames.join(' ')}>{children}</Tag>
}

export default Col
