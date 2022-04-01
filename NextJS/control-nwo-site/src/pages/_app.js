import { AnimatePresence } from 'framer-motion'
import '../assets/fonts/beirut/BeirutText.scss'
import '../assets/fonts/montserrat/Montserrat.scss'
import '../assets/fonts/sourceSansPro/SourceSansPro.scss'
import 'flexboxgrid2/flexboxgrid2.css'
import 'styles/base.scss'
import 'swiper/swiper.scss'

const App = ({ Component, pageProps }) => {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Component {...pageProps} />
    </AnimatePresence>
  )
}

export default App
