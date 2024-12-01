describe('Test HeaderNonAuth.jsx', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Test visualizzazione login quando utente non è autenticato', () => {
      cy.get('a.nav-link')
        .contains('Login')
        .should('have.attr', 'href', '/login');
    });
  
    it('Test redirect a login tramite button', () => {
      cy.get('a.nav-link')
        .contains('Login')
        .click();
  
      cy.url().should('include', '/login');
    });
  });
  