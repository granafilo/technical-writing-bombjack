## **Documento di Analisi Tecnica (DAT): Bomb Jack**

Versione: 1.0

Data: 5 Novembre 2025

Basato su: PRD "Bomb Jack" e DAF "Bomb Jack"


### **1. Architettura di Sistema**

Il gioco è basato su un'architettura **arcade a loop continuo** (game loop), che gestisce gli stati di gioco, l'input, la logica e il rendering. L'architettura hardware di riferimento è quella originale del cabinato Tehkan/Tecmo del 1984.

| Componente | Specifiche Tecniche | Dettagli di Implementazione |
|---|---|---|
| Piattaforma Target | Arcade (Zilog Z80 @ 4MHz) | L'implementazione moderna deve emulare o mantenere le restrizioni di clock e ciclo, specialmente per il movimento e la fisica. |
| Schermo/Rendering | Raster verticale (256 x 224 pixel) | Utilizzo di un sistema di rendering basato su piastrelle (tiles) per gli sfondi statici (es. Acropoli, Piramidi), e sprite per gli oggetti dinamici (Jack, bombe, nemici). |
| Input | Joystick a 8 direzioni, 1 pulsante (Salto) | Implementazione di un modulo di gestione degli interrupt per l'input, con rilevamento della durata della pressione del pulsante 'Salto' (per salto variabile/planata, F.MOV.03, F.MOV.04). |
| Logica di Gioco (Game Loop) | Ciclo di gioco principale: Input $\rightarrow$ Update Logica $\rightarrow$ Render | La logica deve gestire in un singolo frame l'aggiornamento della posizione di Jack e dei nemici, la gestione delle collisioni e l'aggiornamento del punteggio. |


### **2. Implementazione Tecnica dei Moduli Funzionali**

#### **2.1. Modulo: Movimento e Fisica del Personaggio (Jack)**

La meccanica unica di **planata/volo lento** (F.MOV.04) richiede un controllo preciso del motore fisico.

- **Movimento Orizzontale (F.MOV.01):** Velocità fissa in pixel/frame.

- **Salto e Gravità (F.MOV.02, F.MOV.03):** Implementazione di una variabile velocitàY soggetta a gravità costante. L'altezza del salto è determinata dalla spinta iniziale (velocitàY_iniziale) proporzionale al tempo di pressione del pulsante (fino a un massimo).

- **Planata/Volo Lento (F.MOV.04):** Quando il pulsante 'Salto' è premuto in aria, la gravità applicata (o l'incremento di velocitàY) deve essere **significativamente ridotta** (es. a $\frac{1}{4}$ del valore normale), consentendo un movimento orizzontale prolungato e controllato. \
**Planata Tecnica:** La pressione del pulsante 'Salto' mentre Jack è in aria può anche *interrompere* la planata e farlo ricadere (F.MOV.04).

- **Collisione Piattaforme (F.MOV.05):** Rilevazione delle collisioni di Jack con le piastrelle delle piattaforme dall'alto. La logica deve reimpostare velocitàY a zero e bloccare la posizione Y di Jack sulla superficie della piattaforma (collisione solida).

#### **2.2. Modulo: Oggetti e Punteggio**

Il sistema di punteggio richiede un tracciamento avanzato per il bonus di sequenza.

- **Lit Bomb Sequence (F.SCOR.03):** È necessario un array (o lista) delle 24 bombe con un **indice** che traccia la bomba attualmente "Accesa" (Lit Bomb).

- Alla raccolta di una Lit Bomb (200 punti), l'indice avanza all'elemento successivo nell'ordine predefinito.

- La raccolta di 20 o più bombe accese in sequenza nel round garantisce un bonus elevato (es. 10.000+ punti).

- **Power Ball (F.OBJ.02):** Richiede un **misuratore di bonus** (ad es. 20 segmenti) che si riempie con le bombe raccolte (più velocemente con le Lit Bomb: 2 segmenti vs. 1 segmento). Al riempimento, la Power Ball ('P') viene generata.

- **Moltiplicatore Bonus (F.OBJ.01):** Una variabile globale moltiplicatorePunteggio (max x5) viene incrementata quando Jack raccoglie la moneta 'B', che appare ogni 5000 punti.

- **Punti Nemici (F.OBJ.04):** I nemici congelati, se toccati durante lo stato Power Ball, rilasciano punti che vanno in una progressione crescente (100, 200, 300, 500, 800, 1.200, 2.000 punti) e sono soggetti al moltiplicatore corrente.

#### **2.3. Modulo: Nemici e Sfida**

- **Spawn Continuo (F.ENEM.02):** Implementazione di un **timer/contatore di spawn** per generare nuovi nemici dai bordi dello schermo, con frequenza e velocità che si riducono e aumentano progressivamente in base al roundCorrente.

- **Tipi di Nemici (F.ENEM.03):**

- **Uccelli/Mummie:** Pattern di movimento predefinito o inseguimento.

- **Sfera/Orb:** Tendono a fluttuare verso Jack cercando di occupare la sua stessa fila orizzontale.

- **Stato 'P' (F.ENEM.04):** La raccolta della Power Ball imposta un flag globale statoInvincibilita a TRUE e un timerPowerBall. Tutti i nemici attivi vengono temporaneamente sostituiti dal loro sprite 'moneta' e il loro comportamento viene disattivato fino allo scadere del timer.


### **3. Gestione di Sistema (UI/UX e Requisiti Tecnici Aggiuntivi)**

- **Visualizzazione (F.SYS.01, F.SYS.02, F.SYS.04):** Le statistiche (SCORE, ROUND, Vite, Crediti) devono essere renderizzate come overlay dello schermo di gioco.

- **Timer (F.SYS.03):** Una variabile timerRound decrescente, legata al frame rate, la cui scadenza (raggiungendo 0) attiva la condizione di perdita vita (F.MOV.06).

- **Transizione di Livello (F.SYS.05):** Dopo la raccolta delle 24 bombe, la logica deve avviare la sequenza di transizione, caricare le risorse del round successivo (nuovo sfondo/piattaforme, es. Castello di Neuschwanstein), e resettare i nemici e le bombe.
