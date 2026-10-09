import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Ukážkový web – nezbiera žiadne osobné údaje.',
}

const sections = [
  {
    title: 'Ukážkový web',
    text: [
      'Tento web je ukážka realitného webu, ktorú vytvorila spoločnosť Pictusweb s.r.o., Nábrežná 4895/42, 940 02 Nové Zámky, IČO: 54 631 068 (info@pictusweb.sk, 0948 024 638). Realitná kancelária „Vaše Reality“, jej adresa aj ponúkané nehnuteľnosti sú fiktívne.',
    ],
  },
  {
    title: 'Aké údaje web spracúva',
    text: [
      'Web nezbiera žiadne osobné údaje. Kontaktný formulár slúži len na ukážku – nič, čo doň napíšete, sa nikam neodošle ani neuloží.',
      'Web nepoužíva cookies, analytické ani reklamné nástroje. Písma sú súčasťou webu a nenačítavajú sa od Google.',
      'Mapa v pätičke je obrázok uložený na našom serveri; Google Maps sa otvorí v novom okne až po kliknutí na ňu.',
    ],
  },
  {
    title: 'Technické údaje a kontakt',
    text: [
      'Pri návšteve spracúva poskytovateľ hostingu technické údaje potrebné na doručenie stránky (IP adresa, typ prehliadača, čas požiadavky) v krátkodobých záznamoch servera, a to na základe oprávneného záujmu na bezpečnom fungovaní webu (čl. 6 ods. 1 písm. f) GDPR).',
      'Ak máte otázky alebo chcete uplatniť svoje práva podľa GDPR, napíšte na info@pictusweb.sk. Sťažnosť môžete podať na Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava 27, www.dataprotection.gov.sk.',
    ],
  },
]

export default function GdprPage() {
  return <LegalPage eyebrow="Ochrana údajov" title="Ochrana osobných údajov" sections={sections} />
}
