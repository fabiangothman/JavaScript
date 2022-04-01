/* eslint-disable react/no-array-index-key */
import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Col, Row } from '~grid';
import styles from './AboutUsHero.module.scss';
import { AboutUsHeroLeftBars } from '~baseComponents/Icons';

const AboutUsHero = ({ content }) => {
  const removeEmptyParagraph = (element) => {
    return element.content.filter(
      (el) => el?.nodeType !== 'paragraph' || !!el?.content[0].value,
    );
  };

  return (
    <div className="container">
      <div className={styles.hero}>
        <div className={styles.blurredWrapper}>
          <AboutUsHeroLeftBars />
        </div>
        <Row className="no-pad">
          {removeEmptyParagraph(content).map((el, index) => {
            return (
              <>
                <Col
                  key={index}
                  xs={11}
                  lgOffset={1}
                  lg={8}
                  className={styles.higherColumn}
                >
                  <RichText h1Style={styles.title} content={el} />
                </Col>
              </>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

AboutUsHero.propTypes = {
  content: RichTextTypes.isRequired,
};

export default AboutUsHero;
