# Documento di Requisiti di Prodotto (PRD): Bomb Jack

## **1. Informazioni sul Prodotto**

| Campo | Valore |
|---|---|
| Nome Prodotto | Bomb Jack |
| Sviluppatore | Tehkan (oggi Tecmo) |
| Data di Rilascio (Arcade) | Marzo/Ottobre 1984 |
| Genere | Platform/Arcade a Schermo Singolo |
| Piattaforma Iniziale | Arcade (Coin-op) |
| Obiettivo | Creare un gioco arcade altamente coinvolgente e dal ritmo veloce, con un sistema di movimento unico (salto e planata) e un sistema di punteggio che incoraggi la rigiocabilità e il rischio. |

## **2. Obiettivi del Gioco**

- **Obiettivo Principale:** Il giocatore, nei panni dell'eroe mascherato **Jack**, deve raccogliere tutte le 24 bombe sparse sullo schermo statico in ciascun round.

- **Obiettivo di Punteggio:** Incentivare il giocatore a prendere le bombe in un ordine specifico per massimizzare il punteggio (collezionando bombe accese).

- **Sfida:** Evitare il contatto con i nemici che popolano lo schermo e completare il livello prima che il tempo scada.

- **Rigiocabilità:** Livelli con sfondi diversi (meraviglie del mondo) e nemici che diventano progressivamente più veloci e numerosi.

## **3. Caratteristiche di Gioco Principali (Funzionalità)**

### **3.1. Gameplay e Meccaniche**

- **Movimento del Personaggio (Jack):**

- **Corsa/Movimento:** Movimento orizzontale a sinistra e destra.

- **Salto:** Pressione del pulsante 'Salto'. La durata della pressione determina l'altezza del salto.

- **Planata/Volo Lento:** Tenendo premuto il pulsante 'Salto' in aria, Jack rallenta la caduta e può muoversi in aria.

- **Condizione di Vittoria/Round:** Tutti i 24 ordigni sono raccolti. Appare un portale che porta al round successivo.

- **Condizione di Sconfitta/Perdita Vita:** Contatto con un nemico o esaurimento del timer.

- **Livelli:** Schermi fissi con piattaforme non distruttibili. Ogni round presenta un nuovo sfondo (es. Piramidi, Acropoli, ecc.).

### **3.2. Oggetti e Punteggio**

| Oggetto | Descrizione | Punti Base |
|---|---|---|
| Bomba Spenta | Uno dei 24 obiettivi. | 100 punti |
| Bomba Accesa (Lit Bomb) | La bomba accesa consecutivamente. Collezionarla innesca l'accensione della successiva, incentivando un percorso ottimale. | 200 punti |
| Bonus Multiplier (Moneta 'B') | Aumenta il moltiplicatore di punteggio totale (da x1 a x5). Appare ogni 5000 punti. | 1000 punti (moltiplicato) |
| Power Ball (Moneta 'P') | Appare dopo aver riempito il misuratore di bonus (collezionando bombe, specialmente quelle accese). Raccoglierla congela temporaneamente tutti i nemici, che diventano monete bonus. | Punti variabili (100-2000), moltiplicati |
| Moneta Speciale ('S' o 'E') | Moneta speciale che può apparire occasionalmente per fornire una vita extra o un credito. | Vita extra / Credito |
| Bonus di Completamento | Punti aggiuntivi per aver collezionato un alto numero (es. 20 o più) di bombe accese in sequenza. | Variabile, molto alto |

### **3.3. Nemici**

- **Tipi:** Vari nemici meccanici e mitologici (es. uccelli, mummie che si trasformano in sfere volanti o dischi volanti).

- **Comportamento:** Si muovono a pattern fissi o inseguono Jack. Appaiono costantemente (spawn) ai bordi dello schermo, rendendo il livello più difficile con il tempo.

- **Sconfitta:** I nemici possono essere sconfitti *solo* dopo aver raccolto la Power Ball (Moneta 'P'), diventando oggetti di punteggio.

## **4. Requisiti Tecnici (Arcade)**

- **CPU:** Zilog Z80 (4 MHz)

- **Processore Audio:** Zilog Z80

- **Schermo:** Raster verticale, 256 x 224 pixel.

- **Input:** Joystick a 8 direzioni, 1 pulsante (Salto).

- **Design Livelli:** Utilizzo di piastrelle e sprite per la composizione dello sfondo statico, con sprite separati per Jack, bombe e nemici.

## **5. Criteri di Successo**

- **Popolarità in Arcade:** Raggiungere un alto tasso di utilizzo del coin-op nelle sale giochi.

- **Rendimento Finanziario:** Superare i costi di produzione hardware e generare profitti significativi (misurato dalle classifiche di vendita e incasso).

- **Critica:** Riconoscimento come un gioco platform innovativo (grazie alla meccanica di planata).

## **6. Sfondo e Ispirazione**

- **Ispirazione:** Combina l'azione di raccolta oggetti (come in *Pac-Man*) con meccaniche platform, introducendo un controllo unico del personaggio in aria.

- **Contesto:** Il gioco è visivamente ambientato in famose località turistiche e siti storici (es. Grecia, Egitto, castelli tedeschi come quello nell'immagine allegata).
