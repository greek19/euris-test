describe('Test CategoryChart.jsx', () => {
    beforeEach(() => {
        cy.login('Aldo', '123');
    });

  
    it('Visualizza il grafico dopo aver recuperato i dati', () => {
      const mockData = [
        { category: 'Elettronica', numberOfProducts: 10 },
        { category: 'Libri', numberOfProducts: 5 },
        { category: 'Giocattoli', numberOfProducts: 15 },
      ];
  
      cy.intercept('GET', '/stats/categories', {
        statusCode: 200,
        body: mockData,
      }).as('getCategoriesStats');
  
      cy.visit('/chart');
  
      cy.get('canvas').should('exist');
    });
  
  });
  