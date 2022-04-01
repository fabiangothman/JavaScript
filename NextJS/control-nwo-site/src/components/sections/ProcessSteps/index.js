import React from 'react';
import Image from 'baseComponents/CmsImage';
import cx from 'classnames';
import { Grid, Row, Col } from 'grid';
// Styles
import styles from './ProcessSteps.module.scss';

const ProcessSteps = ({
  className,
  ...props
}) => {
  const demoImg = require(`../../../../public/images/processSteps/demo.jpg`);
  const data = [
    {
      text: `Quis eget accumsan quam tortor semper adipiscing egestas tincidunt. Vulputate fusce quam dolor blandit est quam egestas sed nunc.`,
      image: {
        src: demoImg,
        width: 1015,
        height: 699,
        alt: `Featured step process image`
      },
    },
    {
      text: `Quis eget accumsan quam tortor semper adipiscing egestas tincidunt. Vulputate fusce quam dolor blandit est quam egestas sed nunc.`,
      image: {
        src: demoImg,
        width: 1015,
        height: 699,
        alt: `Featured step process image`
      },
    },
    {
      text: `Quis eget accumsan quam tortor semper adipiscing egestas tincidunt. Vulputate fusce quam dolor blandit est quam egestas sed nunc.`,
      image: {
        src: demoImg,
        width: 1015,
        height: 699,
        alt: `Featured step process image`
      },
    },
  ];

  return (
    <div
      {...props}
      className={cx(styles.component, className)}
    >
      <Grid>
        {data.map((item, index) => (
          <Row
            key={index}
            className={cx(
              styles.row,
              index%2 === 0 ? styles.reverseRow : null
            )}
          >
            <Col xs={12} lgOffset={1} lg={5}>
              <div className={cx(styles.contImage, styles.showOnDesktop)}>
                <Image
                  alt={item.image.alt}
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  objectFit="cover"
                  layout="responsive"
                  className={styles.image}
                />
              </div>
            </Col>
            <Col xs={12} lgOffset={1} lg={5}>
              <div className={styles.textArea}>
                <div className={styles.text}>
                  <span>{ item.text }</span>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </Grid>
    </div>
  )
}

export default ProcessSteps;
