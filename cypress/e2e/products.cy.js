describe('Products Dashboard', () => {
    it('Loads the Products Page', () => {
      cy.visit('/products');
      cy.contains('Products Dashboard');
    });
  
    it('Switches Layout', () => {
      cy.get('button').click();
      cy.contains('Switch to Panel Layout');
    });
  });
  