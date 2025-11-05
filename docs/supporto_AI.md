# Linee Guida per Sviluppo AI: Bomb Jack (1984)

## **1. Introduzione**

Questo documento definisce le linee guida operative per lo sviluppo (o la replica) del videogioco arcade "Bomb Jack". L'obiettivo è aderire fedelmente alle specifiche definite nei documenti prd.md, analisi_funzionale.md e analisi_tecnica.md.

## **2. Architettura di Base e Vincoli Tecnici**

L'agente di sviluppo deve operare entro i seguenti vincoli tecnici fondamentali:

- **Piattaforma Target (Rif. DAT 1):** L'implementazione deve rispettare i vincoli di un'architettura Zilog Z80 @ 4MHz, specialmente per quanto riguarda la velocità della logica di gioco e della fisica.

- **Risoluzione (Rif. DAT 1, PRD 4):** Il gioco opera su uno schermo raster verticale con risoluzione fissa di **256 x 224 pixel**.

- **Rendering (Rif. DAT 1):**

- Gli sfondi (Piramidi, Acropoli, Castello Neuschwanstein, ecc.) sono statici e basati su un sistema a piastrelle (tiles).

- Il personaggio (Jack), i nemici, le bombe e gli oggetti bonus sono sprite dinamici.

- **Input (Rif. DAT 1, PRD 4):** Il sistema deve gestire un joystick a 8 direzioni e 1 pulsante (Salto). È cruciale rilevare la *durata* della pressione del pulsante 'Salto'.

- **Game Loop (Rif. DAF 2, DAT 1):** Il gioco segue un loop arcade continuo (Input $\rightarrow$ Update Logica $\rightarrow$ Render).

## **3. Modulo 1: Personaggio (Jack) - Movimento e Fisica**

Il nucleo del gioco è il sistema di movimento unico di Jack.

- **Movimento Orizzontale (F.MOV.01):** Velocità fissa sull'asse X (sinistra/destra) a terra o in aria.

- **Salto Variabile (F.MOV.02, F.MOV.03):** L'altezza del salto (spinta verticale iniziale) è proporzionale alla durata della pressione del pulsante 'Salto' (fino a un massimo) (Rif. DAT 2.1).

- **Planata / Volo Lento (F.MOV.04):**

1. **Implementazione (Rif. DAT 2.1):** Quando Jack è in aria e il pulsante 'Salto' viene tenuto premuto, la forza di gravità (o l'incremento di velocitàY) deve essere **ridotta significativamente** (es. a $\frac{1}{4}$ del valore normale).

2. **Effetto (Rif. DAF 3):** Questo permette a Jack di mantenere l'altitudine e spostarsi orizzontalmente in modo controllato ("Planata Tecnica Unica").

4. **Collisioni Piattaforma (F.MOV.05, DAT 2.1):** Jack deve collidere solidamente con le piattaforme solo dall'alto. Non deve cadere attraverso di esse.

5. **Perdita Vita (F.MOV.06):** La condizione di sconfitta (perdita di una vita) si attiva in due casi:

3. Contatto con un'entità nemica (se Jack non è in stato 'P').

4. Esaurimento del timer di round (F.SYS.03).

## **4. Modulo 2: Bombe, Oggetti e Sistema di Punteggio**

Il sistema di punteggio è progettato per incentivare il rischio e un percorso ottimale.

- **Obiettivo Round (DAF 2, F.SYS.05):** Raccogliere tutte le 24 bombe presenti sullo schermo.

- **Punteggio Bombe (F.SCOR.01, F.SCOR.02):**

- Bomba Spenta: 100 punti.

- Bomba Accesa (Lit Bomb): 200 punti.

- **Funzionalità Chiave: Sequenza "Lit Bomb" (F.SCOR.03, DAT 2.2):**

- Deve esistere un **ordine predefinito** (array o lista) per le 24 bombe.

- Un indice deve tracciare quale bomba è attualmente la "Lit Bomb" (visivamente lampeggiante).

- Quando Jack raccoglie la Lit Bomb, l'indice avanza alla bomba successiva nella sequenza.

- Raccogliere una bomba "spenta" non interrompe la sequenza, ma assegna solo 100 punti.

- Un bonus di punteggio elevato (es. 10.000+) viene assegnato se 20 o più Lit Bomb vengono raccolte in sequenza (Rif. PRD 3.2, DAT 2.2).

- **Oggetto: Bonus Multiplier ('B') (F.OBJ.01, PRD 3.2):**

- Appare quando il giocatore ottiene un incremento di 5000 punti.

- Aumenta un moltiplicatore di punteggio globale (da x1 fino a un massimo di x5).

- **Oggetto: Power Ball ('P') (F.OBJ.02, DAT 2.2):**

- Appare dopo il riempimento di un "misuratore di bonus" (es. 20 segmenti).

- Il misuratore si riempie raccogliendo bombe (es. 1 segmento per bomba spenta, 2 segmenti per Lit Bomb).

- **Effetto:** Attiva lo stato "Power-Up": Jack è invincibile e tutti i nemici si congelano, trasformandosi in monete/oggetti di punteggio.

- **Oggetto: Moneta Speciale ('S' o 'E') (F.OBJ.03, PRD 3.2):** Appare occasionalmente e concede una vita extra.

## **5. Modulo 3: Nemici e Sfida**

I nemici forniscono la sfida principale e la pressione sul giocatore.

- **Collisione (F.ENEM.01):** Il contatto con Jack è letale, a meno che Jack non sia nello stato "Power Ball" ('P').

- **Spawn (F.ENEM.02, DAT 2.3):**

- I nemici appaiono (spawn) continuamente ai bordi dello schermo.

- La frequenza di spawn e la velocità dei nemici devono aumentare progressivamente con l'avanzare dei round.

- **Tipi di Nemici (F.ENEM.03, PRD 3.3):** Implementare 3-5 tipi di nemici (Uccelli, Mummie/Sfere, Dischi Volanti) ciascuno con un pattern di movimento unico (Fisso, Inseguimento, Casuale/Fluttuante) (Rif. DAT 2.3).

- **Funzionalità Chiave: Sconfitta Nemici (Stato 'P') (F.ENEM.04, F.OBJ.04, DAT 2.2):**

- I nemici possono essere sconfitti *solo* durante lo stato 'P' (attivato da F.OBJ.02).

- Toccando un nemico congelato (moneta), questo viene rimosso e assegna punti.

- Il punteggio dei nemici raccolti in un singolo stato 'P' è progressivo (es. 100, 200, 300, 500... 2000 punti) (Rif. DAT 2.2).

- Questi punti sono soggetti al moltiplicatore 'B' (F.OBJ.04).

- Al termine del timer dello stato 'P', i nemici rimanenti riprendono il loro movimento (F.ENEM.04).

## **6. Modulo 4: Gestione di Sistema e Interfaccia (UI)**

- **Interfaccia Utente (UI) (DAF 6, DAT 3):** Le seguenti informazioni devono essere sempre visibili come overlay:

- Punteggio (SCORE) (F.SYS.01)

- Round Corrente (ROUND) (F.SYS.02)

- Vite Rimanenti (F.SYS.04)

- Crediti (F.SYS.04)

- **Timer di Round (F.SYS.03, DAT 3):**

- Implementare un timer (contatore decrescente) per ogni round.

- Se il timer raggiunge lo zero, Jack perde una vita (F.MOV.06).

- **Condizione di Vittoria Round (F.SYS.05, DAT 3):**

- Si attiva quando tutte le 24 bombe sono state raccolte.

- Avvia una breve transizione.

- Carica le risorse del round successivo (nuovo sfondo/piattaforme), resetta le bombe e i nemici, e incrementa il contatore del round.

