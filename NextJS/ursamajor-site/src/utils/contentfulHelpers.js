const getImageParams = (image) => {
  if (image && image.fields && image.fields.file) {
    return {
      url: `https:${image.fields.file.url}`,
      alt: image.fields.title,
      width: image.fields.file.details?.image?.width,
      height: image.fields.file.details?.image?.height
    }
  }
  return null
}

const getAttachmentParams = (attachment) => {
  if (attachment && attachment.fields && attachment.fields.file) {
    return {
      url: `https:${attachment.fields.file.url}`,
      title: attachment.fields.title,
      contentType: attachment.fields.file.contentType
    }
  }
  return null
}

const getRefParams = (ref) => {
  if (ref) {
    return ref.map((b) => {
      return {
        ...b.fields
      }
    })
  }
}

module.exports = { getImageParams, getAttachmentParams, getRefParams }
