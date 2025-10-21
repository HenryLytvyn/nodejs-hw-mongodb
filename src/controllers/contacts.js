import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';
import saveToFileToUploadDir from '../utils/saveFileToUploadDir.js';
import { ENABLE_CLOUDINARY } from '../constants.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';

export async function getAllContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Contacts found successfully!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

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
  const userId = req.user._id;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (ENABLE_CLOUDINARY) {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveToFileToUploadDir(photo);
    }
  }

  const contact = await createContact({ ...req.body, photo: photoUrl }, userId);

  res.status(201).json({
    status: 201,
    message: 'Successfully created the contact!',
    data: contact,
  });
}

export async function updateContactByIdController(req, res, next) {
  const contactDataToUpdate = req.body;
  const userId = req.user._id;
  const photo = req.file;
  const { contactId } = req.params;

  let photoUrl;
  if (photo) {
    if (ENABLE_CLOUDINARY) {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveToFileToUploadDir(photo);
    }
  }

  const contact = await updateContact(contactId, userId, {
    ...contactDataToUpdate,
    photo: photoUrl,
  });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated the contact!',
    data: contact,
  });
}

export async function deleteContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const isContactDelete = await deleteContactById(contactId, userId);

  if (!isContactDelete) {
    return next(createHttpError(404, 'Contact not found'));
  } else {
    res.status(204).send();
  }
}
