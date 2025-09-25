import {
  SORT_BY_DEFAULT,
  SORT_ORDER,
  SORT_ORDER_DEFAULT,
} from '../constants.js';

export default function parseSortParams({ sortBy, sortOrder }) {
  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}

function parseSortBy(sortBy) {
  const contactKeys = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  if (contactKeys.includes(sortBy)) return sortBy;
  return SORT_BY_DEFAULT;
}

function parseSortOrder(sortOrder) {
  const isSortOrderValid = Object.values(SORT_ORDER).includes(sortOrder);

  if (isSortOrderValid) return sortOrder;
  return SORT_ORDER_DEFAULT;
}
