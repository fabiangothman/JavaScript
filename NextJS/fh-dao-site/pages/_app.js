import PropTypes from "prop-types";
// Fonts
import "../src/fonts/tiempos/Tiempos.scss";
import "../src/fonts/akzidenz-grotesk/Akzidenz-Grotesk.scss";
import "../src/fonts/roboto/Roboto.scss";
import "../src/fonts/financier/Financier.scss";
// Styles
import "normalize.css/normalize.css";
import "flexboxgrid2/flexboxgrid2.css";
import "../styles/globals.scss";
import "../styles/base.css";

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
