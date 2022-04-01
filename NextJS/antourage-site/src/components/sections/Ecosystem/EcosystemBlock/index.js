import PropTypes from 'prop-types';
import cx from 'classnames';
import { Grid, Col, Row } from '~grid';
import Button from '~baseComponents/Button';
import styles from './EcosystemBlock.module.scss';

const EcosystemItem = ({
  title,
  content,
  ctaText,
  ctaLink,
  ctaColor,
  openLinkInNewTab,
  mobileAsset,
}) => {
  return (
    <Grid className={cx(styles.wrapper, styles.current)}>
      <Row className="no-pad">
        <Col xs={12} lg={5} className={styles.column}>
          <div className={styles.blockContainer}>
            <div className={styles.still}>
              {/* eslint-disable @next/next/no-img-element */}
              {title && <img src={mobileAsset} alt="" />}
            </div>
            <div className={styles.content}>
              {title ? <h4 className={styles.title}>{title}</h4> : null}
              {content ? <p className={styles.text}>{content}</p> : null}
              {ctaLink && ctaText ? (
                <Button
                  target={openLinkInNewTab ? '_blank' : '_self'}
                  href={ctaLink}
                  baseColors={`WhiteBlack_Hover${ctaColor}White`}
                >
                  {ctaText}
                </Button>
              ) : null}
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

EcosystemItem.defaultProps = {
  title: null,
  content: null,
  ctaText: null,
  ctaLink: null,
  openLinkInNewTab: false,
};

export const EcosystemItemType = {
  title: PropTypes.string,
  content: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  ctaColor: PropTypes.string,
  openLinkInNewTab: PropTypes.bool,
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool,
  current: PropTypes.bool.isRequired,
};

EcosystemItem.propTypes = {
  ...EcosystemItemType,
};

export default EcosystemItem;
