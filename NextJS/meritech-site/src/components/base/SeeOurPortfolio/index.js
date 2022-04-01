import PropTypes from 'prop-types';
import {
  WhiteLogo,
  LeftArrow,
  GreenBackground,
  GreenBackgroundForDesktop,
} from 'components/icons';
import * as styles from './SeeOurPortfolio.module.scss';
import Button from '~baseComponents/Button';
import RichText, { RichTextTypes } from '~baseComponents/RichText';

export default function SeeOurPortfolio({
  callToSeeOurInternalPage,
  callToSeeOurPortfolio,
  seeOurPortfolioButtonLabel,
}) {
  return (
    <div id="see-our-portfolio" className={styles.component}>
      <div className={styles.bgMobile}>
        <GreenBackground className={styles.backgroundForMobile} />
      </div>
      <div className={styles.content}>
        <GreenBackgroundForDesktop className={styles.backgroundForDesktop} />
        <div className="container">
          <WhiteLogo className={styles.logo} />
          <RichText
            pStyle={styles.title}
            headingStyle={styles.title}
            content={callToSeeOurPortfolio}
          />

          <div className={styles.callToActionBox}>
            <p className={styles.subtitle}>{seeOurPortfolioButtonLabel}</p>
            {callToSeeOurInternalPage?.slug && (
              <Button
                aria-label="See our portfolio"
                className={styles.button}
                href={callToSeeOurInternalPage?.slug}
              >
                <LeftArrow />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

SeeOurPortfolio.propTypes = {
  callToSeeOurInternalPage: PropTypes.shape({ slug: PropTypes.string })
    .isRequired,
  callToSeeOurPortfolio: RichTextTypes.isRequired,
  seeOurPortfolioButtonLabel: PropTypes.string.isRequired,
};
