import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navig\u00e1cia',
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Polo\u017eky menu',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'N\u00e1zov',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Odkaz',
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA tla\u010didlo',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'N\u00e1zov',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Odkaz',
        },
        {
          name: 'show',
          type: 'checkbox',
          label: 'Zobrazi\u0165',
          defaultValue: false,
        },
      ],
    },
  ],
}
