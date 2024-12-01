describe('Test App.jsx', () => {
      
    it('Test rotte protette con utente autenticato', () => {
      cy.login('Aldo', '123');
      cy.visit('/');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  
      cy.visit('/products');
      cy.get('h2').contains('Lista Prodotti').should('exist');
  
      cy.visit('/chart');
      cy.get('h2', {timeout:5000}).contains('Prodotti per Categoria').should('exist');

      cy.visit('/add-products');
      cy.get('h2').contains('Aggiungi Nuovo Prodotto').should('exist');
    });
  
  });
  