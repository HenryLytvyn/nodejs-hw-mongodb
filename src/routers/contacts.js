import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdContoller,
  deleteContactByIdController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', getAllContactsController);
contactsRouter.get('/contacts/:contactId', getContactByIdController);
contactsRouter.post('/contacts', createContactController);
contactsRouter.patch('/contacts/:contactId', updateContactByIdContoller);
contactsRouter.delete('/contacts/:contactId', deleteContactByIdController);

export default contactsRouter;
