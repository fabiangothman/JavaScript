import _isArray from 'lodash/isArray';
import csv from 'csvtojson';
import request from 'request';
import _get from 'lodash/get';

import { getAllEntries } from '.';

export const parseCSV2JSON = async (path) => {
  return csv().fromStream(request.get(path));
};

export const getFieldsFromObject = (object = null) => {
  if (!object) {
    return {};
  }
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
  if (!url) {
    return {};
  }
  return {
    url: `https:${url}`,
    width,
    contentType,
    height,
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
    addresses: getFieldsFromArray(fields?.addresses),
    callToSeeOurInternalPage: formatLink(fields?.callToSeeOurInternalPage),
    contactInfo: getFieldsFromArray(fields?.contactInfo),
    links: getFieldsFromArray(fields?.links).map((page) => {
      const slug =
        page?.internalPage?.fields?.slug &&
        `/${page?.internalPage?.fields?.slug}`;
      return {
        ...page,
        slug: slug ?? page?.externalUrl ?? '',
      };
    }),
  };
};

const formatHeader = (params) => {
  const fields = _get(params, 'header.fields', {});
  return {
    ...fields,
    menu: getFieldsFromArray(fields.menuItem).map((page) => {
      const slug =
        page?.internalPage?.fields?.slug &&
        `/${page?.internalPage?.fields?.slug}`;

      return {
        ...page,
        slug: slug ?? page?.externalUrl ?? '',
      };
    }),
  };
};

export const getDefaultSettings = async (page) => {
  const defaultSettings = await getAllEntries({
    content_type: 'globalSettings',
    include: 3,
  });

  const fields = _get(defaultSettings, 'items[0].fields', {});
  const header = formatHeader(fields);
  const footer = formatFooter(fields);

  const googleAnalyticsID = _get(fields, 'googleAnalyticsId', '');
  const defaultSEO = _get(fields, 'seo.fields', {});
  const pageSEO = _get(page, 'items[0].fields.pageSeo.fields', {});

  return {
    ...fields,
    googleAnalyticsID,
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
