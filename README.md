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

