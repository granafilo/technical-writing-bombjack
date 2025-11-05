### **Verbale Riunione: Analisi Funzionale (SLOT 2) - Bomb Jack**

Data: 5 Novembre 2025

Ora: 09:30 - 10:30

Luogo: Sala Riunioni "Arcade" / Meet Virtuale

**Presenti (3):**

- **Filippo Granata**

- **Alessandro Cervini**

- **Alessandro Tabaku**


### **1. Ordine del Giorno (OdG)**

1. Revisione finale del PRD (obiettivo SLOT 1).

2. Definizione e stesura collaborativa delle funzionalità dettagliate (obiettivo SLOT 2).

3. Approvazione del Documento di Analisi Funzionale (DAF) v1.0.

4. Identificazione dei prossimi passi (SLOT 3).

### **2. Sintesi della Discussione**

**Punto 1 & 2: Dal PRD al DAF**

- **Fillippo** apre la sessione riepilogando la visione di prodotto: un gioco "fast-paced" con un core loop basato sulla raccolta di bombe in sequenza (Lit Bomb) e una meccanica di movimento unica (planata).

- Il team ha proceduto alla stesura strutturata del DAF, traducendo i requisiti del PRD in moduli funzionali specifici.

**Punto 2.1: Modulo Movimento (F.MOV)**

- **Alessandro C.** sottolinea che la funzionalità F.MOV.04 (Planata/Volo Lento) è la sfida tecnica principale. Non è un semplice "salto prolungato", ma una vera e propria riduzione della gravità controllata dal giocatore.

- Si conferma che la pressione del tasto deve essere proporzionale all'altezza (F.MOV.03) e che la planata deve permettere il movimento orizzontale in aria.

**Punto 2.2: Modulo Oggetti e Scoring (F.SCOR, F.OBJ)**

- **Alex (PO)** insiste sull'importanza della F.SCOR.03 (Sequenza Lit Bomb). È fondamentale che l'ordine delle bombe accese sia predefinito per incoraggiare la maestria e la rigiocabilità (come da PRD).

- Si definiscono le condizioni di spawn per i power-up:

- F.OBJ.01 ('B' - Multiplier): Legato al punteggio (ogni 5000 punti).

- F.OBJ.02 ('P' - Power Ball): Legato a un "misuratore" interno che si riempie raccogliendo bombe, specialmente quelle accese.

- **Alessandro C.** conferma che lo stato "Power Ball" congela i nemici e li rende "raccoglibili" (F.OBJ.04).

**Punto 2.3: Modulo Nemici e UI (F.ENEM, F.SYS)**

- Si concorda che i nemici devono avere pattern misti: alcuni fissi, altri a inseguimento (F.ENEM.03), e che lo spawn deve essere continuo per aumentare la difficoltà (F.ENEM.02).

- **Alessandro T.** conferma che i requisiti UI (F.SYS.01 e F.SYS.02) sono allineati con gli screenshot di riferimento (es. posizione "SCORE" e "ROUND 1").

### **3. Decisioni Prese**

1. Il Documento di Analisi Funzionale v1.0 (file analisi_funzionale.md) è **approvato** da tutti i partecipanti.

2. La funzionalità F.MOV.04 (Planata) è identificata come requisito ad **alta priorità tecnica** e richiederà un prototipo specifico.

3. L'architettura funzionale generale (Loop di Round, gestione stati 'P') è confermata.

### **4. Azioni da Intraprendere (Action Items)**

| ID | Azione | Responsabile | Scadenza | Riferimento Piano |
|---|---|---|---|---|
| A.01 | Avviare il Design Tecnico (Analisi Tecnica), con focus sulla prototipazione della fisica di planata (F.MOV.04). | Alessandro C. | Mercoledì (EOD) | SLOT 3 |
| A.02 | Archiviare il DAF v1.0 e preparare la sessione di Supporto allo Sviluppo (Guida AI). | Alessandro T. | Giovedì (AM) | SLOT 4 |


**Chiusura riunione:** 10:28
