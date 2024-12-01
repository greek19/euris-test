describe('Test Products.jsx', () => {
    // esegue il login prima di tutti i test
    beforeEach(() => {
        cy.login('Aldo', '123');
    });

    it('Visualizza le product card in modalità griglia', () => {
        cy.visit('/products');

        cy.get('[id="switch-layout"]').click();
        cy.get('.row').should('have.class', 'g-4');
    });

    it('Visualizza le product card in modalità lista', () => {
        cy.visit('/products');

        cy.get('.row').should('not.have.class', 'g-4');
        cy.get('.col-12').should('have.length.greaterThan', 0);
    });

});

describe('Pagination Tests', () => {
    beforeEach(() => {
        cy.login('Aldo', '123'); 
    });

    it('Test utilizzo paginazione', () => {
        cy.visit('/products'); 

        cy.get('.pagination').should('exist'); 
        cy.get('.pagination .page-item').should('have.length.greaterThan', 1); 

        cy.get('.pagination .page-item').last().click(); 
        cy.get('[class="page-item active"]').get('[class="page-link"]').contains("2") ;
    });
});

describe('Test interazione coi prodotti', () => {
    beforeEach(() => {
        cy.login('Aldo', '123'); 
    });


    it('Azione elimina prodotto', () => {
      cy.visit('/products');

      cy.get('[data-testid="delete-button"]').first().should('be.visible').click();
     cy.get('[data-testid="btn-modal-elimina"').first().should('be.visible').click();
    });
});
