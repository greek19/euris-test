describe('Test Header.jsx', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Test presenza link a Home, Prodotti, and Statistiche', () => {
      cy.login('Aldo', '123');

      cy.get('a[href="/"]').contains("Home");
      cy.get('a[href="/products"]').contains("Prodotti");
      cy.get('a[href="/chart"]').contains("Statistiche");
    });
  
    it('Test presenza Login link quando user non autenticato', () => {
      cy.get('a.nav-link').contains("Login").should('have.attr', 'href', '/login');
    });
  
    it('Test presenza dettagli user e bottone Logout quando utente è autenticato', () => {
      cy.login('Aldo', '123'); 
  
      cy.get('span.navbar-text').should('contain.text', 'Aldo');
      cy.get('button').contains('Logout').should('be.visible');
    });
  
    it('Test redirect a Login con click sul link', () => {
      cy.get('a.nav-link').contains('Login').click();
      cy.url().should('include', '/login');
    });
  
    it('Test logout', () => {
      cy.login('Aldo', '123'); 
  
      cy.get('button').contains('Logout').click();
  
      cy.url().should('include', '/login');
      cy.get('a.nav-link').contains('Login').should('be.visible');
    });
  });
  