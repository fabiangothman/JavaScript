import PropTypes from 'prop-types';
import HomePageHero from '~sections/Home/HomeHero';
import ContactUs from '~baseComponents/ContactUs';
import MoreIsMore from './MoreIsMore';
import OurNetwork from '~sections/Home/OurNetwork';
import { RichTextTypes } from '~baseComponents/RichText';

const HomeSection = ({ hero, moreIsMore, ourNetwork }) => {
  return (
    <div>
      <HomePageHero title={hero.title} description={hero.description} />
      <OurNetwork ourNetwork={ourNetwork} />
      <MoreIsMore
        content={moreIsMore.content}
        wordsToReplace={moreIsMore.wordsToReplace}
      />
      <ContactUs />
    </div>
  );
};

HomeSection.defaultProps = {
  ourNetwork: null,
};

HomeSection.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  ourNetwork: PropTypes.arrayOf(PropTypes.shape()),
  moreIsMore: PropTypes.shape({
    content: RichTextTypes,
    wordsToReplace: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default HomeSection;
