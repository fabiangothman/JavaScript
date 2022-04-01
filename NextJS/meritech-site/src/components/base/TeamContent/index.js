import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { LineDecorator } from 'components/icons';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import * as styles from './TeamContent.module.scss';
import { Col, Row } from '~grid';
import TeamCard, { TeamCardType } from '~baseComponents/TeamCard';

const MembersSummary = ({ members }) => {
  return (
    <div className={styles.membersSummary}>
      {members.map(({ fullName, role, sinceYear }, mIndex) => {
        const [firstName, ...lastName] = fullName.split(' ');
        return (
          <div key={mIndex} className={styles.membersRow}>
            <div className={styles.memberName}>
              <p className={styles.info}>{firstName}</p>
              <p className={styles.info}>{lastName.join(' ')}</p>
            </div>
            <div className={styles.membesrName}>
              <p className={styles.info}>{role}</p>
              <p className={styles.info}>
                {sinceYear}
                <LineDecorator />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function TeamContent({ content, teamMembers }) {
  if (!content) {
    return null;
  }
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <Row>
            {/* <Col xs={0} lg={3} /> */}
            <Col xs={12} lg={4} className={styles.teamDescription}>
              <RichText
                headingStyle={styles.title}
                pStyle={styles.text}
                content={content}
              />
            </Col>
            <Col xs={12} lg={8} className={styles.rightContent}>
              <Row>
                {teamMembers.map((member, index) => {
                  return (
                    <Fragment key={index}>
                      <Col xs={6} md={4} lg={3}>
                        <TeamCard {...member} />
                      </Col>
                    </Fragment>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

MembersSummary.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape(TeamCardType)).isRequired,
};

TeamContent.propTypes = {
  content: RichTextTypes.isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.shape(TeamCardType)).isRequired,
};
