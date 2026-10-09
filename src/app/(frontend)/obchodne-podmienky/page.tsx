import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Obchodné podmienky',
  description: 'Ukážkový web – žiadne skutočné služby ani obchodné podmienky.',
}

const sections = [
  {
    title: 'Ukážkový web',
    text: [
      'Tento web je ukážka realitného webu, ktorú vytvorila spoločnosť Pictusweb s.r.o., Nábrežná 4895/42, 940 02 Nové Zámky, IČO: 54 631 068. Realitná kancelária „Vaše Reality“ neexistuje a cez tento web sa neuzatvárajú žiadne zmluvy ani neposkytujú žiadne služby.',
      'Nehnuteľnosti, ceny a texty na webe sú fiktívne a slúžia len na predvedenie funkcií webu.',
    ],
  },
  {
    title: 'Chcete takýto web?',
    text: [
      'Ak vás ukážka zaujala, ozvite sa na info@pictusweb.sk alebo 0948 024 638. Pre skutočnú realitnú kanceláriu pripravíme aj obchodné podmienky a zásady ochrany osobných údajov podľa platných predpisov.',
    ],
  },
]

export default function TermsPage() {
  return <LegalPage eyebrow="Podmienky" title="Obchodné podmienky" sections={sections} />
}
