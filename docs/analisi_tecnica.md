## **Documento di Analisi Tecnica (DAT): Bomb Jack (Versione PC)**

Versione: 1.1

Data: 5 Novembre 2025

Basato su: PRD "Bomb Jack", DAF "Bomb Jack"

### **1\. Architettura di Sistema (Modificata per PC)**

Il gioco sarà basato su un'architettura software moderna (es. Entity-Component-System) e un **game loop** standard, gestito da un motore di gioco o da un framework. L'obiettivo è replicare fedelmente la *logica* e il *feeling* del gioco arcade originale, ma su piattaforme PC moderne.

| Componente | Specifiche Tecniche | Dettagli di Implementazione |
| :---- | :---- | :---- |
| **Piattaforma Target** | PC (Windows, macOS, Linux) | Sviluppo tramite un motore di gioco (es. Godot, Unity) o un framework web (es. HTML5/JavaScript con Canvas/WebGL). |
| **Schermo/Rendering** | Rendering 2D ad alta risoluzione | Utilizzo di sprite ad alta definizione. Il rendering gestirà il corretto *aspect ratio* (rapporto d'aspetto) dell'originale (verticale 256x224), scalato per schermi moderni (es. *letterboxing* o *pillarboxing*). |
| **Input** | Tastiera e Gamepad | Implementazione di un sistema di *input mapping* per supportare: \- Tastiera (es. Tasti freccia/WASD per il movimento, 'Spazio' per Salto). \- Gamepad (es. D-Pad/Analogico, pulsante A/X per Salto) via XInput/DirectInput. |
| **Logica di Gioco (Game Loop)** | Game loop moderno (Delta Time) | Il ciclo di gioco (Input $\\rightarrow$ Update $\\rightarrow$ Render) sarà gestito dal motore. **Critico:** La fisica (salto, gravità, planata) deve essere implementata con *delta time* per essere indipendente dal frame rate (FPS) e garantire un comportamento coerente. |

---

### **2\. Implementazione Tecnica dei Moduli Funzionali**

*(Invariato dall'originale, poiché la logica di gioco è la stessa)*

#### **2.1. Modulo: Movimento e Fisica del Personaggio (Jack)**

La meccanica unica di **planata/volo lento** (F.MOV.04) richiede un controllo preciso del motore fisico.

* **Movimento Orizzontale (F.MOV.01):** Velocità fissa (pixel/secondo, gestita tramite delta time).  
* **Salto e Gravità (F.MOV.02, F.MOV.03):** Implementazione di una variabile velocitàY soggetta a gravità costante. L'altezza del salto è determinata dalla spinta iniziale (velocitàY\_iniziale) proporzionale al tempo di pressione del pulsante (fino a un massimo).  
* **Planata/Volo Lento (F.MOV.04):** Quando il pulsante 'Salto' è premuto in aria, la gravità applicata (o l'incremento di velocitàY) deve essere **significativamente ridotta** (es. a $\\frac{1}{4}$ del valore normale), consentendo un movimento orizzontale prolungato e controllato.  
  * **Planata Tecnica:** La pressione del pulsante 'Salto' mentre Jack è in aria può anche *interrompere* la planata e farlo ricadere (F.MOV.04).  
* **Collisione Piattaforme (F.MOV.05):** Rilevazione delle collisioni (es. tramite Raycast o AABB) di Jack con le piattaforme. La logica deve reimpostare velocitàY a zero e bloccare la posizione Y di Jack sulla superficie della piattaforma (collisione solida).

  #### **2.2. Modulo: Oggetti e Punteggio**

Il sistema di punteggio richiede un tracciamento avanzato per il bonus di sequenza.

* **Lit Bomb Sequence (F.SCOR.03):** È necessario un array (o lista) delle 24 bombe con un **indice** che traccia la bomba attualmente "Accesa" (Lit Bomb).  
  * Alla raccolta di una Lit Bomb (200 punti), l'indice avanza all'elemento successivo nell'ordine predefinito.  
  * La raccolta di 20 o più bombe accese in sequenza nel round garantisce un bonus elevato (es. 10.000+ punti).  
* **Power Ball (F.OBJ.02):** Richiede un **misuratore di bonus** (ad es. 20 segmenti) che si riempie con le bombe raccolte (più velocemente con le Lit Bomb: 2 segmenti vs. 1 segmento). Al riempimento, la Power Ball ('P') viene generata.  
* **Moltiplicatore Bonus (F.OBJ.01):** Una variabile globale moltiplicatorePunteggio (max x5) viene incrementata quando Jack raccoglie la moneta 'B', che appare ogni 5000 punti.  
* **Punti Nemici (F.OBJ.04):** I nemici congelati, se toccati durante lo stato Power Ball, rilasciano punti che vanno in una progressione crescente (100, 200, 300, 500, 800, 1.200, 2.000 punti) e sono soggetti al moltiplicatore corrente.

  #### **2.3. Modulo: Nemici e Sfida**

* **Spawn Continuo (F.ENEM.02):** Implementazione di un **timer/contatore di spawn** per generare nuovi nemici dai bordi dello schermo, con frequenza e velocità che aumentano progressivamente in base al roundCorrente.  
* **Tipi di Nemici (F.ENEM.03):**  
  * **Uccelli/Mummie:** Pattern di movimento predefinito o inseguimento (es. A\* o pathfinding semplice).  
  * **Sfera/Orb:** Tendono a fluttuare verso Jack cercando di occupare la sua stessa fila orizzontale.  
* **Stato 'P' (F.ENEM.04):** La raccolta della Power Ball imposta un flag globale statoInvincibilita a TRUE e un timerPowerBall. Tutti i nemici attivi vengono temporaneamente sostituiti dal loro sprite 'moneta' e il loro comportamento (IA) viene disattivato fino allo scadere del timer.  
  ---

  ### **3\. Gestione di Sistema (UI/UX e Requisiti Tecnici Aggiuntivi)**

*(Invariato dall'originale)*

* **Visualizzazione (F.SYS.01, F.SYS.02, F.SYS.04):** Le statistiche (SCORE, ROUND, Vite) devono essere renderizzate come overlay (UI) sullo schermo di gioco.  
* **Timer (F.SYS.03):** Una variabile timerRound decrescente (gestita tramite delta time), la cui scadenza (raggiungendo 0\) attiva la condizione di perdita vita (F.MOV.06).  
* **Transizione di Livello (F.SYS.05):** Dopo la raccolta delle 24 bombe, la logica deve avviare la sequenza di transizione (es. dissolvenza), caricare le risorse del round successivo (nuovo sfondo/piattaforme) e resettare nemici e bombe.

