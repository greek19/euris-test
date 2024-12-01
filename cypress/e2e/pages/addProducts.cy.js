describe('Test AddProduct.jsx', () => {
    beforeEach(() => {
      cy.login('Aldo', '123'); 
      cy.visit('/add-products');
    });
  
    it('Test visualizzazione corretta del form', () => {
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
  
    it('Test validazione form', () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains('Il titolo è obbligatorio.').should('be.visible');
      cy.contains('La categoria è obbligatoria.').should('be.visible');
      cy.contains('Il prezzo è obbligatorio.').should('be.visible');
    });
  
    it('Test aggiunta prodotto e visualizzazione Toats', () => {
      cy.get('input[name="title"]').type('Prodotto Test');
      cy.get('input[name="category"]').type('Categoria Test');
      cy.get('input[name="price"]').type('99');
      cy.get('input[name="employee"]').type(' Rossi');
      cy.get('textarea[name="description"]').type('Descrizione del prodotto test.');
  
      cy.get('button[type="submit"]').click();
  
      // Controlla la presenza del toast di conferma
      cy.get('.toast').should('be.visible').and('contain', 'Prodotto aggiunto con successo!');
    });
  
    it('Test validazione campo "Prezzo"', () => {
      // Inserisci un valore superiore al limite
      cy.get('input[name="price"]').clear().type('10000000').blur();
      cy.contains('Max 9999999.99.').should('be.visible');
    });
  
    it('Test aggiunta e rimozione recensioni', () => {
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
  
    it('Test paginazione recensioni', () => {
      // Aggiungi più recensioni fino a superare il limite per pagina
      for (let i = 1; i <= 15; i++) {
        cy.get('textarea[name="reviewInput"]').type('Recensione '+i);
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
  