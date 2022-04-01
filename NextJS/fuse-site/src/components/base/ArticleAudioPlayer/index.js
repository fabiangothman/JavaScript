import PropTypes from 'prop-types';
import styles from './ArticleAudioPlayer.module.scss';
import VisualizedAudioPlayer from '~baseComponents/VisualizedAudioPlayer';
import { Col, Grid, Row } from '~grid';

const ArticleAudioPlayer = ({ fileUrl }) => {
  return (
    <section className={styles.body}>
      <Grid>
        <Row>
          <Col xs={12} lg={10} lgOffset={1}>
            <VisualizedAudioPlayer
              className={styles.player}
              fileUrl={fileUrl}
            />
          </Col>
        </Row>
      </Grid>
    </section>
  );
};

ArticleAudioPlayer.propTypes = {
  fileUrl: PropTypes.string.isRequired,
};

export default ArticleAudioPlayer;
