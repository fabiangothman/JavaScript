import { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import axios from 'axios';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ImageType } from 'types';
import { Stain1, Stain2 } from 'components/icons';
import InputCamera from 'components/InputCamera';
import { Col, Grid, Row } from '~grid';
import * as styles from './VideoFormSection.module.scss';
import Button from '~baseComponents/Button';
import { videoFormSchema } from '~baseComponents/Contact/formSchemas';

export default function VideoFormSection({
  formId,
  className,
  baseColors,
  blobsColor,
  title,
  text,
  teamsText,
  teamsLogos,
  appId,
  policy,
  ...props
}) {
  // console.log(`VideoFormSection props: `, props);
  // return null;

  /* const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
  }); */
  const [submitState, setSubmitState] = useState({
    wasSubmited: false,
    feedback: 'Thank you for your submission, we will get back to you shortly.',
    style: 'success',
  });

  const [videoUploading, setVideoUploading] = useState(false);

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await axios.post('/api/videoForm', values);
      setSubmitting(false);
      setSubmitState((prev) => ({
        ...prev,
        feedback:
          'Thank you for your submission, we will get back to you shortly.',
        wasSubmited: true,
        style: 'success',
      }));
      resetForm();
      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 3000);
    } catch (e) {
      setSubmitting(false);
      setSubmitState((prev) => ({
        ...prev,
        wasSubmited: true,
        // feedback: 'There was an error, try again later.',
        feedback: e.response.data.error,
        style: 'error',
      }));
      setTimeout(() => {
        setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
      }, 5000);
    }
  };

  const videoUploadErrorHandler = () => {
    setSubmitState((prev) => ({
      ...prev,
      wasSubmited: true,
      feedback: 'There was an error uploading the video, try again later.',
      style: 'error',
    }));
    setTimeout(() => {
      setSubmitState((prev) => ({ ...prev, wasSubmited: false }));
    }, 3000);
  };

  const videoUploadStatusHandler = (val) => {
    setVideoUploading(val);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      socialPlatform: '',
      socialHandle: '',
      videoLink: '',
      policy: false,
    },
    validationSchema: videoFormSchema,
    onSubmit: onSubmitHandler,
  });

  const uploadVideoHandler = (link) => {
    formik.setFieldValue('videoLink', link);
  };

  return (
    <div id={formId} className={cx(styles.component, className)} {...props}>
      <Stain1
        className={cx(styles.topStain, styles[blobsColor.toUpperCase()])}
      />
      <Stain2
        className={cx(styles.bottomStain, styles[blobsColor.toUpperCase()])}
      />
      <div className={styles.content}>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className={styles.title}>
                <span>{title}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={3} lg={6}>
              <div className={styles.text}>
                <span>{text}</span>
              </div>
              {teamsText && (
                <div className={styles.teamsText}>
                  <span>{teamsText}</span>
                </div>
              )}
              {teamsLogos.length > 0 && (
                <div className={styles.contLogos}>
                  {teamsLogos.map((logo, index) => (
                    <div className={styles.contImage} key={index}>
                      <Image
                        alt={logo.alt}
                        src={logo.url}
                        width={logo.width}
                        height={logo.height}
                        objectFit="contain"
                        layout="responsive"
                        className={styles.image}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12} lgOffset={3} lg={6}>
              <div className={styles.formContainer}>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                  <div className={styles.inputCont}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      name="name"
                      type="text"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className={styles.inputCont}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className={styles.sameLine}>
                    <div className={styles.inputCont}>
                      <select
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.socialPlatform}
                        name="socialPlatform"
                        required
                      >
                        <option value="" disabled>
                          Social Platform
                        </option>
                        <option value="instagram">Instagram</option>
                        <option value="twitter">Twitter</option>
                        <option value="tiktok">TikTok</option>
                        <option value="youtube">Youtube</option>
                        <option value="twitch">Twitch</option>
                      </select>
                    </div>
                    <div className={styles.inputCont}>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.socialHandle}
                        name="socialHandle"
                        type="text"
                        placeholder="Social Handle"
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputCont}>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.videoLink}
                      name="videoLink"
                      type="text"
                      placeholder="Video Link"
                      required
                    />
                  </div>
                  <section className={styles.uploadCont}>
                    <InputCamera
                      onUpload={uploadVideoHandler}
                      onChange={videoUploadStatusHandler}
                      onError={videoUploadErrorHandler}
                      appId={appId}
                    />
                  </section>
                  <div className={styles.policyCont}>
                    <label htmlFor="policy">
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.policy}
                        id="policy"
                        name="policy"
                        type="checkbox"
                        required
                      />
                      <span>{policy}</span>
                    </label>
                  </div>
                  <div className={styles.buttonCont}>
                    {submitState.wasSubmited && (
                      <p
                        className={cx(
                          styles.feedback,
                          styles[submitState.style],
                        )}
                      >
                        {submitState.feedback}
                      </p>
                    )}
                    <Button
                      disabled={formik.isSubmitting || videoUploading}
                      type="submit"
                      className={styles.button}
                      baseColors={baseColors}
                    >
                      {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

VideoFormSection.defaultProps = {
  formId: 'formId',
  className: '',
  baseColors: '',
  blobsColor: '',
  appId: '',
  teamsText: '',
  teamsLogos: [],
};

export const VideoFormSectionType = PropTypes.shape({
  formId: PropTypes.string,
  className: PropTypes.string,
  baseColors: PropTypes.string,
  blobsColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  teamsText: PropTypes.string,
  teamsLogos: PropTypes.arrayOf(ImageType),
  appId: PropTypes.string,
  policy: PropTypes.string.isRequired,
});
VideoFormSection.propTypes = VideoFormSectionType.isRequired;
