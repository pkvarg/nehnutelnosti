import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Nastavenia str\u00e1nky',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'N\u00e1zov str\u00e1nky',
      defaultValue: 'Vaše Reality',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
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
  ],
}
