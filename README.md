### Progetto di Proggettazione Web
> Progetto per il corso di Progettazione Web A.A. 22/23 dell'Università di Pisa

Il progetto sviluppato è una banca del sangue. La piattaforma prevede l'interazione di 4 diversi tipi di utente:

* Visitatore
* Donatore
* Struttura ospedaliera
* Admin

Il `visitatore` può accedere solo ad alcune funzionalità limitate quali visualizzare il manuale, visualizzare le news, visualizzare il perché è importante donare, scrivere un messaggio e può richiedere un account come donatore o come struttura ospedaliera. Di base l'account non è attivo perché essendo una simulazione realistica si pensa che gli amministratori della piattaforma prima di accettare l'account dovrebbero verificare i dati inseriti dall'utente.

Il `donatore` può "donare" il sangue o modificare i dati. Con donare si intende sempre una simulazione perché applicato al mondo reale il donatore starebbe semplicemente prenotando una donazione.
Può visualizzare le sue vecchie donazioni e vedere in quale magazzino sono tenute e se il sangue è stato utilizzato.
Inoltre può modificare i suoi dati tranne il gruppo sanguigno.

La `struttura` ospedaliera invece può richiedere sangue, può fare ordini di sangue per tipo di sangue e per la quantità che desidera. Ci sono due tipi di ordini urgente e non urgente. La richiesta è urgente se si necessità sangue per una trasfusione immediata mentre è non urgente se invece vogliamo solo rifornire il nostro magazzino. La differenza tra le due richieste è il costo che in caso di urgente è pari a 0 e il tempo, che nel caso di una richiesta urgente è calcolato come tempo effettivo necessario per arrivare alla struttura (dal magazzino). Altrimenti il tempo di spedizione può variare fino a 48 ore. Inoltre può scegliere il magazzino da cui richiedere il sangue e finché la richiesta non viene accettata dall'amministratore è in tempo ad annullarla.
(Il costo comprende il trasporto e la conservazione del sangue, non è una vera e propria vendita in quanto illegale in Italia).

L'`amministratore` invece ha il compito di accettare nuovi utenti, eliminarli, accettare o rigettare le richieste. Poi ha la possibilità di visualizzare alcune statistiche riguardanti gli utenti, le donazioni e le richieste. Infine può scrivere nuove news o eliminare quelle vecchie e visualizzare o eliminare i messaggi che gli sono stati inviati.

### Account

Nel file [account.md](./account.md) è possibile trovare alcuni account già predisposti per provare tutte le funzionalità del sito, usando il dump del database [dump.sql](./sql/dump.sql).

### Autore

Francesco Lazzarelli
