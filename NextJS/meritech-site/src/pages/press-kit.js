import PropTypes from 'prop-types';
import { getPageFieldsAndSettings } from 'api/utils';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import PressKitContent from '~baseComponents/PressKitContent';

const PressKit = ({ settings, ...props }) => {
  return (
    <MainLayout {...settings}>
      <PressKitContent {...props} />
    </MainLayout>
  );
};

export default PressKit;

PressKit.propTypes = {
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticProps() {
  const data = await getPageFieldsAndSettings({
    content_type: 'pagePressKit',
  });

  return {
    props: {
      ...data,
    },
  };
}
