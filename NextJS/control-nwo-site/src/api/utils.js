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

export const formatMenuLink = ({ fields }) => {
  return {
    label: fields?.label,
    link: fields?.link ? fields?.link : null,
    menuItemCategory: fields?.menuItemCategory,
    openInANewTab: fields?.openInANewTab,
  }
};
export const formatHeaderMenu = (params) => {
  const menuItems = params.headerMenu.map(({fields}) => ({
    id: fields?.id,
    parentLink: formatMenuLink(fields?.parentLink),
    childrenLinks: fields?.childrenLinks ? fields?.childrenLinks.map(menuLink => formatMenuLink(menuLink)) : [],
  }));
  return menuItems;
};
export const formatFooterMenu = (params) => {
  const menuItems = params.footerMenu.map(({fields}) => ({
    id: fields?.id,
    parentLink: formatMenuLink(fields?.parentLink),
    childrenLinks: fields?.childrenLinks ? fields?.childrenLinks.map(menuLink => formatMenuLink(menuLink)) : [],
  }));
  return menuItems;
};

export const getDefaultSettings = async () => {
  const defaultSettings = await getAllEntries({
    content_type: 'globalSettings',
    include: 4,
  });
  const fields = _get(defaultSettings, 'items[0].fields', {});
  const headerMenu = formatHeaderMenu(fields);
  const footerMenu = formatFooterMenu(fields);
  const privacyPolicy = formatMenuLink(fields?.privacyPolicy);
  const termsConditions = formatMenuLink(fields?.termsConditions);

  return {
    ...fields,
    headerMenu,
    footerMenu,
    privacyPolicy,
    termsConditions,
  };
};
export const getPageFieldsAndSettings = async (pageType) => {
  const page = await getAllEntries(pageType);
  const fields = _get(page, 'items[0].fields', {});

  const settings = await getDefaultSettings();

  return {
    ...fields,
    settings,
  };
};

export const parseNextJSProps = (props) => {
  return JSON.parse(JSON.stringify(props));
};

// Custom data
export const formatImage = (image) => {
  if(!image)
    return null;
  return {
    alt: image?.fields?.description,
    url: `https:${image?.fields?.file?.url}`,
    width: image?.fields?.file?.details?.image?.width,
    height: image?.fields?.file?.details?.image?.height,
  }
};

export const formatCard = ({ fields }) => {
  return {
    title: fields?.title,
    text: fields?.text,
    image: formatImage(fields?.image),
  }
};

export const formatPost = (post) => {
  return {
    title: post?.title,
    date: Date.parse(post?.date),
    image: formatImage(post?.image),
    content: post?.content,
    slug: post?.slug,
    path: post?.path,
  }
};

export const formatEvent = (event) => {
  return {
    date: Date.parse(event?.date),
    image: formatImage(event?.image),
    link: event?.link,
    text: event?.text,
    title: event?.title,
    openInANewTab: event?.openInANewTab,
  }
};
