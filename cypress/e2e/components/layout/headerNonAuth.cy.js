describe('<HeaderNonAuth />', () => {
    beforeEach(() => {
      // Visita la pagina che renderizza il componente HeaderNonAuth
      // Ad esempio, la homepage o la pagina di login dove HeaderNonAuth è visibile
      cy.visit('/');
    });
  
    it('should display the login link when the user is not authenticated', () => {
      // Verifica che il link di login sia presente
      cy.get('a.nav-link')
        .contains('Login')
        .should('have.attr', 'href', '/login');  // Verifica il link corretto
    });
  
    it('should show the correct logo', () => {
      // Verifica che l'immagine del logo sia visibile
      cy.get('img[alt="My App"]').should('be.visible');
    });
  
    it('should navigate to the login page when the login link is clicked', () => {
      // Verifica che il click sul link di login porti alla pagina di login
      cy.get('a.nav-link')
        .contains('Login')
        .click();
  
      // Verifica che la pagina venga reindirizzata al percorso /login
      cy.url().should('include', '/login');
    });
  });
  