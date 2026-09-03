# Øvelse 8: Semantik, headings og målrettet ARIA

## Situation

Du overtager en lille produktside, som visuelt ser rimelig ud og allerede har fungerende JavaScript. Markuppen og den programmatisk formidlede tilstand er imidlertid ikke færdig.

Din opgave er at gøre siden lettere at forstå og betjene med tastatur og hjælpemidler.

## Arbejdsform

Arbejd gerne to og to. Øvelsen er delt i to arbejdsblokke plus en fælles opsamling:

- **Del 1:** Punkt 1–3 – headingstruktur, landmarks og disclosure.
- **Del 2:** Punkt 4–6 – produktknapper, billeder og statusfeedback.

1. Åbn først siden uden at ændre koden.
2. Navigér med Tab, Enter og Mellemrum.
3. Inspicér relevante elementer i Chromes **Elements → Accessibility**-panel.
4. Se eventuelt siden som en liste af headings og landmarks.
5. Ret én ting ad gangen, og inspicér og test igen. Et korrekt accessibility-træ er ikke i sig selv en garanti for korrekt tastaturadfærd.

Arbejdet foregår primært i HTML og JavaScript. Tilpas kun CSS, hvis ændrede elementer eller headingniveauer kræver det, fx en selector, der rammer `h2`, men nu skal ramme `h3`. I skal ikke redesigne siden.

## Del 1: Struktur og betjening

Begynd med headingstrukturen: Noter kort, hvilke overskrifter der hører under hvilke, før I retter koden. Arbejd derefter gennem punkt 1–3 i rækkefølge.

### 1. Headingstruktur

- Skab en meningsfuld rækkefølge fra sidens `h1` til sektioner og produktkort.
- Niveauet skal beskrive indholdets hierarki, ikke tekstens visuelle størrelse.
- Kontrollér den samlede, renderede side – ikke hvert element isoleret.

### 2. Landmarks, regions og aktuel placering

- Find først sidens native landmarks fra `header`, `nav`, `main` og `footer`. Siden har to `header`-elementer: Undersøg, om begge bliver til et `banner`-landmark.
- Siden har mere end én navigation. Gør deres formål tydelige i accessibility-træet.
- Inspicér de to `section`-elementer. En `section` bliver ikke automatisk et nyttigt, navngivet landmark alene ved at være en section.
- Vurdér, om “Før du vælger” og “Populære lige nu” er selvstændige områder, som det giver mening at navigere direkte til. Eksponér de relevante sections som navngivne regions ved at genbruge deres synlige overskrifter som navnekilde.
- Begrund valget ud fra, hvad brugeren skal kunne finde eller gøre. Det er ikke et mål at gøre begge sections til regions; der kan være flere acceptable løsninger.
- Undgå at gøre enhver layout-wrapper til en region. Landmarks skal gøre navigationen kortere og tydeligere, ikke længere.
- Markér den aktuelle side i brødkrummerne, så også skærmlæserbrugere kan identificere den.

### 3. Native kontrol og disclosure-state

- Kontrollen “Vis tips om pasform” ligner en knap i accessibility-træet, men er ikke en native knap.
- Gør den robust med mus, Enter og Mellemrum.
- Kommunikér både relationen til indholdet og den aktuelle åbne/lukkede tilstand.
- Hold tilstanden synkroniseret i JavaScript.

Inden I går videre: Kontrollér headingstrukturen og landmark-listen. Afprøv også disclosure-knappen med tastaturet, og inspicér dens tilstand, både når indholdet er lukket og åbent.

## Del 2: Navne, tilstande og feedback

Fortsæt i de samme filer med punkt 4–6. Ved ændringer i produktkortene: Ret og test først ét kort, før I gentager rettelsen på det andet. Kontrollér, at det andet kort får sit eget produktnavn og sine egne referencer.

### 4. Favoritknapper

- Giv hver ikonknap et forståeligt, produktspecifikt navn.
- Kommunikér, om produktet er valgt som favorit.
- Den synlige ændring fra `♡` til `♥` må ikke være den eneste information om tilstanden.
- Inspicér navn og tilstand før aktivering, efter aktivering og efter endnu en aktivering.

### 5. Gentagne produkthandlinger

- Begge knapper hedder “Læg i kurv”. Gør deres accessible names unikke uden at miste den synlige tekst.
- Brug gerne den synlige handlingstekst og produktoverskriften som eksisterende navnekilder.
- Sørg for, at dekorative ikoner ikke forstyrrer navneberegningen.

### 6. Billeder og statusfeedback

- Giv produktbillederne passende tekstalternativer ud fra deres funktion på denne side.
- Den eksisterende kurvbesked bør kunne annonceres uden at flytte fokus.
- Brug kun en live region til den korte status – ikke til at gøre alle DOM-ændringer højlydte.

## Begrænsninger

- Foretræk native HTML frem for at reparere generiske elementer med flere roller og tastatur-events.
- Tilføj ikke ARIA til alt. Hver attribut skal have et konkret formål.
- Bevar den eksisterende visuelle funktionalitet.
- Der kan være flere acceptable løsninger, særligt for valget af regions og de produktspecifikke knapnavne.

## Aflevering eller fælles opsamling

Vær klar til kort at vise:

- sidens endelige headingstruktur,
- sidens landmarks før og efter rettelserne,
- accessible name og state for en favoritknap,
- accessible name for begge “Læg i kurv”-knapper,
- disclosure-knappens properties før og efter aktivering,
- og ét sted, hvor native HTML var en bedre løsning end ARIA.
