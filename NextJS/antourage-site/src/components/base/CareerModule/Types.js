import PropTypes from 'prop-types';

export const CareerModuleItemsPropTypes = () =>
  PropTypes.shape({
    fields: PropTypes.shape({
      fields: PropTypes.shape({
        image: PropTypes.shape({
          fields: PropTypes.shape({
            file: PropTypes.shape({
              url: PropTypes.string.isRequired,
            }),
          }),
        }),
        text: PropTypes.string.isRequired,
      }),
    }),
  });

export const CareerModulePropTypes = () =>
  PropTypes.shape({
    className: PropTypes.string,
    eyebrow: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    items: CareerModuleItemsPropTypes,
    body: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    openLinkInNewTab: PropTypes.bool,
  });
