import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Image from 'next/image';
import {
  Linkedin,
  Facebook,
  Twitter,
  NarrowRightArrow,
} from 'components/icons';
import { ImageType } from 'types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import * as styles from './TeamMemberSummary.module.scss';
import { Col, Row } from '~grid';
import Button from '~baseComponents/Button';

export default function TeamMemberSummary({
  twitterUrl,
  linkedInUrl,
  facebookUrl,
  fullName,
  image,
  role,
  roleDetailed,
  currentCompanyLinks,
  enduringBrandsLinks,
  description,
  teamMembers,
}) {
  const router = useRouter();
  const [firstName, ...lastName] = fullName.split(' ');
  return (
    <div className={styles.component}>
      <div className="container">
        <div className={styles.content}>
          <Row>
            <Col xs={12} lg={2}>
              <div className={styles.browserTeam}>
                <Link href="/team">
                  <a className={styles.browserTeamTitle}>
                    <NarrowRightArrow className={styles.browserTeamIcon} />
                    Browse Team
                  </a>
                </Link>
                <ul className={cx(styles.browserTeamList)}>
                  {teamMembers.map((member) => {
                    const [memberFirstName, ...memberLastName] =
                      member.fullName.split(' ');

                    return (
                      <li
                        key={member.sysId}
                        className={cx(styles.browserTeamListItem)}
                      >
                        <Link href={`/team-members/${member.slug}`}>
                          <a
                            className={cx(styles.browserTeamLink, {
                              [styles.browserTeamLinkActived]:
                                member.slug === router?.query?.slug ?? '',
                            })}
                          >
                            {memberFirstName} {memberLastName}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col xs={12} lg={4}>
              <div className={styles.image}>
                {image?.url && (
                  <Image
                    alt={image.alt}
                    src={image.url}
                    objectFit="cover"
                    width={image.width}
                    height={image.height}
                    // layout="fill"
                  />
                )}
              </div>
            </Col>
            <Col xs={12} lg={1} />
            <Col xs={12} lg={5}>
              <div className={styles.summaryHeader}>
                <div>
                  <h2 className={styles.title}>
                    {firstName} {lastName}
                  </h2>
                  <p className={styles.role}>{roleDetailed || role}</p>
                </div>
                <div className={styles.buttons}>
                  {linkedInUrl && (
                    <Button
                      target="_blank"
                      rel="noreferrer noopener"
                      href={linkedInUrl}
                      className={styles.socialMedia}
                    >
                      <Linkedin />
                    </Button>
                  )}
                  {facebookUrl && (
                    <Button
                      target="_blank"
                      rel="noreferrer noopener"
                      href={facebookUrl}
                      className={styles.socialMedia}
                    >
                      <Facebook />
                    </Button>
                  )}
                  {twitterUrl && (
                    <Button
                      target="_blank"
                      rel="noreferrer noopener"
                      href={twitterUrl}
                      className={styles.socialMedia}
                    >
                      <Twitter />
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <RichText
                  pStyle={styles.text}
                  headingStyle={styles.text}
                  content={description}
                />
              </div>

              <Row>
                {!!currentCompanyLinks?.length && currentCompanyLinks[0].label && (
                  <Col xs={6} md={5} lg={4}>
                    <div>
                      <p className={styles.subtitle}>Current Companies</p>
                      <ul className={styles.companies}>
                        {currentCompanyLinks.map(
                          ({ label, slug, openInANewTab }, index) => {
                            return (
                              <li key={index} className={styles.companiesList}>
                                <Link href={slug}>
                                  <a
                                    target={openInANewTab ? '_blank' : '_self'}
                                    rel={
                                      openInANewTab ? 'noreferrer noopener' : ''
                                    }
                                    className={styles.link}
                                  >
                                    {label}
                                  </a>
                                </Link>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </Col>
                )}
                {!!enduringBrandsLinks?.length && enduringBrandsLinks[0].label && (
                  <Col xs={6} md={5} mdOffset={1} lg={4} lgOffset={1}>
                    <div>
                      <p className={styles.subtitle}>Enduring Brands</p>
                      <ul className={styles.companies}>
                        {enduringBrandsLinks.map(
                          ({ label, slug, openInANewTab }, index) => {
                            return (
                              <li key={index} className={styles.companiesList}>
                                <Link href={slug}>
                                  <a
                                    target={openInANewTab ? '_blank' : '_self'}
                                    rel={
                                      openInANewTab ? 'noreferrer noopener' : ''
                                    }
                                    className={styles.link}
                                  >
                                    {label}
                                  </a>
                                </Link>
                              </li>
                            );
                          },
                        )}
                      </ul>
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

TeamMemberSummary.defaultProps = {
  linkedInUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  description: null,
  currentCompanyLinks: null,
  enduringBrandsLinks: null,
  roleDetailed: null,
};

TeamMemberSummary.propTypes = {
  fullName: PropTypes.string.isRequired,
  image: ImageType.isRequired,
  role: PropTypes.string.isRequired,
  roleDetailed: PropTypes.string,
  linkedInUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  currentCompanyLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
  enduringBrandsLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),

  description: RichTextTypes,
  teamMembers: PropTypes.arrayOf().isRequired,
};
