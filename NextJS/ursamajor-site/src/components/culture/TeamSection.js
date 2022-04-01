import cx from 'classnames'
import Image from 'next/image'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { Col, Row } from '../grid'
import styles from './styles/TeamSection.module.scss'

const TeamSection = ({
  disciplines,
  showMax,
  teamMembers,
  teamMembersList,
  teams,
  text,
  title
}) => {
  // console.log(`TeamSection teamMembersList: `, teamMembersList);
  // return null;
  const [maxListItems, setMaxListItems] = useState(showMax)

  const handleToggleList = (open = false) => {
    if (open) setMaxListItems(teamMembersList.length)
    else setMaxListItems(showMax)
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={cx(styles.header)}>
        <Row>
          <Col lgOffset={2} lg={4}>
            <div className={styles.sectionTitle}>
              <span>{title.toUpperCase()}</span>
            </div>
          </Col>
          <Col lgOffset={1} lg={5}>
            <div className={styles.topLineDektop} />
          </Col>
        </Row>
        <Row>
          <Col lgOffset={2} lg={4}>
            <div className={styles.sectionText}>
              <span>{text}</span>
            </div>
            <div className={styles.topLineMobile} />
          </Col>
          <Col lgOffset={1} lg={5}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.textMobile}>Team Members</div>
                <div className={styles.number}>{teamMembers}</div>
                <div className={styles.textDesktop}>Team Members</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.textMobile}>Teams</div>
                <div className={styles.number}>{teams}</div>
                <div className={styles.textDesktop}>Teams</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.textMobile}>Disciplines</div>
                <div className={styles.number}>{disciplines}</div>
                <div className={styles.textDesktop}>Disciplines</div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={cx(styles.body)}>
        <Row>
          {teamMembersList.slice(0, maxListItems).map((member, index) => (
            <Col key={index} xs={6} md={4} lgOffset={index % 5 === 0 ? 2 : 0} lg={2}>
              <div className={styles.contCard}>
                <div className={styles.image}>
                  {member.image ? (
                    <Image
                      alt={member.image.alt}
                      src={member.image.url}
                      objectFit="cover"
                      layout="fill"
                    />
                  ) : (
                    <div className={styles.bearImage}>
                      <Image
                        alt="Ursa major bear icon"
                        src="/images/gradient-bear.png"
                        objectFit="contain"
                        layout="fill"
                      />
                    </div>
                  )}
                </div>
                <div className={styles.name}>{member.name}</div>
                <div className={styles.role}>{member.role}</div>
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col xsOffset={3} xs={6} lgOffset={2} lg={2}>
            <div
              className={styles.btn}
              onClick={() => handleToggleList(maxListItems < teamMembersList.length ? true : false)}
            >
              <span>{maxListItems < teamMembersList.length ? 'VIEW MORE' : 'VIEW LESS'}</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

TeamSection.propTypes = {
  disciplines: PropTypes.number.isRequired,
  showMax: PropTypes.number.isRequired,
  teamMembers: PropTypes.number.isRequired,
  teamMembersList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.object
    })
  ).isRequired,
  teams: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default TeamSection
