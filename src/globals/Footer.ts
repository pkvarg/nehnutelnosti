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
      name: 'description',
      type: 'textarea',
      label: 'Popis firmy',
      defaultValue: 'V\u00e1\u0161 spo\u013eahliv\u00fd partner pri predaji a k\u00fape nehnute\u013enost\u00ed. S nami n\u00e1jdete domov, ktor\u00fd si zasl\u00fa\u017eite.',
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
