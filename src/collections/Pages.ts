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
