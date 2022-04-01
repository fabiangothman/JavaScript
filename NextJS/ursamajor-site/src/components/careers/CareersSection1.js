import { ImageWrapper } from 'baseComponents/ImageWrapper'
import cx from 'classnames'
import isEmpty from 'lodash/isEmpty'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'

import { IconLeftArrow } from '../base/Icons'
import RichText from '../base/RichText'
import { Col, Row } from '../grid'
import styles from './styles/CareersSection1.module.scss'

const CareersSection1 = ({ boldHeadline, headline, description, postingData, images }) => {
  let arrayForHoldingProjects = []
  const router = useRouter()
  const teams = [
    ...new Set(postingData.map((item) => item.categories.department || item.categories.team))
  ]
    .map((str) => (str === 'Any' ? 'All Open Positions' : str))
    .sort((a) => {
      if (a === 'All Open Positions') {
        return -1
      }
      return 0
    })

  const getPostingTitles = (name) => {
    if (name === 'All Open Positions') {
      return postingData
    } else {
      return postingData.filter((x) => (x.categories.department || x.categories.team) === name)
    }
  }

  const teamVal =
    !isEmpty(router.query) && router.query.team && teams.includes(router.query.team)
      ? router.query.team
      : teams[0]

  const projectsPerPage = 6
  const [selectedTeam, setSelectedTeam] = useState(teamVal || teams[0])
  const [filteredPosts, setFilteredPosts] = useState(postingData)
  const [postsToShow, setPostsToShow] = useState(
    getPostingTitles(selectedTeam || teams[0]).slice(0, projectsPerPage)
  )
  const ref = useRef(projectsPerPage)

  const loopWithSlice = (start, end, data) => {
    const slicedProjects = data.slice(start, end)
    arrayForHoldingProjects = arrayForHoldingProjects.concat(slicedProjects)
    setPostsToShow(arrayForHoldingProjects)
    setFilteredPosts(data)
  }

  const handleShowMoreProjects = () => {
    loopWithSlice(0, ref.current + postingData.length, filteredPosts)
    ref.current += projectsPerPage
  }

  const onChangeHandler = (e) => {
    setSelectedTeam(e.target.value)
    loopWithSlice(0, projectsPerPage, getPostingTitles(e.target.value))
  }

  return (
    <>
      <div className={styles.sectionContainer}>
        <div className="large-container-with-left-pad">
          <Row className={cx(styles.topRow)}>
            <Col xs={6} lg={6}>
              <p className={styles.sectionTitle}>Careers</p>
            </Col>
            <Col xs={6} lg={6}>
              <div className={styles.borderTop} />
            </Col>
            <Col xs={12} lg={6}>
              <div className={styles.headline}>
                <span className={styles.bold}>{boldHeadline}</span>
                <div className={styles.secondLine}>{headline}</div>
              </div>
            </Col>
            <Col className={cx(styles.employeesImagesRow, `no-pad`)} xs={12} lg={6}>
              <Row>
                <Col xs={6}>
                  <ImageWrapper
                    src={images.employeesImages[0].url}
                    alt={images.employeesImages[0].alt}
                    width={images.employeesImages[0].width}
                    height={images.employeesImages[0].height}
                  />
                </Col>
                <Col xs={6}>
                  <ImageWrapper
                    src={images.employeesImages[1].url}
                    alt={images.employeesImages[1].alt}
                    width={images.employeesImages[1].width}
                    height={images.employeesImages[1].height}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div className={styles.oppotunities}>
            <Row>
              <Col className={styles.descriptionCol} xs={12} lg={6}>
                <div className={styles.description}>
                  <RichText content={description} />
                </div>
                <Row>
                  <Col className={cx(styles.engineerImageRow)} xs={12}>
                    <ImageWrapper
                      src={images.engineerImage.url}
                      alt={images.engineerImage.alt}
                      width={images.engineerImage.width}
                      height={images.engineerImage.height}
                    />
                  </Col>
                </Row>
              </Col>
              <Col className="no-pad" xs={12} lg={6}>
                <Row>
                  <Col xs={12}>
                    <div className={styles.selectHeader}>Select team</div>
                    <div className={styles.customSelect}>
                      <select className={styles.select} onChange={onChangeHandler}>
                        {teams.map((t, i) => {
                          return (
                            <option key={i} value={t}>
                              {t}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className={styles.rolesWrapper}>
                      {teams.map((t, i) => (
                        <div
                          className={cx(styles.rolesContainer, {
                            [styles.active]: selectedTeam === t
                          })}
                          key={`team-roles-${i}`}
                        >
                          {postsToShow.map((r, x) => (
                            <Link key={`team-${t}-role-${x}`} href={`/careers/${r.id}`}>
                              <a>
                                <div className={styles.role}>
                                  <div>
                                    <div className={styles.roleName}>{r.text}</div>
                                    {r.categories.location && (
                                      <div className={styles.location}>{r.categories.location}</div>
                                    )}
                                  </div>
                                  <IconLeftArrow />
                                </div>
                              </a>
                            </Link>
                          ))}
                          <div className={styles.buttonWrapper}>
                            <button
                              type="button"
                              className={cx(styles.viewAllBtn, {
                                [styles.disable]: postsToShow.length === filteredPosts.length
                              })}
                              onClick={handleShowMoreProjects}
                            >
                              {`View All (${filteredPosts.length})`}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className={styles.imageContainer}>
            <Row>
              <Col className={styles.onlyLeftPad} xs={12} lg={6}>
                <div className={cx(styles.imageWrapper, styles.hideOnXs)}>
                  <ImageWrapper src={images.image2.url} alt={images.image2.alt} layout="fill" />
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div className={styles.imageWrapper}>
                  <ImageWrapper src={images.image1.url} alt={images.image1.alt} layout="fill" />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={6}>
                <div className={styles.imageCaption}>{images.caption}</div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

CareersSection1.propTypes = {
  boldHeadline: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  description: PropTypes.object.isRequired,
  postingData: PropTypes.array.isRequired,
  images: PropTypes.object.isRequired
}

export default CareersSection1
