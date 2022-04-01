/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  MediumIcon,
} from '~baseComponents/Icons';
import { RichTextTypes } from '~baseComponents/RichText';

export const ImageType = {
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};

export const AudioType = {
  url: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export const SocialIcons = {
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  linkedin: <LinkedinIcon />,
  medium: <MediumIcon />,
};

export const CompanyType = {
  category: PropTypes.string,
  label: PropTypes.string,
  sysId: PropTypes.string,
  companyLogo: ImageType,
  altPhotoInner: ImageType,
  altPhotoOuter: ImageType,
  companyCareersPage: PropTypes.string,
  companyName: PropTypes.string,
  companyWebsite: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      linkToFullStory: PropTypes.string,
      author: PropTypes.string,
      authorPhoto: ImageType,
      testimonial: RichTextTypes,
      title: PropTypes.string,
      audio: AudioType,
      fullStory: RichTextTypes,
    }),
  ).isRequired,
};
