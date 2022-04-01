import _isArray from 'lodash/isArray';
import _get from 'lodash/get';

import { getAllEntries } from '.';

export const getFieldsFromObject = (object = {}) => {
  const fields = _get(object, 'fields', {});
  const sysId = _get(object, 'sys.id', {});
  return {
    ...fields,
    sysId,
  };
};

export const getFieldsFromArray = (array) => {
  if (!_isArray(array)) {
    return [{}];
  }
  return array.map(getFieldsFromObject);
};

export const getImageFields = (image) => {
  const url = _get(image, 'fields.file.url', '');
  const width = _get(image, 'fields.file.details.image.width', 0);
  const height = _get(image, 'fields.file.details.image.height', 0);
  const description = _get(image, 'fields.description', '');
  const contentType = _get(image, 'fields.file.contentType', '');
  const name = _get(image, 'fields.title', '');
  return {
    url: `https:${url}`,
    width,
    contentType,
    height,
    alt: description || name || '',
  };
};

export const getFileFields = (file) => {
  const url = _get(file, 'fields.file.url', '');
  const description = _get(file, 'fields.description', '');
  const contentType = _get(file, 'fields.file.contentType', '');
  const name = _get(file, 'fields.title', '');
  return {
    url: `https:${url}`,
    contentType,
    alt: description || name || '',
  };
};

export const formatAssetFile = (params) => {
  const fields = _get(params, 'fields', {});
  const url = _get(fields, 'file.url', '');
  return {
    url: url && `https:${url}`,
    contentType: _get(fields, 'file.contentType', ''),
    description: fields?.description || _get(fields, 'title', ''),
  };
};

export const formatLink = (params) => {
  const fields = _get(params, 'fields', {});
  const externalURL = _get(fields, 'externalPage', '');
  const internalURL = _get(fields, 'internalPage.fields.slug', '');
  const formattedInternalURL = internalURL && `/${internalURL}`;
  return {
    ...fields,
    label: fields?.label || '',
    slug: externalURL || formattedInternalURL || '',
  };
};

const formatFooter = ({ footer: { fields } }) => {
  return {
    ...fields,
    sitemap: getFieldsFromArray(fields?.sitemap.fields?.sitemapLinks).map(
      (page) => {
        let slug =
          page?.internalPage?.fields?.slug &&
          `/${page?.internalPage?.fields?.slug}`;
        slug =
          page?.internalPage?.fields?.path ?
          `/${page?.internalPage?.fields?.path}${slug}` : 
          slug;
        return {
          ...page,
          slug: slug ?? page?.externalUrl ?? '',
        };
      },
    ),
    interest: fields?.interest.fields?.interestLinks ? getFieldsFromArray(fields?.interest.fields?.interestLinks).map(
      (page) => {
        let slug =
          page?.internalPage?.fields?.slug &&
          `/${page?.internalPage?.fields?.slug}`;
        slug =
          page?.internalPage?.fields?.path ?
          `/${page?.internalPage?.fields?.path}${slug}` : 
          slug;
        return {
          ...page,
          slug: slug ?? page?.externalUrl ?? '',
        };
      },
    ) : [],
    info: getFieldsFromObject(fields?.info),
    socialmedia: {
      instagram: {
        ...fields?.socialmedia?.fields?.instagram?.fields,
        slug: fields?.socialmedia?.fields?.instagram?.fields?.internalPage?.fields?.slug
        ? `/${fields?.socialmedia?.fields?.instagram?.fields?.internalPage?.fields?.slug}`
        : fields?.socialmedia?.fields?.instagram?.fields?.externalUrl
          ? fields?.socialmedia?.fields?.instagram?.fields?.externalUrl
            : null,
      },
      linkedIn: {
        ...fields?.socialmedia?.fields?.linkedIn?.fields,
        slug: fields?.socialmedia?.fields?.linkedIn?.fields?.internalPage?.fields?.slug
        ? `/${fields?.socialmedia?.fields?.linkedIn?.fields?.internalPage?.fields?.slug}`
          : fields?.socialmedia?.fields?.linkedIn?.fields?.externalUrl
            ? fields?.socialmedia?.fields?.linkedIn?.fields?.externalUrl
            : null,
      },
      twitter: {
        ...fields?.socialmedia?.fields?.twitter?.fields,
        slug: fields?.socialmedia?.fields?.twitter?.fields?.internalPage?.fields?.slug
        ? `/${fields?.socialmedia?.fields?.twitter?.fields?.internalPage?.fields?.slug}`
        : fields?.socialmedia?.fields?.twitter?.fields?.externalUrl
          ? fields?.socialmedia?.fields?.twitter?.fields?.externalUrl
            : null,
      },
    },
  };
};

const formatHeader = (params) => {
  const fields = _get(params, 'header.fields', {});

  const link = getFieldsFromObject(fields?.loginButton);
  let slug =
    link?.internalPage?.fields?.slug && `/${link?.internalPage?.fields?.slug}`;
  slug =
    link?.internalPage?.fields?.path ?
    `/${link?.internalPage?.fields?.path}${slug}` : 
    slug;
  link.slug = slug ?? link?.externalUrl ?? '';

  return {
    // ...fields,
    menu: getFieldsFromArray(fields.menuItem).map((page) => {
      let slug =
        page?.internalPage?.fields?.slug &&
        `/${page?.internalPage?.fields?.slug}`;
      slug =
        page?.internalPage?.fields?.path ?
        `/${page?.internalPage?.fields?.path}${slug}` : 
        slug;

      return {
        ...page,
        slug: slug ?? page?.externalUrl ?? '',
      };
    }),
    loginButton: link,
  };
};

export const getDefaultSettings = async (page) => {
  const defaultSettings = await getAllEntries({
    content_type: 'globalSettings',
    include: 4,
  });

  const fields = _get(defaultSettings, 'items[0].fields', {});
  const header = formatHeader(fields);
  const footer = formatFooter(fields);

  const googleAnalyticsId = _get(fields, 'googleAnalyticsId', '');
  const defaultSEO = _get(fields, 'seo.fields', {});
  const pageSEO = _get(page, 'items[0].fields.pageSeo.fields', {});

  return {
    ...fields,
    googleAnalyticsId,
    header,
    footer,
    defaultSEO,
    pageSEO,
  };
};

export const getPageFieldsAndSettings = async (pageType) => {
  const page = await getAllEntries(pageType);
  const fields = _get(page, 'items[0].fields', {});

  const settings = await getDefaultSettings(page);

  return {
    ...fields,
    settings,
  };
};

export const parseNextJSProps = (props) => {
  return JSON.parse(JSON.stringify(props));
};

// Utils for added custom components
export const formatCaseStudy = ({ fields }) => {
  const link = getFieldsFromObject(fields?.link);
  let slug =
    link?.internalPage?.fields?.slug && `/${link?.internalPage?.fields?.slug}`;
  slug =
    link?.internalPage?.fields?.path ?
    `/${link?.internalPage?.fields?.path}${slug}` : 
    slug;
  link.slug = slug ?? link?.externalUrl ?? '';
  return {
    ...fields,
    image: getImageFields(fields?.image),
    link,
  };
};
export const formatContactForm = ({ fields }) => {
  return {
    ...fields,
  };
};
export const formatSteps = (steps) =>
  getFieldsFromArray(steps).map((step) => ({
    ...step,
    image: getImageFields(step?.image),
  }));
export const formatHeroForm = ({ fields }) => {
  const link = getFieldsFromObject(fields?.link);
  let slug =
    link?.internalPage?.fields?.slug && `/${link?.internalPage?.fields?.slug}`;
  slug =
    link?.internalPage?.fields?.path ?
    `/${link?.internalPage?.fields?.path}${slug}` : 
    slug;
  link.slug = slug ?? link?.externalUrl ?? '';
  return {
    ...fields,
    image: getImageFields(fields?.image),
    link,
  };
};
export const formatCarouselLoop = ({ fields }) => {
  return {
    ...fields,
    images: fields.images.map((shield) => getImageFields(shield)),
  };
};
const KFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num);
};
export const formatCarousel = ({ fields }) => {
  return {
    ...fields,
    carouselCards: getFieldsFromArray(fields?.carouselCards).map((card) => {
      return {
        ...card,
        image: getImageFields(card.image),
        followers: KFormatter(card.followers),
      };
    }),
  };
};
export const formatPeople = ({ fields }) => {
  return {
    ...fields,
    people: getFieldsFromArray(fields?.people).map((person) => {
      return {
        ...person,
        image: getImageFields(person.image),
      };
    }),
  };
};
export const formatTabs = (tabs) =>
  getFieldsFromArray(tabs).map((tab) => ({
    ...tab,
  }));
export const formatDataCarousel = ({ fields }) => {
  return {
    ...fields,
    cards: getFieldsFromArray(fields?.cards),
  };
};
export const formatEngageSection = ({ fields }) => {
  return {
    ...fields,
    cards: getFieldsFromArray(fields?.cards).map((card) => {
      const button = getFieldsFromObject(card?.button);
      let slug =
        button?.internalPage?.fields?.slug &&
        `/${button?.internalPage?.fields?.slug}`;
      slug =
        button?.internalPage?.fields?.path ?
        `/${button?.internalPage?.fields?.path}${slug}` : 
        slug;
      button.slug = slug ?? button?.externalUrl ?? '';
      return {
        ...card,
        image: getImageFields(card.image),
        button,
      };
    }),
  };
};
export const formatQuoteTabs = (tabs) =>
  getFieldsFromArray(tabs).map((tab) => ({
    ...tab,
    image: getImageFields(tab.image),
  }));
export const formatHero2Form = ({ fields }) => {
  const pdfFields = getFieldsFromObject(fields?.pdfFile);
  const slug =
    pdfFields?.pdfFile?.fields?.file?.url &&
    `https:${_get(pdfFields?.pdfFile, 'fields.file.url', '')}`;
  return {
    ...fields,
    pdfFile: {
      ...pdfFields,
      pdfFile: getFileFields(pdfFields.pdfFile),
      slug: slug ?? pdfFields?.externalUrl ?? '',
    },
    leftImage: getImageFields(fields?.leftImage),
    rightImage: getImageFields(fields?.rightImage),
  };
};
export const formatMissionVission = ({ fields }) => {
  const pdfFields = getFieldsFromObject(fields?.pdfFile);
  const slug =
    pdfFields?.pdfFile?.fields?.file?.url &&
    `https:${_get(pdfFields?.pdfFile, 'fields.file.url', '')}`;
  return {
    ...fields,
    pdfFile: {
      ...pdfFields,
      pdfFile: getFileFields(pdfFields.pdfFile),
      slug: slug ?? pdfFields?.externalUrl ?? '',
    },
    image: getImageFields(fields?.image),
  };
};
export const formatVideoForm = ({ fields }) => {
  return {
    ...fields,
    teamsLogos: fields?.teamsLogos ? fields?.teamsLogos.map((logo) => getImageFields(logo)) : [],
  };
};

export const formatCaseStudiesHero = ({ fields }) => {
  const { description, headline, image } = fields;
  return {
    ...fields,
    headline,
    description,
    image: getImageFields(image),
  };
};

export const formatFiftyFifty = ({ fields }) => {
  const { description, title, image } = fields;
  return {
    ...fields,
    title,
    description,
    image: getImageFields(image),
  };
};

export const formatObjectives = ({ fields }) => {
  const { title, items } = fields;
  const mappedItems =
    items && items.length
      ? items.map((item) => {
          const { fields: itemFields } = item;
          return {
            text: itemFields.text,
          };
        })
      : null;
  return {
    ...fields,
    title,
    items: mappedItems,
  };
};

export const formatStats = ({ fields }) => {
  const { title, items } = fields;
  const mappedItems =
    items && items.length
      ? items.map((item) => {
          const { fields: itemFields } = item;
          return {
            value: itemFields.value,
            title: itemFields.title,
            symbol: itemFields.symbol ? itemFields.symbol : '',
            description: itemFields.description,
          };
        })
      : null;

  return {
    ...fields,
    title,
    items: mappedItems,
  };
};

export const formatTestimonials = (cards) => {
  if (cards && cards.length) {
    const res = cards.map((card) => {
      const { fields } = card;

      return { ...fields, image: getImageFields(fields.image) };
    });

    return {
      testimonials: {
        cards: res,
      },
    };
  }

  return {
    testimonials: {
      cards: null,
    },
  };
};

export const formatEcosystem = (ecosystem) => {
  const data =
    ecosystem && ecosystem.length
      ? ecosystem.map((item) => ({
          ...item.fields,
        }))
      : null;

  if (data) {
    data.push({
      title: null,
      content: null,
      ctaLink: null,
      ctaText: null,
      openLinkInNewTab: false,
      animationStartFrame: null,
      animationEndFrame: null,
    });
  }

  return data;
};

export const formatImageWithTextAndTabs = ({ fields }) => {
  const { image, title, tabs } = fields;

  return {
    ...fields,
    image: getImageFields(image),
    title,
    tabs:
      tabs && tabs.length
        ? tabs.map((tab) => ({
            ...tab.fields,
          }))
        : null,
  };
};
export const formatBigFans = ({ fields }) => {
  const { text, image } = fields;
  return {
    image: getImageFields(image),
    text,
  };
};
export const formatCareerModule = ({ fields }) => {
  return {
    ...fields,
    items: getFieldsFromArray(fields.items).map((item) => ({
      ...item,
      image: getImageFields(item?.image),
    }))
  };
};
