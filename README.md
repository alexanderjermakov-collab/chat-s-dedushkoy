# Pokalbis su seneliu

Minimalus šeimos vaizdo pokalbio MVP: statinis puslapis su mygtukais skambinti seneliui arba močiutei. Prieš prisijungimą puslapis paprašo šeimos slaptažodžio, o tada atidaro meet.jit.si kambarį puslapyje.

## Kaip patikrinti lokaliai

Atidarykite `index.html` naršyklėje arba paleiskite paprastą lokalų serverį:

```sh
python3 -m http.server 8080
```

Tada atidarykite:

```text
http://localhost:8080
```

## Kaip publikuoti per GitHub Pages

1. Sukurkite naują GitHub paskyrą.
2. Sukurkite naują viešą repozitoriją, pavyzdžiui, `chat-s-dedushkoy`.
3. Įkelkite failus iš šio aplanko.
4. Repozitorijos nustatymuose atidarykite `Pages`.
5. Pasirinkite publikavimą iš šakos `main`, aplankas `/root`.
6. Atidarykite sugeneruotą GitHub Pages URL.

## Kambariai ir slaptažodžiai

Kambariai, slaptažodžiai ir Jitsi rodomi vardai nustatomi faile `script.js`:

```js
const rooms = {
  grandpa: {
    title: "Skambutis seneliui",
    roomName: "chat-s-dedushkoy-grandpa-mvp",
    password: "1234",
    displayName: "Senelis",
  },
  grandma: {
    title: "Skambutis močiutei",
    roomName: "chat-s-dedushkoy-grandma-mvp",
    password: "5678",
    displayName: "Močiutė",
  },
};
```

Prieš publikavimą geriau pakeisti kambarių pavadinimus ir slaptažodžius į unikalius šeimos variantus.

Svarbu: tai paprasta apsauga nuo atsitiktinio prisijungimo, o ne pilna serverinė autorizacija. Kadangi svetainė statinė, slaptažodžius techniškai galima rasti puslapio kode.
