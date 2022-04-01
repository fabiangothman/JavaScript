import PropTypes from 'prop-types';
import ScrollProvider from '~baseComponents/ScrollProvider';
import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/source-sans-pro';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import 'normalize.css/normalize.css';
import 'flexboxgrid2/flexboxgrid2.css';
import 'styles/base.scss';
import 'styles/base.css';

function MyApp({ Component, pageProps }) {
  return (
    <ScrollProvider>
      <Component {...pageProps} />
    </ScrollProvider>
  );
}

MyApp.defaultProps = {
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape(),
};

export default MyApp;
