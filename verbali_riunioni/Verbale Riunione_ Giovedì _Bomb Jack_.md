# **Verbale Riunione: Supporto allo Sviluppo AI**

## **Progetto: Bomb Jack (1984)**

| Campo | Dettaglio |
| :---- | :---- |
| **Data:** | Giovedì, 6 Novembre 2025 (Ref. Piano Progetto: SLOT 4\) |
| **Ora:** | 10:00 \- 10:30 (Durata: 30 min) |
| **Luogo:** | Sala Riunioni "Arcade" |
| **Oggetto:** | Creazione linee guida per l'uso di AI Companion (Sviluppo Bomb Jack) |
| **Documento Prodotto:** | supporto\_AI.md (Linee Guida per Sviluppo AI: Bomb Jack (1984)) |

---

### **1\. Partecipanti**

1. **Filippo Granata**  
2. **Alessandro Cervini**  
3. **Alessandro Tabaku**

### **2\. Ordine del Giorno (OdG)**

1. Revisione dei documenti finalizzati: PRD (Lunedì), Analisi Funzionale (Martedì) e Analisi Tecnica (Mercoledì).  
2. Definizione dei vincoli tecnici e funzionali non negoziabili per lo sviluppo AI.  
3. Estrazione e sintesi dei moduli di sviluppo prioritari.  
4. Redazione e approvazione del documento "Linee Guida AI Prompt".

---

### **3\. Svolgimento della Riunione e Discussione**

La riunione è aperta da **Filippo Granata**, che ricorda l'obiettivo dello SLOT 4: produrre un documento di linee guida chiaro e sintetico per istruire un agente AI (es. Gemini, Copilot) allo sviluppo del gioco. Il documento deve basarsi fedelmente sul lavoro svolto nei giorni precedenti.

#### **3.1. Definizione Vincoli Tecnici (Modulo 2 \- supporto\_AI.md)**

**Alessandro C.** sottolinea che l'AI deve operare entro vincoli hardware stringenti per replicare l'esperienza originale.

* **Piattaforma:** Si concorda di specificare la Zilog Z80 @ 4MHz come riferimento per la velocità della logica di gioco.  
* **Risoluzione:** Il rendering deve essere vincolato a 256 x 224 pixel (raster verticale).  
* **Rendering:** Si specifica la distinzione tra sfondi statici (tiles) e sprite dinamici (Jack, nemici, bombe).  
* **Input:** È fondamentale che l'AI gestisca l'input a 1 pulsante rilevando la *durata* della pressione (essenziale per la planata).

#### **3.2. Modulo 1: Fisica di Jack (Modulo 3 \- supporto\_AI.md)**

**Alessandro T.** chiede di definire la meccanica "core" in modo inequivocabile. Il team concorda che la priorità assoluta è la fisica di Jack.

* **Salto Variabile (F.MOV.03):** L'altezza del salto deve essere proporzionale al tempo di pressione del pulsante.  
* **Planata / Volo Lento (F.MOV.04):** Si decide di istruire l'AI specificando l'implementazione tecnica: "Quando Jack è in aria e il pulsante 'Salto' è tenuto premuto, la forza di gravità... deve essere ridotta significativamente (es. a $\\frac{1}{4}$ del valore normale)". Questo è il punto cruciale del design.  
* **Condizioni di Sconfitta (F.MOV.06):** Definite due cause: contatto con nemico (se non in stato 'P') o esaurimento del timer (F.SYS.03).

#### **3.3. Modulo 2: Sistema di Punteggio (Modulo 4 \- supporto\_AI.md)**

Si discute come replicare il sistema di "risk/reward" del gioco.

* **Sequenza "Lit Bomb" (F.SCOR.03):** È la funzionalità chiave. Si verbalizza che l'AI deve implementare un "ordine predefinito (array o lista)" per le 24 bombe. Un indice deve tracciare la bomba accesa. La raccolta di 20+ bombe accese in sequenza deve generare un bonus elevato.  
* **Power Ball ('P') (F.OBJ.02):** L'apparizione non è casuale. Deve essere legata a un "misuratore di bonus" che si riempie raccogliendo bombe (più velocemente con le Lit Bomb). L'effetto è l'invincibilità temporanea e il congelamento dei nemici.  
* **Multiplier ('B') (F.OBJ.01):** Appare ogni 5000 punti e moltiplica il punteggio (fino a x5).

#### **3.4. Moduli 3 e 4: Nemici e Sistema (Modulo 5, 6 \- supporto\_AI.md)**

Riassunti rapidamente i restanti requisiti fondamentali:

* **Nemici:** Devono apparire continuamente (spawn) ai bordi dello schermo. Possono essere sconfitti *solo* durante lo stato 'P'. I punti ottenuti sconfiggendoli in stato 'P' devono essere progressivi (100, 200, 500...).  
* **Sistema:** L'interfaccia (Punteggio, Round, Vite) deve essere un overlay. La vittoria del round si ottiene raccogliendo tutte le 24 bombe.

### **4\. Decisioni e Azioni Conclusive**

1. **DECISIONE:** Il team approva il documento di sintesi supporto\_AI.md (Linee Guida per Sviluppo AI: Bomb Jack (1984)) come output ufficiale dello SLOT 4\.  
2. **AZIONE (Alessandro C.):** Utilizzare il documento supporto\_AI.md come base per i prompt da fornire all'agente AI di sviluppo.  
3. **AZIONE (Filippo):** Archiviare il documento e preparare l'incontro di "Verbalizzazione e Decisioni" di venerdì (SLOT 5).

---

Firma (Segretario):

Filippo Granata

