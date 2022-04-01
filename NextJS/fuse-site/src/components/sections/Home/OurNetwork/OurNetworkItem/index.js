import PropTypes from 'prop-types';
import cx from 'classnames';
import { Grid, Col, Row } from '~grid';
import styles from './OurNetworkItem.module.scss';
import SimpleAudioPlayer from '~baseComponents/SimpleAudioPlayer';
import OurNetworkBars from '~baseComponents/Icons/OurNetworkBars';
import MicrophonePaused from '~assets/icons/microphone_paused.svg';
import MicrophonePlaying from '~assets/icons/microphone_playing.svg';

const OurNetworkItem = ({
  title,
  subtitle,
  personsName,
  personsCompanyName,
  audioFile,
  first,
  last,
  current,
}) => {
  return (
    <Grid
      className={cx(styles.wrapper, {
        [styles.first]: first,
        [styles.current]: current,
      })}
    >
      <Row className="no-pad">
        <Col xs={12} lg={7} className={styles.column}>
          {last && <OurNetworkBars className={styles.bars} />}
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.content}>
            <h2 className={styles.title}>{title}</h2>
            <SimpleAudioPlayer
              className={styles.details}
              audioUrl={
                audioFile?.fields?.file?.url
                  ? `https:${audioFile.fields.file.url}`
                  : null
              }
            >
              {({ playing }) => (
                <>
                  <span className={styles.audioPlayer}>
                    {!playing && (
                      <img
                        src={MicrophonePaused.src}
                        alt=""
                        width="13"
                        height="18"
                      />
                    )}
                    {playing && (
                      <img
                        src={MicrophonePlaying.src}
                        alt=""
                        width="13"
                        height="18"
                      />
                    )}
                  </span>
                  {personsName} | {personsCompanyName}
                </>
              )}
            </SimpleAudioPlayer>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

OurNetworkItem.defaultProps = {
  audioFile: null,
};

export const OurNetworkItemType = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  personsName: PropTypes.string.isRequired,
  audioFile: PropTypes.shape({}),
  personsCompanyName: PropTypes.string.isRequired,
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  current: PropTypes.bool.isRequired,
};

OurNetworkItem.propTypes = {
  ...OurNetworkItemType,
};

export default OurNetworkItem;
