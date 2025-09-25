import { CONTACT_TYPE } from '../constants.js';

export default function parseFilterParams({ type, isFavourite }) {
  const parsedContactType = parseContactType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
}

function parseContactType(type) {
  const isContactTypeValid = Object.values(CONTACT_TYPE).includes(type);

  if (isContactTypeValid) return type;
}

function parseIsFavourite(isFavourite) {
  if (isFavourite === 'true') return isFavourite;
}
