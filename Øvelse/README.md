# Undervisernoter: Accessibility-træet i Chrome

Siden er en demo og samtaleøvelse, ikke en modelbesvarelse. Åbn `index.html` direkte eller gennem en lokal server, og inspicér eksemplerne i Chromes **Elements → Accessibility**-panel.

## Forslag til arbejdsgang

Brug cirka 5–10 minutter pr. scenarie:

1. Forudsig, hvad træet indeholder.
2. Markér et element i Elements-panelet.
3. Find role, name, description og properties i Accessibility-panelet.
4. Udløs JavaScript-ændringen.
5. Inspicér igen og formulér forskellen med egne ord.

## 1. Samme udseende, forskellige roller

Forventede observationer:

- `<a href>` eksponeres som et link og aktiveres normalt med Enter.
- `<a>` uden `href` er ikke et link og kommer normalt ikke i tab-rækkefølgen.
- Det native `<button>` har knapsemantik og indbygget Enter- og mellemrumstastadfærd.
- `div[role="button"][tabindex="0"]` kan se korrekt ud i træet og modtage fokus, men demoens JavaScript implementerer kun `click`. Enter og Mellemrum mangler. Træet alene afslører derfor ikke hele fejlen.

## 2. Accessible name

Forventede observationer:

- Uden ARIA kommer navnet fra knappens tekstindhold: “Læg i kurv”.
- `aria-label` overskriver indholdet med “Tilføj Nike Zoom Vomero 5”. Det synlige “Læg i kurv” findes ikke i navnet, hvilket er problematisk for Label in Name og stemmestyring.
- `aria-labelledby="name-demo product-title"` refererer først til knappen selv og derefter produktoverskriften. Navnet bliver sammensat i den angivne rækkefølge.
- Chrome viser normalt både det beregnede navn og de kilder, der deltog i beregningen.

## 3. Medlemskab af træet

Forventede observationer:

- `hidden` og `display: none` fjerner normalt indhold fra både rendering og accessibility-træ.
- `aria-hidden="true"` fjerner indhold fra accessibility-træet, selv om det fortsat er visuelt synligt.
- `.visually-hidden` er visuelt skjult med CSS, men findes fortsat i accessibility-træet.
- Fjernes et element fra DOM’en, findes det naturligvis heller ikke i accessibility-træet.

Diskutér forskellen på at skjule noget for alle og kun at skjule det visuelt. `aria-hidden` bør ikke sættes på fokusérbare elementer eller på en forælder til fokusérbart indhold.

## 4. Dynamiske ændringer

### Disclosure

- Knappen beholder sin rolle og sit navn ændres med den synlige tekst.
- Dens `expanded`-state skifter mellem false og true.
- Panelet er ikke i træet, mens `hidden` er sat, og bliver tilgængeligt, når det vises.
- `aria-controls` udtrykker relationen, men har ikke ens praktisk værdi i alle kombinationer af browser og hjælpemiddel.

### Kurv og status

- Nye `<li>`-elementer bliver nye noder i både DOM og accessibility-træ.
- Statusområdet har rollen `status`, også når det er tomt.
- `role="status"` har implicit høflig live-regionadfærd. Fokus flyttes ikke til statusbeskeden.
- Det er stadig værd at diskutere, om hver ændring behøver en meddelelse. Live regions skal bruges selektivt.

### Udskift en gren

- `replaceChildren()` fjerner den tidligere undergren og indsætter en ny artikel med heading, tekst og link.
- Fokus bliver på knappen uden for den udskiftede gren. Havde den fokuserede kontrol ligget i grenen, skulle fokusplaceringen overvejes særskilt.

## 5. Facit til opsamlingen

Mini-webshoppen indeholder bevidst flere problemer end de seks, de studerende bliver bedt om at finde:

1. “Udvalgte sneakers” ligner en heading, men er blot en `div` uden heading-semantik.
2. Den første “Se detaljer” er et `<a>` uden `href`; den er hverken et rigtigt link eller normalt tastaturfokusérbar.
3. De to “Læg i kurv”-knapper har samme accessible name uden produktkontekst.
4. Hjerteknappen er ikon-only, og ikonet er `aria-hidden`; knappen har derfor intet navn.
5. “Fjern fra sammenligning” overskrives af `aria-label="Luk"`. Navnet matcher ikke den synlige tekst eller handlingen.
6. Størrelsesvælgeren ligner et enkeltvalg, men almindelige knapper udtrykker hverken gruppe, valgt state eller radio-semantik.
7. Størrelsesvalget vises kun gennem en visuel CSS-klasse. Accessibility-træet ændres ikke, når en størrelse vælges.
8. Teksten “E-mail” er et `p`, ikke en label for inputfeltet. Placeholderen er ikke en erstatning for en label.
9. Fejlteksten er ikke knyttet til inputfeltet med eksempelvis `aria-describedby`, og feltet får ikke `aria-invalid`.
10. “Åbn kurv” er en fokusérbar `div` uden rolle. Den mangler desuden native knapadfærd for Enter og Mellemrum.
11. Den visuelle besked om, at kurven er åbnet, udtrykker ikke nogen programmatisk tilstand eller relation.

Mulige rettelser bør først og fremmest bruge native HTML: headings, links med destination, buttons, labels, fieldset/legend og radio inputs. ARIA bør supplere, hvor HTML ikke udtrykker den nødvendige tilstand eller relation.

## Kort, realistisk løsningsforslag til opsamlingen

- Gør “Udvalgte sneakers” til en rigtig `h2`, så produktsektionen får en overskrift i dokumentstrukturen.
- Gør “Se detaljer” til et link med produktets faktiske URL som `href`.
- Bevar den synlige tekst “Læg i kurv”, men giv hver knap produktkontekst. Vis helst hele det unikke navn; hvis pladsen er begrænset, kan produktnavnet tilføjes efter den synlige tekst med en visuelt skjult span.
- Giv favoritknappen et produktspecifikt navn, eksempelvis “Favorit: Nike Zoom Vomero 5”, og udtryk valget med `aria-pressed`.
- Bevar “Fjern fra sammenligning” som knappens accessible name. Et ikon kan skjules med `aria-hidden`, men et misvisende `aria-label="Luk"` skal fjernes.
- Byg størrelsesvalget som `fieldset`, `legend` og native radio inputs. Dermed følger gruppen, det valgte element og piletastadfærden med uden specialskrevet ARIA eller JavaScript.
- Forbind “E-mail” med feltet gennem et rigtigt `label`. Knyt instruktion og en eventuel fejl til feltet med `aria-describedby`, og sæt først `aria-invalid="true"`, når feltet er valideret og fundet ugyldigt.
- Gør “Åbn kurv” til en native `button`. Hvis den åbner en modal kurv, bruges et `dialog`, og fokus flyttes ind ved åbning og tilbage til knappen ved lukning. Hvis den blot viser indhold på siden, kan knappen i stedet have `aria-expanded` og `aria-controls`.
- Bekræft “Læg i kurv” med én kort, eksisterende `role="status"`-region uden at flytte fokus. Kurvens åbne/lukkede tilstand skal derimod kommunikeres gennem komponentens rolle, state og fokusadfærd – ikke gennem en statusbesked alene.
