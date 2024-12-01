describe('Test Home.jsx', () => {
    beforeEach(() => {
      cy.login('Aldo', '123');
    });
  
    it('Visualizza la home page correttamente', () => {
      cy.visit('/');
      
      cy.get('[id="home-card-title-1"]').should('have.text', 'Benvenuto, Aldo!');
  
      cy.contains('Vai ai Prodotti').should('be.visible').click();
      cy.url().should('include', '/products');  
      cy.visit('/');
      cy.contains('Vai alle Statistiche').should('be.visible').click();
      cy.url().should('include', '/chart');  
    });
});