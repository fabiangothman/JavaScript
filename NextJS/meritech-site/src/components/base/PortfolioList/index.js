import { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PortfolioCard, {
  PortfolioCardType,
} from '~baseComponents/PortfolioCard';
import { Grid, Row, Col } from '~grid';
// Styles
import * as styles from './PortfolioList.module.scss';

export default function PortfolioContent({ portfolio }) {
  // console.log("PortfolioContent portfolio: ", portfolio);
  const [view, setView] = useState('');

  // It returns an array without repetitive categories.
  const categories = [
    ...new Set(portfolio.map(({ category }) => category).filter(Boolean)),
  ];

  const filteredPortfolio = view
    ? portfolio.filter(({ category }) => {
        if (view === 'all') {
          return true;
        }
        return category === view;
      })
    : portfolio.filter(({ featuredPortfolio }) => featuredPortfolio);

  return (
    <div className={styles.component}>
      <div className={styles.mobileBackground} />
      <div className={cx('container', styles.content)}>
        <h2 className={styles.title}>Market Leaders</h2>
        <div>
          <ul className={styles.filterWrapper}>
            {categories.map((category) => {
              return (
                <li key={category} className={styles.filterList}>
                  <button
                    type="button"
                    aria-label={`See all ${category} companies`}
                    onClick={() => {
                      setView(category);
                    }}
                    className={cx(styles.filterLink, {
                      [styles.filterLinkActived]: category === view,
                    })}
                  >
                    {category}
                  </button>
                </li>
              );
            })}

            <li className={styles.filterList}>
              <button
                type="button"
                aria-label="See all companies"
                onClick={() => {
                  setView('all');
                }}
                className={cx(styles.filterLink, {
                  [styles.filterLinkActived]: view === 'all',
                })}
              >
                All
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.grid}>
          <Grid>
            <Row>
              {filteredPortfolio.map(
                (company) =>
                  company.company &&
                  company.sysId && (
                    <Col key={company.sysId} xs={6} md={4} lg={3} xl={2}>
                      <div className={styles.gridItem}>
                        <PortfolioCard
                          className={styles.gridChild}
                          {...company}
                        />
                      </div>
                    </Col>
                  ),
              )}
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}

PortfolioContent.propTypes = {
  portfolio: PropTypes.arrayOf(PropTypes.shape(PortfolioCardType)).isRequired,
};
