# **Euris test**

Un'applicazione di backoffice dedicata a un negozio online dove i dipendenti possono creare, visualizzare e cancellare prodotti dall'ufficio o in viaggio durante i loro spostamenti di lavoro.
Fornisce agli utenti la possibilità di cambiare l'elenco dei prodotti da un layout a pannelli a quello a griglia. 
Inoltre, un grafico visualizza i prodotti per categoria. È costruita utilizzando **React** con **Vite** con integrazione di **Redux Toolkit** per la gestione dello stato.

---

## **Indice**
- [Funzionalità](#funzionalità)
- [Tecnologie Utilizzate](#tecnologie-utilizzate)
- [Installazione e Avvio](#installazione-e-avvio)
- [Workflow](#Workflow)


---

## **Funzionalità**
### Lista Prodotti
- Visualizzazione di una lista di prodotti con layout a **griglia** o **lista**.
- Paginazione dinamica per una gestione fluida di grandi dataset.

### Aggiunta Prodotti
- Form per aggiungere un nuovo prodotto con campi come titolo, categoria, prezzo, dipendente e descrizione.
- Possibilità di aggiungere recensioni associate a un prodotto.
- Validazione dei dati lato client con **Yup**.

### Eliminazione
- Rimozione di prodotti dalla lista.
- Conferma tramite modale prima di eliminare definitivamente un prodotto.

### Recensioni
- Visualizzazione tramite modale delle recensioni relative ad un determinato prodotto.

### Notifiche
- **Toast** per notificare all'utente il successo o il fallimento delle operazioni.

### Statistiche
- Pagina di statistiche relative alle categorie dei prodotti creata con l'utilizzo della libreria **Chart.js**


---

## **Tecnologie Utilizzate**
### Frontend
- **React** con funzionalità di componenti e hooks.
- **Redux Toolkit** per la gestione dello stato globale e delle chiamate API.
- **React-Bootstrap** per l'interfaccia utente e i componenti UI.
- **Formik** e **Yup** per i form dinamici e la validazione lato client.
- **React-Icons** per le icone.

### Qualità del Codice
- **SonarCloud** per l'analisi statica del codice, il monitoraggio della qualità e l'individuazione di bug, vulnerabilità e code smells.

---

## **Installazione e Avvio**

1. Clona il repository:
   ```bash
   git clone https://github.com/greek19/euris-test.git

2. Installa le dipendenze:
    ```bash
    npm install
3. Avvio:
    ```bash
    npm run dev

## **Workflow**

Una volta avviato l'applicativo l'utente approda nella pagina di login. Da qui può accedere alle pagine successive autenticate tramite una tra queste utenze:
```json
MOCK_USERS = [
    {
        username: "Aldo",
        password: "123",
    },
    {
        username: "Giovanni",
        password: "456",
    },
    {
        username: "Giacomo",
        password: "789",
    }
]
```

oppure tramite l'utilizzo di Google Authenticator.

## Possibili Nuove Implementazioni
L'applicazione può essere ulteriormente arricchita con nuove funzionalità e miglioramenti, tra cui:

### Gestione Impostazioni Utente
- **Interfaccia per le impostazioni personali:** Creazione di una nuova pagina dedicata dove gli utenti possono modificare le proprie informazioni personali, come nome, email e password.
- **Impostazioni preferenze:** Possibilità di configurare layout predefiniti (es. griglia o lista), tema (es. modalità scura/chiara) o lingua.
- **Sviluppo API:**
    - Endpoint per la gestione delle impostazioni utente.
    - Endpoint per la modifica della password con controllo di sicurezza.
    - Endpoint per il reset delle preferenze ai valori di default.

### Filtri Avanzati nella Lista Prodotti
- **Filtraggio per categoria:** Aggiunta di un filtro dropdown o checkbox che consente di selezionare una o più categorie da visualizzare.
- **Filtri combinati:** Implementazione di filtri multipli come:
    - Fascia di prezzo.
    - Disponibilità in magazzino.
    - Valutazione media delle recensioni.
- **Ricerca avanzata:**
    - Barra di ricerca con autocompletamento per titolo prodotto.
    - Sviluppo API per supportare il filtraggio e la ricerca combinata.

### Miglioramenti alle Statistiche
- **Grafici Interattivi:**
    - Aggiunta di nuovi tipi di grafici, come grafici a linee per monitorare l'andamento delle vendite nel tempo.
    - Grafico a torta per visualizzare la distribuzione percentuale delle categorie.
- **Filtraggio delle statistiche:**
    - Possibilità di visualizzare statistiche per intervallo temporale (giorno, mese, anno).
    - Filtri avanzati per analizzare le vendite in base a dipendenti, categorie o fasce di prezzo.

### Notifiche Avanzate
- **Sistema di notifiche real-time:** Avvisi in tempo reale per:
    - Modifiche apportate ai prodotti da altri utenti.
    - Scadenza di prodotti in magazzino.
- **Storico delle notifiche:** Una pagina dedicata per consultare le notifiche passate.