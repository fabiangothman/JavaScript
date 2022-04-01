/* eslint-disable jsx-a11y/media-has-caption */
import cx from 'classnames';
import _get from 'lodash/get';
import Image from 'baseComponents/CmsImage';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import styles from './RichText.module.scss';

function addHttps(url) {
  if (!/^(?:f|ht)tps?:\/\//.test(url)) {
    return `https:${url}`;
  }
  return url;
}

function embedAsset(node, assetStyle = '') {
  const { title, description, file } = node.data.target.fields;
  const mimeType = file.contentType;
  const mimeGroup = mimeType.split('/')[0];
  switch (mimeGroup) {
    case 'video':
      return (
        <span className={cx(assetStyle, styles.component)}>
          <video className={styles.video}>
            <source src={addHttps(file.url)} type="video/mp4" />
          </video>
          {description && <p className={styles.subtitle}>{description}</p>}
        </span>
      );
    case 'image':
      return (
        <div className={cx(assetStyle, styles.component)}>
          <Image
            src={addHttps(file.url)}
            alt={title}
            layout="responsive"
            width={file.details.image.width}
            height={file.details.image.height}
          />
          {description && <p className={styles.subtitle}>{description}</p>}
        </div>
      );
    case 'application':
      return (
        <a alt={description} href={file.url}>
          {title || file.details.fileName}
        </a>
      );
    default:
      return null;
  }
}

const BlockEntry = ({ node, ...props }) => {
  const images = _get(node, 'data.target.fields.images', []);
  if (images.length) {
    return (
      <div {...props}>
        {images.map((image, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index}>
              <Image
                objectFit="cover"
                src={addHttps(image.fields.file.url)}
                alt={image.fields.title}
                layout="responsive"
                width={image.fields.file.details.image.width}
                height={image.fields.file.details.image.height}
              />
            </span>
          );
        })}
      </div>
    );
  }
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(node.nodeType, 'type not implemented at Rich Text component');
  }
  return null;
};

const RichText = ({
  content,
  className,
  h1Style,
  pStyle,
  h2Style,
  h3Style,
  h4Style,
  h5Style,
  h6Style,
  aStyle,
  hrStyle,
  headingStyle,
  blockquoteStyle,
  imageStyle,
  blockEntryStyle,
}) => {
  const style = cx(className);

  const options = {
    renderNode: {
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={blockquoteStyle}>{children}</blockquote>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={pStyle}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={h1Style || headingStyle}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={h2Style || headingStyle}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={h3Style || headingStyle}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={h4Style || headingStyle}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={h5Style || headingStyle}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={h6Style || headingStyle}>{children}</h6>
      ),
      [BLOCKS.HR]: () => <hr className={hrStyle} />,
      [INLINES.HYPERLINK]: (node, children) => (
        <Link href={node.data.uri} passHref>
          <a className={aStyle} href="...">
            {children}
          </a>
        </Link>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <BlockEntry node={node} className={blockEntryStyle} />
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => embedAsset(node, imageStyle),
    },
    renderText: (text) => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [
          ...children,
          // eslint-disable-next-line react/no-array-index-key
          index > 0 && <br key={`br-${index}`} />,
          textSegment,
        ];
      }, []);
    },
  };

  return (
    content && (
      <div className={style}>{documentToReactComponents(content, options)}</div>
    )
  );
};

export default RichText;
