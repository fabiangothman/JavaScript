import PropTypes from 'prop-types';

import '../assets/fonts/sofiaPro/SofiaPro.scss';
import 'normalize.css/normalize.css';
import 'flexboxgrid2/flexboxgrid2.css';
import 'styles/base.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.defaultProps = {
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape(),
};

export default MyApp;
