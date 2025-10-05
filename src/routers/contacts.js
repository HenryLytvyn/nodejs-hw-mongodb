import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController,
} from '../controllers/contacts.js';
import {
  createContactValidationSchema,
  updateContactValidationSchema,
} from '../validation/contacts.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter
  .use(authenticate)
  .get('/contacts', getAllContactsController)
  .post(
    '/contacts',
    validateBody(createContactValidationSchema),
    createContactController,
  );

contactsRouter
  .use('/contacts/:contactId', isValidId)

  .get('/contacts/:contactId', getContactByIdController)
  .patch(
    '/contacts/:contactId',
    validateBody(updateContactValidationSchema),
    updateContactByIdController,
  )
  .delete('/contacts/:contactId', deleteContactByIdController);

export default contactsRouter;
