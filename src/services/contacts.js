import contactsCollection from '../db/models/contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const limit = perPage;
  const skip = perPage * (page - 1);

  const contactsQuery = contactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').eq(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').eq('true');
  }

  const contactsCount = await contactsCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(page, perPage, contactsCount);

  return { data: contacts, ...paginationData };
}

export async function getContactById(contactId) {
  return await contactsCollection.findById(contactId);
}

export async function createContactById(payload) {
  return await contactsCollection.create(payload);
}

export async function updateContact(contactId, payload) {
  return await contactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
  });
}

export async function deleteContactById(contactId) {
  const contact = await contactsCollection.findById(contactId);

  if (contact) {
    await contactsCollection.findByIdAndDelete(contactId);
    const isDelete = true;
    return isDelete;
  } else {
    const isDelete = false;
    return isDelete;
  }
}
