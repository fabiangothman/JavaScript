/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import { RichTextTypes } from '~baseComponents/RichText';

export const ImageType = PropTypes.shape({
  alt: PropTypes.string,
  contentType: PropTypes.string,
  height: PropTypes.number,
  url: PropTypes.string,
  width: PropTypes.number,
});

export const BlogPostType = {
  thumbnail: ImageType.isRequired,
  featuredPostImage: ImageType.isRequired,
  landingPageImage: ImageType,
  publishDate: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  summary: RichTextTypes,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export const BenchmarkingChartType = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bottomFootnotes: RichTextTypes,
  mainFootnotes: RichTextTypes,
  additionalFootnotes: RichTextTypes,
  dataUpdatedAt: PropTypes.string.isRequired,
};
