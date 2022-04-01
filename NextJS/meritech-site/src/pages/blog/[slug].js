import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { BlogPostType } from 'types';
import dynamic from 'next/dynamic';
import { getAllEntries } from 'api';
import {
  getPageFieldsAndSettings,
  getFieldsFromArray,
  getImageFields,
} from 'api/utils';
import { SRLWrapper } from 'simple-react-lightbox';
import MainLayout, { MainLayoutType } from '~layouts/MainLayout';
import BlogPostHeader from '~baseComponents/BlogPostHeader';
import { Col, Grid, Row } from '~grid';
import BlogPostContent from '~baseComponents/BlogPostContent';
import BlogPostMenuSection from '~baseComponents/BlogPostMenuSection';
import BlogPostSidebar from '~baseComponents/BlogPostSidebar';
import RelatedBlogPosts from '~baseComponents/RelatedBlogPosts';
import { RichTextTypes } from '~baseComponents/RichText';

const BlogPostShareBar = dynamic(
  () => import('~baseComponents/BlogPostShareBar'),
  { ssr: false },
);

const postsAmount = 4;

const BlogPost = ({ settings, ...props }) => {
  // console.log(`BlogPost settings: `, settings);
  // console.log(`BlogPost props: `, props);

  // Handle non-repeated post and related
  let relatedBlogPostsFiltered = props.relatedBlogPosts.filter(
    (post) => post.slug !== props.slug,
  );

  relatedBlogPostsFiltered =
    relatedBlogPostsFiltered.length > postsAmount
      ? relatedBlogPostsFiltered.slice(0, postsAmount)
      : relatedBlogPostsFiltered;

  const firstParagraph = props?.blogContent?.content.find(
    ({ nodeType }) => nodeType === 'paragraph',
  );

  const lightboxOptions = {
    settings: {
      overlayColor: '#13111266',
    },
    buttons: {
      showAutoplayButton: false,
      showCloseButton: true,
      showDownloadButton: false,
      showFullscreenButton: false,
      showNextButton: false,
      showPrevButton: false,
      showThumbnailsButton: false,
      size: '40px',
    },
    thumbnails: {
      showThumbnails: false,
    },
    caption: {
      showCaption: false,
    },
  };

  const text = _get(firstParagraph, 'content[0].value', '');

  return (
    <MainLayout
      className="white-background"
      {...settings}
      blogPostSEO={{ ...props, description: text }}
    >
      <Grid>
        <Row>
          <Col xs={12} lg={3}>
            <BlogPostSidebar message={settings.header.subscribeMessage} />
          </Col>
          <Col xs={12} lg={9}>
            <SRLWrapper options={lightboxOptions}>
              <BlogPostHeader {...props} />
              <div>
                <BlogPostMenuSection {...props} />

                <BlogPostContent {...props} />
              </div>
              <BlogPostShareBar {...props} />
            </SRLWrapper>
          </Col>
        </Row>
        <RelatedBlogPosts relatedBlogPosts={relatedBlogPostsFiltered} />
      </Grid>
    </MainLayout>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  blogContent: RichTextTypes.isRequired,
  slug: PropTypes.string.isRequired,
  relatedBlogPosts: PropTypes.arrayOf(PropTypes.shape(BlogPostType)).isRequired,
  settings: PropTypes.shape(MainLayoutType).isRequired,
};

export async function getStaticPaths() {
  const data = await getAllEntries({
    content_type: 'blogPost',
  });

  const paths = data.items.map(({ fields }) => ({
    params: { slug: fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(req) {
  const data = await getPageFieldsAndSettings({
    content_type: 'blogPost',
    'fields.slug': req.params.slug,
  });

  const allBlogPosts = await getAllEntries({
    content_type: 'blogPost',
  });

  const post = {
    ...data,
    categories: getFieldsFromArray(data?.category),
    featuredPostImage: getImageFields(data?.featuredPostImage),
    thumbnail: getImageFields(data?.thumbnail),
  };

  let relatedBlogPosts = data.relatedBlogPosts
    ? data.relatedBlogPosts.concat(allBlogPosts.items)
    : allBlogPosts.items;

  relatedBlogPosts = getFieldsFromArray(
    relatedBlogPosts.slice(0, postsAmount + 2),
  ).map((posts) => {
    return {
      ...posts,
      categories: getFieldsFromArray(posts?.category),
      featuredPostImage: getImageFields(posts?.featuredPostImage),
      thumbnail: getImageFields(posts?.thumbnail),
    };
  });

  return {
    props: {
      ...post,
      relatedBlogPosts,
    },
  };
}
