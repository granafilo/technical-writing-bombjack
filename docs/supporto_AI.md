# **Linee Guida per Sviluppo AI: Bomb Jack (Edizione Moderna)**

## **1\. Introduzione**

Questo documento definisce le linee guida operative per lo sviluppo (o la replica) del videogioco arcade "Bomb Jack", destinato a piattaforme PC moderne. L'obiettivo è ricreare fedelmente il *gameplay*, la *fisica* e l'*estetica* dell'originale del 1984, aderendo alle specifiche dei documenti prd.md, analisi\_funzionale.md e analisi\_tecnica.md, ma svincolandosi dai limiti hardware originali.

## **2\. Architettura di Base e Specifiche Tecniche (PC Moderni)**

L'agente di sviluppo deve aderire ai seguenti vincoli tecnici e stilistici per una replica moderna:

* **Piattaforma Target:** PC Moderni (es. Windows, macOS, Linux).  
* **Performance:** Il gioco deve girare a 60 FPS stabili.  
  * **Importante:** La logica di gioco (fisica, velocità di Jack, velocità dei nemici, timer) deve essere *indipendente dal frame rate* (es. basata su delta\_time) e calibrata per *simulare* perfettamente la velocità e il "feel" dell'originale arcade, evitando che il gioco giri troppo velocemente su hardware moderni.  
* **Risoluzione e Grafica (Vincolo Chiave):**  
  * La risoluzione *interna* del gioco deve essere fissa a **256 x 224 pixel** (raster verticale).  
  * Il gioco dovrà gestire l'upscaling (ingrandimento) a schermo intero o in finestra, garantendo una grafica "pixel-perfect" (senza filtri di sfocatura, es. "Nearest Neighbor" o "Integer Scaling").  
* **Rendering:** L'estetica originale deve essere preservata:  
  * Gli sfondi (Piramidi, Acropoli, ecc.) devono essere statici e basati su un sistema a piastrelle (tiles).  
  * Il personaggio (Jack), i nemici, le bombe e gli oggetti bonus devono essere sprite dinamici.  
* **Input:** Il sistema deve supportare input moderni (tastiera, gamepad) mappati per emulare il controllo originale:  
  * Un sistema di movimento a 8 direzioni (es. frecce direzionali, WASD, D-pad).  
  * Un pulsante di "Azione" (Salto).  
  * È **cruciale** rilevare la *durata* della pressione del pulsante 'Salto' per gestire il salto variabile e la planata.  
* **Game Loop:** Il gioco seguirà un loop arcade continuo (Input $\\rightarrow$ Update Logica $\\rightarrow$ Render).

  ## **3\. Modulo 1: Personaggio (Jack) \- Movimento e Fisica**

Il nucleo del gioco è il sistema di movimento unico di Jack.

* **Movimento Orizzontale (F.MOV.01):** Velocità fissa sull'asse X (sinistra/destra) a terra o in aria.  
* **Salto Variabile (F.MOV.02, F.MOV.03):** L'altezza del salto (spinta verticale iniziale) è proporzionale alla durata della pressione del pulsante 'Salto' (fino a un massimo).  
* **Planata / Volo Lento (F.MOV.04):**  
  1. **Implementazione (Rif. DAT 2.1):** Quando Jack è in aria e il pulsante 'Salto' viene tenuto premuto, la forza di gravità (o l'incremento di velocitàY) deve essere **ridotta significativamente** (es. a $\\frac{1}{4}$ del valore normale).  
  2. **Effetto (Rif. DAF 3):** Questo permette a Jack di mantenere l'altitudine e spostarsi orizzontalmente in modo controllato ("Planata Tecnica Unica").  
* **Collisioni Piattaforma (F.MOV.05, DAT 2.1):** Jack deve collidere solidamente con le piattaforme solo dall'alto. Non deve cadere attraverso di esse.  
* **Perdita Vita (F.MOV.06):** La condizione di sconfitta (perdita di una vita) si attiva in due casi:  
  1. Contatto con un'entità nemica (se Jack non è in stato 'P').  
  2. Esaurimento del timer di round (F.SYS.03).

  ## **4\. Modulo 2: Bombe, Oggetti e Sistema di Punteggio**

Il sistema di punteggio è progettato per incentivare il rischio e un percorso ottimale.

* **Obiettivo Round (DAF 2, F.SYS.05):** Raccogliere tutte le 24 bombe presenti sullo schermo.  
* **Punteggio Bombe (F.SCOR.01, F.SCOR.02):**  
  * Bomba Spenta: 100 punti.  
  * Bomba Accesa (Lit Bomb): 200 punti.  
* **Funzionalità Chiave: Sequenza "Lit Bomb" (F.SCOR.03, DAT 2.2):**  
  * Deve esistere un **ordine predefinito** (array o lista) per le 24 bombe.  
  * Un indice deve tracciare quale bomba è attualmente la "Lit Bomb" (visivamente lampeggiante).  
  * Quando Jack raccoglie la Lit Bomb, l'indice avanza alla bomba successiva nella sequenza.  
  * Raccogliere una bomba "spenta" non interrompe la sequenza, ma assegna solo 100 punti.  
  * Un bonus di punteggio elevato (es. 10.000+) viene assegnato se 20 o più Lit Bomb vengono raccolte in sequenza.  
* **Oggetto: Bonus Multiplier ('B') (F.OBJ.01, PRD 3.2):**  
  * Appare quando il giocatore ottiene un incremento di 5000 punti.  
  * Aumenta un moltiplicatore di punteggio globale (da x1 fino a un massimo di x5).  
* **Oggetto: Power Ball ('P') (F.OBJ.02, DAT 2.2):**  
  * Appare dopo il riempimento di un "misuratore di bonus" (es. 20 segmenti).  
  * Il misuratore si riempie raccogliendo bombe (es. 1 segmento per bomba spenta, 2 segmenti per Lit Bomb).  
  * **Effetto:** Attiva lo stato "Power-Up": Jack è invincibile e tutti i nemici si congelano, trasformandosi in monete/oggetti di punteggio.  
* **Oggetto: Moneta Speciale ('S' o 'E') (F.OBJ.03, PRD 3.2):** Appare occasionalmente e concede una vita extra.

  ## **5\. Modulo 3: Nemici e Sfida**

I nemici forniscono la sfida principale e la pressione sul giocatore.

* **Collisione (F.ENEM.01):** Il contatto con Jack è letale, a meno che Jack non sia nello stato "Power Ball" ('P').  
* **Spawn (F.ENEM.02, DAT 2.3):**  
  * I nemici appaiono (spawn) continuamente ai bordi dello schermo.  
  * La frequenza di spawn e la velocità dei nemici devono aumentare progressivamente con l'avanzare dei round.  
* **Tipi di Nemici (F.ENEM.03, PRD 3.3):** Implementare 3-5 tipi di nemici (Uccelli, Mummie/Sfere, Dischi Volanti) ciascuno con un pattern di movimento unico (Fisso, Inseguimento, Casuale/Fluttuante).  
* **Funzionalità Chiave: Sconfitta Nemici (Stato 'P') (F.ENEM.04, F.OBJ.04, DAT 2.2):**  
  * I nemici possono essere sconfitti *solo* durante lo stato 'P' (attivato da F.OBJ.02).  
  * Toccando un nemico congelato (moneta), questo viene rimosso e assegna punti.  
  * Il punteggio dei nemici raccolti in un singolo stato 'P' è progressivo (es. 100, 200, 300, 500... 2000 punti).  
  * Questi punti sono soggetti al moltiplicatore 'B' (F.OBJ.04).  
  * Al termine del timer dello stato 'P', i nemici rimanenti riprendono il loro movimento (F.ENEM.04).

  ## **6\. Modulo 4: Gestione di Sistema e Interfaccia (UI)**

* **Interfaccia Utente (UI) (DAF 6, DAT 3):** Le seguenti informazioni devono essere sempre visibili come overlay, renderizzate rispettando la risoluzione interna (256x224):  
  * Punteggio (SCORE) (F.SYS.01)  
  * Round Corrente (ROUND) (F.SYS.02)  
  * Vite Rimanenti (F.SYS.04)  
  * Crediti (F.SYS.04)  
* **Timer di Round (F.SYS.03, DAT 3):**  
  * Implementare un timer (contatore decrescente) per ogni round.  
  * Se il timer raggiunge lo zero, Jack perde una vita (F.MOV.06).  
* **Condizione di Vittoria Round (F.SYS.05, DAT 3):**  
  * Si attiva quando tutte le 24 bombe sono state raccolte.  
  * Avvia una breve transizione.  
  * Carica le risorse del round successivo (nuovo sfondo/piattaforme), resetta le bombe e i nemici, e incrementa il contatore del round.

