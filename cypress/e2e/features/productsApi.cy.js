describe('Test productsApi', () => {
    beforeEach(() => {
      cy.login('Aldo', '123'); 
  
      cy.intercept('DELETE', /\/products\/\d+/, {
        statusCode: 200,
        body: { message: 'Product deleted successfully' },
      }).as('deleteProductRequest');
  
      cy.visit('/products');
    });
  
    it('Test eliminazione di un prodotto', () => {
      // il primo click è sull'elimina della card, il secondo di conferma sul modale
      cy.get('[data-testid="delete-button"]').first().should('be.visible').click();
      cy.get('[data-testid="btn-modal-elimina"').click();
  
      cy.wait('@deleteProductRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.message).to.eq('Product deleted successfully');
      });
  
      cy.get('[data-testid="product-card"]').should('have.length.lessThan', 9);
    });
  });
  