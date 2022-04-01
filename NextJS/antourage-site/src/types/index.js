/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

export const ImageType = PropTypes.shape({
  alt: PropTypes.string,
  contentType: PropTypes.string,
  height: PropTypes.number,
  url: PropTypes.string,
  width: PropTypes.number,
});

export const LinkType = PropTypes.shape({
  externalUrl: PropTypes.string,
  internalPage: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  openInANewTab: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  sysId: PropTypes.string,
});

export const FileType = PropTypes.shape({
  alt: PropTypes.string,
  contentType: PropTypes.string,
  url: PropTypes.string,
});
