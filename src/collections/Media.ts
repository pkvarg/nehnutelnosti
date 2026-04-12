import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'M\u00e9dium',
    plural: 'M\u00e9di\u00e1',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'media'),
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'card', width: 768, height: 512 },
      { name: 'full', width: 1920 },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternat\u00edvny text',
    },
  ],
}
