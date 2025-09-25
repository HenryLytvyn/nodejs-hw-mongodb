import { PAGE_BY_DEFAULT, PER_PAGE_BY_DEFAULT } from '../constants.js';
import isString from './isString.js';

export default function parsePaginationParams({ page, perPage }) {
  const parsedPage = parseNumber(page, PAGE_BY_DEFAULT);
  const parsedPerPage = parseNumber(perPage, PER_PAGE_BY_DEFAULT);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
}

function parseNumber(number, defaultValue) {
  if (!isString(number)) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber) || parsedNumber < 1) return defaultValue;

  return parsedNumber;
}
