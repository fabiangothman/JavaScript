import React, {useRef, useEffect, useState} from 'react'
import SwiperCore, { Autoplay  } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import cx from 'classnames'
import SectionWrapper from 'baseComponents/SectionWrapper'
import Button from 'baseComponents/Button'
import { Grid, Row, Col } from 'grid'
import Post from 'baseComponents/Post'
import styles from './Blog.module.scss'
import posts from 'data/blog'
import useIsMobile from 'hooks/useIsMobile'

// SwiperCore.use([Autoplay]);

const Blog = ({slug}) => {
  const ref = useRef()

  const initialNav = {next: true, prev: true}
  const [navState, setNavState] = useState(initialNav);
  
  useEffect(() => {
    const swiper = ref.current.swiper

    setNavState({
      ...initialNav,
      currentIndex: swiper.realIndex,
      offsetTop: imgRef.current.parentElement.clientHeight / 2,
      prev: false,
    })

    if(swiper.isBeginning) {
      setNavState({
        ...initialNav,
        currentIndex: swiper.realIndex,
        offsetTop: imgRef.current.parentElement.clientHeight / 2,
        prev: false,
      })
    }
    swiper.on('slideChange', function () {
      setNavState({
        ...initialNav,
        currentIndex: swiper.realIndex,
        offsetTop: imgRef.current.parentElement.clientHeight / 2,
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

  const imgRef= useRef(null)

  return (
    <SectionWrapper slug={slug} className={styles.bg}>
      <Grid fluid className={styles.blog}>
        <Row>
          <Col xs={12} lg={12} className={styles.sliderContainer}>
            <Swiper
              centeredSlides={true}
              className={styles.sliderContainer}
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
              {posts.map((post, index) => 
                <SwiperSlide key={`slide${index}`} >
                  <Post
                    ref={imgRef}
                    count={posts.length}
                    index={index + 1}
                    height={post.imageHeight}
                    image={post.image}
                    key={`post-${index}`}
                    title={post.title}
                    url={post.url}
                    width={post.imageWidth}
                  />
                </SwiperSlide>
              )}
            </Swiper>
            <div className={styles.navigation} style={{top: isMobile ? `${navState.offsetTop - 30}px` : 'auto'}}>
              {<Button className={cx(styles.btnNext, {[styles.inactive]: !navState.prev}, {[styles.noBorder]: isMobile})} onClick={slidePrev} outlined icon="chevron-left"/>}
              {<Button className={cx(styles.btnPrev, {[styles.inactive]: !navState.next}, {[styles.noBorder]: isMobile})} onClick={slideNext} outlined icon="chevron-right"/>}
            </div>
          </Col>
        </Row>
      </Grid>
    </SectionWrapper>
  )
}

export default Blog
