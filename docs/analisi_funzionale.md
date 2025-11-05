# Documento di Analisi Funzionale (DAF): Bomb Jack

Versione: 1.0

Data: 5 Novembre 2025

Basato su: PRD "Bomb Jack"

## **1. Introduzione e Scopo**

Questo Documento di Analisi Funzionale (DAF) descrive in dettaglio le funzionalità e il comportamento del videogioco arcade **Bomb Jack**, come definito nel Documento di Requisiti di Prodotto (PRD). Lo scopo è fornire una specifica chiara e univoca per lo sviluppo del software.

## **2. Architettura Funzionale (Visione Generale)**

Il gioco si svolge in round successivi, ciascuno su uno schermo statico (single-screen) con un'architettura a loop continuo:

1. **Inizio Round:** Generazione dello sfondo, piattaforme, Jack, 24 bombe e nemici iniziali.

2. **Gameplay:** Movimento, raccolta bombe, evasione nemici, gestione del timer.

3. **Power-Up (P):** Stato di invincibilità temporanea e scoring dei nemici.

4. **Fine Round (Successo):** Tutte le 24 bombe raccolte $\rightarrow$ Transizione al round successivo.

5. **Fine Round (Fallimento):** Contatto nemico o esaurimento timer $\rightarrow$ Perdita vita.

## **3. Modulo: Gameplay e Movimento del Personaggio (Jack)**

| ID Funzionale | Funzionalità | Descrizione Dettagliata | Criteri di Accettazione |
|---|---|---|---|
| F.MOV.01 | Movimento Orizzontale | Jack si muove lungo l'asse X (sinistra/destra) su piattaforme o a terra. | Il movimento deve essere fluido, con velocità fissa (Rif. RT.02). |
| F.MOV.02 | Salto Base | La pressione breve del pulsante 'Salto' esegue un salto di altezza minima. | Jack deve attraversare la gravità e ricadere in assenza di input di planata. |
| F.MOV.03 | Salto Variabile | L'altezza del salto è proporzionale alla durata della pressione del pulsante 'Salto'. | La variazione dell'altezza massima deve essere percepibile dal giocatore. |
| F.MOV.04 | Planata/Volo Lento | Mantenendo premuto il pulsante 'Salto' mentre Jack è in aria, la velocità di caduta (gravità) si riduce significativamente. | Il meccanismo di planata deve consentire a Jack di mantenere l'altitudine e spostarsi orizzontalmente in modo controllato (Planata Tecnica Unica). |
| F.MOV.05 | Collisione Piattaforme | Jack si ferma e si appoggia quando collide con una piattaforma dall'alto. | Non deve essere possibile cadere attraverso le piattaforme (collisione solida). |
| F.MOV.06 | Perdita Vita | Se Jack collide con un'entità nemica (se non in stato Power Ball) o il timer (F.SYS.03) arriva a zero. | Il personaggio esegue l'animazione di sconfitta, si perde una vita, e il round si riavvia. |

## **4. Modulo: Oggetti, Punteggio e Bonus**

### **4.1. Funzionalità di Scoring Base**

| ID Funzionale | Oggetto | Punti Base | Regola di Raccolta/Attivazione |
|---|---|---|---|
| F.SCOR.01 | Bomba Spenta | 100 | Raccolta di una bomba che non è quella Accesa (Lit Bomb). |
| F.SCOR.02 | Bomba Accesa (Lit Bomb) | 200 | La Lit Bomb è visivamente distinta (lampeggiante). Raccolta della Lit Bomb. |
| F.SCOR.03 | Sequenza Lit Bomb | Variabile (Alto) | Dopo la raccolta di F.SCOR.02, la bomba successiva (in un ordine predefinito) diventa la nuova Lit Bomb, incentivando un percorso ottimale. |

### **4.2. Funzionalità Oggetti Speciali**

| ID Funzionale | Oggetto | Effetto Funzionale | Condizione di Spawn |
|---|---|---|---|
| F.OBJ.01 | Bonus Multiplier ('B') | Aumenta il moltiplicatore di punteggio totale (da x1 a x5). | Appare dopo che il giocatore ha ottenuto un incremento di 5000 punti. |
| F.OBJ.02 | Power Ball ('P') | Congela immediatamente tutti i nemici sullo schermo e li trasforma in oggetti di punteggio (monete). Jack diventa temporaneamente invincibile. | Appare dopo aver riempito un misuratore di bonus (accumulo di bombe raccolte, con maggiore contributo dalle Lit Bomb). |
| F.OBJ.03 | Moneta Speciale (Extra Life) | Concede al giocatore una vita aggiuntiva. | Appare occasionalmente e casualmente, o come ricompensa per un punteggio molto alto. |
| F.OBJ.04 | Punti Nemici (Stato 'P') | I nemici congelati (dopo F.OBJ.02) vengono raccolti come punti variabili (100-2000 punti). | Sono soggetti al moltiplicatore corrente (F.OBJ.01). |

## **5. Modulo: Nemici e Sfida**

| ID Funzionale | Funzionalità | Descrizione Dettagliata | Comportamento/Spawn |
|---|---|---|---|
| F.ENEM.01 | Collisione Letale | Il contatto tra Jack e un'entità nemica attiva la condizione di perdita vita (F.MOV.06), salvo stato Power Ball. | I nemici non possono danneggiare Jack in stato Power Ball. |
| F.ENEM.02 | Spawn Continuo | I nemici appaiono (spawn) ai bordi dello schermo per mantenere la pressione sul giocatore. | La frequenza di spawn e la velocità dei nemici aumentano con il progredire dei round. |
| F.ENEM.03 | Tipi di Nemici | Implementazione di almeno 3-5 tipi di nemici distinti (es. Uccelli, Mummie/Sfera, Dischi Volanti). | Ogni tipo deve avere un pattern di movimento (Fisso, Inseguimento, Casuale) unico. |
| F.ENEM.04 | Nemici Sconfitti (Stato 'P') | I nemici vengono rimossi dal gioco solo se raccolti come oggetti di punteggio durante lo stato Power Ball (F.OBJ.02). | Quando lo stato Power Ball termina, i nemici rimanenti riprendono il loro movimento originale. |

## **6. Modulo: Gestione di Sistema e Interfaccia Utente**

| ID Funzionale | Funzionalità | Descrizione Dettagliata | Requisito PRD |
|---|---|---|---|
| F.SYS.01 | Visualizzazione Punteggio | Mantenere e visualizzare il punteggio corrente in basso a sinistra (SCORE 500 come nell'immagine). | Punteggio aggiornato in tempo reale con moltiplicatore applicato. |
| F.SYS.02 | Visualizzazione Round | Visualizzare il round corrente in basso al centro (ROUND 1 come nell'immagine). | Il round progredisce dopo la raccolta di tutte le 24 bombe (F.SYS.05). |
| F.SYS.03 | Timer | Implementare un timer per round. L'esaurimento del tempo causa la perdita di una vita. | Funzionalità non visibile nell'immagine, ma essenziale per la sfida (Rif. Obiettivi 2: Sfida). |
| F.SYS.04 | Vite e Crediti | Visualizzare il numero di vite restanti e crediti disponibili. | Icone in basso a destra e in alto a sinistra per vite e crediti (non visibile in immagine). |
| F.SYS.05 | Condizione di Vittoria Round | Una volta raccolte tutte le 24 bombe, appare un portale di uscita (o transizione). | Dopo un breve ritardo, il gioco passa al round successivo, caricando un nuovo sfondo/livello. |
