# **Documento di Requisiti di Prodotto (PRD): Bomb Jack (PC Remake)**

## **1\. Informazioni sul Prodotto**

| Campo | Valore |
| :---- | :---- |
| **Nome Prodotto** | Bomb Jack (PC Remake) |
| **Sviluppatore Originale** | Tehkan (oggi Tecmo) |
| **Genere** | Platform/Arcade a Schermo Singolo |
| **Piattaforma Target** | PC (Windows, macOS, Linux) |
| **Obiettivo** | Ricreare fedelmente l'esperienza arcade classica di Bomb Jack per un pubblico moderno su PC, mantenendo il gameplay "pixel perfect" e aggiungendo controlli moderni e supporto per la nuova piattaforma. |

## **2\. Obiettivi del Gioco**

* **Obiettivo Principale:** Il giocatore, nei panni dell'eroe mascherato **Jack**, deve raccogliere tutte le 24 bombe sparse sullo schermo statico in ciascun round.  
* **Obiettivo di Punteggio:** Incentivare il giocatore a prendere le bombe in un ordine specifico per massimizzare il punteggio (collezionando bombe accese).  
* **Sfida:** Evitare il contatto con i nemici che popolano lo schermo e completare il livello prima che il tempo scada.  
* **Rigiocabilità:** Livelli con sfondi diversi (meraviglie del mondo) e nemici che diventano progressivamente più veloci e numerosi.

## **3\. Caratteristiche di Gioco Principali (Funzionalità)**

### **3.1. Gameplay e Meccaniche**

* **Movimento del Personaggio (Jack):**  
  * **Corsa/Movimento:** Movimento orizzontale a sinistra e destra.  
  * **Salto:** Pressione del pulsante 'Salto'. La durata della pressione determina l'altezza del salto.  
  * **Planata/Volo Lento:** Tenendo premuto il pulsante 'Salto' in aria, Jack rallenta la caduta e può muoversi in aria.  
* **Condizione di Vittoria/Round:** Tutti i 24 ordigni sono raccolti. Appare un portale che porta al round successivo.  
* **Condizione di Sconfitta/Perdita Vita:** Contatto con un nemico o esaurimento del timer.  
* **Livelli:** Schermi fissi con piattaforme non distruttibili. Ogni round presenta un nuovo sfondo (es. Piramidi, Acropoli, ecc.).

### **3.2. Oggetti e Punteggio**

| Oggetto | Descrizione | Punti Base |
| :---- | :---- | :---- |
| **Bomba Spenta** | Uno dei 24 obiettivi. | 100 punti |
| **Bomba Accesa (Lit Bomb)** | La bomba accesa consecutivamente. Collezionarla innesca l'accensione della successiva, incentivando un percorso ottimale. | 200 punti |
| **Bonus Multiplier (Moneta 'B')** | Aumenta il moltiplicatore di punteggio totale (da x1 a x5). Appare ogni 5000 punti. | 1000 punti (moltiplicato) |
| **Power Ball (Moneta 'P')** | Appare dopo aver riempito il misuratore di bonus (collezionando bombe, specialmente quelle accese). Raccoglierla congela temporaneamente tutti i nemici, che diventano monete bonus. | Punti variabili (100-2000), moltiplicati |
| **Moneta Speciale ('S' o 'E')** | Moneta speciale che può apparire occasionalmente per fornire una vita extra o un credito. | Vita extra / Credito |
| **Bonus di Completamento** | Punti aggiuntivi per aver collezionato un alto numero (es. 20 o più) di bombe accese in sequenza. | Variabile, molto alto |

### **3.3. Nemici**

* **Tipi:** Vari nemici meccanici e mitologici (es. uccelli, mummie che si trasformano in sfere volanti o dischi volanti).  
* **Comportamento:** Si muovono a pattern fissi o inseguono Jack. Appaiono costantemente (spawn) ai bordi dello schermo, rendendo il livello più difficile con il tempo.  
* **Sconfitta:** I nemici possono essere sconfitti *solo* dopo aver raccolto la Power Ball (Moneta 'P'), diventando oggetti di punteggio.

## **4\. Requisiti Tecnici (Piattaforma PC)**

* **Piattaforma di Sviluppo:** PC (target iniziale: Windows 10/11).  
* **Stack Tecnologico/Motore:** Da definire (es. Unity, Godot, GameMaker, o stack custom HTML5/JS Canvas).  
* **Risoluzione:** Supporto per risoluzioni schermo moderne (es. 1080p, 1440p).  
* **Gestione Aspect Ratio:** Il gioco deve mantenere l'aspect ratio originale (verticale 256x224). Verrà utilizzato il "pillarboxing" (bande nere laterali) per adattarsi agli schermi widescreen.  
* **Opzioni Grafiche:** Includere opzioni per:  
  * Modalità Finestra / Schermo Intero.  
  * Filtri grafici (es. "Pixel Perfect" senza filtri, filtro "Scanlines CRT").  
* **Input:**  
  * **Tastiera:** Supporto completo per controlli mappabili (Default: Tasti Freccia/WASD per movimento, Spazio/Z per Salto).  
  * **Gamepad:** Supporto nativo per controller XInput (es. controller Xbox) e DirectInput.  
* **Audio:** Riproduzione di effetti sonori e musica tramite file audio moderni (es. .wav, .ogg, .mp3).

## **5\. Criteri di Successo**

* **Fedeltà:** Il gioco deve essere percepito dai fan dell'originale come una conversione fedele in termini di tempistiche, controlli e fisica.  
* **Stabilità:** Assenza di bug critici o crash sulla piattaforma PC target.  
* **Performance:** Il gioco deve funzionare a 60 FPS stabili sull'hardware minimo specificato.

## **6\. Sfondo e Ispirazione**

* **Ispirazione:** Combina l'azione di raccolta oggetti (come in *Pac-Man*) con meccaniche platform, introducendo un controllo unico del personaggio in aria.  
* **Contesto:** Il gioco è visivamente ambientato in famose località turistiche e siti storici (es. Grecia, Egitto, castelli tedeschi) che verranno ricreati fedelmente.

