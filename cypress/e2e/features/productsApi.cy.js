describe('productsApi - deleteProduct', () => {
    beforeEach(() => {
      // Log in as a user
      cy.login('Aldo', '123'); // Assumi che questa funzione sia configurata correttamente
  
      // Intercept DELETE requests
      cy.intercept('DELETE', /\/products\/\d+/, {
        statusCode: 200,
        body: { message: 'Product deleted successfully' },
      }).as('deleteProductRequest');
  
      // Visit the products page
      cy.visit('/products');
    });
  
    it('should delete a product successfully', () => {
      // Ensure the delete button is visible and click it
      cy.get('[data-testid="delete-button"]').first().should('be.visible').click();
      cy.get('[data-testid="btn-modal-elimina"').click();
  
      // Wait for the DELETE request to be sent
      cy.wait('@deleteProductRequest').then((interception) => {
        // Ensure the request was successful
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.message).to.eq('Product deleted successfully');
      });
  
      // Verify the UI reflects the deleted product (e.g., one less product is displayed)
      cy.get('[data-testid="product-card"]').should('have.length.lessThan', 9);
    });
  });
  