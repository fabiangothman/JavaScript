/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import { useState, useCallback, useEffect, useContext } from 'react';
/* import Image from 'next/image'; */
import { groupBy } from 'lodash';
import { RichTextTypes } from '~baseComponents/RichText';
import { Row } from '~grid';
import { ImageType, AudioType } from '~shared';
import useIsMobile from '~hooks/useIsMobile';
import styles from './Portfolio.module.scss';
import PortfolioSidebar from '~baseComponents/PortfolioSidebar';
import PortfolioSidebarMobile from '~baseComponents/PortfolioSidebarMobile';
import { SimpleAudioPlayerContext } from '~contexts/SimpleAudioPlayerProvider';
import CompanyStory from '~baseComponents/CompanyStory';

const PortfolioContainer = ({ content }) => {
  const [groupedContentByCategory, setGroupedContentByCategory] = useState({});
  const [filteredContentByCategory, setFilteredContentByCategory] = useState(
    [],
  );
  const [currentGrid, setCurrentGrid] = useState([]);
  const audioPlayer = useContext(SimpleAudioPlayerContext);

  const isMobile = useIsMobile();

  const firstCategoryToAppear = 'All';

  const onSelectCategoryAtMenu = (category) => {
    setFilteredContentByCategory(groupedContentByCategory[category]);
  };

  useEffect(() => {
    setGroupedContentByCategory({
      ...groupBy(content, 'category'),
      All: content,
    });
  }, [content]);

  useEffect(() => {
    setFilteredContentByCategory(
      groupedContentByCategory[firstCategoryToAppear],
    );
  }, [groupedContentByCategory]);

  const handleStoryCardPosition = useCallback(() => {
    const positionOptions = [
      styles.storiesWrapperAtMid,
      styles.storiesWrapperAtEnd,
    ];
    const grid = [];
    for (let j = 0; j <= content.length - 1; j++) {
      for (let i = 0; i <= positionOptions.length - 1; i++) {
        grid.push(positionOptions[i]);
      }
    }
    setCurrentGrid(grid);
  }, [content.length]);

  const handleStoriesRender = () => {
    let indexCounter = 0;
    return (
      <>
        {filteredContentByCategory?.map((item, index) => {
          const currentIndex = indexCounter;
          if (item.testimonials && item.testimonials.length) {
            indexCounter += item.testimonials.length;
          }
          return (
            <CompanyStory
              className={index === 0 && 'firstChild'}
              startIndex={currentIndex}
              selectedCompany={item}
              currentGrid={currentGrid[currentIndex]}
            />
          );
        })}
      </>
    );
  };

  useEffect(() => {
    handleStoryCardPosition();
  }, [handleStoryCardPosition]);

  return (
    <div className={styles.portfolio}>
      <div className="container-fluid">
        <Row className="no-pad">
          <div className={styles.portfolioSidebarWrapper}>
            {isMobile ? (
              <PortfolioSidebarMobile
                content={content}
                setSelectedCategory={(category) =>
                  onSelectCategoryAtMenu(category)
                }
                resetCurrentAudio={() => audioPlayer.actions.stopAudio()}
              />
            ) : (
              <PortfolioSidebar
                content={content}
                setSelectedCategory={(category) =>
                  onSelectCategoryAtMenu(category)
                }
                resetCurrentAudio={() => audioPlayer.actions.stopAudio()}
              />
            )}
          </div>
          {handleStoriesRender()}
        </Row>
      </div>
    </div>
  );
};

export const PortfolioContainerTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      label: PropTypes.string,
      sysId: PropTypes.string,
      companyLogo: ImageType,
      companyCareersPage: PropTypes.string,
      companyName: PropTypes.string,
      companyWebsite: PropTypes.string,
      testimonials: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string,
          authorPhoto: ImageType,
          testimonial: RichTextTypes,
          title: PropTypes.string,
          audio: AudioType,
          fullStory: RichTextTypes,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

PortfolioContainer.propTypes = PortfolioContainerTypes;

export default PortfolioContainer;
