describe('<Header />', () => {
    beforeEach(() => {
      // Puoi mockare la sessione di login o visitare la home
      cy.visit('/');
    });
  
    it('should display the Home, Products, and Stats links', () => {
      // Verifica che i link Home, Prodotti e Statistiche siano visibili
      cy.login('Aldo', '123'); // Login per autenticarsi prima del test

      cy.get('a[href="/"]').contains("Home");
      cy.get('a[href="/products"]').contains("Prodotti");
      cy.get('a[href="/chart"]').contains("Statistiche");
    });
  
    it('should display Login link when user is not authenticated', () => {
      // Verifica che il link Login sia presente quando l'utente non è autenticato
      cy.get('a.nav-link').contains("Login").should('have.attr', 'href', '/login');
    });
  
    it('should display user details and Logout button when authenticated', () => {
      // Mock login dell'utente
      cy.login('Aldo', '123'); // Login per autenticarsi prima del test
  
      // Verifica che il nome utente e il pulsante di logout siano visibili
      cy.get('span.navbar-text').should('contain.text', 'Aldo'); // Verifica il nome dell'utente
      cy.get('button').contains('Logout').should('be.visible');
    });
  
    it('should redirect to login page when clicking the Login link', () => {
      // Clicca sul link Login e verifica la navigazione
      cy.get('a.nav-link').contains('Login').click();
      cy.url().should('include', '/login');
    });
  
    it('should log out user when clicking the Logout button', () => {
      // Mock login
      cy.login('Aldo', '123'); // Login per autenticarsi prima del test
  
      // Clicca sul pulsante di logout
      cy.get('button').contains('Logout').click();
  
      // Verifica che la pagina sia stata reindirizzata e il link Login sia visibile
      cy.url().should('include', '/login');
      cy.get('a.nav-link').contains('Login').should('be.visible');
    });
  });
  