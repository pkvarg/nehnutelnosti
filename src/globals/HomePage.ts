import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Domovská stránka',
  access: {
    read: () => true,
  },
  fields: [
    // Hero Section
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Hero — nadpis malý',
      defaultValue: 'Realitná kancelária',
    },
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero — hlavný nadpis',
      defaultValue: 'Nájdite svoj vysnívaný domov',
    },
    {
      name: 'heroHighlight',
      type: 'text',
      label: 'Hero — zvýraznený text (zlatý)',
      defaultValue: 'vysnívaný domov',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero — popis',
      defaultValue:
        'S profesionálnym prístupom a dlhoročnými skúsenosťami vám pomôžeme nájsť nehnuteľnosť presne podľa vašich predstáv.',
    },
    {
      name: 'heroPrimaryButton',
      type: 'group',
      label: 'Hero — hlavné tlačidlo',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Prezrieť ponuku' },
        { name: 'url', type: 'text', defaultValue: '/ponuka' },
      ],
    },
    {
      name: 'heroSecondaryButton',
      type: 'group',
      label: 'Hero — vedľajšie tlačidlo',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Kontaktujte nás' },
        { name: 'url', type: 'text', defaultValue: '/kontakt' },
      ],
    },
    // Featured section labels
    {
      name: 'featuredSubtitle',
      type: 'text',
      label: 'Odporúčané — nadpis malý',
      defaultValue: 'Vybrané nehnuteľnosti',
    },
    {
      name: 'featuredHeading',
      type: 'text',
      label: 'Odporúčané — nadpis',
      defaultValue: 'Odporúčané nehnuteľnosti',
    },
    {
      name: 'featuredButtonLabel',
      type: 'text',
      label: 'Odporúčané — tlačidlo',
      defaultValue: 'Zobraziť všetky nehnuteľnosti',
    },
    // Why Choose Us section
    {
      name: 'benefitsSubtitle',
      type: 'text',
      label: 'Výhody — nadpis malý',
      defaultValue: 'Naše výhody',
    },
    {
      name: 'benefitsHeading',
      type: 'text',
      label: 'Výhody — nadpis',
      defaultValue: 'Prečo si vybrať nás',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Výhody — karty',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Názov', required: true },
        { name: 'description', type: 'textarea', label: 'Popis', required: true },
        {
          name: 'icon',
          type: 'select',
          label: 'Ikona',
          defaultValue: 'star',
          options: [
            { label: 'Hviezda (Skúsenosti)', value: 'star' },
            { label: 'Štít (Dôvera)', value: 'shield' },
            { label: 'Používatelia (Prístup)', value: 'users' },
            { label: 'Dom', value: 'home' },
            { label: 'Srdce', value: 'heart' },
            { label: 'Graf', value: 'chart' },
          ],
        },
      ],
    },
    // CTA section
    {
      name: 'ctaHeading',
      type: 'text',
      label: 'CTA — nadpis',
      defaultValue: 'Máte záujem o nehnuteľnosť?',
    },
    {
      name: 'ctaDescription',
      type: 'textarea',
      label: 'CTA — popis',
      defaultValue:
        'Neváhajte nás kontaktovať. Radi vám poradíme a pomôžeme s výberom tej pravej nehnuteľnosti.',
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'CTA — tlačidlo',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Kontaktujte nás' },
        { name: 'url', type: 'text', defaultValue: '/kontakt' },
      ],
    },
  ],
}
