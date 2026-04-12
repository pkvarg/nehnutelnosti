import type { CollectionConfig } from 'payload'
import { slugify } from '@/utils/slugify'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Str\u00e1nka',
    plural: 'Str\u00e1nky',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'N\u00e1zov',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      label: 'URL slug',
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (!value && siblingData?.title) {
              return slugify(siblingData.title as string)
            }
            return value
          },
        ],
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Podnadpis',
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      label: 'Zobrazi\u0165 v navig\u00e1cii',
      defaultValue: true,
    },
    {
      name: 'navOrder',
      type: 'number',
      label: 'Poradie v navig\u00e1cii',
      defaultValue: 0,
      admin: {
        description: 'Ni\u017e\u0161ie \u010d\u00edslo = sk\u00f4r v menu',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Obsah',
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta n\u00e1zov',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta popis',
        },
      ],
    },
  ],
}
