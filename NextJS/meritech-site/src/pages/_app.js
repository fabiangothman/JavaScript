import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import '@fontsource/montserrat';
import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';

import 'normalize.css/normalize.css';
import 'flexboxgrid2/flexboxgrid2.css';
import 'styles/base.scss';
import SimpleReactLightbox from 'simple-react-lightbox';
import { ThemeContextProvider } from '~hooks/useTheme';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  return (
    <ThemeContextProvider
      theme={['/', '/demo'].includes(pathname) ? 'dark' : 'light'}
    >
      <SimpleReactLightbox>
        <Component {...pageProps} />
      </SimpleReactLightbox>
    </ThemeContextProvider>
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
