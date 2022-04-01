import PropTypes from 'prop-types';
import { Col, Grid, Row } from '~grid';
import styles from './HomeHero.module.scss';
import { LogoIcon } from '~baseComponents/Icons';
import AnchorWithRedBars from '~baseComponents/AnchorWithRedBars';
import HomeHeroBars from '~baseComponents/Icons/HomeHeroBars';

const HomePageHero = ({ title, description }) => {
  return (
    <section className={styles.hero}>
      <Grid>
        <Row className="no-pad">
          <Col
            xs={12}
            lg={6}
            lgOffset={1}
            lgLast
            className={styles.titleColumn}
          >
            <HomeHeroBars className={styles.bars} />
            <h2 className={styles.title}>{title}</h2>
          </Col>
          <Col xs={12} lg={4} lgOffset={1}>
            <LogoIcon className={styles.logo} />
            <div className={styles.description}>{description}</div>
            <AnchorWithRedBars
              className={styles.ctaButton}
              text="View Portfolio"
              anchorLink="/portfolio"
            />
          </Col>
        </Row>
      </Grid>
    </section>
  );
};

HomePageHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HomePageHero;
