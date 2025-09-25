import createHttpError from 'http-errors';

export default function calculatePaginationData(page, perPage, totalItems) {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  if (page < 1 && page > totalPages)
    throw createHttpError(400, 'Invalid page value!');

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}
