import React, {useRef, useEffect, useState} from 'react'
import SwiperCore, { Autoplay  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Grid, Row, Col } from 'grid'
import cx from 'classnames'
import useIsMobile from 'hooks/useIsMobile'
import SectionWrapper from 'baseComponents/SectionWrapper'
import SliderArticle from 'baseComponents/SliderArticle'
import Button from 'baseComponents/Button'
import Header from 'baseComponents/Header';
import styles from './TechnologySlider.module.scss'
import articles from 'data/articles'

// SwiperCore.use([Autoplay]);

const TechnologySlider = ({slug}) => {
  const ref = useRef()

  const initialNav = {next: true, prev: true}
  const [navState, setNavState] = useState(initialNav);
  
  useEffect(() => {
    const swiper = ref.current.swiper

    if(swiper.isBeginning) {
      setNavState({
        ...initialNav,
        currentIndex: swiper.realIndex,
        prev: false,
      })
    }
    swiper.on('slideChange', function () {
      setNavState({
        ...initialNav,
        currentIndex: swiper.realIndex,
        next: swiper.isEnd ? false : true,
        prev: swiper.isBeginning ? false: true,
      })
    })
  },[])

  const [isMobile, setIsMobile] = useState(false)

  const updateIsMobile = (isMobile) => {
    setIsMobile(isMobile)
  }

  useIsMobile(updateIsMobile)
  
  const startAutoplay = () => {
    ref.current.swiper.autoplay.start()
  }

  const stopAutoplay = () => {
    ref.current.swiper.autoplay.stop()
  }

  const slideNext = () => {
    
    ref.current.swiper.slideNext()
  }

  const slidePrev = () => {
    ref.current.swiper.slidePrev()
  }

  return (
    <SectionWrapper slug={slug} className={styles.bg}>
      <Grid  >
        <Row>
          <Col xs={12} lg={12} className={styles.sliderContainer}>
            <Header tag="h1" gradient className={styles.header}>Key Strengths</Header>
            <Swiper
              className={styles.slider}
              centeredSlides={true}
              grabCursor={true}
              lazy={true}
              loop={true}
              ref={ref}
              roundLengths={true}
              slidesPerView={'auto'}
              autoplay={{
                delay: 2750,
                disableOnInteraction: false
              }}
            >
              {articles.map((article, index) => 
                <SwiperSlide key={`slide${index}`} >
                  <SliderArticle
                    count={articles.length}
                    index={index + 1}
                    key={`article-${index}`}
                    title={article.title}
                    text={article.text}
                    caption={article.caption}
                  />
                </SwiperSlide>
              )}
            </Swiper>
            {!isMobile && 
              <div className={styles.navigation}>
                <Button className={cx(styles.btnNext, {[styles.inactive]: !navState.prev})} onClick={slidePrev} outlined icon="chevron-left"/>
                <Button className={cx(styles.btnPrev, {[styles.inactive]: !navState.next})} onClick={slideNext} outlined icon="chevron-right"/>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    </SectionWrapper>
  )
}

export default TechnologySlider
