import HeroBackgroundImage from 'baseComponents/HeroBackgroundImage'
import { IconBear } from 'baseComponents/Icons'
import { IconPlayer, IconPlus } from 'baseComponents/Icons'
import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import React, { useState } from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import ReactPlayer from 'react-player/lazy'

import { LinkButton } from '../base/Button'
import { Col, Row } from '../grid'
import { EngineCard } from './EnginesSection1'
import styles from './styles/EngineDetail.module.scss'

const Section2 = ({ slides }) => {
  return (
    <div className={styles.section2}>
      <div className="large-container-with-left-pad">
        <div className={styles.section2Header}>
          <h3 className={styles.section2Title}>EXPLORE OUR ENGINES</h3>
        </div>
        <Row className={styles.section2Row}>
          {slides.map((slide, index) => (
            <Col
              key={`slide-${index}`}
              className={cx(styles.slide, styles.fixCardMarginBottom, 'no-pad')}
              xs={12}
              xl={4}
            >
              <div>
                <EngineCard engine={slide} index={index} />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

const Section1 = ({ engine }) => {
  return (
    <div className={styles.section1}>
      <div className="large-container-with-left-pad">
        <Row className={cx(styles.section1Container)}>
          <Col className={cx(styles.content, 'no-pad')} xs={6}>
            <p className={styles.header}>Our Engines</p>
          </Col>
          <Col className={cx(styles.borderTopLine)} xs={6}>
            <div className="whiteBorderTopLine" />
          </Col>
          <Col className={cx(styles.content, 'no-pad')} xs={12} xl={6}>
            <div className={styles.nameWrapper}>
              <h4 className={styles.engineName}>{engine.name}</h4>
              <p className={styles.status}>{engine.status}</p>
            </div>
            <p className={styles.description}>{engine.description}</p>
            <div>
              <LinkButton
                className={styles.button}
                styleType="tertiary"
                href="/contact"
                text="Request Spec Sheet"
              />
            </div>
            <div className={cx(styles.features)}>
              <div className={cx(styles.featureImage, styles.mobileImage)}>
                <div className={styles.featureImageWrapper}>
                  <ImageWrapper
                    src={engine.engineFullHeight.url}
                    alt={engine.engineFullHeight.alt}
                    layout="fill"
                    objectFit="contain"
                  />
                  <IconBear width="36" height="24" fill={'#FC4C21'} />
                </div>
              </div>
              <p className={styles.specs}>Specifications</p>
              <Row>
                {engine.featureList.map((f, i) => (
                  <Col key={`section2-feature-${i}`} className="no-pad" xs={12}>
                    <div className={styles.section1Feature}>
                      <div className={styles.weight}>
                        <p className={cx(styles.heroFeatureTitle, styles.section1FeatureTitle)}>
                          {f.title} <span className={styles.unit}>{f.unit}</span>
                        </p>
                        {engine.subtitle && i === 0 ? (
                          <p className={styles.oxRich}>{engine.subtitle}</p>
                        ) : (
                          ''
                        )}
                      </div>
                      <p
                        className={cx(styles.heroFeatureText, {
                          [styles.featureGray]: f.title === 'Reusable'
                        })}
                      >
                        {f.featureList.join(
                          `${String.fromCharCode(160)}${String.fromCharCode(
                            160
                          )}${String.fromCharCode(160)}`
                        )}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col className="no-pad" xs={12} lg={12}>
                  <Row>
                    {engine.features.map((f, i) => (
                      <Col
                        key={`section2-feature-${i}`}
                        className={cx('no-pad', styles.borderBottom)}
                        xs={
                          i === engine.features.length - 1 && engine.features.length % 2 === 1
                            ? 12
                            : 6
                        }
                        lg={4}
                      >
                        <div className={styles.feature}>
                          <p className={styles.featureTitle}>{f.title}</p>
                          <p className={cx(styles.featureText)}>{f.description}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className="no-pad" xs={12} xl={6}>
            <div className={cx(styles.featureImage, styles.hideOnMobile)}>
              <div className={styles.featureImageWrapper}>
                <ImageWrapper
                  src={engine.engineFullHeight.url}
                  alt={engine.engineFullHeight.alt}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

const Hero = ({ engine }) => {
  return (
    <div className={styles.hero}>
      <div className="image-container">
        <HeroBackgroundImage
          backgroundMobileImage={engine.backgroundMobileImage}
          background={engine.heroImage}
        />
      </div>
      <div className="content-container">
        <div className="large-container-with-left-pad">
          <Row className={cx(styles.sectionRow)}>
            <Col className={cx(styles.content, 'no-pad')} xs={12} lg={7}>
              <div className={styles.heroName}>{engine.name}</div>
              <h2 className={styles.heroDescription}>{engine.headline}</h2>
              <div className={styles.heroFeatures}>
                <Row>
                  {engine.featureList.map((f, i) => (
                    <Col key={`section2-feature-${i}`} className="no-pad" xs={12} lg={4}>
                      <div className={styles.heroFeature}>
                        <p className={styles.heroFeatureTitle}>
                          {f.title} <span className={styles.heroUnit}>{f.unit}</span>
                        </p>
                        <p
                          className={cx(styles.heroFeatureText, {
                            [styles.limitedDescription]: i === engine.featureList.length - 1
                          })}
                        >
                          {f.featureList.join(', ')}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
            <Col className={styles.imageContainer} xs={12} lg={5}>
              <div className={styles.heroImage}>
                <ImageWrapper
                  objectFit="cover"
                  src={engine.engineFullHeight.url}
                  alt={engine.engineFullHeight.alt}
                  layout="fill"
                />
              </div>
              <div className={styles.mobileIconBear}>
                <IconBear width="36" height="24" fill={'#fff'} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

const Video = ({ featuredImage }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlayHandler = () => {
    setIsPlaying(true)
  }

  const onEndedVideo = () => {
    setIsPlaying(false)
  }

  return (
    <div className="large-container-with-left-pad">
      <div className={styles.fullImage}>
        <div className={styles.smallerContainer}>
          {featuredImage.contentType.includes('video') ? (
            <div className={styles.videoWrapper}>
              <div className={cx(styles.buttonArea, { [styles.fadeOutButton]: isPlaying })}>
                <button type="button" onClick={onPlayHandler}>
                  <IconPlayer />
                </button>
              </div>
              <ReactPlayer
                onEnded={onEndedVideo}
                playing={isPlaying}
                url={featuredImage.url}
                title={featuredImage.title}
              />
            </div>
          ) : (
            <span>
              <ImageWrapper src={featuredImage.url} alt={featuredImage.alt} layout="fill" />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const GalleryItem = (() => {
  class Target extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        openedIndex: -1
      }
    }
    handleClickOutside() {
      this.setState({
        openedIndex: -1
      })
    }

    onExpandImageHandler(index) {
      this.setState({
        openedIndex: index
      })
    }

    render() {
      const isExpanded = this.props.index === this.state.openedIndex

      return (
        <>
          {isExpanded && (
            <div className={cx(styles.modal)}>
              <ImageWrapper
                src={this.props.image.url}
                alt={this.props.image.alt}
                width={this.props.image.width}
                height={this.props.image.height}
                objectFit="cover"
              />
            </div>
          )}
          <div className={cx(styles.imageContainer)}>
            <button
              onClick={() => this.onExpandImageHandler(isExpanded ? -1 : this.props.index)}
              className={styles.imageClickArea}
            >
              <ImageWrapper
                src={this.props.image.url}
                alt={this.props.image.alt}
                layout="fill"
                objectFit="cover"
              />
              <div className={cx(styles.imageButtonContent)}>
                <div />
                <div className={styles.expandImageIcon}>
                  <IconPlus />
                </div>
                <p>Expand</p>
              </div>
            </button>
          </div>
        </>
      )
    }
  }

  return enhanceWithClickOutside(Target)
})()

const Gallery = ({ gallery }) => {
  return (
    <div className="large-container-with-left-pad">
      <div className={styles.gallery}>
        <div className={styles.smallerContainer}>
          <div className={styles.galleryWrapper}>
            <Row>
              {gallery.slice(1, 5).map((image, index) => {
                return (
                  <Col key={index} className={styles.galleryImage} xs={6} sm={3}>
                    <GalleryItem index={index} image={image} />
                  </Col>
                )
              })}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

const EngineDetail = (props) => {
  const { engine, featuredImage, gallery } = props
  return (
    <div className={styles.engineDetailPage}>
      <Hero engine={engine} />
      <Section1 engine={engine} />
      <Video featuredImage={featuredImage} />
      <Gallery gallery={gallery} />
      <Section2 slides={engine.slides} />
    </div>
  )
}

export default EngineDetail
