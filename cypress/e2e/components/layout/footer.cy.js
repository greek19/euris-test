describe('Test Footer.jsx', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('Test corretta visualizzazione del footer', () => {
      cy.get('footer').should('be.visible');
  
      const currentYear = new Date().getFullYear();
      cy.get('footer')
        .contains(`© ${currentYear} Portale. All rights reserved.`)
        .should('exist');
    });
  
    it('Test corretta visualizzazione del footer 2', () => {
      cy.get('footer').should('have.class', 'bg-dark');
      cy.get('footer').should('have.class', 'text-white');
  
    });
  });
  