import Image from 'next/image';
import PropTypes from 'prop-types';
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Grid, Row, Col } from '~grid';
import styles from './Home.module.scss';

const components = [
  '/CookieWarning',
  '/GoogleAnalytics',
  '/InViewport',
  '/RichText',
  '/ScrollProvider',
  '/SEO',
];

const Home = (props) => {
  return (
    <div className={styles.home}>
      <Grid>
        <Row>
          <Col xs={12}>
            <RichText content={props.structure} />
          </Col>
          <Col xs={12} md={6}>
            <h2>Dependencies</h2>
            <ul>
              {props.dependencies.map(({ fields, sys }) => {
                return (
                  <li key={sys.id}>
                    <a
                      rel="noreferrer noopener"
                      href={fields.url}
                      target="_blank"
                    >
                      {fields.title}
                    </a>
                    <span>{` ${fields.description}`}</span>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col xs={12} md={6}>
            <h2>Shared components</h2>
            <pre>
              <code className={styles.code}>
                {components.map((component) => `${component}\r\n`).join('')}
              </code>
            </pre>
          </Col>
        </Row>
      </Grid>
      <Grid className="container-fluid">
        <Row>
          <h2>Example of an image from Contentful CMS</h2>
          <Image
            src={`https:${props.thumbnail.file.url}`}
            alt=""
            width={props.thumbnail.file.details.image.width}
            height={props.thumbnail.file.details.image.height}
            quality={70}
          />
        </Row>
      </Grid>
    </div>
  );
};

export default Home;

Home.propTypes = {
  structure: RichTextTypes.isRequired,
  dependencies: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        url: PropTypes.string,
        description: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  ).isRequired,
  thumbnail: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
      details: PropTypes.shape({
        image: PropTypes.shape({
          width: PropTypes.number,
          height: PropTypes.number,
        }),
      }),
    }),
  }).isRequired,
};
