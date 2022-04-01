import PropTypes from 'prop-types';
import PortfolioContainer from '~baseComponents/Portfolio';
import { RichTextTypes } from '~baseComponents/RichText';
import { ImageType, AudioType } from '~shared';

const PortfolioSection = ({ hero }) => {
  return <PortfolioContainer content={hero.content} />;
};

export default PortfolioSection;

PortfolioSection.propTypes = {
  hero: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      label: PropTypes.string,
      sysId: PropTypes.string,
      companyLogo: ImageType,
      companyCareersPage: PropTypes.string,
      companyName: PropTypes.string,
      companyWebsite: PropTypes.string,
      testimonials: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string,
          authorPhoto: ImageType,
          showOnRightSide: PropTypes.bool,
          testimonial: RichTextTypes,
          title: PropTypes.string,
          audio: AudioType,
          fullStory: RichTextTypes,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
