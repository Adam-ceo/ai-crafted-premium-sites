export const PrivacyPolicyContent = () => (
  <>
    <p className="text-slate-400 text-xs">Utoljára frissítve: 2026. május</p>

    <h3 className="font-bold text-slate-900 text-base pt-2">1. Ki kezeli az adataidat?</h3>
    <p>
      A Luxiflow weboldal adatkezelője: <strong>Lukács Ádám</strong> (magánszemély).{' '}
      Kapcsolat:{' '}
      <a href="mailto:hello@luxiflow.io" className="text-green-600 underline">
        hello@luxiflow.io
      </a>
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">2. Milyen adatokat gyűjtünk és miért?</h3>
    <p>Az ajánlatkérő űrlap kitöltésekor az alábbi adatokat kapjuk meg:</p>
    <ul className="list-disc pl-5 space-y-1 mt-2">
      <li>
        <strong>Név / cégnév</strong> – hogy személyre szabott választ tudjunk adni
      </li>
      <li>
        <strong>E-mail cím</strong> – a visszajelzés megküldéséhez
      </li>
      <li>
        <strong>Projekt leírása</strong> – az ingyenes javaslat elkészítéséhez
      </li>
    </ul>
    <p className="mt-2">
      Ezeket az adatokat kizárólag a megkeresés megválaszolásához használjuk fel, és harmadik félnek
      nem adjuk át.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">3. Az adatkezelés jogalapja</h3>
    <p>
      Az adatkezelés jogalapja az önkéntes hozzájárulásod (GDPR 6. cikk (1) a) pont), amelyet az
      űrlap elküldésével adsz meg.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">4. Meddig tároljuk az adatokat?</h3>
    <p>
      Az adatokat legfeljebb 1 évig tároljuk, vagy amíg te nem kéred a törlésüket. Törlési kérelmet
      a{' '}
      <a href="mailto:hello@luxiflow.io" className="text-green-600 underline">
        hello@luxiflow.io
      </a>{' '}
      címen fogadunk.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">5. Sütik (cookie-k)</h3>
    <p>
      Az oldal opcionálisan analitikai sütiket használhat a látogatottság méréséhez. Ehhez a
      sütibanner elfogadása szükséges. Az adatok anonimizálva kerülnek feldolgozásra, és személyhez
      nem köthetők.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">6. A te jogaid</h3>
    <ul className="list-disc pl-5 space-y-1 mt-2">
      <li>Hozzáférés – megtekintheted a rólad tárolt adatokat</li>
      <li>Helyesbítés – kérheted helytelen adataid javítását</li>
      <li>Törlés – kérheted adataid azonnali törlését</li>
      <li>Tiltakozás – tiltakozhatsz az adatkezelés ellen</li>
    </ul>
    <p className="mt-2">
      Bármely kéréssel írj a{' '}
      <a href="mailto:hello@luxiflow.io" className="text-green-600 underline">
        hello@luxiflow.io
      </a>{' '}
      címre.
    </p>

    <h3 className="font-bold text-slate-900 text-base pt-2">7. Panaszjog</h3>
    <p>
      Ha úgy érzed, hogy megsértettük adatvédelmi jogaidat, panaszt tehetsz a Nemzeti Adatvédelmi
      és Információszabadság Hatóságnál (NAIH,{' '}
      <a
        href="https://www.naih.hu"
        className="text-green-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        naih.hu
      </a>
      ).
    </p>
  </>
);
