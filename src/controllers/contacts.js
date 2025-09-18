import createHttpError from 'http-errors';
import {
  createContactById,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export async function getAllContactsController(req, res) {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Contacts found successfully!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res, next) {
  const reqData = await req.body;
  // console.log('req.body: ', reqData);
  let contact;

  if (reqData.name && reqData.phoneNumber && reqData.contactType) {
    contact = await createContactById(reqData);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });

    return;
  }

  next(createHttpError(400, 'The data is invalid!'));
}

export async function updateContactByIdContoller(req, res, next) {
  const { name, phoneNumber, email, isFavourite, contactType } = await req.body;
  const { contactId } = req.params;

  if (name || phoneNumber || email || isFavourite || contactType) {
    const contact = await updateContact(contactId);

    if (contact) {
      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: contact,
      });
      return;
    } else {
      next(createHttpError(404, 'Contact not found'));
    }
  }
}

export async function deleteContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const isContactDelete = await deleteContactById(contactId);

  if (!isContactDelete) {
    return next(createHttpError(404, 'Contact not found'));
  } else {
    res.status(204).send();
  }
}
