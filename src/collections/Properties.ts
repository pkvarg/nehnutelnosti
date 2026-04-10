import type { CollectionConfig } from 'payload'
import { slugify } from '@/utils/slugify'

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: {
    singular: 'Nehnute\u013enos\u0165',
    plural: 'Nehnute\u013enosti',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'propertyType', 'status'],
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
      admin: {
        position: 'sidebar',
      },
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
      name: 'description',
      type: 'richText',
      label: 'Popis',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Cena (\u20ac)',
    },
    {
      name: 'propertyType',
      type: 'select',
      label: 'Typ nehnute\u013enosti',
      options: [
        { label: 'Byt', value: 'byt' },
        { label: 'Dom', value: 'dom' },
        { label: 'Pozemok', value: 'pozemok' },
        { label: 'Komer\u010dn\u00fd priestor', value: 'komercny-priestor' },
        { label: 'In\u00e9', value: 'ine' },
      ],
    },
    {
      name: 'area',
      type: 'number',
      label: 'Rozloha (m\u00b2)',
    },
    {
      name: 'rooms',
      type: 'number',
      label: 'Po\u010det izieb',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Lokalita',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Adresa',
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'S\u00faradnice',
      fields: [
        {
          name: 'lat',
          type: 'number',
          label: 'Zemepisn\u00e1 \u0161\u00edrka',
        },
        {
          name: 'lng',
          type: 'number',
          label: 'Zemepisn\u00e1 d\u013a\u017eka',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Fotografie',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Fotografia',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Odpor\u00fa\u010dan\u00e1',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Stav',
      defaultValue: 'aktivna',
      options: [
        { label: 'Akt\u00edvna', value: 'aktivna' },
        { label: 'Predan\u00e1', value: 'predana' },
        { label: 'Rezervovan\u00e1', value: 'rezervovana' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'D\u00e1tum publik\u00e1cie',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
