import contactsCollection from '../db/models/contacts.js';

export async function getAllContacts() {
  const contacts = await contactsCollection.find();
  return contacts;
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
