import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Ukážkový web od Pictusweb – aké údaje spracúva kontaktný formulár.',
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
      'Kontaktný formulár naozaj funguje, aby ste si ho mohli vyskúšať. Meno, e-mail, telefón (nepovinný) a správu, ktoré vyplníte, pošleme e-mailom do schránky spoločnosti Pictusweb s.r.o. a kópiu ako potvrdenie na zadaný e-mail. Do databázy webu sa neukladajú.',
      'Údaje použijeme len na odpoveď, ak nám píšete napríklad so záujmom o takýto web (čl. 6 ods. 1 písm. b) GDPR – rokovanie o zmluve, inak čl. 6 ods. 1 písm. f) – oprávnený záujem na predvedení webu). Správy v schránke uchovávame najviac 1 rok. E-maily odosiela server Pictusweb (Contabo GmbH, Nemecko) cez e-mailovú službu Titan (Hostinger).',
      'Písma sú súčasťou webu a nenačítavajú sa od Google. Nepoužívame reklamné ani sledovacie cookies.',
      'Mapa v pätičke je obrázok uložený na našom serveri; Google Maps sa otvorí v novom okne až po kliknutí na ňu.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies a meranie návštevnosti',
    text: [
      'Nevyhnutné: cookie CookieConsent si na 365 dní zapamätá vašu voľbu v lište cookies. Ak meranie odmietnete, prehliadač si to zapamätá aj v úložisku (umami.disabled).',
      'Meranie návštevnosti (len s vaším súhlasom): Umami – nástroj na meranie návštevnosti na serveri v Nemecku (Contabo GmbH), ktorý prevádzkuje Pictusweb s.r.o. Nepoužíva cookies, neukladá IP adresu a nevytvára profil návštevníka; vidno len súhrnné štatistiky. Spustí sa až po kliknutí na „Súhlasím“.',
      'Súhlas môžete kedykoľvek zmeniť odkazom „Nastavenia cookies“ v pätičke webu. Pravidlá pre cookies vychádzajú z § 109 ods. 8 zákona č. 452/2021 Z. z. o elektronických komunikáciách.',
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
