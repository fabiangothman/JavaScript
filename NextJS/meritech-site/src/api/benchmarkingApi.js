/* eslint-disable import/prefer-default-export */
import csv from 'csvtojson';
import request from 'request';
import { getAllEntries } from './index';

export const getChartData = async (benchmarkingFile) => {
  const page = await getAllEntries({
    content_type: 'pageBenchmarking',
    include: 1,
  });

  const file = page.items[0]?.fields?.[benchmarkingFile];

  if (!file) {
    return null;
  }

  const { url } = file.fields.file;

  return csv().fromStream(request.get(`https:${url}`));
};
