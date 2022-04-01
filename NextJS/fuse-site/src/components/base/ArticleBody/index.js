import RichText, { RichTextTypes } from '~baseComponents/RichText';
import { Grid, Col, Row } from '~grid';
import CustomQuote from '~baseComponents/CustomQuote';
import styles from './ArticleBody.module.scss';

const ArticleBody = ({ content }) => {
  return (
    <article className={styles.body}>
      <Grid>
        <Row className="no-pad">
          <Col xs={12} lg={8} lgOffset={2}>
            {content.map((el, index) => {
              const isQuote = el.nodeType === 'blockquote';
              if (isQuote) {
                // eslint-disable-next-line react/no-array-index-key
                return <CustomQuote key={`article-content-${index}`} el={el} />;
              }
              return (
                <RichText
                  /* eslint-disable-next-line react/no-array-index-key */
                  key={`article-content-${index}`}
                  imageStyle={styles.images}
                  pStyle={styles.paragraph}
                  content={el}
                />
              );
            })}
          </Col>
        </Row>
      </Grid>
    </article>
  );
};

ArticleBody.propTypes = {
  content: RichTextTypes.isRequired,
};

export default ArticleBody;
