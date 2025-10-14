import createHttpError from 'http-errors';
import ContactsCollection from '../db/models/contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const limit = perPage;
  const skip = perPage * (page - 1);

  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').eq(filter.type);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').eq('true');
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),

    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(page, perPage, contactsCount);

  return { data: contacts, ...paginationData };
}

export async function getContactById(contactId, userId) {
  return await ContactsCollection.findOne({ _id: contactId, userId });
}

export async function createContact(newContact, userId) {
  try {
    newContact.userId = userId;
    return await ContactsCollection.create(newContact);
  } catch {
    createHttpError(500, 'Error server. Please, try later');
  }
}

export async function updateContact(contactId, userId, payload) {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
    },
  );

  return contact;
}

export async function deleteContactById(contactId, userId) {
  const isContactExist = await ContactsCollection.findOne({
    _id: contactId,
    userId,
  });

  if (!isContactExist) {
    const isDelete = false;
    return isDelete;
  }

  await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
  const isDelete = true;
  return isDelete;
}
