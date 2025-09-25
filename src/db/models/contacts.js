import { Schema, model } from 'mongoose';
import { CONTACT_TYPE } from '../../constants.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: [...Object.values(CONTACT_TYPE)],
      default: 'personal',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const contactsCollection = model('contacts', contactSchema);

export default contactsCollection;
