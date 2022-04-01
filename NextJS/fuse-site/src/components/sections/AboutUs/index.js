import cx from 'classnames';
import PropTypes from 'prop-types';
import { RichTextTypes } from '~baseComponents/RichText';
import AboutUsHero from '~baseComponents/AboutUsHero';
import styles from './About.module.scss';
import Testimonials from '~baseComponents/Testimonials';
import OurTeam from '~baseComponents/OurTeam';
import { ImageType } from '~shared';

const AboutUsSection = ({ hero, testimonials, ourTeam }) => {
  return (
    <div className={cx(styles.about, 'content')}>
      <AboutUsHero content={hero.content} />
      <Testimonials content={testimonials.content} />
      <OurTeam content={ourTeam.content} />
    </div>
  );
};

export default AboutUsSection;

AboutUsSection.propTypes = {
  hero: PropTypes.arrayOf(PropTypes.shape(RichTextTypes)).isRequired,
  testimonials: PropTypes.arrayOf(PropTypes.shape(RichTextTypes)).isRequired,
  ourTeam: PropTypes.arrayOf(
    PropTypes.shape({
      linkedinUrl: PropTypes.string,
      name: PropTypes.string,
      photo: ImageType,
      role: PropTypes.string,
      sysId: PropTypes.string,
    }),
  ).isRequired,
};
