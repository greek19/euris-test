describe('<Footer />', () => {
    beforeEach(() => {
      // Visita la home page, dove il footer è presente
      cy.visit('/');
    });
  
    it('should display the footer with copyright information', () => {
      // Verifica che il footer sia visibile
      cy.get('footer').should('be.visible');
  
      // Verifica che il testo del copyright contenga l'anno corrente
      const currentYear = new Date().getFullYear();
      cy.get('footer')
        .contains(`© ${currentYear} Portale. All rights reserved.`)
        .should('exist');
    });
  
    it('should have correct styling for the footer', () => {
      // Verifica che il footer abbia la classe "bg-dark" e "text-white"
      cy.get('footer').should('have.class', 'bg-dark');
      cy.get('footer').should('have.class', 'text-white');
  
    });
  });
  