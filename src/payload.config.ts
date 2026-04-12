import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sk } from '@payloadcms/translations/languages/sk'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Properties } from '@/collections/Properties'
import { Pages } from '@/collections/Pages'
import { Media } from '@/collections/Media'
import { SiteSettings } from '@/globals/SiteSettings'
import { Footer } from '@/globals/Footer'
import { Navigation } from '@/globals/Navigation'
import { HomePage } from '@/globals/HomePage'
import { AboutPage } from '@/globals/AboutPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4005',
  collections: [Properties, Pages, Media],
  globals: [SiteSettings, Footer, Navigation, HomePage, AboutPage],
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/nehnutelnosti',
  }),
  i18n: {
    supportedLanguages: {
      sk: {
        ...sk,
        translations: {
          ...sk.translations,
          general: {
            ...sk.translations.general,
            globals: 'Glob\u00e1lne',
            leaveAnyway: 'Napriek tomu od\u00eds\u0165',
          },
        },
      },
    },
    fallbackLanguage: 'sk',
  },
  admin: {
    meta: {
      title: 'Spr\u00e1va nehnute\u013enost\u00ed',
    },
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
})
