import PropTypes from 'prop-types';
import { formatTabs, getPageFieldsAndSettings } from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import TabPage, { TabPageSectionType } from '~baseComponents/Sections/TabPage';
// Styles
import * as styles from './Legal.module.scss';

const LegalPage = ({ settings, tabs, ...props }) => {
  // console.log(`LegalPage props: `, props);
  // console.log(`LegalPage settings: `, settings);
  // return null;
  return (
    <MainLayout headerType="fixed" headerColor="transparent" {...settings}>
      <div {...props} className={styles.container}>
        <TabPage tabs={tabs} />
      </div>
    </MainLayout>
  );
};

export default LegalPage;

LegalPage.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
  tabs: PropTypes.arrayOf(TabPageSectionType).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pageLegal',
    include: 4,
  });

  const tabs = formatTabs(data.tabs);

  return {
    props: {
      settings: data.settings,
      tabs,
    },
  };
}
