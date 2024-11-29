describe('App Routing and Protected Routes', () => {
      
    it('allows authenticated users to access protected routes', () => {
      // Simula il login (dipende dall'implementazione, ma può essere un salvataggio diretto nello store Redux o nei cookie)
      cy.login('Aldo', '123');
      cy.visit('/');
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  
      // Naviga alle rotte protette
      cy.visit('/products');
      cy.get('h2').contains('Lista Prodotti').should('exist');
  
      cy.visit('/chart');
      cy.get('h2', {timeout:5000}).contains('Prodotti per Categoria').should('exist');

      cy.visit('/add-products');
      cy.get('h2').contains('Aggiungi Nuovo Prodotto').should('exist');
    });
  
  });
  