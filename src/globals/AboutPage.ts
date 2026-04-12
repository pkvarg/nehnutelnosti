import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'O n\u00e1s',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Nadpis mal\u00fd',
      defaultValue: 'O spolo\u010dnosti',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Hlavn\u00fd nadpis',
      defaultValue: 'O n\u00e1s',
    },
    {
      name: 'paragraphs',
      type: 'array',
      label: 'Obsah',
      defaultValue: [
        {
          type: 'paragraph',
          text: 'Va\u0161e Reality je realitn\u00e1 kancel\u00e1ria s dlhoro\u010dn\u00fdmi sk\u00fasenosťami na slovenskom trhu s nehnute\u013enosťami. Na\u0161\u00edm cie\u013eom je poskytn\u00fa\u0165 klientom profesion\u00e1lne slu\u017eby pri predaji, k\u00fape a pren\u00e1jme nehnute\u013enost\u00ed.',
        },
        {
          type: 'paragraph',
          text: 'Ver\u00edme, \u017ee ka\u017ed\u00fd si zasl\u00fa\u017ei n\u00e1js\u0165 svoj vysn\u00edvan\u00fd domov. Preto pristupujeme ku ka\u017ed\u00e9mu klientovi individu\u00e1lne a h\u013ead\u00e1me rie\u0161enia \u0161it\u00e9 na mieru jeho potreb\u00e1m a predst\u00e1vam.',
        },
        {
          type: 'heading',
          text: 'Na\u0161e hodnoty',
        },
        {
          type: 'paragraph',
          text: 'Stav\u00edme na profesionalite, transparentnosti a osobnom pr\u00edstupe. Ka\u017ed\u00e1 transakcia je pre n\u00e1s rovnako d\u00f4le\u017eit\u00e1, bez oh\u013eadu na jej ve\u013ekos\u0165.',
        },
        {
          type: 'paragraph',
          text: 'Ak h\u013ead\u00e1te spo\u013eahliv\u00e9ho partnera pre va\u0161e realitn\u00e9 potreby, nev\u00e1hajte n\u00e1s kontaktova\u0165.',
        },
      ],
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Typ',
          defaultValue: 'paragraph',
          options: [
            { label: 'Odsek', value: 'paragraph' },
            { label: 'Nadpis', value: 'heading' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Text',
          required: true,
        },
      ],
    },
  ],
}
