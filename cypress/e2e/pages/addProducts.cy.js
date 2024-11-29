describe('AddProduct Page Tests', () => {
    beforeEach(() => {
      // Autentica un utente per accedere alla pagina
      cy.login('Aldo', '123'); // Login per autenticarsi prima del test
      cy.visit('/add-products'); // Vai alla pagina di aggiunta prodotto
    });
  
    it('renders the form with all fields and buttons', () => {
      // Controlla se tutti i campi sono visibili
      cy.get('input[name="title"]').should('be.visible');
      cy.get('input[name="category"]').should('be.visible');
      cy.get('input[name="price"]').should('be.visible');
      cy.get('input[name="employee"]').should('be.visible');
      cy.get('textarea[name="description"]').should('be.visible');
      cy.get('textarea[name="reviewInput"]').should('be.visible');
  
      // Controlla se il pulsante di invio è presente
      cy.get('button[type="submit"]').should('be.visible').and('contain', 'Aggiungi Prodotto');
    });
  
    it('displays validation errors for empty required fields', () => {
      // Clicca il pulsante "Aggiungi Prodotto" senza compilare il form
      cy.get('button[type="submit"]').click();
  
      // Controlla i messaggi di errore di validazione
      cy.contains('Il titolo è obbligatorio.').should('be.visible');
      cy.contains('La categoria è obbligatoria.').should('be.visible');
      cy.contains('Il prezzo è obbligatorio.').should('be.visible');
    });
  
    it('adds a valid product successfully and displays a toast notification', () => {
      // Compila il form con dati validi
      cy.get('input[name="title"]').type('Prodotto Test');
      cy.get('input[name="category"]').type('Categoria Test');
      cy.get('input[name="price"]').type('99.99');
      cy.get('input[name="employee"]').type('Mario Rossi');
      cy.get('textarea[name="description"]').type('Descrizione del prodotto test.');
  
      // Clicca su "Aggiungi Prodotto"
      cy.get('button[type="submit"]').click();
  
      // Controlla la presenza del toast di conferma
      cy.get('.toast').should('be.visible').and('contain', 'Prodotto aggiunto con successo!');
    });
  
    it('validates price input for non-numeric or invalid values', () => {
      // Inserisci un valore superiore al limite
      cy.get('input[name="price"]').clear().type('10000000').blur();
      cy.contains('Max 9999999.99.').should('be.visible');
    });
  
    it('handles adding and deleting reviews', () => {
      // Aggiungi una recensione
      cy.get('textarea[name="reviewInput"]').type('Recensione 1');
      cy.get('button').contains('Aggiungi Recensione').click();
  
      // Controlla se la recensione è stata aggiunta
      cy.contains('Recensione 1').should('be.visible');
  
      // Elimina la recensione
      cy.get('button[class="btn btn-outline-danger btn-sm"]').first().click();
  
      // Controlla se la recensione è stata eliminata
      cy.contains('Recensione 1').should('not.exist');
    });
  
    it('paginates reviews correctly', () => {
      // Aggiungi più recensioni fino a superare il limite per pagina
      for (let i = 1; i <= 15; i++) {
        cy.get('textarea[name="reviewInput"]').type(`Recensione ${i}`);
        cy.get('button').contains('Aggiungi Recensione').click();
      }
  
      // Controlla se ci sono recensioni nella prima pagina
      cy.contains('Recensione 1').should('be.visible');
      cy.contains('Recensione 10').should('be.visible');
      cy.contains('Recensione 11').should('not.exist');
  
      // Passa alla seconda pagina
      cy.get('.pagination').contains('2').click();
  
      // Controlla le recensioni nella seconda pagina
      cy.contains('Recensione 11').should('be.visible');
      cy.contains('Recensione 15').should('be.visible');
    });
  
  });
  