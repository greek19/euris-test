describe('CategoryChart Page Tests', () => {
    beforeEach(() => {
        cy.login('Aldo', '123'); // Login per autenticarsi prima del test
    });

  
    it('should render the PolarArea chart after fetching data', () => {
      const mockData = [
        { category: 'Elettronica', numberOfProducts: 10 },
        { category: 'Libri', numberOfProducts: 5 },
        { category: 'Giocattoli', numberOfProducts: 15 },
      ];
  
      // Intercetta la richiesta API e restituisci dati mock
      cy.intercept('GET', '/stats/categories', {
        statusCode: 200,
        body: mockData,
      }).as('getCategoriesStats');
  
      // Visita la pagina
      cy.visit('/chart');
  
      // Aspetta che la richiesta venga completata
    //   cy.wait('@getCategoriesStats');
  
      // Verifica che il grafico sia presente
      cy.get('canvas').should('exist');
    });
  
  });
  