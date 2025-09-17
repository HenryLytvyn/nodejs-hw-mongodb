import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactContoller,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', getAllContactsController);
contactsRouter.get('/contacts/:contactId', getContactByIdController);
contactsRouter.post('/contacts', createContactController);
contactsRouter.patch('/contacts/:contactId', updateContactContoller);

export default contactsRouter;
