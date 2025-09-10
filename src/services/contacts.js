import contactsCollection from '../db/models/contacts.js';

export async function getAllContacts() {
  const contacts = await contactsCollection.find();
  return contacts;
}

export async function getContactById(contactId) {
  return await contactsCollection.findById(contactId);
}
