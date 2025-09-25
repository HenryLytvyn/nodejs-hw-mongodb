import createHttpError from 'http-errors';
import {
  createContactById,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';

export async function getAllContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  if (!contacts.data.length) {
    res.status(200).json({
      status: 200,
      message: 'There are any contacts!',
      data: contacts,
    });
    return;
  }

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
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res, next) {
  const reqData = await req.body;
  let contact;

  if (reqData.name && reqData.phoneNumber && reqData.contactType) {
    contact = await createContactById(reqData);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  }

  next(createHttpError(400, 'The data is invalid!'));
}

export async function updateContactByIdController(req, res, next) {
  const reqBody = await req.body;
  const { contactId } = req.params;
  const hasBodyValidData =
    reqBody.name ||
    reqBody.phoneNumber ||
    reqBody.email ||
    reqBody.isFavourite ||
    reqBody.contactType;

  if (!hasBodyValidData) {
    next(createHttpError(400, 'The data is invalid!'));
    return;
  }

  const contact = await updateContact(contactId, reqBody);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
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
