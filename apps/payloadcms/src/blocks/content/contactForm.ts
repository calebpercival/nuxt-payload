import { Block } from 'payload'

export const ContactForm: Block = {
  slug: 'ContactForm',
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
  fields: [
    {
      name: 'submitButton',
      label: 'Submit Button Label',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'confirmationMessage',
      type: 'textarea',
      label: 'Confirmation Message',
      defaultValue: "Thanks! We'll be in touch shortly.",
    },
  ],
}
