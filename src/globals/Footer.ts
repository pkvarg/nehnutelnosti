import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'P\u00e4ti\u010dka',
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'N\u00e1zov firmy',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telef\u00f3n',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Adresa',
    },
    {
      name: 'openingHours',
      type: 'text',
      label: 'Otv\u00e1racie hodiny',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Soci\u00e1lne siete',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Platforma',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'Odkaz',
        },
      ],
    },
    {
      name: 'footerText',
      type: 'richText',
      label: 'Doplnkov\u00fd text',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'Google Maps embed URL',
    },
  ],
}
