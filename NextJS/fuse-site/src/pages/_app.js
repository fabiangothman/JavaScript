import 'flexboxgrid2/flexboxgrid2.css';
import 'styles/base.scss';
import PropTypes from 'prop-types';
import NavbarMenuProvider from '~contexts/NavbarMenuProvider';
import SimpleAudioPlayerProvider from '~contexts/SimpleAudioPlayerProvider';
import ScrollProvider from '~baseComponents/ScrollProvider';

function MyApp({ Component, pageProps }) {
  return (
    <SimpleAudioPlayerProvider>
      <NavbarMenuProvider>
        <ScrollProvider>
          <Component {...pageProps} />
        </ScrollProvider>
      </NavbarMenuProvider>
    </SimpleAudioPlayerProvider>
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
