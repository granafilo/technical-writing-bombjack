Ecco il verbale della riunione basato sui documenti forniti:


### **Verbale Riunione: Design Tecnico (Slot 3) - Bomb Jack**

| Campo | Dettaglio |
|---|---|
| Data | Mercoledì, 5 Novembre 2025 |
| Ora Inizio | 10:00 |
| Ora Fine | 10:10 (Come da Slot 3) |
| Luogo | Sala Riunioni "Arcade" |
| Partecipanti | Filippo Granata, Alessandro Cervini, Alessandro Tabaku |
| Documenti di Input | PRD - Bomb Jack, Analisi Funzionale (DAF) |
| Documento di Output | Analisi Tecnica (DAT) - Bomb Jack |


### **1. Ordine del Giorno (OdG)**

1. Revisione dei requisiti funzionali chiave (DAF) e degli obiettivi di prodotto (PRD).

2. Definizione dell'architettura tecnica e dello stack tecnologico.

3. Analisi tecnica dettagliata dei moduli principali: Movimento, Punteggio, Nemici.

4. Validazione e finalizzazione del Documento di Analisi Tecnica (DAT).

### **2. Sintesi della Discussione**

La riunione, corrispondente allo **Slot 3 (Design Tecnico)** del piano di progetto, si è focalizzata sulla traduzione dei requisiti funzionali (DAF) in specifiche tecniche (DAT).

- **Architettura di Sistema (Sez. 1 DAT):**

- **Filippo** ha confermato l'architettura basata su un *game loop* continuo.

- Si è deciso di aderire strettamente alle specifiche hardware originali (Zilog Z80 @ 4MHz, Schermo 256x224) per mantenere il feeling del gioco, anche in un'implementazione moderna (emulazione o restrizioni software).

- È stato confermato l'uso di *piastrelle (tiles)* per gli sfondi e *sprite* per gli oggetti dinamici.

- **Modulo Movimento (Sez. 2.1 DAT):**

- La discussione principale ha riguardato l'implementazione della meccanica unica di "Planata/Volo Lento" (F.MOV.04).

- **Decisione Tecnica:** La planata sarà implementata non come un "volo", ma come una **riduzione significativa della gravità** (es. $\frac{1}{4}$ del normale) applicata alla velocitàY del personaggio, finché il pulsante 'Salto' è tenuto premuto in aria.

- È stato inoltre specificato che premere nuovamente il pulsante interrompe la planata.

- L'altezza del salto sarà proporzionale al tempo di pressione iniziale del pulsante (F.MOV.03).

- **Modulo Punteggio (Sez. 2.2 DAT):**

- **Alessandro C.** ha sottolineato l'importanza della "Lit Bomb Sequence" (F.SCOR.03).

- **Decisione Tecnica:** Verrà implementato un array o una lista per le 24 bombe, con un indice che traccia la bomba "accesa" corrente.

- È stato confermato il meccanismo del misuratore di bonus per la Power Ball ('P'), che si riempie più velocemente con le Lit Bomb (2 segmenti) rispetto alle bombe spente (1 segmento) (F.OBJ.02).

- Confermato lo spawn della moneta 'B' (moltiplicatore) ogni 5000 punti (F.OBJ.01).

- **Modulo Nemici e UI (Sez. 2.3 e 3 DAT):**

- Definita la necessità di un timer/contatore per lo spawn continuo dei nemici (F.ENEM.02).

- Confermata la gestione dello "Stato 'P'" (F.ENEM.04), che imposta un flag globale statoInvincibilita e un timerPowerBall, disattivando l'IA nemica.

- Confermata la presenza di un timer di round (F.SYS.03) che causa la perdita di una vita se scade.

### **3. Decisioni Prese e Azioni Future**

1. **Decisione:** Il Documento di Analisi Tecnica (DAT) è approvato e finalizzato nella sua versione 1.0.

2. **Azione (Filippo):** Avviare la prototipazione del motore fisico, con particolare attenzione alla meccanica di salto e planata (F.MOV.04).

3. **Azione (Alessandro T.):** Preparare lo Slot 4 di Giovedì, dedicato alla "Guida AI Prompt & Disclaimer", utilizzando il DAT come base per i task di sviluppo.

4. **Azione (Alessandro C.):** Preparare i dati di bilanciamento per i pattern dei nemici (F.ENEM.03) e la progressione dei punti (F.OBJ.04).

La riunione si è conclusa con l'approvazione del documento tecnico generato.
