# Verbale Riunione: Definizione PRD "Bomb Jack"

| Campo | Dettagli |
|---|---|
| Data: | Lunedì (Giorno Sim. SLOT 1) |
| Ora: | 10:00 - 10:40 |
| Luogo: | Sala Riunioni "Arcade" |
| Progetto: | Bomb Jack (Remake/Definizione) |
| Tipo di Riunione: | SLOT 1 - Visione Prodotto |


## **Partecipanti**

1. **Filippo Granata**

2. **Alessandro Cervini** 

3. **Alessandro Tabaku**

## **Ordine del Giorno (OdG)**

1. Allineamento sulla Visione di Prodotto e gli obiettivi di alto livello.

2. Definizione delle meccaniche di gioco fondamentali (Core Loop).

3. Definizione del sistema di punteggio e degli incentivi alla rigiocabilità.

4. Revisione e approvazione finale del PRD (Product Requirement Document) v1.0.

5. Pianificazione prossimi passi (SLOT 2).


## **Punti Discussi**

La riunione è stata aperta da Laura Bianchi, che ha presentato l'obiettivo dello SLOT 1: solidificare la visione del prodotto e finalizzare il PRD.

### **1. Visione e Obiettivi (Rif. PRD Sez. 1 & 2)**

- **Discussione:** Mario Rossi ha ribadito la visione: "Creare un gioco arcade altamente coinvolgente e dal ritmo veloce". L'elemento distintivo deve essere il sistema di movimento unico (salto controllato e planata) e un sistema di punteggio che premi il rischio.

- **Conferma:** Tutti i partecipanti concordano. L'obiettivo principale del giocatore è chiaro: raccogliere tutte le 24 bombe sullo schermo evitando i nemici.

### **2. Meccaniche di Gioco (Rif. PRD Sez. 3.1)**

- **Discussione:** Si è discusso il feeling del controllo di Jack.

- **Salto:** Approvata la meccanica del "salto variabile" (l'altezza dipende dalla pressione del pulsante).

- **Planata:** Approvata la meccanica di "volo lento/planata" tenendo premuto il pulsante in aria. Carlo Verdi conferma che questo è tecnicamente fattibile e cruciale per il design dei livelli.

- **Condizioni:** Confermate le condizioni di vittoria (tutte le 24 bombe raccolte) e sconfitta (contatto nemico o timer esaurito).

### **3. Sistema di Punteggio e Rigiocabilità (Rif. PRD Sez. 3.2)**

- **Discussione:** Analizzato il sistema di "scoring". Per incentivare la rigiocabilità (Obiettivo PRD Sez. 2), il sistema di "bombe accese" è fondamentale.

- **Decisione:** Si conferma che raccogliere le bombe nell'ordine in cui si accendono (dopo la prima) raddoppia i punti (da 100 a 200) e contribuisce a riempire la barra "Power".

- **Power-Up:**

- **Moneta 'P' (Power Ball):** Appare quando la barra bonus è piena. Congela i nemici e li trasforma in monete bonus (come in *Pac-Man*).

- **Moneta 'B' (Bonus Multiplier):** Aumenta il moltiplicatore generale (fino a x5).

- **Moneta 'S'/'E':** Confermata la presenza di vite extra/crediti speciali.

### **4. Nemici e Livelli (Rif. PRD Sez. 3.3 & 6)**

- **Discussione:** I nemici devono apparire costantemente (spawn) per aumentare la pressione sul giocatore. Approvata l'idea di nemici che si trasformano (es. mummie in sfere volanti).

- **Sconfitta Nemici:** Mario sottolinea che i nemici sono invincibili *se non* dopo aver preso la Moneta 'P'. Questo crea tensione.

- **Contesto:** Confermata l'ambientazione "turistica" (Piramidi, Acropoli, castelli) per dare varietà visiva tra i round.

### **5. Requisiti Tecnici (Rif. PRD Sez. 4)**

- **Discussione:** Carlo Verdi riassume i requisiti tecnici target (simulando l'originale arcade): CPU Z80, schermo raster verticale 256x224, joystick a 8 vie e 1 pulsante.


## **Decisioni Prese**

1. **Approvazione PRD:** Il documento PRD (versione allegata) è approvato all'unanimità come base per lo sviluppo.

2. **Core Mechanics Lock:** Le meccaniche di Salto (variabile) e Planata (pressione tenuta) sono confermate.

3. **Scoring System Lock:** Il sistema di "bombe accese" (Lit Bomb) è confermato come meccanica centrale per il "mastery" del gioco.

4. **Power-Up:** Il sistema "Power Ball" (Moneta 'P') è confermato come unico metodo per sconfiggere i nemici.

## **Azioni e Prossimi Passi (Next Steps)**

| Azione | Responsabile | Scadenza | Note |
|---|---|---|---|
| Distribuire il PRD v1.0 finale al team | Filippo Granata | EOD (Fine Giornata) |  |
| Iniziare l'Analisi Funzionale Dettagliata (User Stories e Flussi di gioco) | AlessandroCervini | Domani (SLOT 2) | Preparazione per la riunione di Martedì. |
| Avviare l'Analisi Tecnica preliminare sull'architettura | Alessandro Tabaku | Mercoledì (SLOT 3) | Basarsi sul PRD approvato. |
