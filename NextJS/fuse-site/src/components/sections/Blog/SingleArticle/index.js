import PropTypes from 'prop-types';
import { RichTextTypes } from '~baseComponents/RichText';
import ArticleBody from '~baseComponents/ArticleBody';
import ArticleHero from '~baseComponents/ArticleHero';
import NextArticle from '~baseComponents/NextArticle';
import ArticleAudioPlayer from '~baseComponents/ArticleAudioPlayer';

const SingleArticleSection = ({
  author,
  body,
  title,
  category,
  postedOn,
  nextArticle,
  interviewAudio,
}) => {
  return (
    <div>
      <ArticleHero
        title={title}
        postedOn={postedOn}
        author={author}
        category={category}
      />
      {interviewAudio?.fields?.file?.url && (
        <ArticleAudioPlayer fileUrl={interviewAudio?.fields?.file?.url} />
      )}
      <ArticleBody content={body.content} />
      {nextArticle?.fields && (
        <NextArticle
          title={nextArticle.fields.title}
          category={nextArticle.fields.category}
          slug={nextArticle.fields.slug}
        />
      )}
    </div>
  );
};

SingleArticleSection.defaultProps = {
  interviewAudio: null,
};

SingleArticleSection.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.arrayOf(PropTypes.shape(RichTextTypes)).isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  postedOn: PropTypes.string.isRequired,
  nextArticle: RichTextTypes.isRequired,
  interviewAudio: PropTypes.shape({
    fields: PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  }),
};

export default SingleArticleSection;
