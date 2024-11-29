describe('Home Page Tests', () => {
    beforeEach(() => {
      cy.login('Aldo', '123'); // Login per autenticarsi prima del test
    });
  
    it('should display the home page correctly', () => {
      cy.visit('/'); // Visita la home page
      
      // Verifica che l'intestazione della pagina Home venga visualizzata correttamente
      cy.get('[id="home-card-title-1"]').should('have.text', 'Benvenuto, Aldo!');
  
      // Verifica che ci siano i link a "Vai ai Prodotti" e "Vai alle Statistiche"
      cy.contains('Vai ai Prodotti').should('be.visible').click();
      cy.url().should('include', '/products');  // Verifica che il link porti alla pagina dei prodotti
  
      cy.visit('/');
      cy.contains('Vai alle Statistiche').should('be.visible').click();
      cy.url().should('include', '/chart');  // Verifica che il link porti alla pagina delle statistiche
    });
});