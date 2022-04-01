import { useState, useEffect } from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import {
  getFieldsFromArray,
  getImageFields,
  getPageFieldsAndSettings,
} from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import HomePageAnimation from '~baseComponents/HomePageAnimation';
import IntroAnimation from '~baseComponents/IntroAnimation';

const animationKey = 'W_ANIMATION';
const IndexPage = ({ settings, ...props }) => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    const played = window.localStorage.getItem(animationKey);
    if (played) {
      setIsAnimationCompleted(true);
      return null;
    }

    window.scrollTo(0, 0);
    body.classList.add('overflow-hidden');

    return null;
  }, []);

  const onAnimationCompleteHandler = () => {
    const body = document.querySelector('body');
    window.localStorage.setItem(animationKey, true);
    body.classList.remove('overflow-hidden');
    setIsAnimationCompleted(true);
  };

  return (
    <>
      {!isAnimationCompleted && (
        <IntroAnimation
          isAnimationCompleted={isAnimationCompleted}
          onAnimationCompleteHandler={onAnimationCompleteHandler}
        />
      )}

      <MainLayout {...settings} isAnimationCompleted={isAnimationCompleted}>
        <HomePageAnimation
          {...props}
          isAnimationCompleted={isAnimationCompleted}
        />
      </MainLayout>
    </>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageHomepage',
  });

  const portfolioHighlights = getFieldsFromArray(data?.portfolioHighlights).map(
    (portfolio) => ({
      ...portfolio,
      logo: getImageFields(portfolio?.logo),
      background: getImageFields(portfolio?.background),
      mobileBackground: getImageFields(portfolio?.mobileBackground),
    }),
  );

  const pinnedPortfolios = getFieldsFromArray(data?.pinnedPortfolios).map(
    (portfolio) => ({
      ...portfolio,
      logo: getImageFields(portfolio?.logo),
      background: getImageFields(portfolio?.background),
      mobileBackground: getImageFields(portfolio?.mobileBackground),
    }),
  );

  const numbersOfPortfolio = _get(data, 'numbersOfPortfolio', 2);

  const highlightedPortfolios = portfolioHighlights.filter(({ sysId }) => {
    return pinnedPortfolios.some((pinned) => pinned.sysId !== sysId);
  });

  return {
    props: {
      ...data,
      pinnedPortfolios,
      highlightedPortfolios,
      numbersOfPortfolio,
    },
  };
}
